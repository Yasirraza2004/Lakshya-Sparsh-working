import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AdminDashboard.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const money = (value) => new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 }).format(Number(value) || 0);
const initials = (name = "Investor") => name.split(/\s+/).map((part) => part[0]).join("").slice(0, 2).toUpperCase();

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState("Overview");
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [showAdd, setShowAdd] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [form, setForm] = useState({ fullName: "", email: "", mobile: "", portfolioValue: "0", risk: "Moderate" });

  const load = useCallback(async () => {
    setError("");
    try {
      const [me, overview] = await Promise.all([
        axios.get(`${API}/auth/me`, { withCredentials: true }),
        axios.get(`${API}/admin/overview`, { withCredentials: true }),
      ]);
      if (!me.data.user || !["admin", "owner"].includes(me.data.user.role)) {
        navigate("/login", { replace: true });
        return;
      }
      setUser(me.data.user);
      setData(overview.data);
    } catch (e) {
      if ([401, 403].includes(e.response?.status)) navigate("/login", { replace: true });
      else setError(e.response?.data?.message || "Unable to load admin dashboard. Check that the backend and MongoDB are running.");
    } finally { setLoading(false); }
  }, [navigate]);

  useEffect(() => { load(); }, [load]);
  const investors = useMemo(() => (data?.investors || []).filter((x) => [x.fullName, x.email, x.folio, x.mobile].join(" ").toLowerCase().includes(query.toLowerCase())), [data, query]);

  async function addInvestor(event) {
    event.preventDefault(); setBusy(true); setError(""); setMessage("");
    try {
      const response = await axios.post(`${API}/admin/investors`, { ...form, portfolioValue: Number(form.portfolioValue) }, { withCredentials: true });
      setMessage(response.data.message || "Investor saved.");
      setForm({ fullName: "", email: "", mobile: "", portfolioValue: "0", risk: "Moderate" });
      setShowAdd(false); await load(); setActive("Investor Management");
    } catch (e) { setError(e.response?.data?.message || "Could not save the investor record."); }
    finally { setBusy(false); }
  }

  function exportCsv() {
    const rows = [["Name", "Email", "Mobile", "Folio", "Portfolio value (demo INR)", "Risk", "Status", "Source"], ...investors.map((x) => [x.fullName, x.email, x.mobile, x.folio, x.portfolioValue, x.risk, x.status, x.source])];
    const csv = rows.map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(",")).join("\r\n");
    const url = URL.createObjectURL(new Blob([csv], { type: "text/csv;charset=utf-8" }));
    const anchor = document.createElement("a"); anchor.href = url; anchor.download = "lakshya-sparsh-demo-investors.csv"; anchor.click(); URL.revokeObjectURL(url);
  }

  async function logout() {
    try { await axios.post(`${API}/auth/logout`, {}, { withCredentials: true }); }
    finally { navigate("/login", { replace: true }); }
  }

  const nav = [{ label: "Overview", icon: "▦", group: "WORKSPACE" }, { label: "Investor Management", icon: "♙", group: "WORKSPACE" }, { label: "Data Imports", icon: "▤", group: "WORKSPACE" }, { label: "Risk & Allocation", icon: "◇", group: "WORKSPACE" }, { label: "Business Reports", icon: "▥", group: "WORKSPACE" }, { label: "System Monitor", icon: "◉", group: "SYSTEM" }, { label: "Settings", icon: "⚙", group: "SYSTEM" }];
  if (loading) return <main className="ad-state">Checking your secure administrator session…</main>;
  if (!user) return <main className="ad-state">{error || "Redirecting to login…"}</main>;

  return <div className="ad-shell">
    {mobileMenu && <button className="ad-backdrop" aria-label="Close menu" onClick={() => setMobileMenu(false)} />}
    <aside className={`ad-sidebar ${mobileMenu ? "ad-sidebar-open" : ""}`}>
      <a href="/" className="ad-brand"><span className="ad-brand-mark">LS</span><span><b>LAKSHYA SPARSH</b><small>FINANCIAL SERVICES</small></span><button className="ad-close" onClick={(e) => { e.preventDefault(); setMobileMenu(false); }}>×</button></a>
      <div className="ad-side-label">ADMIN WORKSPACE</div>
      {nav.map((item, i) => <div key={item.label}>{(i === 0 || nav[i - 1].group !== item.group) && <div className="ad-group">{item.group}</div>}<button className={`ad-nav ${active === item.label ? "is-active" : ""}`} onClick={() => { setActive(item.label); setMobileMenu(false); }}><span className="ad-nav-icon">{item.icon}</span>{item.label}{item.label === "System Monitor" && <i />}</button></div>)}
      <div className="ad-side-bottom"><div className="ad-support"><b>Admin workspace</b><p>Signed in as {user.fullName}.</p><small>Protected by your server session.</small></div><button className="ad-nav" onClick={logout}><span className="ad-nav-icon">↪</span>Sign out</button><small className="ad-version">Lakshya Sparsh · Admin</small></div>
    </aside>
    <main className="ad-main">
      <header className="ad-topbar"><button className="ad-menu" onClick={() => setMobileMenu(true)} aria-label="Open menu">☰</button><div className="ad-breadcrumb">Workspace <span>/</span> <b>{active}</b></div><div className="ad-user"><span className="ad-avatar">{initials(user.fullName)}</span><span><b>{user.fullName}</b><small>{user.role === "owner" ? "Owner" : "Administrator"}</small></span></div></header>
      <div className="ad-content">
        <div className="ad-heading"><div><div className="ad-eyebrow">TUESDAY, OCTOBER 27, 2026</div><h1>{active === "Overview" ? `Welcome ${user.fullName.split(" ")[0]}` : active}</h1><p>Manage Lakshya Sparsh investor operations from one workspace.</p></div><div className="ad-actions"><button className="ad-button secondary" onClick={exportCsv}>⇩ Export CSV</button><button className="ad-button primary" onClick={() => setShowAdd(true)}>＋ Add investor</button></div></div>
        <div className="ad-demo-banner"><span>✓</span><div><b>Demo environment</b><small>Investor records below are illustrative demo records saved in MongoDB. FinnSys is not connected.</small></div><button onClick={() => { setActive("System Monitor"); }}>System status ↗</button></div>
        {error && <div className="ad-message error" role="alert">{error}<button onClick={load}>Retry</button></div>}{message && <div className="ad-message success" role="status">{message}<button onClick={() => setMessage("")}>×</button></div>}
        {active === "Overview" ? <>
          <div className="ad-metrics"><Metric icon="₹" title="Assets under management" value={money(data?.metrics?.totalAum)} note="Illustrative demo values" tone="blue"/><Metric icon="♙" title="Investor records" value={data?.metrics?.investorRecords ?? "—"} note="Stored in MongoDB" tone="purple"/><Metric icon="◎" title="Registered client accounts" value={data?.metrics?.registeredUsers ?? "—"} note="Accounts with user role" tone="green"/><Metric icon="!" title="Items requiring review" value={data?.metrics?.reviewCount ?? "—"} note="Contact / risk follow-up" tone="amber"/></div>
          <div className="ad-columns"><section className="ad-panel"><PanelTitle title="Investor directory" sub="Recent demo investor records" action="View all" onClick={() => setActive("Investor Management")}/><SearchBox value={query} onChange={setQuery}/><InvestorTable investors={investors.slice(0, 5)}/><div className="ad-panel-foot">Showing {Math.min(5, investors.length)} of {investors.length} records <button onClick={() => setActive("Investor Management")}>Open directory ↗</button></div></section>
            <section className="ad-panel"><PanelTitle title="Mailers & alerts" sub="Items to review"/>{(data?.alerts || []).map((alert) => <div className="ad-alert" key={alert.title}><span>⚠</span><div><b>{alert.title}</b><small>{alert.description}</small></div><em>{alert.count}</em></div>)}<button className="ad-wide" onClick={() => setActive("System Monitor")}>Open system monitor ↗</button></section></div>
          <div className="ad-columns bottom"><section className="ad-panel"><PanelTitle title="Quick actions" sub="Common admin tasks"/><div className="ad-quick-grid"><Quick title="Add investor" desc="Save a demo record to MongoDB" onClick={() => setShowAdd(true)}/><Quick title="Export records" desc="Download filtered records as CSV" onClick={exportCsv}/><Quick title="Risk review" desc="View investor risk profiles" onClick={() => setActive("Risk & Allocation")}/><Quick title="System monitor" desc="Check connected services" onClick={() => setActive("System Monitor")}/></div></section><section className="ad-panel"><PanelTitle title="System monitor" sub="Current integration status"/><System title="MongoDB" detail="Connected through backend API" state="API connected" tone="green"/><System title="FinnSys" detail="No live credentials or integration" state="Not connected" tone="amber"/><System title="Email / OTP" detail="OTP verification disabled" state="Disabled" tone="gray"/></section></div>
        </> : active === "Investor Management" ? <section className="ad-panel ad-investor-page"><PanelTitle title="Investor directory" sub="Search and review MongoDB-backed demo records" action="Export CSV" onClick={exportCsv}/><div className="ad-toolbar"><SearchBox value={query} onChange={setQuery}/><button className="ad-button primary" onClick={() => setShowAdd(true)}>＋ Add investor</button></div><InvestorTable investors={investors}/></section>
        : <FeaturePage active={active} data={data} onRefresh={load} onExport={exportCsv} onAdd={() => setShowAdd(true)}/>}
        <footer className="ad-footer">© {new Date().getFullYear()} Lakshya Sparsh Financial Services <span>🔒 Session-protected admin workspace · Demo data</span></footer>
      </div>
    </main>
    {showAdd && <div className="ad-modal-back" onMouseDown={(e) => { if (e.target === e.currentTarget) setShowAdd(false); }}><section className="ad-modal"><div className="ad-modal-head"><div><h2>Add investor record</h2><p>Saved to MongoDB as demo data, not imported from FinnSys.</p></div><button onClick={() => setShowAdd(false)}>×</button></div><form onSubmit={addInvestor}><label>Full name<input required maxLength={120} value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} placeholder="Investor full name"/></label><label>Email address<input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="investor@example.com"/></label><label>Mobile number <small>(optional)</small><input inputMode="numeric" maxLength={10} pattern="[6-9][0-9]{9}" value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value.replace(/\D/g, "") })} placeholder="10-digit Indian mobile"/></label><label>Demo portfolio value (₹)<input type="number" min="0" max="100000000000" value={form.portfolioValue} onChange={(e) => setForm({ ...form, portfolioValue: e.target.value })} required/></label><label>Risk profile<select value={form.risk} onChange={(e) => setForm({ ...form, risk: e.target.value })}><option>Conservative</option><option>Moderate</option><option>Aggressive</option><option>Not assessed</option></select></label><div className="ad-form-note">This is a demo record. Do not enter real client financial information into this prototype.</div><div className="ad-modal-actions"><button type="button" className="ad-button secondary" onClick={() => setShowAdd(false)}>Cancel</button><button className="ad-button primary" disabled={busy}>{busy ? "Saving…" : "Save investor"}</button></div></form></section></div>}
  </div>;
}

function Metric({ icon, title, value, note, tone }) { return <section className="ad-metric"><div className="ad-metric-top"><span className={`ad-metric-icon ${tone}`}>{icon}</span><span className="ad-pill">DEMO</span></div><p>{title}</p><b>{value}</b><small>{note}</small></section>; }
function PanelTitle({ title, sub, action, onClick }) { return <div className="ad-panel-title"><div><h2>{title}</h2><p>{sub}</p></div>{action && <button onClick={onClick}>{action} ↗</button>}</div>; }
function SearchBox({ value, onChange }) { return <label className="ad-search"><span>⌕</span><input value={value} onChange={(e) => onChange(e.target.value)} placeholder="Search name, folio, email…"/></label>; }
function InvestorTable({ investors }) { return <div className="ad-table-wrap"><table className="ad-table"><thead><tr><th>INVESTOR</th><th>FOLIO ID</th><th>PORTFOLIO VALUE</th><th>RISK</th><th>STATUS</th></tr></thead><tbody>{investors.map((item) => <tr key={item.id || item.folio}><td><div className="ad-investor-name"><span>{initials(item.fullName)}</span><div><b>{item.fullName}</b><small>{item.email}</small></div></div></td><td>{item.folio}</td><td className="ad-money">{money(item.portfolioValue)}</td><td>{item.risk}</td><td><span className={`ad-status ${item.status === "Active" ? "green" : item.status === "Review due" ? "amber" : "gray"}`}>{item.status}</span></td></tr>)}</tbody></table>{!investors.length && <p className="ad-empty">No matching investor records.</p>}</div>; }
function Quick({ title, desc, onClick }) { return <button className="ad-quick" onClick={onClick}><span>↗</span><div><b>{title}</b><small>{desc}</small></div></button>; }
function System({ title, detail, state, tone }) { return <div className="ad-system"><span>◉</span><div><b>{title}</b><small>{detail}</small></div><em className={tone}>{state}</em></div>; }
function FeaturePage({ active, data, onRefresh, onExport, onAdd }) {
  const descriptions = {
    "Data Imports": ["Data import center", "Upload/import operations are not enabled in this version. Connect validated import parsers before importing financial data."],
    "Risk & Allocation": ["Risk & asset allocation", "Review demo investor risk profiles. Allocation values are illustrative and should not be used for investment decisions."],
    "Business Reports": ["Business reports", "Export the current demo investor records. Financial reporting should be reconciled with an authorized source before production."],
    "System Monitor": ["System monitor", "API and MongoDB-backed dashboard data are active when this page has loaded successfully."],
    Settings: ["Admin settings", "Admin access is enforced by the backend session and role middleware. Only the owner role can create administrators."],
  };
  const [title, description] = descriptions[active] || descriptions["System Monitor"];
  return <div className="ad-feature-layout"><section className="ad-feature-hero"><span>◈</span><h2>{title}</h2><p>{description}</p></section><div className="ad-feature-cards">{(active === "System Monitor" ? [{ t: "MongoDB API", d: "Dashboard and demo investor records use the backend API." }, { t: "FinnSys integration", d: "Not connected. Obtain authorized API documentation and credentials first." }, { t: "Role security", d: "Admin and owner routes check the server-side session role." }] : active === "Risk & Allocation" ? [{ t: "Risk profiles", d: `${data?.metrics?.investorRecords || 0} demo investor records.` }, { t: "Review queue", d: `${data?.metrics?.reviewCount || 0} records need contact or risk follow-up.` }, { t: "Allocation", d: "Live asset allocation has not been imported." }] : active === "Business Reports" ? [{ t: "Export investor data", d: "Download the currently loaded demo records." }, { t: "AUM summary", d: `Demo AUM: ${money(data?.metrics?.totalAum || 0)}.` }] : active === "Settings" ? [{ t: "Administrator accounts", d: "Owner-only endpoint: POST /api/admin/admins." }, { t: "Authentication", d: "HTTP-only session cookie with role verification on backend routes." }] : [{ t: "Client master", d: "Import workflow not connected." }, { t: "Transactions", d: "Import workflow not connected." }, { t: "Brokerage files", d: "Import workflow not connected." }]).map((card) => <section className="ad-panel ad-feature-card" key={card.t}><h3>{card.t}</h3><p>{card.d}</p>{card.t.includes("Export") ? <button onClick={onExport}>Export CSV ↗</button> : card.t === "Risk profiles" ? <button onClick={onAdd}>Add demo record ↗</button> : <button onClick={onRefresh}>Refresh status ↗</button>}</section>)}</div><div className="ad-feature-note">Production checklist: configure environment secrets, use HTTPS, restrict database access, implement audit logging and backups, and obtain authorized FinnSys integration details before handling real investor data.</div></div>;
}
