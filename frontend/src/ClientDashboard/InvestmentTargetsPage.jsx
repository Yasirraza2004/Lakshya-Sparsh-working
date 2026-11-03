import { useCallback, useEffect, useMemo, useState } from "react";
import axios from "axios";
import "./InvestmentTargetsPage.css";

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8080/api";
const PROFILES = [
  "Conservative",
  "Moderate",
  "Balanced",
  "Growth",
  "Aggressive",
];
const PROFILE_INFO = {
  Conservative:
    "Investors willing to accept low returns for high safety of principal amount, or take a small amount of risk for potential returns.",
  Moderate:
    "Investors willing to accept a moderate level of risk for moderate returns.",
  Balanced:
    "Investors seeking a balance between capital preservation and growth, and willing to accept a moderate level of market risk.",
  Growth:
    "Investors willing to accept higher market fluctuations and risk in pursuit of long-term capital growth.",
  Aggressive:
    "Investors willing to take relatively high risk for high returns.",
};
const TYPES = [
  "Child's Education",
  "Child's Marriage",
  "Retirement",
  "Other Targets (Wealth Builder etc)",
];
const money = (n) =>
  new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(
    Number(n || 0),
  );
const lacs = (n) => `${Number(n || 0).toFixed(2)} Lakhs`;
const monthOptions = Array.from({ length: 24 }, (_, i) => {
  const d = new Date();
  d.setDate(1);
  d.setMonth(d.getMonth() + i);
  return `${d.toLocaleString("en-IN", { month: "short" })}-${d.getFullYear()}`;
});
const initial = {
  childCount: "1",
  startMonth: monthOptions[0],
  years: "10",
  childName: "",
  childAge: "",
  cost: "10",
  inflation: "7",
  returns: "12",
  savings: "1",
  retireAge: "60",
  lifeExpectancy: "85",
  monthlyIncome: "50000",
  preRetireReturns: "12",
  postRetireReturns: "8",
  targetCategory: "Car",
  targetTitle: "",
};
const makeMarriageChild = (index = 0) => ({
  childName: "",
  childAge: "",
  years: "10",
  cost: "10",
  inflation: "7",
  returns: "12",
  savings: "1",
  startMonth: monthOptions[0],
  index,
});

export default function InvestmentTargetsPage() {
  const [targets, setTargets] = useState([]);
  const [profiles, setProfiles] = useState({});
  const [step, setStep] = useState("home");
  const [targetType, setTargetType] = useState(TYPES[0]);
  const [form, setForm] = useState(initial);
  const [marriageChildren, setMarriageChildren] = useState([
    makeMarriageChild(0),
  ]);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(null);
  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API_BASE}/investments/targets`, {
        withCredentials: true,
      });
      setTargets(data.targets || []);
      setProfiles(data.profiles || {});
    } catch (e) {
      setError(e.response?.data?.message || "Unable to load targets.");
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => {
    load();
  }, [load]);
  const update = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  const updateMarriageChild = (index, e) =>
    setMarriageChildren((items) =>
      items.map((child, i) =>
        i === index ? { ...child, [e.target.name]: e.target.value } : child,
      ),
    );
  const changeChildCount = (count) => {
    setForm((f) => ({ ...f, childCount: count }));
    setMarriageChildren((items) =>
      Array.from(
        { length: Number(count) },
        (_, i) => items[i] || makeMarriageChild(i),
      ),
    );
  };
  const calc = (f) => {
    const years = Math.max(0, Number(f.years));
    const cost = Number(f.cost) * 100000;
    const savings = Number(f.savings) * 100000;
    const inflation = Number(f.inflation) / 100;
    const returns = Number(f.returns) / 100;
    const futureValue = cost * Math.pow(1 + inflation, years);
    const futureSavings = savings * Math.pow(1 + returns, years);
    const net = Math.max(0, futureValue - futureSavings);
    const r = returns / 12;
    const months = Math.max(1, years * 12);
    const sip = r ? (net * r) / (Math.pow(1 + r, months) - 1) : net / months;
    return {
      years,
      cost,
      savings,
      inflation,
      returns,
      futureValue,
      futureSavings,
      net,
      sip,
      lump: net / Math.pow(1 + returns, years),
    };
  };
  const computed = useMemo(() => calc(form), [form]);
  const openCreate = (type) => {
    setTargetType(type);
    setForm(initial);
    setMarriageChildren([makeMarriageChild(0)]);
    setEditing(null);
    setError("");
    setStep("form");
  };
  const saveTarget = async () => {
    const isMarriage = targetType === TYPES[1];
    const isRetirement = targetType === TYPES[2];
    const children = isMarriage ? marriageChildren : [];
    const required = isMarriage
      ? []
      : isRetirement
        ? [
            "startMonth",
            "retireAge",
            "lifeExpectancy",
            "monthlyIncome",
            "inflation",
            "preRetireReturns",
            "postRetireReturns",
            "savings",
          ]
        : ["startMonth", "years", "cost", "inflation", "returns", "savings"];
    if (targetType === TYPES[0]) required.push("childName", "childAge");
    const missing = required.find(
      (key) => String(form[key] ?? "").trim() === "",
    );
    if (
      missing ||
      (isMarriage &&
        children.some((c) =>
          [
            "childName",
            "childAge",
            "years",
            "cost",
            "inflation",
            "returns",
            "savings",
            "startMonth",
          ].some((k) => String(c[k] ?? "").trim() === ""),
        ))
    ) {
      setError("Please complete all required fields before continuing.");
      return;
    }
    if (
      isMarriage &&
      children.some(
        (c) =>
          Number(c.childAge) < 0 ||
          Number(c.years) < 1 ||
          Number(c.cost) <= 0 ||
          Number(c.inflation) < 0 ||
          Number(c.returns) < 0 ||
          Number(c.savings) < 0,
      )
    ) {
      setError("Please enter valid values for every child.");
      return;
    }
    if (
      isRetirement &&
      (Number(form.retireAge) < 1 ||
        Number(form.lifeExpectancy) <= Number(form.retireAge) ||
        Number(form.monthlyIncome) <= 0 ||
        Number(form.inflation) < 0 ||
        Number(form.preRetireReturns) < 0 ||
        Number(form.postRetireReturns) < 0 ||
        Number(form.savings) < 0)
    ) {
      setError(
        "Please enter valid retirement details. Life expectancy must be greater than retirement age.",
      );
      return;
    }
    if (
      !isMarriage &&
      !isRetirement &&
      (Number(form.years) < 1 ||
        Number(form.cost) <= 0 ||
        Number(form.inflation) < 0 ||
        Number(form.returns) < 0 ||
        Number(form.savings) < 0 ||
        (targetType === TYPES[3] && !form.targetTitle.trim()))
    ) {
      setError("Please enter valid values in all required fields.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      const records = isMarriage ? children : [form];
      let lastPayload;
      for (let i = 0; i < records.length; i++) {
        const f = records[i];
        const years = isRetirement
          ? Number(f.lifeExpectancy) - Number(f.retireAge)
          : Number(f.years);
        const cost = isRetirement
          ? (Number(f.monthlyIncome) * 12 * 100000) / 100000
          : Number(f.cost) * 100000;
        const savings = Number(f.savings) * 100000;
        const inflation = Number(f.inflation) / 100;
        const annualReturn = Number(
          isRetirement ? f.preRetireReturns : f.returns,
        );
        const futureValue = cost * Math.pow(1 + inflation, years);
        const futureSavings = savings * Math.pow(1 + annualReturn / 100, years);
        const net = Math.max(0, futureValue - futureSavings);
        const r = annualReturn / 1200;
        const months = Math.max(1, years * 12);
        const sip = r
          ? (net * r) / (Math.pow(1 + r, months) - 1)
          : net / months;
        const title = isMarriage
          ? `${f.childName}'s Marriage`
          : isRetirement
            ? "Retirement"
            : targetType === TYPES[3]
              ? f.targetTitle
              : targetType;
        const targetDate = new Date();
        targetDate.setFullYear(targetDate.getFullYear() + years);
        lastPayload = {
          name: title,
          targetAmount: futureValue,
          currentSavings: savings,
          targetDate: targetDate.toISOString(),
          expectedReturn: annualReturn,
          riskProfile: profiles.selected || "Moderate",
          targetType,
          childCount: isMarriage ? children.length : 1,
          startMonth: f.startMonth || form.startMonth,
          childName: isMarriage ? f.childName : undefined,
          childAge: isMarriage ? Number(f.childAge) : undefined,
          years,
          currentCost: cost,
          inflation: Number(f.inflation),
          annualReturn,
          currentSavingsAmount: savings,
          futureValue,
          futureSavings,
          netRequirement: net,
          sip,
          lumpSum: net / Math.pow(1 + annualReturn / 100, years),
          targetCategory: f.targetCategory,
          targetTitle: f.targetTitle,
          retireAge: f.retireAge,
          lifeExpectancy: f.lifeExpectancy,
          monthlyIncome: f.monthlyIncome,
          postRetireReturns: f.postRetireReturns,
        };
        if (editing)
          await axios.put(
            `${API_BASE}/investments/targets/${editing}`,
            lastPayload,
            { withCredentials: true },
          );
        else
          await axios.post(`${API_BASE}/investments/targets`, lastPayload, {
            withCredentials: true,
          });
      }
      setResult({ ...lastPayload, _id: editing || undefined });
      await load();
      setStep("result");
    } catch (e) {
      setError(
        e.response?.data?.message ||
          "Could not save target. Check all entered values.",
      );
    } finally {
      setSaving(false);
    }
  };
  const changeRiskProfile = async (profile) => {
    setError("");
    try {
      await axios.patch(
        `${API_BASE}/investments/risk-profile`,
        { riskProfile: profile },
        { withCredentials: true },
      );
      setProfiles((current) => ({ ...current, selected: profile }));
    } catch (e) {
      setError(e.response?.data?.message || "Unable to update risk profile.");
    }
  };
  const viewTarget = (t) => {
    setResult(t);
    setStep("summary");
  };
  const remove = async (id) => {
    if (!window.confirm("Delete this target?")) return;
    try {
      await axios.delete(`${API_BASE}/investments/targets/${id}`, {
        withCredentials: true,
      });
      await load();
    } catch (e) {
      setError(e.response?.data?.message || "Unable to delete target.");
    }
  };
  const editTarget = (t) => {
    setEditing(t._id);
    setTargetType(t.targetType || TYPES[0]);
    setForm({
      ...initial,
      childCount: "1",
      startMonth: t.startMonth || monthOptions[0],
      years: String(t.years || 10),
      childName: t.childName || "",
      childAge: String(t.childAge || ""),
      cost: String((t.currentCost || t.targetAmount / 100000) / 100000),
      inflation: String(t.inflation || 7),
      returns: String(t.annualReturn || t.expectedReturn || 12),
      savings: String(
        (t.currentSavingsAmount ?? t.currentSavings ?? 0) / 100000,
      ),
    });
    if ((t.targetType || TYPES[0]) === TYPES[1]) {
      setMarriageChildren([{
        ...makeMarriageChild(0),
        childName: t.childName || "",
        childAge: String(t.childAge ?? ""),
        startMonth: t.startMonth || monthOptions[0],
        years: String(t.years || 10),
        cost: String((t.currentCost || t.targetAmount / 100000) / 100000),
        inflation: String(t.inflation || 7),
        returns: String(t.annualReturn || t.expectedReturn || 12),
        savings: String((t.currentSavingsAmount ?? t.currentSavings ?? 0) / 100000),
      }]);
    }
    setStep("form");
  };
  const assessment = (t) => t.assessments?.at(-1);
  return (
    <div className="ls-finnsys-targets">
      {error && <div className="ls-finnsys-error">{error}</div>}
      {step === "home" && (
        <>
          <h2 className="ls-finnsys-title">Risk Suitability</h2>
          <table className="ls-finnsys-profiles">
            <thead>
              <tr>
                <th>Risk Profile</th>
                <th>Set/Change Profile</th>
              </tr>
            </thead>
            <tbody>
              {PROFILES.map((x) => (
                <tr key={x}>
                  <td>
                    {x}{" "}
                    <span
                      className="ls-risk-info"
                      tabIndex="0"
                      role="img"
                      aria-label={`About ${x} risk profile: ${PROFILE_INFO[x]}`}
                      data-tooltip={PROFILE_INFO[x]}
                    >
                      i
                    </span>
                  </td>
                  <td>
                    <button onClick={() => changeRiskProfile(x)}>
                      {profiles.selected === x ? "Selected" : "[View / Modify]"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="ls-finnsys-columns">
            <section>
              <h3>Create a New Target</h3>
              {TYPES.map((t) => (
                <button
                  className="ls-finnsys-target-type"
                  key={t}
                  onClick={() => openCreate(t)}
                >
                  {t}
                </button>
              ))}
            </section>
            {targets.length > 0 && (
              <section>
                <h3>
                  Existing Targets{" "}
                  <button
                    className="ls-finnsys-link"
                    onClick={() => setStep("summaryAll")}
                  >
                    [ Target Summary ]
                  </button>
                </h3>
                {loading ? (
                  "Loading…"
                ) : (
                  <table className="ls-finnsys-table">
                    <thead>
                      <tr>
                        <th>Target Name</th>
                        <th>Target Year</th>
                        <th>Require (Lacs)</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {targets.map((t) => (
                        <tr key={t._id}>
                          <td>{t.name}</td>
                          <td>{new Date(t.targetDate).getFullYear()}</td>
                          <td>
                            {(Number(t.targetAmount || 0) / 100000).toFixed(2)}
                          </td>
                          <td>
                            <button title="View" onClick={() => viewTarget(t)}>
                              📄
                            </button>{" "}
                            <button title="Edit" onClick={() => editTarget(t)}>
                              ✎
                            </button>{" "}
                            <button
                              title="Delete"
                              onClick={() => remove(t._id)}
                            >
                              ❌
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </section>
            )}
          </div>
        </>
      )}
      {step === "form" && (
        <section className={`ls-finnsys-form ${
          targetType === TYPES[1] ? "ls-marriage-target-form" :
          targetType === TYPES[2] ? "ls-retirement-target-form" :
          targetType === TYPES[3] ? "ls-other-target-form" :
          "ls-education-target-form"
        }`}>
          <h3>
            {targetType === TYPES[1]
              ? "Create Target for your Child's Marriage"
              : targetType === TYPES[2]
                ? "Retirement Target"
                : targetType === TYPES[3]
                  ? "Create Other Target"
                  : "Create Target for your Child's Education"}
          </h3>
          {targetType === TYPES[1] ? (
            <div className="ls-marriage-children">
              {marriageChildren.slice(0, 1).map((child, index) => (
                <div className="ls-marriage-card" key={index}>
                  <div className="ls-marriage-left">
                    <label>
                      Target Starts in:
                      <select
                        name="startMonth"
                        value={child.startMonth}
                        onChange={(e) => updateMarriageChild(index, e)}
                      >
                        {monthOptions.map((m) => (
                          <option key={m}>{m}</option>
                        ))}
                      </select>
                    </label>
                    <label>
                      Child's Name:
                      <input
                        name="childName"
                        value={child.childName}
                        onChange={(e) => updateMarriageChild(index, e)}
                      />
                    </label>
                    <label>
                      Child's Age:
                      <input
                        type="number"
                        min="0"
                        max="100"
                        name="childAge"
                        value={child.childAge}
                        onChange={(e) => updateMarriageChild(index, e)}
                      />{" "}
                      yrs
                    </label>
                  </div>
                  <div className="ls-finnsys-questions">
                    {[
                      [
                        "In how many years will you need money for this child's Marriage?",
                        "years",
                        "years",
                      ],
                      [
                        "What is your expected cost of Marriage (based on current value)?",
                        "cost",
                        "Lacs",
                      ],
                      [
                        "What is your anticipated inflation rate?",
                        "inflation",
                        "%",
                      ],
                      [
                        "What are the annual returns you expect on your investment?",
                        "returns",
                        "%",
                      ],
                      [
                        "How much money have you already saved or set aside for this child's Marriage?",
                        "savings",
                        "Lacs",
                      ],
                    ].map(([q, name, unit]) => (
                      <label key={name}>
                        {q}
                        <span>
                          <input
                            type="number"
                            min="0"
                            step="0.1"
                            name={name}
                            value={child[name]}
                            onChange={(e) => updateMarriageChild(index, e)}
                          />{" "}
                          {unit}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : targetType === TYPES[2] ? (
            <div className="ls-retirement-form">
              <label>
                Retirement Target starts in:
                <select
                  name="startMonth"
                  value={form.startMonth}
                  onChange={update}
                >
                  {monthOptions.map((m) => (
                    <option key={m}>{m}</option>
                  ))}
                </select>
              </label>
              <label>
                At what age do you wish to retire?
                <span>
                  <input
                    type="number"
                    name="retireAge"
                    value={form.retireAge}
                    onChange={update}
                  />{" "}
                  years
                </span>
              </label>
              <label>
                What is your Life expectancy?
                <span>
                  <input
                    type="number"
                    name="lifeExpectancy"
                    value={form.lifeExpectancy}
                    onChange={update}
                  />{" "}
                  years
                </span>
              </label>
              <label>
                How much do you wish to earn each month after Retirement?
                (Current Value)
                <span>
                  <input
                    type="number"
                    name="monthlyIncome"
                    value={form.monthlyIncome}
                    onChange={update}
                  />{" "}
                  Rupees
                </span>
              </label>
              <label>
                What is your anticipated inflation rate?
                <span>
                  <input
                    type="number"
                    name="inflation"
                    value={form.inflation}
                    onChange={update}
                  />{" "}
                  %
                </span>
              </label>
              <label>
                What are the annual returns you expect on your investment{" "}
                <b>before</b> retirement?
                <span>
                  <input
                    type="number"
                    name="preRetireReturns"
                    value={form.preRetireReturns}
                    onChange={update}
                  />{" "}
                  %
                </span>
              </label>
              <label>
                What are the annual returns you expect on your investment{" "}
                <b>after</b> retirement?
                <span>
                  <input
                    type="number"
                    name="postRetireReturns"
                    value={form.postRetireReturns}
                    onChange={update}
                  />{" "}
                  %
                </span>
              </label>
              <label>
                How much money have you already saved for your Retirement?
                <span>
                  <input
                    type="number"
                    name="savings"
                    value={form.savings}
                    onChange={update}
                  />{" "}
                  Lacs
                </span>
              </label>
            </div>
          ) : (
            <div className="ls-finnsys-form-body">
              <div className="ls-finnsys-child">
                {targetType === TYPES[3] && (
                  <label>
                    Select the Target:
                    <select
                      name="targetCategory"
                      value={form.targetCategory}
                      onChange={update}
                    >
                      {["Car", "Home", "Vacation", "Celebration", "Other"].map(
                        (x) => (
                          <option key={x}>{x}</option>
                        ),
                      )}
                    </select>
                  </label>
                )}
                <label>
                  Target starts in:
                  <select
                    name="startMonth"
                    value={form.startMonth}
                    onChange={update}
                  >
                    {monthOptions.map((m) => (
                      <option key={m}>{m}</option>
                    ))}
                  </select>
                </label>
                {targetType === TYPES[0] && (
                  <>
                    <label>
                      Child's Name:
                      <input
                        name="childName"
                        value={form.childName}
                        onChange={update}
                      />
                    </label>
                    <label>
                      Child's Age:
                      <input
                        type="number"
                        name="childAge"
                        value={form.childAge}
                        onChange={update}
                      />{" "}
                      yrs
                    </label>
                  </>
                )}
                {targetType === TYPES[3] && (
                  <label>
                    Target Title
                    <input
                      name="targetTitle"
                      value={form.targetTitle}
                      onChange={update}
                    />
                  </label>
                )}
              </div>
              <div className="ls-finnsys-questions">
                {[
                  [
                    "In how many years do you wish to reach this target?",
                    "years",
                    "years",
                  ],
                  [
                    "What is your expected cost of this Target (based on current value)?",
                    "cost",
                    "Lacs",
                  ],
                  [
                    "What is your anticipated inflation rate?",
                    "inflation",
                    "%",
                  ],
                  [
                    "What are the annual returns you expect on your investment?",
                    "returns",
                    "%",
                  ],
                  [
                    "How much money have you already saved for this Target?",
                    "savings",
                    "Lacs",
                  ],
                ].map(([q, name, unit]) => (
                  <label key={name}>
                    {q}
                    <span>
                      <input
                        type="number"
                        name={name}
                        value={form[name]}
                        onChange={update}
                      />{" "}
                      {unit}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          )}
          <div className="ls-finnsys-actions">
            <button className="ls-finnsys-back" onClick={() => setStep("home")}>
              GO BACK
            </button>
            <button
              className="ls-finnsys-continue"
              disabled={saving}
              onClick={saveTarget}
            >
              {saving ? "SAVING…" : "CONTINUE ➜"}
            </button>
          </div>
        </section>
      )}
      {step === "result" && result && (
        <section className="ls-finnsys-result">
          <h3>Your Final Results are as follows:</h3>
          <div className="ls-finnsys-result-sheet">
            {[
              ["Target:", result.name],
              ...(result.childName
                ? [["Child:", `${result.childName}, ${result.childAge} years`]]
                : []),
              ["Require (current value):", lacs(result.currentCost / 100000)],
              ["After:", `${result.years} Years`],
              ["At:", `${result.inflation}% Inflation`],
              ["Future Value:", lacs(result.futureValue / 100000)],
              ["Current Savings:", lacs(result.currentSavingsAmount / 100000)],
              ["Future Value of Savings:", lacs(result.futureSavings / 100000)],
              ["Net Requirement:", lacs(result.netRequirement / 100000)],
              [
                "Investment Required:",
                `Rs ${money(result.lumpSum)} one-time  |  Rs ${money(result.sip * 12)} annually  |  Rs ${money(result.sip)} monthly`,
              ],
            ].map(([k, v]) => (
              <div key={k}>
                <strong>{k}</strong>
                <span>{v}</span>
              </div>
            ))}
          </div>
          <div className="ls-finnsys-actions">
            <button className="ls-finnsys-back" onClick={() => setStep("form")}>
              GO BACK
            </button>
            <button
              className="ls-finnsys-continue"
              onClick={() => {
                setForm(initial);
                setStep("home");
              }}
            >
              CREATE ANOTHER TARGET
            </button>
            <button
              className="ls-finnsys-continue"
              onClick={() => setStep("summary")}
            >
              VIEW/PRINT TARGET SUMMARY
            </button>
          </div>
        </section>
      )}
      {(step === "summary" || step === "summaryAll") && (
        <section className="ls-finnsys-print">
          <div className="ls-finnsys-brand">
            LAKSHYA SPARSH <small>FINANCIAL SERVICES</small>
            <span>Your Investment Targets</span>
          </div>
          <h3>Your Investment Targets</h3>
          <p className="ls-finnsys-asof">
            As on:{" "}
            {new Date().toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })}
          </p>
          <div className="ls-finnsys-chart">
            <strong>Target Layout</strong>
            <div className="ls-finnsys-bars">
              {(step === "summary" ? [result].filter(Boolean) : targets).map(
                (t, i) => (
                  <div key={t._id || i}>
                    <span
                      style={{
                        height: `${Math.max(8, Math.min(100, Number(t.targetAmount || 0) / 200000))}%`,
                      }}
                    ></span>
                    <small>{new Date(t.targetDate).getFullYear()}</small>
                    <b>{t.name}</b>
                  </div>
                ),
              )}
            </div>
          </div>
          <h4>
            Target Summary{" "}
            <small>(including the targets of all family members)</small>
          </h4>
          <table className="ls-finnsys-summary-table">
            <thead>
              <tr>
                <th>Created On</th>
                <th>Investor Name</th>
                <th>Target Name</th>
                <th>Target Date</th>
                <th>
                  Target Amount
                  <br />
                  (Future Value in Rs.)
                </th>
                <th>Anticipated Inflation(%)</th>
                <th>Target Return(%)</th>
                <th colSpan="2">Investment Required (any one)</th>
              </tr>
              <tr>
                <th colSpan="7"></th>
                <th>Annually (Rs.)</th>
                <th>Monthly (Rs.)</th>
              </tr>
            </thead>
            <tbody>
              {(step === "summary" ? [result].filter(Boolean) : targets).map(
                (t, i) => (
                  <tr key={t._id || i}>
                    <td>
                      {new Date(t.createdAt || Date.now()).toLocaleDateString(
                        "en-GB",
                      )}
                    </td>
                    <td>Client</td>
                    <td>{t.name}</td>
                    <td>
                      {new Date(t.targetDate).toLocaleDateString("en-GB")}
                    </td>
                    <td>{money(t.futureValue || t.targetAmount)}</td>
                    <td>{t.inflation ?? "—"}%</td>
                    <td>{t.annualReturn ?? t.expectedReturn ?? "—"}%</td>
                    <td>{money((t.sip || 0) * 12)}</td>
                    <td>{money(t.sip || 0)}</td>
                  </tr>
                ),
              )}
            </tbody>
          </table>
          <div className="ls-finnsys-actions no-print">
            <button className="ls-finnsys-back" onClick={() => setStep("home")}>
              GO BACK
            </button>
            <button
              className="ls-finnsys-continue"
              onClick={() => window.print()}
            >
              PRINT / SAVE PDF
            </button>
            <button
              className="ls-finnsys-continue"
              onClick={() => openCreate(TYPES[0])}
            >
              CREATE ANOTHER TARGET
            </button>
          </div>
        </section>
      )}
    </div>
  );
}
