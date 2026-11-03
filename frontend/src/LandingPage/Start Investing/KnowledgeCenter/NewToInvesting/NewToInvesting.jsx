import PreFooter from "../../../PreFooter";
import "./NewToInvesting.css";

function NewToInvesting() {
    return (
        <>
        <div className="new-investing-page">

            {/* Hero Section */}
            <section className="new-investing-hero">
                <div className="new-investing-hero-overlay">
                    <div className="new-investing-container">
                        <h1>New to investing</h1>
                    </div>
                </div>
            </section>


            {/* Main Content */}
            <section className="new-investing-content-section">

                <div className="new-investing-container">

                    <div className="new-investing-content-grid">

                        {/* Left Content */}
                        <div className="new-investing-main-content">

                            <p>
                                If you want a shot at becoming wealthy, you need to do more
                                than simply earn money. Most importantly, you need to save
                                the money you earn. And then, you need to grow your money.
                                In order to grow your money, you need to learn - how to
                                invest ?
                            </p>

                            <p>
                                We at <strong>Lakshya Sparsh</strong> offer you complete
                                handholding services to become an investor. You can use
                                your money to acquire things that offer the potential for
                                profitable returns through one or more of the following.
                            </p>

                            <ul>
                                <li>
                                    <strong>
                                        Investment in Fixed Income Products via Mutual Funds
                                    </strong>
                                </li>

                                <li>
                                    <strong>
                                        Investment in Large Cap and steady Equity Products via Mutual Funds
                                    </strong>
                                </li>

                                <li>
                                    <strong>
                                        Invest in mixture of both Debt and Equity Products
                                    </strong>
                                </li>
                            </ul>

                            <p>
                                As you learn to become an investor, you will begin to devote
                                your limited resources to the things with the largest
                                potential for returns. That may be buying stocks and bonds,
                                or at least mutual funds or exchange-traded funds. Thanks
                                to advances in technology and facilities in Mutual funds,
                                you can start to invest with as little as Rs. 1000/month
                                through SIP (Systematic Investment Plan).
                            </p>


                            {/* Action Buttons */}
                            <div className="new-investing-buttons">

                                <a
                                    href="/contact"
                                    className="new-investing-button"
                                >
                                    Get a Free Investment
                                    <br />
                                    Counselling
                                </a>

                                <a
                                    href="/wealth"
                                    className="new-investing-button"
                                >
                                    Estimate your Investment
                                    <br />
                                    Requirements
                                </a>

                                <a
                                    href="/sip_calculator"
                                    className="new-investing-button"
                                >
                                    Calculate the Power of
                                    <br />
                                    Recurring Savings
                                </a>

                            </div>

                        </div>


                        {/* Right Side Image */}
                        <div className="new-investing-sidebar">

                            <div className="new-investing-card">

                                <img
                                    src="/media/images/first-time-investor.jpeg"
                                    alt="First Time Investor in Mutual Funds"
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

        <PreFooter/>
        </>
    );
}

export default NewToInvesting;