import "./WhyToInvest.css";

function WhyToInvest() {
    return (
        <div className="why-to-invest-page">

            {/* Hero Section */}
            <section className="why-to-invest-hero">
                <div className="why-to-invest-hero-overlay">

                    <div className="why-to-invest-container">

                        <h1>Why to invest ?</h1>

                    </div>

                </div>
            </section>


            {/* Main Content */}
            <section className="why-to-invest-content-section">

                <div className="why-to-invest-container">

                    <div className="why-to-invest-top-grid">

                        {/* Video Section */}
                        <div className="why-to-invest-video-section">

                            <div className="why-to-invest-video">

                                <iframe
                                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                                    title="Why to Invest"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>

                            </div>

                        </div>


                        {/* Testimonial */}
                        <div className="why-to-invest-testimonial">

                            <div className="why-to-invest-testimonial-image">

                                <div className="why-to-invest-person-placeholder">
                                    <span>👤</span>
                                </div>

                            </div>


                            <div className="why-to-invest-testimonial-content">

                                <p>
                                    I had never realised that investments is such a
                                    simple task, till when I met Lakshya Sparsh Team.
                                    I am really thankful to him and the team for
                                    providing me a simplified explanation of the
                                    subject.
                                </p>

                                <p>
                                    They made me realise that investment is a habit !
                                    A good habit, to achieve all your future financial
                                    Gaols. And today, I am happy that I am investing -
                                    not just saving ! So I can say 'Learn to Earn'
                                </p>

                                <div className="why-to-invest-author">
                                    Ram Krishna
                                </div>

                            </div>

                        </div>

                    </div>


                    {/* Investment Explanation */}
                    <div className="why-to-invest-explanation">

                        <p>
                            Putting money in a savings account is just like putting
                            money in your PIGGY Bank. Investing is to get desired growth
                            in those savings ! The main idea behind investing is to put
                            money you've saved into things you think will go up in value
                            over time. Things like stocks, or bonds, or real estate.
                            You can make profit by selling your investments at
                            appreciated price or by way of dividends declared by the
                            issuers.
                        </p>


                        <p>
                            One big difference between saving and investing is that
                            investing always involves risk. If the value of your
                            investment goes up, you could earn more than you would in a
                            savings account. But if the value goes down, you could lose
                            some or even all of your money. That's why you should
                            understand the Risk involved in Investing, before you start.
                        </p>

                    </div>


                    {/* Next Topic */}
                    <div className="why-to-invest-next-topic">

                        <a
                            href="/knowledge_center/understanding_risk_in_investing.html"
                            className="why-to-invest-risk-link"
                        >
                            Understanding Risk in investing
                            <span>↗</span>
                        </a>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default WhyToInvest;