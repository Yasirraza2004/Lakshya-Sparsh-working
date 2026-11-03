import "./HowToCreateFinancialGoals.css";

function HowToCreateFinancialGoals() {
    return (
        <div className="how-to-create-financial-goals-page">

            {/* Hero Section */}
            <section className="how-to-create-financial-goals-hero">
                <div className="how-to-create-financial-goals-hero-overlay">
                    <div className="how-to-create-financial-goals-container">
                        <h1>How to create financial goals ?</h1>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <section className="how-to-create-financial-goals-content-section">
                <div className="how-to-create-financial-goals-container">

                    {/* Video + Testimonial */}
                    <div className="how-to-create-financial-goals-top-grid">

                        <div className="how-to-create-financial-goals-video-section">
                            <div className="how-to-create-financial-goals-video">
                                <iframe
                                    src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
                                    title="How to create financial goals"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowFullScreen
                                ></iframe>
                            </div>
                        </div>

                        <div className="how-to-create-financial-goals-testimonial">
                            <div className="how-to-create-financial-goals-testimonial-image">
                                <div className="how-to-create-financial-goals-person-placeholder">
                                    <span>👤</span>
                                </div>
                            </div>

                            <div className="how-to-create-financial-goals-testimonial-content">
                                <p>
                                    I always though that Fianncial Planning is just a
                                    paper game and it just a waste of time! I use to
                                    invest without planning. Due to this very nature,
                                    I got panic during the last recession and sold all
                                    my Equity investments and also stopped SIPs…despite
                                    the fact that I needed the funds after 10 years!
                                    Had I tagged my investments with a Goal, then would
                                    have saved myself from this re-investment Risk,
                                    which pushed me back in terms of current ROI.
                                    Lakshya Sparsh are the best guys to create Goal for you
                                </p>
                                <div className="how-to-create-financial-goals-author">Ram Krishna</div>
                            </div>
                        </div>

                    </div>

                    {/* Explanation */}
                    <div className="how-to-create-financial-goals-explanation">

                        <p>
                            Here are ten powerful reasons why financial planning is
                            must! And doing it through us – will get you where you
                            want to be :
                        </p>

                        <ul>
                            <li>
                                <strong>Income:</strong> It's possible to manage income
                                more effectively through planning. Managing income
                                helps you understand how much money you'll need for
                                tax payments, other monthly expenditures and savings.
                            </li>
                            <li>
                                <strong>Cash Flow:</strong> Increase cash flows by
                                carefully monitoring your spending patterns and
                                expenses. Tax planning, prudent spending and careful
                                budgeting will help you keep more of your hard earned
                                cash.
                            </li>
                            <li>
                                <strong>Capital:</strong> An increase in cash flow,
                                can lead to an increase in capital. Allowing you to
                                consider investments to improve your overall
                                financial well-being.
                            </li>
                            <li>
                                <strong>Family Security:</strong> Providing for your
                                family's financial security is an important part of
                                the financial planning process. Having the proper
                                insurance coverage and policies in place can provide
                                peace of mind for you and your loved ones
                            </li>
                            <li>
                                <strong>Investment:</strong> A proper financial plan
                                considers your personal circumstances, objectives
                                and risk tolerance. It acts as a guide in helping
                                choose the right types of investments to fit your
                                needs, personality, and goals.
                            </li>
                            <li>
                                <strong>Standard of Living:</strong> The savings
                                created from good planning can prove beneficial in
                                difficult times. For example, you can make sure there
                                is enough insurance coverage to replace any lost
                                income should a family bread winner become unable to
                                work.
                            </li>
                            <li>
                                <strong>Financial Understanding:</strong> Better
                                financial understanding can be achieved when
                                measurable financial goals are set, the effects of
                                decisions understood, and results reviewed. Giving
                                you a whole new approach to your budget and improving
                                control over your financial lifestyle.
                            </li>
                            <li>
                                <strong>Assets:</strong> A nice 'cushion' in the form
                                of assets is desirable. But many assets come with
                                liabilities attached. So, it becomes important to
                                determine the real value of an asset. The knowledge
                                of settling or canceling the liabilities, comes with
                                the understanding of your finances. The overall
                                process helps build assets that don't become a
                                burden in the future.
                            </li>
                            <li>
                                <strong>Savings:</strong> It used to be called saving
                                for a rainy day. But sudden financial changes can
                                still throw you off track. It is good to have some
                                investments with high liquidity. These investments
                                can be utilized in times of emergency or for
                                educational purposes.
                            </li>
                            <li>
                                <strong>Ongoing Advice:</strong> Establishing a
                                relationship with us will help you to achieving your
                                goals. We will help you to assess your current
                                financial circumstances and develop a comprehensive
                                plan customized for you.
                            </li>
                        </ul>

                    </div>

                    {/* Navigation Links */}
                    <div className="how-to-create-financial-goals-navigation">
                        <a href="/knowledge_center/why_to_invest.html" className="how-to-create-financial-goals-navigation-link left">
                            <span>↖</span> Why to Invest ?
                        </a>
                        <a href="/knowledge_center/index.html" className="how-to-create-financial-goals-navigation-link right">
                            Back to Knowledge Centre <span>↗</span>
                        </a>
                    </div>

                </div>
            </section>

        </div>
    );
}

export default HowToCreateFinancialGoals;