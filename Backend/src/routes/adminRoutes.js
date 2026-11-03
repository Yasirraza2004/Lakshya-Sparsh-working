import express from "express";
import { authorizeRole } from "../middleware/authorizeRole.js";
import User from "../models/user.models.js";
import InvestorRecord from "../models/investorRecord.models.js";
import { ensureDemoInvestors } from "../services/adminDashboard.service.js";

const router = express.Router();
const adminOnly = authorizeRole("admin", "owner");
const cleanInvestor = (doc) => ({
  id: doc.id,
  fullName: doc.fullName,
  email: doc.email,
  mobile: doc.mobile || "",
  folio: doc.folio,
  portfolioValue: doc.portfolioValue,
  status: doc.status,
  risk: doc.risk,
  source: doc.source,
  createdAt: doc.createdAt,
});

// Overview and records are session-protected; the role is checked on the server.
router.get("/overview", adminOnly, async (_req, res, next) => {
  try {
    await ensureDemoInvestors();
    const [investors, registeredUsers, adminUsers, reviewCount] = await Promise.all([
      InvestorRecord.find().sort({ createdAt: -1 }).lean(),
      User.countDocuments({ role: "user" }),
      User.countDocuments({ role: "admin" }),
      InvestorRecord.countDocuments({ status: { $in: ["Review due", "Missing contact"] } }),
    ]);
    const totalAum = investors.reduce((sum, record) => sum + (record.portfolioValue || 0), 0);
    res.set("Cache-Control", "no-store").json({
      success: true,
      mode: "demo",
      metrics: { totalAum, investorRecords: investors.length, registeredUsers, adminUsers, reviewCount },
      investors: investors.map(cleanInvestor),
      alerts: [
        { title: "Investor records needing review", count: reviewCount, description: "Check contact details and risk-review status." },
        { title: "FinnSys integration", count: "Not connected", description: "Demo values are illustrative and are not live client investments." },
        { title: "OTP verification", count: "Disabled", description: "As requested, OTP verification is not active in this preview." },
      ],
    });
  } catch (error) { next(error); }
});

router.get("/investors", adminOnly, async (req, res, next) => {
  try {
    await ensureDemoInvestors();
    const q = String(req.query.q || "").trim().slice(0, 100);
    const filter = q ? { $or: [
      { fullName: { $regex: escapeRegex(q), $options: "i" } },
      { email: { $regex: escapeRegex(q), $options: "i" } },
      { folio: { $regex: escapeRegex(q), $options: "i" } },
      { mobile: { $regex: escapeRegex(q), $options: "i" } },
    ] } : {};
    const docs = await InvestorRecord.find(filter).sort({ createdAt: -1 }).limit(500).lean();
    res.set("Cache-Control", "no-store").json({ success: true, investors: docs.map(cleanInvestor) });
  } catch (error) { next(error); }
});

router.post("/investors", adminOnly, async (req, res, next) => {
  try {
    const { fullName, email, mobile = "", portfolioValue = 0, risk = "Not assessed", status } = req.body || {};
    if (typeof fullName !== "string" || !fullName.trim() || typeof email !== "string" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      return res.status(400).json({ message: "Enter an investor name and valid email address." });
    }
    const normalizedMobile = String(mobile).trim();
    if (normalizedMobile && !/^[6-9]\d{9}$/.test(normalizedMobile)) return res.status(400).json({ message: "Mobile must be a valid 10-digit Indian number, or blank." });
    const value = Number(portfolioValue);
    if (!Number.isFinite(value) || value < 0 || value > 100000000000) return res.status(400).json({ message: "Enter a valid non-negative portfolio value." });
    const normalizedEmail = email.trim().toLowerCase();
    const duplicate = await InvestorRecord.exists({ email: normalizedEmail });
    if (duplicate) return res.status(409).json({ message: "An investor record with this email already exists." });
    const count = await InvestorRecord.countDocuments();
    const investor = await InvestorRecord.create({
      fullName: fullName.trim(), email: normalizedEmail, mobile: normalizedMobile,
      portfolioValue: value, risk: ["Conservative", "Moderate", "Aggressive", "Not assessed"].includes(risk) ? risk : "Not assessed",
      status: status === "Review due" ? "Review due" : normalizedMobile ? "Active" : "Missing contact",
      folio: `LS-${Date.now().toString().slice(-8)}-${count + 1}`, source: "demo",
    });
    res.status(201).json({ success: true, message: "Demo investor saved to MongoDB.", investor: cleanInvestor(investor) });
  } catch (error) {
    if (error.code === 11000) return res.status(409).json({ message: "A duplicate folio or email was detected." });
    next(error);
  }
});

// Only the owner may create administrator accounts. Role is always assigned server-side.
router.post("/admins", authorizeRole("owner"), async (req, res, next) => {
  try {
    const { fullName, email, password, dob, mobile } = req.body ?? {};
    if ([fullName, email, password, dob, mobile].some((v) => typeof v !== "string" || !v.trim())) {
      return res.status(400).json({ message: "Full name, email, password, date of birth, and mobile are required." });
    }
    const normalizedEmail = email.trim().toLowerCase();
    const normalizedMobile = mobile.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) return res.status(400).json({ message: "Enter a valid email address." });
    if (password.length < 12) return res.status(400).json({ message: "Use a password with at least 12 characters." });
    if (!/^[6-9]\d{9}$/.test(normalizedMobile)) return res.status(400).json({ message: "Enter a valid 10-digit Indian mobile number." });
    const parsedDob = new Date(`${dob}T00:00:00.000Z`);
    if (Number.isNaN(parsedDob.getTime()) || parsedDob.toISOString().slice(0, 10) !== dob || parsedDob > new Date()) return res.status(400).json({ message: "Enter a valid date of birth." });
    const existing = await User.findOne({ $or: [{ email: normalizedEmail }, { mobile: normalizedMobile }] });
    if (existing) return res.status(409).json({ message: existing.email === normalizedEmail ? "Email is already registered." : "Mobile number is already registered." });
    const admin = new User({ fullName: fullName.trim(), email: normalizedEmail, dob: parsedDob, mobile: normalizedMobile, role: "admin" });
    await User.register(admin, password);
    return res.status(201).json({ message: "Administrator account created successfully.", admin: { id: admin.id, fullName: admin.fullName, email: admin.email, mobile: admin.mobile, role: admin.role } });
  } catch (error) {
    if (error.code === 11000 || error.name === "UserExistsError") return res.status(409).json({ message: "Email or mobile number is already registered." });
    return next(error);
  }
});

router.get("/health", adminOnly, (_req, res) => res.json({ success: true, message: "Admin route is protected." }));
function escapeRegex(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
export default router;
