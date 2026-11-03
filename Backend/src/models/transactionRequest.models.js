import mongoose from "mongoose";
const schema = new mongoose.Schema({
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
  requestNumber: { type: String, required: true, unique: true },
  items: [{ action: { type: String, enum: ["Buy Lump Sum", "Buy SIP", "Sell", "Switch"], required: true }, scheme: { type: String, required: true, trim: true }, folio: { type: String, default: "New investment" }, amount: { type: Number, min: 0, default: 0 }, frequency: { type: String, default: "" } }],
  status: { type: String, enum: ["Pending advisor review", "Contacted", "Completed", "Cancelled"], default: "Pending advisor review" },
  note: { type: String, trim: true, maxlength: 1000, default: "" },
}, { timestamps: true });
export default mongoose.models.TransactionRequest || mongoose.model("TransactionRequest", schema);
