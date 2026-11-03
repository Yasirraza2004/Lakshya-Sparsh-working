import mongoose from "mongoose";

const investorRecordSchema = new mongoose.Schema({
  fullName: { type: String, required: true, trim: true, maxlength: 120 },
  email: { type: String, required: true, trim: true, lowercase: true, maxlength: 254 },
  mobile: { type: String, trim: true, default: "", match: [/^(?:[6-9]\d{9})?$/, "Enter a valid 10-digit Indian mobile number"] },
  folio: { type: String, required: true, unique: true, trim: true },
  portfolioValue: { type: Number, default: 0, min: 0, max: 100000000000 },
  status: { type: String, enum: ["Active", "Review due", "Missing contact"], default: "Active" },
  risk: { type: String, enum: ["Conservative", "Moderate", "Aggressive", "Not assessed"], default: "Not assessed" },
  source: { type: String, enum: ["demo", "finnsys"], default: "demo" },
}, { timestamps: true });

export default mongoose.models.InvestorRecord || mongoose.model("InvestorRecord", investorRecordSchema);
