import { useState } from "react";
import "./sipCalculator.css";

function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(5000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);
  const [stepUp, setStepUp] = useState(10);

  const calculateSIP = () => {
    const monthlyRate = returnRate / 12 / 100;

    let totalInvested = 0;
    let futureValue = 0;
    let currentMonthlySIP = monthlyInvestment;

    for (let year = 1; year <= years; year++) {
      for (let month = 1; month <= 12; month++) {
        totalInvested += currentMonthlySIP;

        futureValue =
          (futureValue + currentMonthlySIP) *
          (1 + monthlyRate);
      }

      // Increase SIP every year
      currentMonthlySIP =
        currentMonthlySIP * (1 + stepUp / 100);
    }

    const estimatedReturns = futureValue - totalInvested;

    return {
      totalInvested,
      estimatedReturns,
      futureValue,
    };
  };

  const {
    totalInvested,
    estimatedReturns,
    futureValue,
  } = calculateSIP();

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <section className="sip-calculator-section">

      <div className="sip-calculator-container">

        {/* LEFT SIDE */}

        <div className="sip-input-section">

          <p className="sip-small-title">
            PLAN YOUR FUTURE
          </p>

          <h1 className="sip-title">
            SIP Calculator
          </h1>

          <p className="sip-description">
            See how your regular investments can grow over time
            and understand the impact of increasing your SIP every year.
          </p>

          {/* MONTHLY INVESTMENT */}

          <div className="sip-input-group">

            <div className="sip-label-row">
              <label>Monthly Investment</label>

              <span>
                {formatMoney(monthlyInvestment)}
              </span>
            </div>

            <input
              type="range"
              min="500"
              max="100000"
              step="500"
              value={monthlyInvestment}
              onChange={(e) =>
                setMonthlyInvestment(Number(e.target.value))
              }
            />

            <div className="sip-range-values">
              <span>₹500</span>
              <span>₹1,00,000</span>
            </div>

          </div>

          {/* EXPECTED RETURN */}

          <div className="sip-input-group">

            <div className="sip-label-row">
              <label>Expected Return</label>

              <span>
                {returnRate}%
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="30"
              step="0.5"
              value={returnRate}
              onChange={(e) =>
                setReturnRate(Number(e.target.value))
              }
            />

            <div className="sip-range-values">
              <span>1%</span>
              <span>30%</span>
            </div>

          </div>

          {/* INVESTMENT PERIOD */}

          <div className="sip-input-group">

            <div className="sip-label-row">
              <label>Investment Period</label>

              <span>
                {years} Years
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="40"
              value={years}
              onChange={(e) =>
                setYears(Number(e.target.value))
              }
            />

            <div className="sip-range-values">
              <span>1 Year</span>
              <span>40 Years</span>
            </div>

          </div>

          {/* STEP UP */}

          <div className="sip-input-group">

            <div className="sip-label-row">

              <label>
                Annual SIP Step-Up
              </label>

              <span>
                {stepUp}%
              </span>

            </div>

            <input
              type="range"
              min="0"
              max="30"
              step="1"
              value={stepUp}
              onChange={(e) =>
                setStepUp(Number(e.target.value))
              }
            />

            <div className="sip-range-values">
              <span>0%</span>
              <span>30%</span>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="sip-result-section">

          <div className="sip-result-card">

            <p className="sip-result-heading">
              YOUR SIP PROJECTION
            </p>

            <h2 className="sip-final-value">
              {formatMoney(futureValue)}
            </h2>

            <p className="sip-final-label">
              Estimated Value
            </p>

            <div className="sip-result-line"></div>

            <div className="sip-result-row">

              <div>
                <span>Total Invested</span>

                <strong>
                  {formatMoney(totalInvested)}
                </strong>
              </div>

              <div>
                <span>Estimated Returns</span>

                <strong>
                  {formatMoney(estimatedReturns)}
                </strong>
              </div>

            </div>

          </div>

          {/* SUMMARY */}

          <div className="sip-summary">

            <div className="sip-summary-item">
              <span>Starting SIP</span>

              <strong>
                {formatMoney(monthlyInvestment)}
              </strong>
            </div>

            <div className="sip-summary-item">
              <span>Step-Up</span>

              <strong>
                {stepUp}% / Year
              </strong>
            </div>

            <div className="sip-summary-item">
              <span>Duration</span>

              <strong>
                {years} Years
              </strong>
            </div>

          </div>

          {/* FINAL SIP */}

          <div className="sip-final-sip">

            <span>
              SIP in your final year
            </span>

            <strong>
              {formatMoney(
                monthlyInvestment *
                  Math.pow(1 + stepUp / 100, years - 1)
              )}
              / month
            </strong>

          </div>

          <button className="sip-expert-button">
            Talk to an Expert
          </button>

        </div>

      </div>

      <p className="sip-disclaimer">
        This calculator provides an illustration based on the inputs
        provided. Actual investment returns may vary and are not guaranteed.
      </p>

    </section>
  );
}

export default SIPCalculator;
