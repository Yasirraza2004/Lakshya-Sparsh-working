export const reportViews = [
  ["overview", "Overview"], ["analysis", "Portfolio analysis"],
  ["summary", "Investment summary"], ["plans", "SIP / STP report"],
  ["ledger", "Investment ledger"], ["search", "Search transactions"],
];

export function filterTransactions(transactions, { query = "", type = "", from = "", to = "" } = {}) {
  const term = query.trim().toLowerCase();
  return transactions.filter((item) => {
    const date = String(item.date).slice(0, 10);
    return (!term || `${item.id} ${item.fund} ${item.folio || ""}`.toLowerCase().includes(term)) &&
      (!type || item.type === type) && (!from || date >= from) && (!to || date <= to);
  }).sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

// Quote every cell and neutralize spreadsheet formulas in exported text.
export function csvText(rows) {
  return "\uFEFF" + rows.map((row) => row.map((value) => {
    let cell = String(value ?? "");
    if (typeof value === "string" && /^[\s]*[=+@-]/.test(cell)) cell = "'" + cell;
    return `"${cell.replaceAll('"', '""')}"`;
  }).join(",")).join("\r\n");
}

export function downloadCsv(name, rows) {
  const url = URL.createObjectURL(new Blob([csvText(rows)], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = name;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
