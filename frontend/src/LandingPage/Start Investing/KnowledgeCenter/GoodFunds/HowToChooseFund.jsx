import "./HowToChooseFund.css";

function HowToChooseFund() {
    return (
        <div className="how-to-choose-fund-page">

            {/* Hero Section */}
            <section className="how-to-choose-fund-hero">
                <div className="how-to-choose-fund-hero-overlay">
                    <div className="how-to-choose-fund-container">
                        <h1>How to choose funds ?</h1>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="how-to-choose-fund-content-section">
                <div className="how-to-choose-fund-container">

                    {/* Video + Testimonial */}
                    <div className="how-to-choose-fund-top-grid">

                        <div className="how-to-choose-fund-video-section">
                            <div className="how-to-choose-fund-video">
                                <iframe
                                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                                    title="How to choose funds"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        <div className="how-to-choose-fund-testimonial">
                            <div className="how-to-choose-fund-testimonial-image">
                                <div className="how-to-choose-fund-person-placeholder">
                                    <span>👤</span>
                                </div>
                            </div>

                            <div className="how-to-choose-fund-testimonial-content">
                                <p>
                                    Choosing a good fund is never easy! It just like choosing
                                    a good medicine – there are different one for different
                                    illness! You must identify the illness first, and then
                                    find the suitable medicine. At Lakshya Sparsh, they do
                                    the same! They created my Goals till next 40 years and
                                    then recommended me the Mutual funds according to each
                                    of my Goals – in some cases high Risk and in some cases
                                    low Risk! Great show Lakshya Sparsh
                                </p>
                                <div className="how-to-choose-fund-author">Ram Krishna</div>
                            </div>
                        </div>

                    </div>

                    {/* Explanation */}
                    <div className="how-to-choose-fund-explanation">

                        <p>
                            To begin with, you should identify your goals, investment
                            horizon to achieve them and your risk profile.
                        </p>

                        <p className="how-to-choose-fund-heading">
                            <strong>Your should go for equity schemes if you have:</strong>
                        </p>

                        <ul>
                            <li>Long-term goals</li>
                            <li>Investment horizon of five years or more</li>
                            <li>You have high risk appetite</li>
                        </ul>

                        <p>
                            Now that you are qualified to invest in equity mutual
                            funds, you have to go a little deeper and find out
                            exactly how much risk can you tolerate. In other words,
                            are you a conservative, moderate or an aggressive investor.
                        </p>

                        <ul>
                            <li>
                                If you are moderate investor, you should invest only
                                in large cap and multicap (they are also called
                                diversified equity) schemes.
                            </li>
                            <li>
                                If you are an aggressive investor, you can pick up
                                midcap and smallcap schemes. You can also add sectoral
                                scheme if you have sound knowledge about the sectors.
                            </li>
                        </ul>

                    </div>

                    {/* Navigation Links */}
                    <div className="how-to-choose-fund-navigation">
                        <a href="/knowledge_center/why_to_invest.html" className="how-to-choose-fund-navigation-link left">
                            <span>↖</span> Why to invest
                        </a>
                        <a href="/knowledge_center/how_small_savings_become_big.html" className="how-to-choose-fund-navigation-link right">
                            How Small Savings Become Big <span>↗</span>
                        </a>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default HowToChooseFund;