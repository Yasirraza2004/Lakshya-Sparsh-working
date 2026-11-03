import express from "express";
import { randomUUID } from "node:crypto";
import { requireAuth, authorizeRole } from "../middleware/authorizeRole.js";
import { getDemoPortfolio } from "../services/demoInvestment.service.js";
import TransactionRequest from "../models/transactionRequest.models.js";
import InvestmentTarget from "../models/investmentTarget.models.js";
const router = express.Router();
const clientOnly = [requireAuth, authorizeRole("user")];

const riskLimits = { Conservative: 6, Moderate: 9, Balanced: 12, Growth: 16, Aggressive: 22 };
function assessTarget(target) {
  const months = Math.max(0, (new Date(target.targetDate) - new Date()) / (1000 * 60 * 60 * 24 * 30.4375));
  const years = months / 12;
  const reasons = [];
  let score = 100;
  const limit = riskLimits[target.riskProfile] ?? 9;
  if (years < 1 && target.expectedReturn > 8) { score -= 45; reasons.push("The target is less than one year away but assumes a high annual return."); }
  else if (years < 3 && target.expectedReturn > limit) { score -= 30; reasons.push("The expected return is high for this investment time horizon."); }
  else if (target.expectedReturn > limit) { score -= 25; reasons.push(`The expected return is above the indicative ${limit}% level for a ${target.riskProfile.toLowerCase()} profile.`); }
  if (years < 3 && ["Growth", "Aggressive"].includes(target.riskProfile) && target.expectedReturn > 10) { score -= 15; reasons.push("A short time horizon may not allow enough time to manage market volatility."); }
  if (years >= 5 && target.expectedReturn <= limit) reasons.push("The time horizon and expected return appear broadly aligned with the selected risk profile.");
  if (!reasons.length) reasons.push("The target assumptions appear broadly aligned with the selected risk profile.");
  score = Math.max(0, score);
  return { score, status: score >= 75 ? "Suitable" : score >= 45 ? "Needs Review" : "Not Suitable", reasons };
}
router.get("/targets", ...clientOnly, async (req, res, next) => {
  try {
    const targets = await InvestmentTarget.find({ client: req.user._id }).sort({ createdAt: -1 }).lean();
    res.set("Cache-Control", "no-store");
    return res.json({ success: true, targets });
  } catch (error) { return next(error); }
});
router.post("/targets", ...clientOnly, async (req, res, next) => {
  try {
    const { name, targetAmount, currentSavings = 0, targetDate, expectedReturn, riskProfile } = req.body || {};
    const amount = Number(targetAmount), savings = Number(currentSavings), annualReturn = Number(expectedReturn);
    const allowedProfiles = Object.keys(riskLimits);
    if (!String(name || "").trim() || !Number.isFinite(amount) || amount <= 0 || !Number.isFinite(savings) || savings < 0 || !targetDate || new Date(targetDate) <= new Date() || !Number.isFinite(annualReturn) || annualReturn < 0 || annualReturn > 40 || !allowedProfiles.includes(riskProfile)) {
      return res.status(400).json({ success: false, message: "Enter a valid target name, amount, future date, expected return and risk profile." });
    }
    const extra = Object.fromEntries(["targetType", "childCount", "startMonth", "childName", "childAge", "years", "currentCost", "inflation", "annualReturn", "currentSavingsAmount", "futureValue", "futureSavings", "netRequirement", "sip", "lumpSum"].filter((key) => req.body?.[key] !== undefined).map((key) => [key, req.body[key]]));
    const target = await InvestmentTarget.create({ client: req.user._id, name: String(name).trim(), targetAmount: amount, currentSavings: savings, targetDate, expectedReturn: annualReturn, riskProfile, ...extra });
    return res.status(201).json({ success: true, target });
  } catch (error) { return next(error); }
});

router.put("/targets/:targetId", ...clientOnly, async (req, res, next) => {
  try {
    const { name, targetAmount, currentSavings = 0, targetDate, expectedReturn, riskProfile } = req.body || {};
    const amount = Number(targetAmount), savings = Number(currentSavings), annualReturn = Number(expectedReturn);
    if (!String(name || "").trim() || !Number.isFinite(amount) || amount <= 0 || !Number.isFinite(savings) || savings < 0 || !targetDate || new Date(targetDate) <= new Date() || !Number.isFinite(annualReturn) || annualReturn < 0 || annualReturn > 40 || !Object.hasOwn(riskLimits, riskProfile)) return res.status(400).json({ success: false, message: "Enter valid target details." });
    const fields = ["targetType", "childCount", "startMonth", "childName", "childAge", "years", "currentCost", "inflation", "annualReturn", "currentSavingsAmount", "futureValue", "futureSavings", "netRequirement", "sip", "lumpSum"];
    const extra = Object.fromEntries(fields.filter((key) => req.body[key] !== undefined).map((key) => [key, req.body[key]]));
    const target = await InvestmentTarget.findOneAndUpdate({ _id: req.params.targetId, client: req.user._id }, { $set: { name: String(name).trim(), targetAmount: amount, currentSavings: savings, targetDate, expectedReturn: annualReturn, riskProfile, ...extra } }, { new: true, runValidators: true });
    if (!target) return res.status(404).json({ success: false, message: "Investment target not found." });
    return res.json({ success: true, target });
  } catch (error) { return next(error); }
});

router.post("/targets/:targetId/check", ...clientOnly, async (req, res, next) => {
  try {
    const target = await InvestmentTarget.findOne({ _id: req.params.targetId, client: req.user._id });
    if (!target) return res.status(404).json({ success: false, message: "Investment target not found." });
    const result = assessTarget(target);
    target.assessments.push(result);
    await target.save();
    return res.json({ success: true, assessment: target.assessments.at(-1), target });
  } catch (error) { return next(error); }
});
router.delete("/targets/:targetId", ...clientOnly, async (req, res, next) => {
  try {
    const deleted = await InvestmentTarget.findOneAndDelete({ _id: req.params.targetId, client: req.user._id });
    if (!deleted) return res.status(404).json({ success: false, message: "Investment target not found." });
    return res.json({ success: true, message: "Target deleted." });
  } catch (error) { return next(error); }
});

router.get("/me", ...clientOnly, (req, res) => {
  res.set("Cache-Control", "no-store");
  return res.json({ success: true, message: "Demo portfolio loaded. Values are illustrative, not real investments.", portfolio: getDemoPortfolio(req.user) });
});
router.get("/transaction-requests", ...clientOnly, async (req, res, next) => {
  try {
    const requests = await TransactionRequest.find({ client: req.user._id }).sort({ createdAt: -1 }).lean();
    res.set("Cache-Control", "no-store");
    return res.json({ success: true, requests });
  } catch (error) { return next(error); }
});
router.post("/transaction-requests", ...clientOnly, async (req, res, next) => {
  try {
    const { items, note = "" } = req.body || {};
    const allowed = ["Buy Lump Sum", "Buy SIP", "Sell", "Switch"];
    if (!Array.isArray(items) || items.length < 1 || items.length > 20) return res.status(400).json({ success: false, message: "Add at least one item to your request." });
    const cleanItems = items.map((item) => ({ action: allowed.includes(item.action) ? item.action : null, scheme: String(item.scheme || "").trim().slice(0, 160), folio: String(item.folio || "New investment").trim().slice(0, 80), amount: Number(item.amount || 0), frequency: String(item.frequency || "").trim().slice(0, 40) }));
    if (cleanItems.some((item) => !item.action || !item.scheme || !Number.isFinite(item.amount) || item.amount < 0)) return res.status(400).json({ success: false, message: "Please check the scheme, transaction type and amount." });
    const request = await TransactionRequest.create({ client: req.user._id, requestNumber: `LS-${randomUUID().slice(0, 8).toUpperCase()}`, items: cleanItems, note: String(note).trim().slice(0, 1000) });
    return res.status(201).json({ success: true, message: "Your request has been sent to the Lakshya Sparsh team for offline review. No transaction has been executed.", request });
  } catch (error) { return next(error); }
});
export default router;
