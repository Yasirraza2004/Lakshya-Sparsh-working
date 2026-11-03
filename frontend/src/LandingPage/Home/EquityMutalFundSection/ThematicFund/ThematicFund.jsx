import PreFooter from "../../../PreFooter";
import "./ThematicFund.css";

function ThematicFund() {

    return (
        <>
        <div className="thematic-fund-page">

            {/* =========================
                THEMATIC FUND SECTION
            ========================= */}

            <section className="thematic-fund-section">

                <div className="thematic-fund-container">

                    {/* TITLE */}

                    <h1 className="thematic-fund-title">
                        Thematic Fund
                    </h1>


                    {/* =========================
                        FEATURES
                    ========================= */}

                    <div className="thematic-fund-features">


                        {/* FEATURE 1 */}

                        <div className="thematic-fund-feature">

                            <div className="thematic-feature-image">

                                <img
                                    src="/media/images/large cap funds.jpeg"
                                    alt="Thematic Fund"
                                />

                            </div>

                            <p>
                                Focus on stocks of different sectors,
                                <br />
                                but are related to the common theme.
                            </p>

                        </div>


                        {/* FEATURE 2 */}

                        <div className="thematic-fund-feature">

                            <div className="thematic-feature-image">

                                <img
                                    src="/media/images/portfolio stability.jpeg"
                                    alt="Risk"
                                />

                            </div>

                            <p>
                                More volatile and riskier than the
                                <br />
                                broad market, but relatively less risky
                                <br />
                                than the sectoral funds.
                            </p>

                        </div>


                        {/* FEATURE 3 */}

                        <div className="thematic-fund-feature">

                            <div className="thematic-feature-image">

                                <img
                                    src="/media/images/sustainable returns.jpeg"
                                    alt="Different Sectors"
                                />

                            </div>

                            <p>
                                Invested across the different sectors
                                <br />
                                that are woven around the specific
                                <br />
                                theme.
                            </p>

                        </div>

                    </div>


                    {/* =========================
                        BENEFITS
                    ========================= */}

                    <div className="thematic-fund-benefits">

                        <h3>

                            <span className="thematic-benefit-icon">
                                ❗
                            </span>

                            Benefits of investing in thematic funds

                        </h3>


                        <ul>

                            <li>
                                Thematic funds are more diversified as the
                                investments are concentrated in several sectors
                                and not in a single sector.
                            </li>

                            <li>
                                An opportunity to invest in the theme related
                                sectors that have a strong growth potential due
                                to the boom in the industry.
                            </li>

                            <li>
                                As the investments are made in construction
                                companies, cement companies, steel companies
                                and the other companies that are related to the
                                infrastructure sector.
                            </li>

                        </ul>

                    </div>


                    {/* =========================
                        INVEST BUTTON
                    ========================= */}

                    <div className="thematic-fund-button">

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

export default ThematicFund;