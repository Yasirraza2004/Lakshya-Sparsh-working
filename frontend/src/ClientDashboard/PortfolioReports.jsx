import { useState } from "react";
import { downloadCsv, filterTransactions, reportViews } from "./reportUtils";
import "./PortfolioReports.css";

const money = (n) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(Number(n || 0));
const date = (value) => value ? new Date(value).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "Not available";
const signed = (n) => `${Number(n) > 0 ? "+" : ""}${money(n)}`;

function Table({ columns, rows, empty = "No records available." }) {
  return <div className="ls-table-scroll"><table className="ls-data-table"><thead><tr>{columns.map((col) => <th key={col}>{col}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={i}>{row.map((cell, j) => <td key={j}>{cell}</td>)}</tr>)}</tbody></table>{!rows.length && <p className="ls-empty-state" role="status">{empty}</p>}</div>;
}

function Gain({ value }) {
  return <span className={value < 0 ? "ls-report-loss" : "ls-positive"}>{signed(value)}</span>;
}

export default function PortfolioReports({ portfolio, view, onView }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("");
  const [type, setType] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const holdings = portfolio?.holdings || [];
  const transactions = portfolio?.transactions || [];
  const plans = portfolio?.plans || [];
  const isActivity = ["ledger", "search"].includes(view);
  const invalidRange = from && to && from > to;
  const results = invalidRange ? [] : filterTransactions(transactions, { query, type, from, to });
  const shownHoldings = holdings.filter((item) => (!category || item.category === category) && `${item.name} ${item.id} ${item.folio || ""}`.toLowerCase().includes(query.trim().toLowerCase()));
  const title = reportViews.find(([id]) => id === view)?.[1] || "Overview";
  const exportHoldings = () => downloadCsv(`${portfolio?.demo ? "demo-" : ""}holdings.csv`, [
    ["Investment", "Folio / ID", "Category", "Units", "Invested INR", "Current INR", "Gain INR"],
    ...shownHoldings.map((h) => [h.name, h.folio || h.id, h.category, h.units, h.invested, h.current, h.gain]),
  ]);
  const exportActivity = () => downloadCsv(`${portfolio?.demo ? "demo-" : ""}transactions.csv`, [
    ["Date", "Transaction ID", "Investment", "Type", "Amount INR", "Status"],
    ...results.map((t) => [t.date, t.id, t.fund, t.type, t.amount, t.status]),
  ]);
  return <div className="ls-reports">
    <nav className="ls-report-tabs" aria-label="Portfolio reports">{reportViews.map(([id, label]) => <button key={id} aria-current={view === id ? "page" : undefined} className={view === id ? "active" : ""} onClick={() => { onView(id); setQuery(""); setCategory(""); setType(""); setFrom(""); setTo(""); }}>{label}</button>)}</nav>
    <div className="ls-report-heading"><div><h2>{title}</h2><p>Valuation as of {date(portfolio?.asOf)}{portfolio?.demo ? " · Sample records" : ""}</p></div>{["overview", "summary"].includes(view) && <button className="ls-btn ls-btn-quiet" disabled={!shownHoldings.length} onClick={exportHoldings}>Download holdings CSV ↓</button>}{isActivity && <button className="ls-btn ls-btn-quiet" disabled={!results.length || !!invalidRange} onClick={exportActivity}>Download results CSV ↓</button>}</div>
    {["overview", "summary"].includes(view) && <>
      <section className="ls-mini-summary"><div><span>Invested in results</span><strong>{money(shownHoldings.reduce((s, h) => s + h.invested, 0))}</strong></div><div><span>Current value in results</span><strong>{money(shownHoldings.reduce((s, h) => s + h.current, 0))}</strong></div><div><span>Gain / loss in results</span><strong><Gain value={shownHoldings.reduce((s, h) => s + h.gain, 0)} /></strong></div></section>
      <section className="ls-panel ls-full-panel"><div className="ls-report-filters"><label>Search investments<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Scheme, folio or ID" /></label><label>Asset category<select value={category} onChange={(e) => setCategory(e.target.value)}><option value="">All categories</option>{[...new Set(holdings.map((h) => h.category))].map((c) => <option key={c}>{c}</option>)}</select></label></div>
      <Table columns={["Investment / Folio", "Units", "Invested", "Current value", "Gain / loss", "Absolute return"]} rows={shownHoldings.map((h) => [<div key="fund"><strong>{h.name}</strong><small className="ls-report-subtext">{h.folio || h.id} · {h.category}</small></div>, Number(h.units).toLocaleString("en-IN"), money(h.invested), money(h.current), <Gain key="gain" value={h.gain} />, `${Number(h.gainPercent).toFixed(2)}%`])} empty="No investments match these filters." /></section>
      {view === "summary" && <p className="ls-page-note">This summary uses the latest valuation. Historical point-to-point returns need dated valuations and cash flows, which are not available in the current data source.</p>}
      {view === "overview" && <section className="ls-panel ls-full-panel"><div className="ls-panel-header"><div><h2>Last 10 transactions</h2><p>Most recent recorded investment activity</p></div><button className="ls-text-button" onClick={() => onView("ledger")}>View ledger →</button></div><ActivityTable rows={filterTransactions(transactions).slice(0, 10)} /></section>}
    </>}
    {view === "analysis" && <section className="ls-panel ls-full-panel"><div className="ls-panel-header"><div><h2>Asset allocation</h2><p>Current value by asset category</p></div></div><div className="ls-allocation-bars">{(portfolio?.allocation || []).map((item) => <div key={item.name}><div><strong>{item.name}</strong><span>{money(item.amount)} · {item.value}%</span></div><div className="ls-allocation-track"><span style={{ width: `${Math.max(0, Math.min(100, item.value))}%`, background: item.color }} /></div></div>)}</div><p className="ls-page-note">Suggested allocation is not provided by the current data source. Review suitability with your advisor.</p></section>}
    {view === "plans" && <section className="ls-panel ls-full-panel"><div className="ls-panel-header"><div><h2>My SIP / STP</h2><p>Recurring investment instructions from your portfolio records</p></div><span className="ls-period-pill">{plans.length} plans</span></div><Table columns={["Scheme", "Type", "Amount", "Frequency", "Next installment", "Status"]} rows={plans.map((p) => [p.fund, p.type, money(p.amount), p.frequency, date(p.nextDate), p.status])} empty="No SIP or STP plans are available." /><p className="ls-page-note">Plan changes can be discussed with your advisor through Investment service requests.</p></section>}
    {isActivity && <section className="ls-panel ls-full-panel"><div className="ls-report-filters"><label>Search transactions<input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Scheme, transaction ID or folio" /></label><label>Transaction type<select value={type} onChange={(e) => setType(e.target.value)}><option value="">All types</option>{[...new Set(transactions.map((t) => t.type))].map((t) => <option key={t}>{t}</option>)}</select></label><label>From date<input type="date" value={from} onChange={(e) => setFrom(e.target.value)} /></label><label>To date<input type="date" value={to} onChange={(e) => setTo(e.target.value)} /></label><button className="ls-btn ls-btn-quiet" onClick={() => { setQuery(""); setType(""); setFrom(""); setTo(""); }}>Clear filters</button></div>{invalidRange && <p role="alert" className="ls-inline-error">From date must be on or before to date.</p>}<p className="ls-page-note" role="status">{results.length} matching transactions · Total recorded amount {money(results.reduce((s, t) => s + t.amount, 0))}</p><ActivityTable rows={results} /><p className="ls-page-note">Amounts are recorded transaction values, not net cash flows or capital gains.</p></section>}
  </div>;
}

function ActivityTable({ rows }) {
  return <Table columns={["Date", "Transaction ID", "Investment", "Type", "Amount", "Status"]} rows={rows.map((t) => [date(t.date), t.id, t.fund, t.type, money(t.amount), t.status])} empty="No transactions match these filters." />;
}

export function TaxReports({ onContact }) {
  return <section className="ls-panel ls-full-panel"><div className="ls-panel-header"><div><h2>Tax statements</h2><p>Verified reports for your investment records</p></div><span className="ls-period-pill">Not connected</span></div><div className="ls-tax-reports">{["Capital gains statement", "ELSS investment certificate", "Dividend statement"].map((title) => <article key={title}><span aria-hidden="true">▤</span><div><h3>{title}</h3><p>No verified statement is available from the current data source.</p></div></article>)}</div><button className="ls-btn ls-btn-primary" onClick={onContact}>Contact advisor for statements →</button></section>;
}
