import "./UnderstandingRisk.css";

function UnderstandingRisk() {
    return (
        <div className="understanding-risk-page">

            {/* Hero Section */}
            <section className="understanding-risk-hero">

                <div className="understanding-risk-hero-overlay">

                    <div className="understanding-risk-container">

                        <h1>
                            Understanding risk in investing
                        </h1>

                    </div>

                </div>

            </section>


            {/* Main Content */}
            <section className="understanding-risk-content-section">

                <div className="understanding-risk-container">

                    {/* Video + Testimonial */}
                    <div className="understanding-risk-top-grid">

                        {/* Video Section */}
                        <div className="understanding-risk-video-section">

                            <div className="understanding-risk-video">

                                <iframe
                                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                                    title="Understanding Risk in Investing"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>

                            </div>

                        </div>


                        {/* Testimonial */}
                        <div className="understanding-risk-testimonial">

                            <div className="understanding-risk-testimonial-image">

                                <div className="understanding-risk-person-placeholder">
                                    <span>👤</span>
                                </div>

                            </div>


                            <div className="understanding-risk-testimonial-content">

                                <p>
                                    In good times, I never realised that Equity has
                                    an inherent market Risk, and exposed almost
                                    everything into Equities. Lakshya Sparsh advised
                                    me to allocate my assets properly and guided me
                                    to invest in some Debt funds also. I still repent,
                                    why I didn't listen to them that time – I lost
                                    heavily due to my lack of knowledge on Risk !
                                </p>

                                <p>
                                    But now I am happy, I understand Risk and do
                                    proper asset allocation as per my appetite -
                                    Thanks to Lakshya Sparsh
                                </p>


                                <div className="understanding-risk-author">
                                    Ram Krishna
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Risk Explanation */}
                    <div className="understanding-risk-explanation">

                        <p>
                            We generally sell mutual funds as an investment product,
                            and like all other products, it also has some risk. The
                            level of risk in a mutual fund depends on what it invests
                            in. The value of most mutual funds will change as the value
                            of their investments goes up and down. Usually, the higher
                            the potential returns, the higher the risk will be. For
                            example, stocks are generally riskier than bonds, so an
                            equity fund tends to be riskier than a fixed income fund.
                        </p>


                        <p className="understanding-risk-heading">
                            <strong>Your Risk is minimised in MF :</strong>
                        </p>


                        <p>
                            Because mutual funds are securities – and not deposits –
                            they're not guaranteed by Government or other deposit
                            insurance. But other safeguards are in place to protect
                            investors:
                        </p>


                        <ul>

                            <li>
                                <strong>Third-party custodian</strong> – holds the
                                assets of a mutual fund. This is usually a trust.
                            </li>

                            <li>
                                <strong>Independent auditor</strong> – reviews and
                                reports on the fund's financial statements each year.
                            </li>

                            <li>
                                <strong>Strong regulator</strong> – SEBI is the
                                regulator for all Mutual Funds in India, which ensures
                                that nothing goes wrong at the management front.
                            </li>

                        </ul>

                    </div>


                    {/* Navigation Links */}
                    <div className="understanding-risk-navigation">

                        <a
                            href="/knowledge_center/why_to_invest.html"
                            className="understanding-risk-navigation-link left"
                        >
                            <span>↖</span>
                            Why to invest
                        </a>


                        <a
                            href="/knowledge_center/how_to_choose_good_funds.html"
                            className="understanding-risk-navigation-link right"
                        >
                            How to Choose Fund
                            <span>↗</span>
                        </a>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default UnderstandingRisk;