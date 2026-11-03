import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ClientDashboard.css";
import TransactionRequestPage from "./TransactionRequestPage";
import InvestmentTargetsPage from "./InvestmentTargetsPage";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const money = (value) => new Intl.NumberFormat("en-IN", {
  style: "currency", currency: "INR", maximumFractionDigits: 0,
}).format(Number(value || 0));
const compactMoney = (value) => {
  if (value >= 100000) return `₹${(value / 100000).toFixed(2)}L`;
  if (value >= 1000) return `₹${(value / 1000).toFixed(1)}K`;
  return money(value);
};
const dateLabel = (value) => new Date(value).toLocaleDateString("en-IN", {
  day: "2-digit", month: "short", year: "numeric",
});

const menuItems = [
  { id: "home", label: "Home", icon: "⌂" },
  { id: "risk", label: "Risk Suitability", icon: "◈" },
  { id: "goals", label: "Investment Targets", icon: "◎" },
  { id: "transact", label: "Transact Online", icon: "⇄" },
  { id: "portfolio", label: "My Portfolio", icon: "▥" },
  { id: "tax", label: "My Tax Report", icon: "▤" },
  { id: "products", label: "Add Products", icon: "+" },
  { id: "account", label: "My Account", icon: "♙" },
  { id: "contact", label: "Contact Us", icon: "✉" },
];

function ClientDashboard() {
  const navigate = useNavigate();
  const [activePage, setActivePage] = useState("home");
  const [user, setUser] = useState(null);
  const [portfolio, setPortfolio] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [showAlerts, setShowAlerts] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const loadDashboard = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [meResponse, portfolioResponse] = await Promise.all([
        axios.get(`${API_BASE}/auth/me`, { withCredentials: true }),
        axios.get(`${API_BASE}/investments/me`, { withCredentials: true }),
      ]);
      setUser(meResponse.data.user);
      setPortfolio(portfolioResponse.data.portfolio);
    } catch (requestError) {
      if ([401, 403].includes(requestError.response?.status)) {
        navigate("/login", { replace: true });
        return;
      }
      setError(requestError.response?.data?.message || "Could not connect to the Lakshya Sparsh server. Start the backend and try again.");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => { loadDashboard(); }, [loadDashboard]);

  const filteredHoldings = useMemo(() => {
    const holdings = portfolio?.holdings || [];
    const term = search.trim().toLowerCase();
    if (!term) return holdings;
    return holdings.filter((item) => `${item.name} ${item.category} ${item.id}`.toLowerCase().includes(term));
  }, [portfolio, search]);

  const logout = async () => {
    setLogoutLoading(true);
    try {
      await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true });
      navigate("/login", { replace: true });
    } catch {
      setError("Could not sign out cleanly. Please check the server connection and try again.");
    } finally {
      setLogoutLoading(false);
    }
  };

  const choosePage = (id) => {
    setActivePage(id);
    setShowMobileMenu(false);
  };

  if (loading) return <main className="ls-dashboard-state"><div className="ls-loader" /><h2>Preparing your portfolio</h2><p>Securely checking your client session…</p></main>;
  if (error && !portfolio) return <main className="ls-dashboard-state"><div className="ls-state-icon">!</div><h2>Dashboard unavailable</h2><p>{error}</p><button className="ls-btn ls-btn-primary" onClick={loadDashboard}>Try again</button><button className="ls-btn ls-btn-quiet" onClick={() => navigate("/login")}>Back to login</button></main>;

  const summary = portfolio?.summary || {};
  const gainPositive = Number(summary.totalGain) >= 0;
  const currentPage = menuItems.find((item) => item.id === activePage)?.label || "Home";

  return (
    <div className="ls-client-app">
      <aside className={`ls-sidebar ${showMobileMenu ? "is-open" : ""}`}>
        <a className="ls-dashboard-brand" href="/" aria-label="Lakshya Sparsh home">
          <img src="/media/images/main-logo.png" alt="Lakshya Sparsh Financial Services" onError={(event) => { event.currentTarget.style.display = "none"; }} />
          <span className="ls-brand-fallback">LAKSHYA SPARSH<small>FINANCIAL SERVICES</small></span>
        </a>
        <div className="ls-sidebar-caption">CLIENT PORTAL</div>
        <nav className="ls-client-nav" aria-label="Client dashboard navigation">
          {menuItems.map((item) => (
            <button key={item.id} className={`ls-nav-item ${activePage === item.id ? "active" : ""}`} onClick={() => choosePage(item.id)}>
              <span className="ls-nav-icon">{item.icon}</span><span>{item.label}</span>
              {activePage === item.id && <span className="ls-nav-active-mark" />}
            </button>
          ))}
        </nav>
        <div className="ls-sidebar-bottom">
          <div className="ls-support-card"><span className="ls-support-symbol">✦</span><strong>Need a hand?</strong><p>Our team is here to help with your financial journey.</p><button onClick={() => choosePage("contact")}>Contact support <span>↗</span></button></div>
          <button className="ls-nav-item ls-signout" onClick={logout} disabled={logoutLoading}><span className="ls-nav-icon">↪</span><span>{logoutLoading ? "Signing out…" : "Sign Out"}</span></button>
          <div className="ls-sidebar-footnote">© {new Date().getFullYear()} Lakshya Sparsh</div>
        </div>
      </aside>

      {showMobileMenu && <button className="ls-mobile-scrim" aria-label="Close navigation" onClick={() => setShowMobileMenu(false)} />}

      <main className="ls-client-main">
        <header className="ls-topbar">
          <button className="ls-mobile-menu-button" onClick={() => setShowMobileMenu((value) => !value)} aria-label="Toggle menu">☰</button>
          <div className="ls-breadcrumb"><span>Client Portal</span><span className="ls-breadcrumb-separator">/</span><strong>{currentPage}</strong></div>
          <div className="ls-topbar-actions">
            <button className="ls-topbar-icon" onClick={() => choosePage("transact")} aria-label="Transaction cart" title="Transaction cart">♧<span className="ls-cart-count">+</span></button>
            <div className="ls-alert-wrap"><button className={`ls-topbar-icon ${showAlerts ? "is-active" : ""}`} onClick={() => setShowAlerts((value) => !value)} aria-label="Notifications" title="Notifications">♧<span className="ls-notification-dot" /></button>
              {showAlerts && <div className="ls-alert-popover"><div className="ls-popover-heading"><strong>Alerts & reminders</strong><span>{portfolio?.alerts?.length || 0}</span></div>{(portfolio?.alerts || []).map((alert) => <div className="ls-alert-item" key={alert.id}><span className="ls-alert-bullet" /><div><strong>{alert.title}</strong><p>{alert.description}</p><small>{alert.date}</small></div></div>)}<button className="ls-view-all-alerts" onClick={() => { setShowAlerts(false); choosePage("risk"); }}>Review your profile</button></div>}
            </div>
            <div className="ls-topbar-divider" />
            <button className="ls-user-menu" onClick={() => choosePage("account")}><span className="ls-avatar">{(user?.fullName || "C").trim().charAt(0).toUpperCase()}</span><span className="ls-user-copy"><strong>{user?.fullName || "Client"}</strong><small>Investor account</small></span><span className="ls-chevron">⌄</span></button>
          </div>
        </header>

        <div className="ls-page-content">
          <div className="ls-page-heading"><div><div className="ls-greeting">YOUR FINANCIAL JOURNEY</div><h1>{activePage === "home" ? `Welcome back${user?.fullName ? `, ${user.fullName.split(" ")[0]}` : ""}` : currentPage}</h1><p>{activePage === "home" ? "Here’s a snapshot of your investments and financial progress." : pageDescription(activePage)}</p></div><div className="ls-heading-date"><span className="ls-date-icon">▦</span><div><small>Today</small><strong>{dateLabel(new Date())}</strong></div></div></div>

          {error && <div className="ls-inline-error" role="alert">{error}</div>}
          {portfolio?.demo && <div className="ls-demo-banner"><span className="ls-demo-badge">DEMO DATA</span><span>This is sample portfolio information for development only. It is not your actual investment statement.</span></div>}

          {activePage === "home" && <HomePage portfolio={portfolio} summary={summary} onNavigate={choosePage} />}
          {activePage === "portfolio" && <PortfolioPage holdings={filteredHoldings} search={search} setSearch={setSearch} />}
          {activePage === "transact" && <TransactionRequestPage />}
          {activePage === "risk" && <InvestmentTargetsPage />}
          {activePage === "goals" && <InvestmentTargetsPage />}
          {activePage === "tax" && <InfoPage icon="▤" title="My tax report" description="Tax statements and capital gains reports will appear here when verified investment records are connected." items={["Capital gains statement", "ELSS investment summary", "Financial year: 2026–27"]} action="Request tax assistance" />}
          {activePage === "products" && <InfoPage icon="+" title="Explore investment products" description="Use this area to explore available investment categories. Transactions are not enabled in this demo portal." items={["Mutual funds", "Fixed deposits and bonds", "Systematic Investment Plans (SIP)"]} action="Contact an advisor" />}
          {activePage === "account" && <AccountPage user={user} />}
          {activePage === "contact" && <ContactPage />}

          <footer className="ls-dashboard-footer"><span>© {new Date().getFullYear()} Lakshya Sparsh Financial Services</span><span>Secure client portal <i /> Demo environment</span></footer>
        </div>
      </main>
    </div>
  );
}

function pageDescription(page) {
  const descriptions = {
    risk: "Check whether your investment targets align with your selected risk profile.", goals: "Create, review and check the suitability of your investment targets.", transact: "Create a service request for advisor-assisted offline processing.", portfolio: "Review your holdings and their current demo values.", tax: "Find your tax-related investment summaries.", products: "Explore investment options and product categories.", account: "Review your registered account details.", contact: "Get help with your Lakshya Sparsh account.",
  };
  return descriptions[page] || "Manage your financial journey with Lakshya Sparsh.";
}

function HomePage({ portfolio, summary, onNavigate }) {
  const allocation = portfolio?.allocation || [];
  const donut = allocation.reduce((total, item) => total + item.value, 0) ? `conic-gradient(${allocation.map((item, index) => { const start = allocation.slice(0, index).reduce((total, entry) => total + entry.value, 0); return `${item.color} ${start}% ${start + item.value}%`; }).join(", ")})` : "#e9eef5";
  const metrics = [
    { label: "Total invested", value: money(summary.investedAmount), icon: "↗", tone: "blue", foot: "Amount invested" },
    { label: "Current portfolio value", value: money(summary.currentValue), icon: "◈", tone: "purple", foot: "Latest demo valuation" },
    { label: "Total gain / loss", value: `${summary.totalGain >= 0 ? "+" : "−"}${money(Math.abs(summary.totalGain))}`, icon: summary.totalGain >= 0 ? "↗" : "↘", tone: summary.totalGain >= 0 ? "green" : "red", foot: `${summary.gainPercent >= 0 ? "+" : ""}${Number(summary.gainPercent || 0).toFixed(2)}% overall` },
    { label: "Active SIPs", value: summary.activeSips ?? 0, icon: "◷", tone: "orange", foot: "Demo monthly plans" },
  ];
  return <>
    <section className="ls-metric-grid">{metrics.map((metric) => <article className="ls-metric-card" key={metric.label}><div className="ls-metric-top"><span>{metric.label}</span><span className={`ls-metric-icon ${metric.tone}`}>{metric.icon}</span></div><strong className="ls-metric-value">{metric.value}</strong><div className="ls-metric-foot"><span className={metric.tone === "green" ? "ls-positive" : ""}>{metric.foot}</span></div></article>)}</section>
    <section className="ls-overview-grid">
      <article className="ls-panel ls-performance-panel"><div className="ls-panel-header"><div><h2>Portfolio performance</h2><p>Your investment value at a glance</p></div><span className="ls-period-pill">Illustrative</span></div><div className="ls-performance-total"><strong>{money(summary.currentValue)}</strong><span className="ls-positive">↗ {Number(summary.gainPercent || 0).toFixed(2)}%</span></div><div className="ls-chart-wrap"><svg viewBox="0 0 700 190" role="img" aria-label="Illustrative portfolio performance chart" preserveAspectRatio="none"><defs><linearGradient id="lsChartFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#458ff0" stopOpacity=".22"/><stop offset="100%" stopColor="#458ff0" stopOpacity="0"/></linearGradient></defs>{[24,66,108,150].map((y) => <line key={y} x1="0" y1={y} x2="700" y2={y} stroke="#edf1f7" strokeDasharray="4 5"/>)}<path d="M0 150 C40 142 45 122 80 130 S135 109 170 120 S220 91 260 105 S320 82 360 90 S410 61 455 75 S510 51 550 60 S610 28 650 43 S680 20 700 25 L700 190 L0 190Z" fill="url(#lsChartFill)"/><path d="M0 150 C40 142 45 122 80 130 S135 109 170 120 S220 91 260 105 S320 82 360 90 S410 61 455 75 S510 51 550 60 S610 28 650 43 S680 20 700 25" fill="none" stroke="#458ff0" strokeWidth="3" strokeLinecap="round"/></svg><div className="ls-chart-labels"><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span></div></div><div className="ls-chart-note"><span><i className="ls-legend-dot"/> Illustrative trend</span><span>Past 6 months</span></div></article>
      <article className="ls-panel ls-allocation-panel"><div className="ls-panel-header"><div><h2>Asset allocation</h2><p>How your demo portfolio is distributed</p></div><button className="ls-text-button" onClick={() => onNavigate("portfolio")}>Details ↗</button></div><div className="ls-donut-layout"><div className="ls-donut" style={{ background: donut }}><div className="ls-donut-hole"><small>Portfolio</small><strong>{compactMoney(summary.currentValue)}</strong></div></div><div className="ls-allocation-legend">{allocation.map((item) => <div className="ls-allocation-row" key={item.name}><span className="ls-allocation-name"><i style={{ background: item.color }} />{item.name}</span><strong>{item.value}%</strong></div>)}</div></div><div className="ls-allocation-total"><span>Current value</span><strong>{money(summary.currentValue)}</strong></div></article>
    </section>
    <section className="ls-bottom-grid"><article className="ls-panel ls-holdings-panel"><div className="ls-panel-header"><div><h2>Top holdings</h2><p>Your largest demo investments</p></div><button className="ls-text-button" onClick={() => onNavigate("portfolio")}>View portfolio ↗</button></div><div className="ls-table-scroll"><table className="ls-data-table"><thead><tr><th>Investment</th><th>Invested</th><th>Current value</th><th>Returns</th></tr></thead><tbody>{(portfolio?.holdings || []).slice(0, 4).map((holding) => <tr key={holding.id}><td><div className="ls-fund-cell"><span className="ls-fund-icon">{holding.category.charAt(0)}</span><span><strong>{holding.name}</strong><small>{holding.category}</small></span></div></td><td>{money(holding.invested)}</td><td>{money(holding.current)}</td><td><span className="ls-return-pill">+{holding.gainPercent}%</span></td></tr>)}</tbody></table></div></article><article className="ls-panel ls-quick-actions"><div className="ls-panel-header"><div><h2>Quick actions</h2><p>Commonly used services</p></div></div><button className="ls-action-row" onClick={() => onNavigate("goals")}><span className="ls-action-icon action-blue">◎</span><span><strong>Create financial plan</strong><small>Plan for what matters</small></span><b>›</b></button><button className="ls-action-row" onClick={() => onNavigate("risk")}><span className="ls-action-icon action-red">♧</span><span><strong>Alerts & reminders</strong><small>Review your profile</small></span><b>›</b></button><button className="ls-action-row" onClick={() => onNavigate("transact")}><span className="ls-action-icon action-orange">⇄</span><span><strong>Investment service requests</strong><small>Request advisor assistance</small></span><b>›</b></button><button className="ls-action-row" onClick={() => onNavigate("products")}><span className="ls-action-icon action-green">▤</span><span><strong>Explore products</strong><small>Browse investment categories</small></span><b>›</b></button></article></section>
    <section className="ls-disclaimer"><strong>Important / Disclaimer:</strong> The portfolio figures and chart shown here are illustrative demo data for development. They are not actual account balances, investment advice, or a transaction instruction. Actual valuations may vary and should be confirmed against official statements.</section>
  </>;
}

function PortfolioPage({ holdings, search, setSearch }) {
  const totalInvested = holdings.reduce((total, item) => total + item.invested, 0);
  const totalCurrent = holdings.reduce((total, item) => total + item.current, 0);
  return <><section className="ls-mini-summary"><div><span>Shown investments</span><strong>{holdings.length}</strong></div><div><span>Invested in results</span><strong>{money(totalInvested)}</strong></div><div><span>Current value in results</span><strong>{money(totalCurrent)}</strong></div></section><section className="ls-panel ls-full-panel"><div className="ls-panel-header ls-portfolio-tools"><div><h2>My investments</h2><p>Review your demo holdings and returns</p></div><label className="ls-search-field"><span>⌕</span><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search investments…" aria-label="Search investments" /></label></div><div className="ls-table-scroll"><table className="ls-data-table ls-portfolio-table"><thead><tr><th>Investment / Folio</th><th>Units</th><th>Invested amount</th><th>Current value</th><th>Gain / loss</th><th>Returns</th></tr></thead><tbody>{holdings.map((holding) => <tr key={holding.id}><td><div className="ls-fund-cell"><span className="ls-fund-icon">{holding.category.charAt(0)}</span><span><strong>{holding.name}</strong><small>{holding.id} · {holding.category}</small></span></div></td><td>{holding.units.toLocaleString("en-IN")}</td><td>{money(holding.invested)}</td><td><strong>{money(holding.current)}</strong></td><td className="ls-positive">+{money(holding.gain)}</td><td><span className="ls-return-pill">+{holding.gainPercent}%</span></td></tr>)}</tbody></table>{holdings.length === 0 && <div className="ls-empty-state">No investments match “{search}”. Try another search.</div>}</div></section><p className="ls-page-note">Demo holdings only. Values and returns are not linked to FinnSys or a live mutual fund platform.</p></>;
}

function TransactionsPage({ transactions }) {
  return <section className="ls-panel ls-full-panel"><div className="ls-panel-header"><div><h2>Recent transactions</h2><p>Review your sample investment activity</p></div><span className="ls-period-pill">{transactions.length} records</span></div><div className="ls-table-scroll"><table className="ls-data-table"><thead><tr><th>Transaction ID</th><th>Date</th><th>Investment</th><th>Type</th><th>Amount</th><th>Status</th></tr></thead><tbody>{transactions.map((transaction) => <tr key={transaction.id}><td><strong>{transaction.id}</strong></td><td>{dateLabel(transaction.date)}</td><td>{transaction.fund}</td><td>{transaction.type}</td><td><strong>{money(transaction.amount)}</strong></td><td><span className="ls-status-pill">{transaction.status}</span></td></tr>)}</tbody></table></div><p className="ls-table-footnote">This is sample activity for the UI only. No real transaction can be placed from this screen.</p></section>;
}

function InfoPage({ icon, title, description, items, action }) {
  return <section className="ls-panel ls-info-panel"><div className="ls-info-illustration">{icon}</div><div className="ls-info-copy"><span className="ls-section-eyebrow">LAKSHYA SPARSH SERVICES</span><h2>{title}</h2><p>{description}</p><div className="ls-info-list">{items.map((item) => <div key={item}><span>✓</span>{item}</div>)}</div><button className="ls-btn ls-btn-primary" onClick={() => window.alert("This demo action is not connected yet. Contact your Lakshya Sparsh advisor for assistance.")}>{action} <span>→</span></button><small className="ls-info-caption">This section is a UI preview and is not connected to live financial services.</small></div></section>;
}

function AccountPage({ user }) {
  return <section className="ls-panel ls-account-panel"><div className="ls-account-profile"><span className="ls-account-avatar">{(user?.fullName || "C").charAt(0).toUpperCase()}</span><div><h2>{user?.fullName || "Client"}</h2><p>Registered client account</p><span className="ls-status-pill">Account signed in</span></div></div><div className="ls-account-fields"><div><span>Full name</span><strong>{user?.fullName || "Not available"}</strong></div><div><span>Email address</span><strong>{user?.email || "Not available"}</strong></div><div><span>Mobile number</span><strong>{user?.mobile || "Not available"}</strong></div><div><span>Account type</span><strong>Client / Investor</strong></div></div><p className="ls-page-note">For changes to personal details, contact Lakshya Sparsh support. Profile editing is not enabled in this demo.</p></section>;
}

function ContactPage() {
  return <section className="ls-panel ls-contact-panel"><div className="ls-contact-icon">✉</div><h2>We're here to help</h2><p>For account assistance, investment statements, or help with your portfolio, please contact your Lakshya Sparsh representative.</p><div className="ls-contact-options"><a href="https://lakshyasparsh.com/" target="_blank" rel="noreferrer"><span>⌂</span><div><strong>Visit our website</strong><small>lakshyasparsh.com</small></div><b>↗</b></a></div><small>Never share your password with anyone claiming to provide support.</small></section>;
}

export default ClientDashboard;
