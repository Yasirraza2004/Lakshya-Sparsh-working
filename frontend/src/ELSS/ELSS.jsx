import { useMemo, useState } from "react";
import "./ELSS.css";

const funds = [
    {
        id: 1,
        name: "Invesco India ELSS Tax Saver Fund",
        plan: "Regular Plan - Growth",
        nav: 127.42,
        oneYear: 9.84,
        threeYear: 12.31,
        fiveYear: 15.42,
        risk: "High"
    },
    {
        id: 2,
        name: "JM ELSS Tax Saver Fund",
        plan: "Regular Plan - Growth",
        nav: 52.2569,
        oneYear: 8.12,
        threeYear: 15.30,
        fiveYear: 16.82,
        risk: "High"
    },
    {
        id: 3,
        name: "WhiteOak Capital Tax Saver Fund",
        plan: "Regular Plan - Growth",
        nav: 18.168,
        oneYear: 5.23,
        threeYear: 15.47,
        fiveYear: 17.10,
        risk: "High"
    },
    {
        id: 4,
        name: "ITI ELSS Tax Saver Fund",
        plan: "Regular Plan - Growth",
        nav: 25.3494,
        oneYear: 7.15,
        threeYear: 15.77,
        fiveYear: 16.42,
        risk: "High"
    },
    {
        id: 5,
        name: "Axis ELSS Tax Saver Fund",
        plan: "Regular Plan - Growth",
        nav: 97.984,
        oneYear: 2.36,
        threeYear: 11.47,
        fiveYear: 13.28,
        risk: "High"
    },
    {
        id: 6,
        name: "PGIM India ELSS Tax Saver Fund",
        plan: "Growth",
        nav: 34.85,
        oneYear: 0.81,
        threeYear: 8.43,
        fiveYear: 12.91,
        risk: "High"
    }
];

function ELSS() {

    const [investmentType, setInvestmentType] = useState("sip");
    const [search, setSearch] = useState("");
    const [selectedFunds, setSelectedFunds] = useState([]);
    const [amount, setAmount] = useState(10000);
    const [years, setYears] = useState(5);
    const [returnRate, setReturnRate] = useState(12);

    // Filter funds
    const filteredFunds = useMemo(() => {
        return funds.filter((fund) =>
            fund.name.toLowerCase().includes(search.toLowerCase())
        );
    }, [search]);

    // Select / remove comparison fund
    const toggleComparison = (id) => {

        setSelectedFunds((prev) => {

            if (prev.includes(id)) {
                return prev.filter((item) => item !== id);
            }

            if (prev.length >= 3) {
                alert("You can compare maximum 3 funds.");
                return prev;
            }

            return [...prev, id];
        });
    };

    // SIP calculation
    const monthlyRate = returnRate / 12 / 100;
    const months = years * 12;

    const futureValue =
        investmentType === "sip"
            ? amount *
              (((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) *
                (1 + monthlyRate))
            : amount * Math.pow(1 + returnRate / 100, years);

    const investedAmount =
        investmentType === "sip"
            ? amount * months
            : amount;

    const estimatedReturn = futureValue - investedAmount;

    return (
        <div className="elss-page">

            {/* Breadcrumb */}
            <div className="breadcrumb">
                Home <span>›</span> Investments <span>›</span> ELSS
            </div>


            {/* Hero */}
            <section className="elss-hero">

                <div>
                    <span className="hero-small">
                        TAX SAVING INVESTMENTS
                    </span>

                    <h1>
                        ELSS Tax Saver Funds
                    </h1>

                    <p>
                        Invest smart, save tax and build long-term wealth
                        with equity-linked savings schemes.
                    </p>
                </div>

            </section>


            {/* Main */}
            <div className="elss-container">

                {/* Search + investment type */}
                <section className="top-controls">

                    <div className="search-box">
                        <span>🔍</span>

                        <input
                            type="text"
                            placeholder="Search mutual funds..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>


                    <div className="investment-switch">

                        <span>Investment Type</span>

                        <button
                            className={
                                investmentType === "sip"
                                    ? "active"
                                    : ""
                            }
                            onClick={() => setInvestmentType("sip")}
                        >
                            SIP
                        </button>

                        <button
                            className={
                                investmentType === "lumpsum"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setInvestmentType("lumpsum")
                            }
                        >
                            Lumpsum
                        </button>

                    </div>

                </section>


                {/* Information cards */}
                <section className="info-grid">

                    <div className="info-card">
                        <div className="info-icon">💰</div>

                        <div>
                            <h3>Save Tax</h3>
                            <p>
                                Eligible for tax benefits under
                                Section 80C.
                            </p>
                        </div>
                    </div>


                    <div className="info-card">
                        <div className="info-icon">📈</div>

                        <div>
                            <h3>Long Term Growth</h3>
                            <p>
                                Equity investments designed for
                                long-term wealth creation.
                            </p>
                        </div>
                    </div>


                    <div className="info-card">
                        <div className="info-icon">🔒</div>

                        <div>
                            <h3>3 Year Lock-in</h3>
                            <p>
                                ELSS has a minimum lock-in period
                                of three years.
                            </p>
                        </div>
                    </div>

                </section>


                {/* Content layout */}
                <div className="content-layout">

                    {/* Filter */}
                    <aside className="filter-panel">

                        <h3>Filter Funds</h3>

                        <div className="filter-section">

                            <h4>Category</h4>

                            <label>
                                <input
                                    type="checkbox"
                                    defaultChecked
                                />
                                ELSS
                            </label>

                        </div>


                        <div className="filter-section">

                            <h4>Risk</h4>

                            <label>
                                <input
                                    type="radio"
                                    name="risk"
                                />
                                Low
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="risk"
                                />
                                Moderate
                            </label>

                            <label>
                                <input
                                    type="radio"
                                    name="risk"
                                />
                                High
                            </label>

                        </div>


                        <div className="filter-section">

                            <h4>Investment Period</h4>

                            <label>
                                <input
                                    type="checkbox"
                                />
                                3 Years
                            </label>

                            <label>
                                <input
                                    type="checkbox"
                                />
                                5 Years
                            </label>

                        </div>

                    </aside>


                    {/* Funds */}
                    <main className="fund-section">

                        <div className="fund-heading">

                            <div>
                                <h2>Popular ELSS Funds</h2>

                                <p>
                                    {filteredFunds.length} funds found
                                </p>
                            </div>

                            <span className="sort-text">
                                Sort: Recommended ▾
                            </span>

                        </div>


                        {filteredFunds.map((fund) => (

                            <div
                                className="fund-card"
                                key={fund.id}
                            >

                                <div className="fund-header">

                                    <div className="fund-title">

                                        <div className="fund-logo">
                                            {fund.name.charAt(0)}
                                        </div>

                                        <div>
                                            <h3>{fund.name}</h3>

                                            <p>{fund.plan}</p>
                                        </div>

                                    </div>

                                    <span className="risk">
                                        {fund.risk} Risk
                                    </span>

                                </div>


                                <div className="fund-stats">

                                    <div>
                                        <span>NAV</span>
                                        <strong>
                                            ₹{fund.nav.toFixed(2)}
                                        </strong>
                                    </div>

                                    <div>
                                        <span>1 Year</span>
                                        <strong className="positive">
                                            +{fund.oneYear}%
                                        </strong>
                                    </div>

                                    <div>
                                        <span>3 Years</span>
                                        <strong className="positive">
                                            +{fund.threeYear}%
                                        </strong>
                                    </div>

                                    <div>
                                        <span>5 Years</span>
                                        <strong className="positive">
                                            +{fund.fiveYear}%
                                        </strong>
                                    </div>

                                </div>


                                <div className="fund-footer">

                                    <div className="investment-input">

                                        <span>
                                            {investmentType === "sip"
                                                ? "Monthly Investment"
                                                : "Investment Amount"}
                                        </span>

                                        <div>
                                            ₹
                                            <input
                                                type="number"
                                                placeholder="10,000"
                                            />
                                        </div>

                                    </div>


                                    <button className="invest-btn">
                                        Invest Now
                                    </button>


                                    <button
                                        className={
                                            selectedFunds.includes(
                                                fund.id
                                            )
                                                ? "compare-btn selected"
                                                : "compare-btn"
                                        }
                                        onClick={() =>
                                            toggleComparison(fund.id)
                                        }
                                    >
                                        {selectedFunds.includes(
                                            fund.id
                                        )
                                            ? "✓ Added"
                                            : "＋ Compare"}
                                    </button>

                                </div>

                            </div>

                        ))}

                    </main>

                </div>


                {/* Calculator */}
                <section className="calculator">

                    <div className="calculator-left">

                        <span className="calculator-label">
                            INVESTMENT CALCULATOR
                        </span>

                        <h2>
                            Start building your wealth
                        </h2>

                        <p>
                            Estimate how much your investment
                            could grow over time.
                        </p>


                        <div className="calc-group">

                            <label>
                                {investmentType === "sip"
                                    ? "Monthly Investment"
                                    : "Investment Amount"}
                            </label>

                            <div className="range-value">
                                ₹{amount.toLocaleString("en-IN")}
                            </div>

                            <input
                                type="range"
                                min="1000"
                                max="100000"
                                step="1000"
                                value={amount}
                                onChange={(e) =>
                                    setAmount(Number(e.target.value))
                                }
                            />

                        </div>


                        <div className="calc-group">

                            <label>
                                Investment Period
                            </label>

                            <div className="range-value">
                                {years} Years
                            </div>

                            <input
                                type="range"
                                min="3"
                                max="30"
                                value={years}
                                onChange={(e) =>
                                    setYears(Number(e.target.value))
                                }
                            />

                        </div>


                        <div className="calc-group">

                            <label>
                                Expected Return
                            </label>

                            <div className="range-value">
                                {returnRate}%
                            </div>

                            <input
                                type="range"
                                min="5"
                                max="20"
                                value={returnRate}
                                onChange={(e) =>
                                    setReturnRate(
                                        Number(e.target.value)
                                    )
                                }
                            />

                        </div>

                    </div>


                    {/* Result */}
                    <div className="calculator-result">

                        <h3>
                            Your estimated investment
                        </h3>

                        <div className="result-main">

                            <span>Total Value</span>

                            <strong>
                                ₹
                                {Math.round(
                                    futureValue
                                ).toLocaleString("en-IN")}
                            </strong>

                        </div>


                        <div className="result-row">

                            <span>Invested Amount</span>

                            <strong>
                                ₹
                                {Math.round(
                                    investedAmount
                                ).toLocaleString("en-IN")}
                            </strong>

                        </div>


                        <div className="result-row">

                            <span>Estimated Returns</span>

                            <strong className="positive">
                                ₹
                                {Math.round(
                                    estimatedReturn
                                ).toLocaleString("en-IN")}
                            </strong>

                        </div>


                        <button className="start-btn">
                            Start Investing
                        </button>

                    </div>

                </section>


                {/* Comparison */}
                {selectedFunds.length > 0 && (

                    <section className="comparison">

                        <div className="comparison-header">

                            <div>
                                <h2>Compare Funds</h2>

                                <p>
                                    Compare your selected
                                    investment options.
                                </p>
                            </div>

                            <span>
                                {selectedFunds.length} / 3 Selected
                            </span>

                        </div>


                        <div className="comparison-list">

                            {selectedFunds.map((id) => {

                                const fund = funds.find(
                                    (item) => item.id === id
                                );

                                return (
                                    <div
                                        className="comparison-item"
                                        key={id}
                                    >

                                        <strong>
                                            {fund.name}
                                        </strong>

                                        <span>
                                            NAV ₹
                                            {fund.nav.toFixed(2)}
                                        </span>

                                        <span className="positive">
                                            3Y +{fund.threeYear}%
                                        </span>

                                        <button
                                            onClick={() =>
                                                toggleComparison(id)
                                            }
                                        >
                                            Remove
                                        </button>

                                    </div>
                                );

                            })}

                        </div>

                    </section>

                )}

            </div>

        </div>
    );
}

export default ELSS;