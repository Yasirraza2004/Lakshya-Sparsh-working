/**
 * Clearly-labelled demo portfolio data for development only.
 * Replace this service with the approved FinnSys integration when credentials/API docs are available.
 */
export const getDemoPortfolio = (user) => ({
  demo: true,
  asOf: new Date().toISOString(),
  investor: {
    id: user.id,
    fullName: user.fullName,
    email: user.email,
    mobile: user.mobile,
  },
  summary: {
    investedAmount: 650000,
    currentValue: 711250,
    totalGain: 61250,
    gainPercent: 9.42,
    activeSips: 3,
  },
  allocation: [
    { name: "Equity", value: 58, amount: 412525, color: "#2f80ed" },
    { name: "Debt", value: 24, amount: 170700, color: "#27ae60" },
    { name: "Hybrid", value: 12, amount: 85350, color: "#f2994a" },
    { name: "Liquid", value: 6, amount: 42675, color: "#9b51e0" },
  ],
  holdings: [
    { id: "MF-1001", name: "Large Cap Equity Fund", category: "Equity", units: 124.56, invested: 180000, current: 201240, gain: 21240, gainPercent: 11.8 },
    { id: "MF-1002", name: "Short Duration Debt Fund", category: "Debt", units: 846.12, invested: 150000, current: 154500, gain: 4500, gainPercent: 3.0 },
    { id: "MF-1003", name: "Balanced Advantage Fund", category: "Hybrid", units: 398.45, invested: 125000, current: 139375, gain: 14375, gainPercent: 11.5 },
    { id: "MF-1004", name: "Flexi Cap Fund", category: "Equity", units: 95.2, invested: 120000, current: 134400, gain: 14400, gainPercent: 12.0 },
    { id: "MF-1005", name: "Liquid Fund", category: "Liquid", units: 572.1, invested: 75000, current: 81825, gain: 6825, gainPercent: 9.1 },
  ],
  transactions: [
    { id: "TXN-24018", date: "2026-10-18", fund: "Large Cap Equity Fund", type: "SIP Purchase", amount: 5000, status: "Completed" },
    { id: "TXN-24011", date: "2026-10-12", fund: "Short Duration Debt Fund", type: "Purchase", amount: 10000, status: "Completed" },
    { id: "TXN-23992", date: "2026-10-05", fund: "Balanced Advantage Fund", type: "SIP Purchase", amount: 3000, status: "Completed" },
    { id: "TXN-23941", date: "2026-09-18", fund: "Large Cap Equity Fund", type: "SIP Purchase", amount: 5000, status: "Completed" },
  ],
  alerts: [
    { id: 1, title: "Review your risk profile", description: "Keep your investor profile up to date.", date: "Action recommended" },
    { id: 2, title: "Monthly portfolio update", description: "Your demo portfolio summary is ready.", date: "This month" },
  ],
});
