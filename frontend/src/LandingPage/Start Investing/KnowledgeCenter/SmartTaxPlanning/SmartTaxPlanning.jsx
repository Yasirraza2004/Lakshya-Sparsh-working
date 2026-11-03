import PreFooter from "../../../PreFooter";
import "./SmartTaxPlanning.css";

function SmartTaxPlanning() {
    return (
        <>
        <div className="smart-tax-page">

            {/* Hero Section */}
            <section className="smart-tax-hero">
                <div className="smart-tax-hero-overlay">

                    <div className="smart-tax-container">

                        <h1>Smart tax planning</h1>

                    </div>

                </div>
            </section>


            {/* Main Content */}
            <section className="smart-tax-content-section">

                <div className="smart-tax-container">

                    <div className="smart-tax-content-grid">

                        {/* Left Content */}
                        <div className="smart-tax-main-content">

                            <p>
                                Tax planning may seem like a tedious exercise requiring a
                                lot of effort that may make an ordinary investor nervous at
                                the first glance. Equity Linked Savings Scheme (ELSS)
                                offers a simple way to get tax benefits and at the same time
                                get an opportunity to gain from the potential of Indian
                                equity markets.
                            </p>


                            <p>
                                Simply put, ELSS is a type of diversified equity mutual fund
                                which is qualified for tax exemption under section 80C of
                                the Income Tax Act and offers the twin advantage of capital
                                appreciation and tax benefits. It comes with a lock-in
                                period of three years.
                            </p>


                            <p>
                                <strong>ELSS funds</strong> are one of the best avenues to
                                save tax under Section 80C. This is because along with the
                                tax deduction, the investor also gets the potential upside
                                of investing in the equity markets. Also, no tax is levied
                                on the long-term capital gains from these funds. Moreover,
                                compared to other tax saving options, ELSS has the shortest
                                lock-in period of three years.
                            </p>


                            {/* Action Buttons */}
                            <div className="smart-tax-buttons">

                                <a
                                    href="/contact"
                                    className="smart-tax-button"
                                >
                                    Get a Free Investment
                                    <br />
                                    Counselling
                                </a>


                                <a
                                    href="/elss"
                                    className="smart-tax-button"
                                >
                                    Check the ELSS
                                    <br />
                                    performance
                                </a>


                                <a
                                    href="/elss"
                                    className="smart-tax-button"
                                >
                                    Explore More on
                                    <br />
                                    Taxation
                                </a>

                            </div>

                        </div>


                        {/* Right Side Image */}
                        <div className="smart-tax-sidebar">

                            <div className="smart-tax-image-card">

                                <img
                                    src="/media/images/smart-tax-planning1.jpeg"
                                    alt="Smart Tax Planning"
                                />

                            </div>

                        </div>

                    </div>

                </div>

            </section>

        </div>

        <PreFooter />
        </>
    );
}

export default SmartTaxPlanning;