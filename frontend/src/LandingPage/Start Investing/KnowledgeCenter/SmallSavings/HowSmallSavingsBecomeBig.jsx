import "./HowSmallSavingsBecomeBig.css";

function HowSmallSavingsBecomeBig() {
    return (
        <div className="how-small-savings-become-big-page">

            {/* Hero Section */}
            <section className="how-small-savings-become-big-hero">
                <div className="how-small-savings-become-big-hero-overlay">
                    <div className="how-small-savings-become-big-container">
                        <h1>How small savings become big ?</h1>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="how-small-savings-become-big-content-section">
                <div className="how-small-savings-become-big-container">

                    {/* Video + Testimonial */}
                    <div className="how-small-savings-become-big-top-grid">

                        <div className="how-small-savings-become-big-video-section">
                            <div className="how-small-savings-become-big-video">
                                <iframe
                                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                                    title="What is SIP (Systematic Investment Plan)?"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        <div className="how-small-savings-become-big-testimonial">
                            <div className="how-small-savings-become-big-testimonial-image">
                                <div className="how-small-savings-become-big-person-placeholder">
                                    <span>👤</span>
                                </div>
                            </div>

                            <div className="how-small-savings-become-big-testimonial-content">
                                <p>
                                    My Investments of Rs 25000 per month has become Rs 8
                                    crores in 20 years by investing in 4 top mutual fund
                                    schemes. I had never dreamt about this figure when I
                                    actually started investing in 1997. During the journey,
                                    I met Lakshya Sparsh Team and he taught me the basic
                                    style of SIP investing – choosing the right dates,
                                    diversifying among sectors, choosing the contra funds
                                    and many more. This has further enhanced my capital
                                    now – Thanks you sir for your guidance and unbiased help
                                </p>
                                <div className="how-small-savings-become-big-author">Ram Krishna</div>
                            </div>
                        </div>

                    </div>

                    {/* Explanation */}
                    <div className="how-small-savings-become-big-explanation">
                        <p>
                            One can generate a big wealth through small but regular
                            savings in SIP (Systematic Investment Plan). SIP is a
                            method of investing a fixed sum, regularly, in a mutual
                            fund scheme. SIP allows one to buy units on a given date
                            each month, so that one can implement a saving plan for
                            themselves. The biggest advantage of SIP is that one need
                            not time the market. In timing the market, one can miss
                            the larger rally and may stay out while markets were
                            doing well or may enter at a wrong time when either
                            valuation have peaked or markets are on the verge of
                            declining. Rather than timing the market, investing every
                            month will ensure that one is invested at the high and
                            the low, and make the best out of an opportunity that
                            could be tough to predict in advance.
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="how-small-savings-become-big-navigation">
                        <a href="/knowledge_center/How_to_choose_fund.html" className="how-small-savings-become-big-navigation-link left">
                            <span>↖</span> How to choose Funds ?
                        </a>
                        <a href="/knowledge_center/how_to_create_financial_goals.html" className="how-small-savings-become-big-navigation-link right">
                            How to Create Financial Goals <span>↗</span>
                        </a>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default HowSmallSavingsBecomeBig;