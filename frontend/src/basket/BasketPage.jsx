import { useState } from "react";
import { baskets } from "./basketData";
import "./BasketPage.css";

function BasketPage() {
  const [goal, setGoal] = useState("");
  const [investmentType, setInvestmentType] = useState("SIP");
  const [amount, setAmount] = useState("");
  const [horizon, setHorizon] = useState("");
  const [risk, setRisk] = useState("");
  const [selectedBasket, setSelectedBasket] = useState(null);

  const goals = [
    {
      id: "Wealth Creation",
      icon: "💰",
      title: "Wealth Creation",
    },
    {
      id: "Retirement",
      icon: "🏖️",
      title: "Retirement",
    },
    {
      id: "Education",
      icon: "🎓",
      title: "Education",
    },
    {
      id: "Capital Preservation",
      icon: "🛡️",
      title: "Capital Preservation",
    },
  ];

  const horizons = [
    "1–3 Years",
    "3–5 Years",
    "5–10 Years",
    "10+ Years",
  ];

  const risks = [
    "Low",
    "Low to Moderate",
    "Moderate",
    "Moderate to High",
    "High",
  ];

  /*
   * Filter baskets based on the user's selections.
   *
   * Goal is the main filter.
   * Horizon and risk are optional filters.
   */

  const filteredBaskets = baskets.filter((basket) => {
    const goalMatch = !goal || basket.goal === goal;

    const horizonMatch =
      !horizon ||
      basket.horizon === horizon ||
      (horizon === "5–10 Years" && basket.horizon === "5+ Years") ||
      (horizon === "10+ Years" && basket.horizon === "5+ Years");

    const riskMatch =
      !risk ||
      basket.risk === risk;

    return goalMatch && horizonMatch && riskMatch;
  });

  const handleGoalSelect = (selectedGoal) => {
    setGoal(selectedGoal);
    setSelectedBasket(null);
  };

  const handleContinue = () => {
    const section = document.getElementById("basket-results");

    if (section) {
      section.scrollIntoView({
        behavior: "smooth",
      });
    }
  };

  const handleViewBasket = (basket) => {
    setSelectedBasket(basket);

    setTimeout(() => {
      const section = document.getElementById("basket-details");

      if (section) {
        section.scrollIntoView({
          behavior: "smooth",
        });
      }
    }, 100);
  };

  const formatAmount = (value) => {
    if (!value) return "₹0";

    return Number(value).toLocaleString("en-IN", {
      maximumFractionDigits: 0,
    });
  };

  return (
    <div className="basket-page">

      {/* ================= HERO ================= */}

      <section className="basket-hero">

        <div className="basket-hero-content">

          <span className="basket-small-title">
            QUICK INVEST
          </span>

          <h1>
            Invest With
            <span> A Purpose</span>
          </h1>

          <p>
            Tell us about your investment goal and discover
            investment baskets designed around your needs.
          </p>

        </div>

      </section>


      {/* ================= GOAL ================= */}

      <section className="basket-container">

        <div className="basket-step">

          <div className="step-number">
            01
          </div>

          <div>
            <span className="section-label">
              STEP 1
            </span>

            <h2>
              What are you investing for?
            </h2>

            <p className="section-description">
              Select the goal that best describes your
              investment objective.
            </p>
          </div>

        </div>


        <div className="goal-grid">

          {goals.map((item) => (

            <button
              key={item.id}
              className={`goal-card ${
                goal === item.id ? "selected" : ""
              }`}
              onClick={() => handleGoalSelect(item.id)}
            >

              <div className="goal-icon">
                {item.icon}
              </div>

              <span>
                {item.title}
              </span>

              {goal === item.id && (
                <div className="selected-check">
                  ✓
                </div>
              )}

            </button>

          ))}

        </div>

      </section>


      {/* ================= INVESTMENT DETAILS ================= */}

      <section className="basket-container light-section">

        <div className="basket-step">

          <div className="step-number">
            02
          </div>

          <div>

            <span className="section-label">
              STEP 2
            </span>

            <h2>
              Build your investment plan
            </h2>

          </div>

        </div>


        <div className="investment-form-grid">

          {/* Investment Type */}

          <div className="form-group">

            <label>
              Investment Type
            </label>

            <div className="toggle-buttons">

              <button
                className={
                  investmentType === "SIP"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setInvestmentType("SIP")
                }
              >
                SIP
              </button>

              <button
                className={
                  investmentType === "Lumpsum"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setInvestmentType("Lumpsum")
                }
              >
                Lumpsum
              </button>

            </div>

          </div>


          {/* Amount */}

          <div className="form-group">

            <label>
              {investmentType === "SIP"
                ? "Monthly Investment"
                : "Investment Amount"}
            </label>

            <div className="amount-input">

              <span>
                ₹
              </span>

              <input
                type="number"
                value={amount}
                placeholder="10,000"
                onChange={(e) =>
                  setAmount(e.target.value)
                }
              />

            </div>

          </div>


          {/* Horizon */}

          <div className="form-group">

            <label>
              Investment Horizon
            </label>

            <select
              value={horizon}
              onChange={(e) =>
                setHorizon(e.target.value)
              }
            >

              <option value="">
                Select horizon
              </option>

              {horizons.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>


          {/* Risk */}

          <div className="form-group">

            <label>
              Risk Profile
            </label>

            <select
              value={risk}
              onChange={(e) =>
                setRisk(e.target.value)
              }
            >

              <option value="">
                Select risk
              </option>

              {risks.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}

            </select>

          </div>

        </div>


        <button
          className="continue-button"
          onClick={handleContinue}
        >
          Find My Basket
          <span>→</span>
        </button>

      </section>


      {/* ================= RESULTS ================= */}

      <section
        className="basket-container results-section"
        id="basket-results"
      >

        <div className="results-header">

          <div>

            <span className="section-label">
              YOUR RESULTS
            </span>

            <h2>
              Investment Baskets
            </h2>

            <p>
              {goal
                ? `Baskets for ${goal}`
                : "Explore our investment baskets"}
            </p>

          </div>

          <div className="result-count">
            {filteredBaskets.length} Baskets
          </div>

        </div>


        {filteredBaskets.length === 0 ? (

          <div className="no-results">

            <div>
              🔍
            </div>

            <h3>
              No matching basket found
            </h3>

            <p>
              Try changing your goal, horizon or risk profile.
            </p>

            <button
              onClick={() => {
                setGoal("");
                setHorizon("");
                setRisk("");
              }}
            >
              Clear Filters
            </button>

          </div>

        ) : (

          <div className="basket-grid">

            {filteredBaskets.map((basket) => (

              <div
                className="investment-card"
                key={basket.id}
              >

                <div className="card-top">

                  <span className="card-tag">
                    {basket.goal}
                  </span>

                  <span className="fund-count">
                    {basket.funds} Funds
                  </span>

                </div>


                <h3>
                  {basket.name}
                </h3>

                <p className="card-description">
                  {basket.description}
                </p>


                <div className="card-info">

                  <div>

                    <span>
                      Risk
                    </span>

                    <strong>
                      {basket.risk}
                    </strong>

                  </div>


                  <div>

                    <span>
                      Horizon
                    </span>

                    <strong>
                      {basket.horizon}
                    </strong>

                  </div>

                </div>


                <div className="card-bottom">

                  <div>

                    <span>
                      Starting SIP
                    </span>

                    <strong>
                      ₹
                      {basket.minSip.toLocaleString(
                        "en-IN"
                      )}
                    </strong>

                  </div>


                  <button
                    onClick={() =>
                      handleViewBasket(basket)
                    }
                  >
                    View Basket
                    <span>→</span>
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </section>


      {/* ================= BASKET DETAILS ================= */}

      {selectedBasket && (

        <section
          className="basket-container details-section"
          id="basket-details"
        >

          <div className="details-heading">

            <div>

              <span className="section-label">
                BASKET DETAILS
              </span>

              <h2>
                {selectedBasket.name}
              </h2>

              <p>
                {selectedBasket.description}
              </p>

            </div>

            <button
              className="close-details"
              onClick={() =>
                setSelectedBasket(null)
              }
            >
              ×
            </button>

          </div>


          {/* Summary */}

          <div className="basket-summary">

            <div>

              <span>
                Goal
              </span>

              <strong>
                {selectedBasket.goal}
              </strong>

            </div>


            <div>

              <span>
                Risk
              </span>

              <strong>
                {selectedBasket.risk}
              </strong>

            </div>


            <div>

              <span>
                Horizon
              </span>

              <strong>
                {selectedBasket.horizon}
              </strong>

            </div>


            <div>

              <span>
                Funds
              </span>

              <strong>
                {selectedBasket.funds}
              </strong>

            </div>

          </div>


          {/* Investment summary */}

          <div className="investment-summary">

            <div>

              <span>
                Investment Type
              </span>

              <strong>
                {investmentType}
              </strong>

            </div>


            <div>

              <span>
                Investment Amount
              </span>

              <strong>
                {formatAmount(amount)}
                {investmentType === "SIP" && (
                  <small>
                    / month
                  </small>
                )}
              </strong>

            </div>

          </div>


          {/* Fund table */}

          <div className="fund-table-wrapper">

            <div className="table-title">

              <div>

                <span className="section-label">
                  FUND ALLOCATION
                </span>

                <h3>
                  Recommended Funds
                </h3>

              </div>

            </div>


            <div className="fund-table-scroll">

              <table className="fund-table">

                <thead>

                  <tr>

                    <th>
                      Scheme Name
                    </th>

                    <th>
                      Allocation
                    </th>

                    <th>
                      Latest NAV
                    </th>

                    <th>
                      3 Months
                    </th>

                    <th>
                      6 Months
                    </th>

                    <th>
                      1 Year
                    </th>

                    <th>
                      3 Years
                    </th>

                  </tr>

                </thead>


                <tbody>

                  {selectedBasket.schemes.map(
                    (fund, index) => (

                      <tr key={index}>

                        <td>

                          <div className="fund-name">

                            <span className="fund-number">
                              {index + 1}
                            </span>

                            <span>
                              {fund.name}
                            </span>

                          </div>

                        </td>


                        <td>

                          <strong className="allocation">
                            {fund.allocation}%
                          </strong>

                        </td>


                        <td className="nav-value">
                          ₹{fund.nav}
                        </td>


                        <td>
                          <span className="return-value">
                            {fund.return3M}%
                          </span>
                        </td>


                        <td>
                          <span className="return-value">
                            {fund.return6M}%
                          </span>
                        </td>


                        <td>
                          <span className="return-value">
                            {fund.return1Y}%
                          </span>
                        </td>


                        <td>

                          {fund.return3Y !== null ? (

                            <span className="return-value">
                              {fund.return3Y}%
                            </span>

                          ) : (

                            <span className="not-available">
                              -
                            </span>

                          )}

                        </td>

                      </tr>

                    )
                  )}

                </tbody>

              </table>

            </div>

          </div>


          {/* Actions */}

          <div className="basket-actions">

            <button className="invest-button">
              Invest Now
              <span>→</span>
            </button>

            <button className="advisor-button">
              Talk to an Advisor
            </button>

          </div>


          {/* Disclaimer */}

          <div className="basket-disclaimer">

            <strong>
              Important:
            </strong>

            <p>
              Mutual fund investments are subject to market
              risks. Past performance does not guarantee future
              returns. The information displayed here is for
              illustrative purposes and should be reviewed with
              an appropriate financial professional before
              making an investment decision.
            </p>

          </div>

        </section>

      )}


      {/* ================= BOTTOM CTA ================= */}

      <section className="basket-cta">

        <div>

          <span>
            NEED HELP?
          </span>

          <h2>
            Not sure which basket is right for you?
          </h2>

          <p>
            Speak with our financial professionals and
            understand your investment options.
          </p>

        </div>

        <button>
          Talk to an Advisor
          <span>→</span>
        </button>

      </section>

    </div>
  );
}

export default BasketPage;