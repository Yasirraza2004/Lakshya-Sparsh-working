import mongoose from "mongoose";

const assessmentSchema = new mongoose.Schema({
  status: { type: String, enum: ["Suitable", "Needs Review", "Not Suitable"], required: true },
  score: { type: Number, required: true },
  reasons: [{ type: String }],
  checkedAt: { type: Date, default: Date.now },
}, { _id: false });

const investmentTargetSchema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  name: { type: String, required: true, trim: true, maxlength: 100 },
  targetAmount: { type: Number, required: true, min: 1 },
  currentSavings: { type: Number, default: 0, min: 0 },
  targetDate: { type: Date, required: true },
  expectedReturn: { type: Number, required: true, min: 0, max: 40 },
  riskProfile: { type: String, enum: ["Conservative", "Moderate", "Balanced", "Growth", "Aggressive"], required: true },
  targetType: { type: String, default: "Other Targets (Wealth Builder etc)" },
  childCount: { type: Number, default: 1 },
  startMonth: { type: String, default: "" },
  childName: { type: String, default: "" },
  childAge: { type: Number, default: 0 },
  years: { type: Number, default: 0 },
  currentCost: { type: Number, default: 0 },
  inflation: { type: Number, default: 7 },
  annualReturn: { type: Number, default: 0 },
  currentSavingsAmount: { type: Number, default: 0 },
  futureValue: { type: Number, default: 0 },
  futureSavings: { type: Number, default: 0 },
  netRequirement: { type: Number, default: 0 },
  sip: { type: Number, default: 0 },
  lumpSum: { type: Number, default: 0 },
  assessments: { type: [assessmentSchema], default: [] },
}, { timestamps: true });

export default mongoose.model("InvestmentTarget", investmentTargetSchema);
