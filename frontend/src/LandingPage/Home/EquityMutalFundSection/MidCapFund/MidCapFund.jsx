import PreFooter from "../../../PreFooter";
import "./MidCapFund.css";

function MidCapFund() {
  return (
    <>
      <div className="mid-cap-page">
        {/* =========================
                MID CAP FUND SECTION
            ========================= */}

        <section className="mid-cap-section">
          <div className="mid-cap-container">
            {/* TITLE */}

            <h1 className="mid-cap-title">Mid Cap Fund</h1>

            {/* =========================
                        FEATURES
                    ========================= */}

            <div className="mid-cap-features">
              {/* FEATURE 1 */}

              <div className="mid-cap-feature">
                <div className="mid-feature-image">
                  <img
                    src="/media/images/different-sector.jpeg"
                    alt="Mid Sized Companies"
                  />
                </div>

                <p>They invest in mid-sized companies.</p>
              </div>

              {/* FEATURE 2 */}

              <div className="mid-cap-feature">
                <div className="mid-feature-image">
                  <img
                    src="/media/images/Thematic-Fund.jpeg"
                    alt="Growth Potential"
                  />
                </div>

                <p>
                  Can potentially take better
                  <br />
                  advantages of a reviving economy.
                </p>
              </div>

              {/* FEATURE 3 */}

              <div className="mid-cap-feature">
                <div className="mid-feature-image">
                  <img
                    src="/media/images/risk.jpeg"
                    alt="High Risk and Returns"
                  />
                </div>

                <p>
                  Subject to volatility. Suitable for
                  <br />
                  people with a high risk &amp; high returns profile.
                </p>
              </div>
            </div>

            {/* =========================
                        BENEFITS
                    ========================= */}

            <div className="mid-cap-benefits">
              <h3>
                <span className="mid-benefit-icon">❗</span>
                Benefits of investing in mid cap funds
              </h3>

              <ul>
                <li>Mid cap stocks are priced lower than large cap stocks.</li>

                <li>Mid cap funds help to diversify your portfolio</li>

                <li>Mid cap stocks give high growth potential</li>

                <li>
                  Mid cap funds tend to perform better than the large cap funds.
                </li>
              </ul>
            </div>

            {/* =========================
                        INVEST BUTTON
                    ========================= */}

            <div className="mid-cap-button">
              <button
                type="button"
                onClick={() => (window.location.href = "/start-investing")}
              >
                Invest Now
              </button>
            </div>
          </div>
        </section>
      </div>

      <PreFooter />
    </>
  );
}

export default MidCapFund;
