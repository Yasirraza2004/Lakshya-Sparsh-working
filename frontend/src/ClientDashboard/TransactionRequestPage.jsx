import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./TransactionRequestPage.css";

const API = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const actions = ["Buy Lump Sum", "Buy SIP", "Sell", "Switch"];
const schemes = [
  { house: "HDFC Mutual Fund", name: "HDFC Flexi Cap Fund" },
  { house: "ICICI Prudential Mutual Fund", name: "ICICI Prudential Bluechip Fund" },
  { house: "SBI Mutual Fund", name: "SBI Contra Fund" },
  { house: "Nippon India Mutual Fund", name: "Nippon India Small Cap Fund" },
  { house: "UTI Mutual Fund", name: "UTI Nifty 50 Index Fund" },
  { house: "Axis Mutual Fund", name: "Axis ELSS Tax Saver Fund" },
];
const existingSchemes = ["Select an existing scheme", "HDFC Flexi Cap Fund · Folio 1020/45", "SBI Bluechip Fund · Folio 2081/19", "ICICI Prudential Value Discovery · Folio 3110/07"];
const rupees = (value) => `₹${Number(value || 0).toLocaleString("en-IN")}`;

export default function TransactionRequestPage() {
  const [tab, setTab] = useState(actions[0]);
  const [source, setSource] = useState("new");
  const [house, setHouse] = useState(schemes[0].house);
  const [scheme, setScheme] = useState(schemes[0].name);
  const [folio, setFolio] = useState("New investment");
  const [amount, setAmount] = useState(5000);
  const [frequency, setFrequency] = useState("Monthly");
  const [cart, setCart] = useState([]);
  const [requests, setRequests] = useState([]);
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    axios.get(`${API}/investments/transaction-requests`, { withCredentials: true })
      .then(({ data }) => setRequests(data.requests || []))
      .catch((e) => setError(e.response?.data?.message || "Could not load your request history."))
      .finally(() => setLoading(false));
  }, []);

  const total = useMemo(() => cart.reduce((sum, item) => sum + Number(item.amount || 0), 0), [cart]);
  const addToCart = () => {
    setError(""); setMessage("");
    if (!scheme.trim() || !Number.isFinite(Number(amount)) || Number(amount) < 0 || (tab !== "Switch" && Number(amount) <= 0)) {
      setError("Enter a valid scheme and amount before adding it to your request cart."); return;
    }
    setCart((items) => [...items, { id: `${Date.now()}-${Math.random()}`, action: tab, scheme, folio, amount: Number(amount), frequency: tab === "Buy SIP" ? frequency : "" }]);
    setMessage("Added to your request cart. This is not an executed transaction.");
  };
  const submitRequest = async () => {
    setSaving(true); setError(""); setMessage("");
    try {
      const { data } = await axios.post(`${API}/investments/transaction-requests`, { items: cart, note }, { withCredentials: true });
      setRequests((items) => [data.request, ...items]); setCart([]); setNote(""); setShowReview(false);
      setMessage(`Request ${data.request.requestNumber} submitted. Our team will contact you; no transaction has been executed.`);
    } catch (e) { setError(e.response?.data?.message || "Unable to submit your request. Please try again."); }
    finally { setSaving(false); }
  };

  return <div className="ls-trade-page">
    <div className="ls-trade-intro"><div><span className="ls-trade-eyebrow">INVESTMENT SERVICE REQUESTS</span><h2>My Transaction Cart</h2><p>Select the investment service you need and send a request to our team for offline processing.</p></div><div className="ls-trade-cart-total"><span>Items in cart</span><strong>{cart.length}</strong><small>Request value: {rupees(total)}</small></div></div>
    <div className="ls-trade-notice"><strong>Important:</strong> This portal does not execute online transactions or collect payments. Your submission is only a service request. Lakshya Sparsh will verify the details and contact you to complete any process offline.</div>
    {message && <div className="ls-trade-success" role="status">{message}</div>}{error && <div className="ls-trade-error" role="alert">{error}</div>}
    <section className="ls-trade-panel"><div className="ls-trade-tabs" role="tablist" aria-label="Transaction request type">{actions.map((action) => <button key={action} type="button" role="tab" aria-selected={tab === action} className={tab === action ? "active" : ""} onClick={() => setTab(action)}>{action}</button>)}</div>
      <div className="ls-trade-form-wrap"><div className="ls-trade-form-heading"><span className="ls-trade-step">01</span><div><h3>{tab}</h3><p>Choose where the investment details should come from.</p></div></div>
        <div className="ls-trade-source"><label><input type="radio" checked={source === "new"} onChange={() => { setSource("new"); setFolio("New investment"); }} /> Add from new schemes</label><label><input type="radio" checked={source === "existing"} onChange={() => { setSource("existing"); setFolio(existingSchemes[1]); setScheme("HDFC Flexi Cap Fund"); }} /> Add from existing schemes</label></div>
        {source === "new" ? <div className="ls-trade-fields"><label>Mutual fund company<select value={house} onChange={(e) => { setHouse(e.target.value); setScheme(schemes.find((s) => s.house === e.target.value)?.name || ""); }}><option value="">Select fund house</option>{[...new Set(schemes.map((s) => s.house))].map((h) => <option key={h}>{h}</option>)}</select></label><label className="ls-trade-wide">Select product / scheme<select value={scheme} onChange={(e) => setScheme(e.target.value)}>{schemes.filter((s) => s.house === house).map((s) => <option key={s.name}>{s.name}</option>)}</select></label><label>Folio<select value={folio} onChange={(e) => setFolio(e.target.value)}><option>New investment</option><option>New folio requested</option></select></label></div> : <div className="ls-trade-fields"><label className="ls-trade-wide">Existing investment<select value={folio} onChange={(e) => { setFolio(e.target.value); setScheme(e.target.value.split(" · ")[0]); }}>{existingSchemes.slice(1).map((s) => <option key={s}>{s}</option>)}</select></label></div>}
        <div className="ls-trade-fields ls-trade-amount-row"><label>{tab === "Sell" ? "Amount to redeem (₹)" : tab === "Switch" ? "Approximate amount (₹)" : "Investment amount (₹)"}<input type="number" min="0" step="500" value={amount} onChange={(e) => setAmount(e.target.value)} /></label>{tab === "Buy SIP" && <label>SIP frequency<select value={frequency} onChange={(e) => setFrequency(e.target.value)}><option>Monthly</option><option>Weekly</option><option>Quarterly</option></select></label>}<div className="ls-trade-add-wrap"><button className="ls-trade-add" type="button" onClick={addToCart}>＋ Add to Cart</button></div></div>
        <p className="ls-trade-catalog-note">Sample scheme names are for interface demonstration only. Confirm current product availability and suitability with your advisor.</p>
      </div>
    </section>
    <section className="ls-trade-panel ls-trade-cart-panel"><div className="ls-trade-section-title"><div><h3>My Transaction Cart</h3><p>Review the items you want our team to assist with.</p></div><span>{cart.length} item(s)</span></div>
      {cart.length ? <><div className="ls-trade-table-wrap"><table className="ls-trade-table"><thead><tr><th>Request type</th><th>Scheme</th><th>Folio</th><th>Amount</th><th /></tr></thead><tbody>{cart.map((item) => <tr key={item.id}><td>{item.action}{item.frequency && <small>{item.frequency}</small>}</td><td>{item.scheme}</td><td>{item.folio}</td><td>{rupees(item.amount)}</td><td><button className="ls-trade-remove" onClick={() => setCart((items) => items.filter((x) => x.id !== item.id))}>Remove</button></td></tr>)}</tbody></table></div><div className="ls-trade-cart-footer"><span>Indicative request total <strong>{rupees(total)}</strong></span><button className="ls-trade-proceed" onClick={() => setShowReview(true)}>Review & Submit Request →</button></div></> : <div className="ls-trade-empty"><span>▤</span><strong>Your request cart is empty</strong><p>Select a service and add a scheme above to get started.</p></div>}
    </section>
    <section className="ls-trade-panel"><div className="ls-trade-section-title"><div><h3>Previous service requests</h3><p>Track requests submitted to Lakshya Sparsh.</p></div></div>{loading ? <p className="ls-trade-muted">Loading requests…</p> : requests.length ? <div className="ls-trade-requests">{requests.map((request) => <article key={request._id}><div><strong>{request.requestNumber}</strong><small>{new Date(request.createdAt).toLocaleString("en-IN")}</small></div><span className="ls-trade-status">{request.status}</span><strong>{request.items?.length || 0} item(s)</strong></article>)}</div> : <div className="ls-trade-empty compact">No previous requests yet.</div>}</section>
    {showReview && <div className="ls-trade-modal-backdrop" role="presentation"><section className="ls-trade-modal" role="dialog" aria-modal="true" aria-labelledby="ls-trade-review-title"><button className="ls-trade-modal-close" onClick={() => setShowReview(false)} aria-label="Close">×</button><span className="ls-trade-eyebrow">FINAL REVIEW</span><h3 id="ls-trade-review-title">Submit service request</h3><p>Our team will review these details and contact you. This does not place a trade or transfer money.</p><div className="ls-trade-review-list">{cart.map((item) => <div key={item.id}><span>{item.action} · {item.scheme}</span><strong>{rupees(item.amount)}</strong></div>)}</div><label className="ls-trade-note-label">Additional instructions (optional)<textarea value={note} onChange={(e) => setNote(e.target.value)} placeholder="Add any details for your advisor…" rows="3" /></label><div className="ls-trade-modal-actions"><button className="ls-trade-cancel" onClick={() => setShowReview(false)}>Back to cart</button><button className="ls-trade-proceed" onClick={submitRequest} disabled={saving}>{saving ? "Submitting…" : "Confirm service request"}</button></div></section></div>}
  </div>;
}
