import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";

const portalContent = {
  admin: {
    title: "Admin Dashboard",
    eyebrow: "ADMINISTRATION",
    description: "Manage client-service workflows and review portal activity.",
    cards: [
      ["Investor management", "Search and review client accounts. The investor-management API still needs to be connected."],
      ["Portfolio data", "View portfolio information after an approved FinnSys integration is configured."],
      ["Client support", "Prepare a workflow for client requests and account assistance."],
    ],
  },
  owner: {
    title: "Owner Dashboard",
    eyebrow: "OWNER CONTROL CENTER",
    description: "Owner-level access for system administration and administrator oversight.",
    cards: [
      ["Administrator access", "Plan and manage administrator accounts through a future owner-only workflow."],
      ["System settings", "Review portal configuration and security settings."],
      ["Audit and access", "Prepare access reviews and administrative activity monitoring."],
    ],
  },
};

export default function RoleDashboard({ role }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [creating, setCreating] = useState(false);
  const [adminForm, setAdminForm] = useState({ fullName: "", email: "", password: "", dob: "", mobile: "" });
  const content = portalContent[role];

  useEffect(() => {
    let active = true;
    axios.get(`${API_BASE}/auth/me`, { withCredentials: true })
      .then(({ data }) => {
        if (!active) return;
        if (data.user?.role !== role) {
          navigate("/login", { replace: true });
          return;
        }
        setUser(data.user);
      })
      .catch(() => {
        if (active) navigate("/login", { replace: true });
      })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, [navigate, role]);

  const updateAdminForm = (event) => setAdminForm((current) => ({ ...current, [event.target.name]: event.target.value }));

  const createAdmin = async (event) => {
    event.preventDefault();
    setError("");
    setNotice("");
    setCreating(true);
    try {
      const { data } = await axios.post(`${API_BASE}/admin/admins`, adminForm, { withCredentials: true });
      setNotice(data.message || "Administrator account created.");
      setAdminForm({ fullName: "", email: "", password: "", dob: "", mobile: "" });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Could not create administrator account.");
    } finally {
      setCreating(false);
    }
  };

  const logout = async () => {
    try {
      await axios.post(`${API_BASE}/auth/logout`, {}, { withCredentials: true });
    } finally {
      navigate("/login", { replace: true });
    }
  };

  if (loading) return <main style={styles.state}>Checking your secure session…</main>;
  if (!user) return <main style={styles.state}>{error || "Redirecting to sign in…"}</main>;

  return (
    <main style={styles.page}>
      <style>{` .lsp-admin-form input { width: 100%; box-sizing: border-box; padding: 11px 12px; border: 1px solid #dbe4ef; border-radius: 9px; font: inherit; color: #172b4d; } `}</style>
      <header style={styles.header}>
        <a href="/" style={styles.brand}><span style={styles.mark}>L</span><span>LAKSHYA SPARSH<small style={styles.brandSmall}>FINANCIAL SERVICES</small></span></a>
        <button onClick={logout} style={styles.logout}>Sign out ↗</button>
      </header>
      <section style={styles.hero}>
        <span style={styles.eyebrow}>{content.eyebrow}</span>
        <h1 style={styles.title}>{content.title}</h1>
        <p style={styles.subtitle}>Welcome, {user.fullName}. {content.description}</p>
        <div style={styles.notice}><strong>Development preview</strong><span>This portal is a protected UI preview. Management actions and live FinnSys data are not connected yet.</span></div>
      </section>
      {role === "owner" && (
        <section style={styles.adminCreate}>
          <h2 style={{ marginTop: 0 }}>Create administrator account</h2>
          <p style={styles.cardText}>Only an authenticated owner can create an admin. The new account cannot access the owner portal.</p>
          {notice && <p role="status" style={styles.success}>{notice}</p>}
          {error && <p role="alert" style={styles.error}>{error}</p>}
          <form className="lsp-admin-form" onSubmit={createAdmin} style={styles.formGrid}>
            <label style={styles.field}>Full name<input name="fullName" value={adminForm.fullName} onChange={updateAdminForm} autoComplete="name" required /></label>
            <label style={styles.field}>Email<input name="email" type="email" value={adminForm.email} onChange={updateAdminForm} autoComplete="email" required /></label>
            <label style={styles.field}>Temporary password<input name="password" type="password" value={adminForm.password} onChange={updateAdminForm} minLength={8} autoComplete="new-password" required /></label>
            <label style={styles.field}>Date of birth<input name="dob" type="date" value={adminForm.dob} onChange={updateAdminForm} max={new Date().toISOString().slice(0, 10)} required /></label>
            <label style={styles.field}>Mobile number<input name="mobile" inputMode="numeric" pattern="[6-9][0-9]{9}" maxLength={10} value={adminForm.mobile} onChange={updateAdminForm} placeholder="10-digit Indian mobile" required /></label>
            <button type="submit" disabled={creating} style={styles.createButton}>{creating ? "Creating…" : "Create admin account"}</button>
          </form>
        </section>
      )}
      <section style={styles.grid}>
        {content.cards.map(([title, description], index) => (
          <article key={title} style={styles.card}>
            <span style={styles.cardNumber}>0{index + 1}</span>
            <h2 style={styles.cardTitle}>{title}</h2>
            <p style={styles.cardText}>{description}</p>
            <span style={styles.cardFoot}>Setup pending <span aria-hidden="true">→</span></span>
          </article>
        ))}
      </section>
      <footer style={styles.footer}>© {new Date().getFullYear()} Lakshya Sparsh Financial Services</footer>
    </main>
  );
}

const styles = {
  page: { minHeight: "100vh", padding: "26px clamp(18px, 5vw, 72px)", background: "#f5f8fc", color: "#172b4d", fontFamily: 'Inter, "Segoe UI", Arial, sans-serif' },
  header: { maxWidth: 1180, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 20 },
  brand: { display: "flex", alignItems: "center", gap: 12, textDecoration: "none", color: "#172b4d", fontWeight: 800, letterSpacing: 1, fontSize: 13 },
  mark: { display: "grid", placeItems: "center", width: 42, height: 42, borderRadius: 13, color: "white", background: "#3478e5", fontSize: 22 },
  brandSmall: { display: "block", marginTop: 3, fontSize: 9, letterSpacing: 2, color: "#758198" },
  logout: { padding: "10px 15px", border: "1px solid #dbe4ef", borderRadius: 10, background: "white", color: "#34445d", cursor: "pointer", fontWeight: 700 },
  hero: { maxWidth: 1180, margin: "64px auto 30px" },
  eyebrow: { color: "#3478e5", fontWeight: 800, letterSpacing: 2, fontSize: 11 },
  title: { margin: "12px 0", fontSize: "clamp(30px, 4vw, 44px)", letterSpacing: -1.5 },
  subtitle: { color: "#758198", lineHeight: 1.7, maxWidth: 700 },
  notice: { display: "flex", flexWrap: "wrap", gap: 8, marginTop: 24, padding: 15, border: "1px solid #cfe2ff", borderRadius: 12, background: "#edf5ff", color: "#315b91", fontSize: 13 },
  adminCreate: { maxWidth: 1180, margin: "0 auto 24px", padding: 24, border: "1px solid #e4eaf2", borderRadius: 18, background: "white", boxShadow: "0 12px 35px #203a5b08" },
  formGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 230px), 1fr))", gap: 16, alignItems: "end" },
  field: { display: "grid", gap: 7, color: "#34445d", fontSize: 13, fontWeight: 700 },
  input: { width: "100%" },
  createButton: { padding: "12px 16px", border: 0, borderRadius: 10, background: "#3478e5", color: "white", cursor: "pointer", fontWeight: 800, minHeight: 42 },
  success: { padding: 12, background: "#eaf8f0", color: "#17683a", borderRadius: 8 },
  error: { padding: 12, background: "#fff0f0", color: "#9b2424", borderRadius: 8 },
  grid: { maxWidth: 1180, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))", gap: 18 },
  card: { padding: 24, minHeight: 220, border: "1px solid #e4eaf2", borderRadius: 18, background: "white", boxShadow: "0 12px 35px #203a5b08" },
  cardNumber: { color: "#458ff0", fontWeight: 800, fontSize: 12 },
  cardTitle: { margin: "18px 0 8px", fontSize: 19 },
  cardText: { color: "#758198", fontSize: 13, lineHeight: 1.7 },
  cardFoot: { display: "flex", justifyContent: "space-between", marginTop: 24, color: "#3478e5", fontSize: 12, fontWeight: 800 },
  footer: { maxWidth: 1180, margin: "44px auto 0", color: "#8793a5", fontSize: 12 },
  state: { minHeight: "100vh", display: "grid", placeItems: "center", color: "#53647b", fontFamily: "Arial, sans-serif" },
};
