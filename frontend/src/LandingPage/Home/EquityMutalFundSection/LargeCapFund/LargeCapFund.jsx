import PreFooter from "../../../PreFooter";
import "./LargeCapFund.css";

function LargeCapFund() {

    return (
        <>
        <div className="large-cap-page">

            {/* =========================
                LARGE CAP CONTENT
            ========================= */}

            <section className="large-cap-section">

                <div className="large-cap-container">

                    {/* TITLE */}

                    <h1 className="large-cap-title">
                        Large Cap Fund
                    </h1>


                    {/* FEATURES */}

                    <div className="large-cap-features">

                        {/* FEATURE 1 */}

                        <div className="large-cap-feature">

                            <div className="feature-image">

                                <img
                                    src="/media/images/large cap funds.jpeg"
                                    alt="Large Cap Companies"
                                />

                            </div>

                            <p>
                                They invest in reputable and
                                <br />
                                financially sound largecap
                                <br />
                                companies.
                            </p>

                        </div>


                        {/* FEATURE 2 */}

                        <div className="large-cap-feature">

                            <div className="feature-image">

                                <img
                                    src="/media/images/portfolio stability.jpeg"
                                    alt="Portfolio Stability"
                                />

                            </div>

                            <p>
                                Aim to strengthen and provide
                                <br />
                                stability to equity portion of your
                                <br />
                                portfolio.
                            </p>

                        </div>


                        {/* FEATURE 3 */}

                        <div className="large-cap-feature">

                            <div className="feature-image">

                                <img
                                    src="/media/images/sustainable returns.jpeg"
                                    alt="Sustainable Returns"
                                />

                            </div>

                            <p>
                                Provide sustainable returns over a
                                <br />
                                longer period of time.
                            </p>

                        </div>

                    </div>


                    {/* BENEFITS */}

                    <div className="large-cap-benefits">

                        <h3>
                            <span className="benefit-icon">
                                ❗
                            </span>

                            Benefits of investing in large cap funds
                        </h3>


                        <ul>

                            <li>
                                Large Cap funds are less volatile than mid cap
                                and small cap funds.
                            </li>

                            <li>
                                During the downturns in the market/business,
                                investors flock to large cap firms as they are
                                a safe investment.
                            </li>

                            <li>
                                As the investments are made in large companies,
                                these funds tend to have low- risk.
                            </li>

                        </ul>

                    </div>


                    {/* INVEST BUTTON */}

                    <div className="large-cap-button">

                        <button
                            type="button"
                            onClick={() =>
                                window.location.href = "/start-investing"
                            }
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

export default LargeCapFund;