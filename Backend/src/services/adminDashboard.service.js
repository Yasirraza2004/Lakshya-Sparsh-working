import InvestorRecord from "../models/investorRecord.models.js";

const DEMO_INVESTORS = [
  { fullName: "Aarav Sharma", email: "aarav.sharma@example.com", mobile: "9876543210", folio: "LS-DEMO-1001", portfolioValue: 1845000, status: "Active", risk: "Moderate", source: "demo" },
  { fullName: "Priya Mehta", email: "priya.mehta@example.com", mobile: "9821045678", folio: "LS-DEMO-1002", portfolioValue: 1268000, status: "Active", risk: "Conservative", source: "demo" },
  { fullName: "Rahul Verma", email: "rahul.verma@example.com", mobile: "9811122334", folio: "LS-DEMO-1003", portfolioValue: 932000, status: "Review due", risk: "Aggressive", source: "demo" },
  { fullName: "Ananya Das", email: "ananya.das@example.com", mobile: "9830011223", folio: "LS-DEMO-1004", portfolioValue: 2180000, status: "Active", risk: "Moderate", source: "demo" },
  { fullName: "Kabir Singh", email: "kabir.singh@example.com", mobile: "", folio: "LS-DEMO-1005", portfolioValue: 645000, status: "Missing contact", risk: "Conservative", source: "demo" },
];

export async function ensureDemoInvestors() {
  if (await InvestorRecord.exists({})) return;
  try {
    await InvestorRecord.insertMany(DEMO_INVESTORS, { ordered: false });
  } catch (error) {
    if (error.code !== 11000 && error.name !== "BulkWriteError") throw error;
  }
}
