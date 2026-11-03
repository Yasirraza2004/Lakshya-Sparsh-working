import { useState } from "react";
import "./lumpsumCalculator.css";

function LumpsumCalculator() {
  const [investment, setInvestment] = useState(100000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(10);

  const calculateLumpsum = () => {
    const futureValue =
      investment * Math.pow(1 + returnRate / 100, years);

    const estimatedReturns = futureValue - investment;

    return {
      futureValue,
      estimatedReturns,
    };
  };

  const { futureValue, estimatedReturns } = calculateLumpsum();

  const formatMoney = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <>
    <section className="lumpsum-calculator-section">

      <div className="lumpsum-calculator-container">

        {/* LEFT SIDE */}

        <div className="lumpsum-input-section">

          <p className="lumpsum-small-title">
            PLAN YOUR FUTURE
          </p>

          <h1 className="lumpsum-title">
            Lumpsum Calculator
          </h1>

          <p className="lumpsum-description">
            Estimate how your one-time investment could grow
            over a period of time with the power of compounding.
          </p>

          {/* INITIAL INVESTMENT */}

          <div className="lumpsum-input-group">

            <div className="lumpsum-label-row">
              <label>Initial Investment</label>

              <span>
                {formatMoney(investment)}
              </span>
            </div>

            <input
              type="range"
              min="5000"
              max="10000000"
              step="5000"
              value={investment}
              onChange={(e) =>
                setInvestment(Number(e.target.value))
              }
            />

            <div className="lumpsum-range-values">
              <span>₹5,000</span>
              <span>₹1 Crore</span>
            </div>

          </div>

          {/* EXPECTED RETURN */}

          <div className="lumpsum-input-group">

            <div className="lumpsum-label-row">
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

            <div className="lumpsum-range-values">
              <span>1%</span>
              <span>30%</span>
            </div>

          </div>

          {/* INVESTMENT PERIOD */}

          <div className="lumpsum-input-group">

            <div className="lumpsum-label-row">
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

            <div className="lumpsum-range-values">
              <span>1 Year</span>
              <span>40 Years</span>
            </div>

          </div>

        </div>

        {/* RIGHT SIDE */}

        <div className="lumpsum-result-section">

          <div className="lumpsum-result-card">

            <p className="lumpsum-result-heading">
              YOUR INVESTMENT PROJECTION
            </p>

            <h2 className="lumpsum-final-value">
              {formatMoney(futureValue)}
            </h2>

            <p className="lumpsum-final-label">
              Estimated Value
            </p>

            <div className="lumpsum-result-line"></div>

            <div className="lumpsum-result-row">

              <div>
                <span>Initial Investment</span>

                <strong>
                  {formatMoney(investment)}
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

          <div className="lumpsum-summary">

            <div className="lumpsum-summary-item">
              <span>Investment</span>

              <strong>
                {formatMoney(investment)}
              </strong>
            </div>

            <div className="lumpsum-summary-item">
              <span>Expected Return</span>

              <strong>
                {returnRate}% p.a.
              </strong>
            </div>

            <div className="lumpsum-summary-item">
              <span>Duration</span>

              <strong>
                {years} Years
              </strong>
            </div>

          </div>

          {/* BUTTON */}

          <button className="lumpsum-expert-button">
            Talk to an Expert
          </button>

        </div>

      </div>

      <p className="lumpsum-disclaimer">
        This calculator provides an illustration based on the inputs
        provided. Actual investment returns may vary and are not guaranteed.
      </p>

    </section>

    </>
  );
}

export default LumpsumCalculator;