import PreFooter from "../../../PreFooter";
import "./SmallCapFund.css";

function SmallCapFund() {
  return (
    <>
      <div className="small-cap-page">
        {/* =========================
                SMALL CAP FUND SECTION
            ========================= */}

        <section className="small-cap-section">
          <div className="small-cap-container">
            {/* TITLE */}

            <h1 className="small-cap-title">Small Cap Fund</h1>

            {/* =========================
                        FEATURES
                    ========================= */}

            <div className="small-cap-features">
              {/* FEATURE 1 */}

              <div className="small-cap-feature">
                <div className="small-feature-image">
                  <img
                    src="/media/images/different-sector.jpeg"
                    alt="Small Sized Companies"
                  />
                </div>

                <p>They invest in small-sized companies.</p>
              </div>

              {/* FEATURE 2 */}

              <div className="small-cap-feature">
                <div className="small-feature-image">
                  <img
                    src="/media/images/Thematic-Fund.jpeg"
                    alt="Investment Horizon"
                  />
                </div>

                <p>
                  Investment horizon should be 7-10
                  <br />
                  years to generate returns according to your expectations.
                </p>
              </div>

              {/* FEATURE 3 */}

              <div className="small-cap-feature">
                <div className="small-feature-image">
                  <img src="/media/images/risk.jpeg" alt="Aggressive Growth" />
                </div>

                <p>
                  Suitable for investor who can tolerate more risk and are
                  looking for more aggressive growth.
                </p>
              </div>
            </div>

            {/* =========================
                        BENEFITS
                    ========================= */}

            <div className="small-cap-benefits">
              <h3>
                <span className="small-benefit-icon">❗</span>
                Benefits of investing in small cap funds
              </h3>

              <ul>
                <li>Small cap stocks are priced lower than mid cap stocks.</li>

                <li>Small cap funds help to diversify your portfolio.</li>

                <li>Small cap funds give high growth potential in long run.</li>

                <li>
                  SIP is the best route for small cap funds to create wealth
                  with maximum returns.
                </li>
              </ul>
            </div>

            {/* =========================
                        INVEST BUTTON
                    ========================= */}

            <div className="small-cap-button">
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

export default SmallCapFund;
