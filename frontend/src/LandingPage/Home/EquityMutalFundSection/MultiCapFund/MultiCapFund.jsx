import PreFooter from "../../../PreFooter";
import "./MultiCapFund.css";

function MultiCapFund() {

    return (
        <>
        <div className="multi-cap-page">

            {/* =========================
                MULTI CAP FUND SECTION
            ========================= */}

            <section className="multi-cap-section">

                <div className="multi-cap-container">

                    {/* TITLE */}

                    <h1 className="multi-cap-title">
                        Multi Cap Fund
                    </h1>


                    {/* =========================
                        FEATURES
                    ========================= */}

                    <div className="multi-cap-features">


                        {/* FEATURE 1 */}

                        <div className="multi-cap-feature">

                            <div className="multi-feature-image">

                                <img
                                    src="/media/images/large cap funds.jpeg"
                                    alt="Multi Cap Companies"
                                />

                            </div>

                            <p>
                                They invest in stocks across market
                                <br />
                                capitalization.
                            </p>

                        </div>


                        {/* FEATURE 2 */}

                        <div className="multi-cap-feature">

                            <div className="multi-feature-image">

                                <img
                                    src="/media/images/portfolio stability.jpeg"
                                    alt="Portfolio Gyrations"
                                />

                            </div>

                            <p>
                                Resort to portfolio gyrations
                                <br />
                                commensurate with the market
                                <br />
                                condition.
                            </p>

                        </div>


                        {/* FEATURE 3 */}

                        <div className="multi-cap-feature">

                            <div className="multi-feature-image">

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


                    {/* =========================
                        BENEFITS
                    ========================= */}

                    <div className="multi-cap-benefits">

                        <h3>

                            <span className="multi-benefit-icon">
                                ❗
                            </span>

                            Benefits of investing in multi cap funds

                        </h3>


                        <ul>

                            <li>
                                Multi Cap funds are relatively less risky compared
                                to a pure mid cap or a small cap fund and are suitable
                                for not-so-aggressive investors.
                            </li>

                            <li>
                                Investing in a multi-cap fund, the retail investor can
                                leverage a fund manager's expertise in terms of taking
                                market cap and sector related calls.
                            </li>

                            <li>
                                Their portfolio comprises of large cap, midcap and
                                small cap stocks.
                            </li>

                        </ul>

                    </div>


                    {/* =========================
                        INVEST BUTTON
                    ========================= */}

                    <div className="multi-cap-button">

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

export default MultiCapFund;