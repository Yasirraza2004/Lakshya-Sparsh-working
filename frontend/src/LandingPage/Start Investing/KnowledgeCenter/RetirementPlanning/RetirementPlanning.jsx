import PreFooter from "../../../PreFooter";
import "./RetirementPlanning.css";

function RetirementPlanning() {
    return (
        <>
        <div className="retirement-planning-page">

            {/* Hero Section */}
            <section className="retirement-planning-hero">
                <div className="retirement-planning-hero-overlay">

                    <div className="retirement-planning-container">
                        <h1>Retirement planning</h1>
                    </div>

                </div>
            </section>


            {/* Main Content */}
            <section className="retirement-planning-content-section">

                <div className="retirement-planning-container">

                    <div className="retirement-planning-content-grid">

                        {/* Left Content */}
                        <div className="retirement-planning-main-content">

                            <p>
                                <strong>Retirement</strong> is one of the most important
                                life events many of us will ever experience. From both a
                                personal and financial perspective, realizing a comfortable
                                retirement is an extensive process that takes sensible
                                planning and years of persistence. Even once it is reached,
                                managing your retirement is an ongoing responsibility that
                                lasts throughout your life.
                            </p>


                            <p>
                                While all of us would like to retire comfortably, the
                                complexity and time required to build a successful
                                retirement plan can make the whole process seem daunting.
                                However, it can often be done with fewer headaches (and
                                financial pain) than you might think – what it takes is
                                some homework, an attainable savings and investment plan,
                                and a long-term commitment.
                            </p>


                            {/* Action Buttons */}
                            <div className="retirement-planning-buttons">

                                <a
                                    href="/contact"
                                    className="retirement-planning-button"
                                >
                                    Get a Free Investment
                                    <br />
                                    Counselling
                                </a>


                                <a
                                    href="/wealth"
                                    className="retirement-planning-button"
                                >
                                    Estimate your Investment
                                    <br />
                                    Requirements
                                </a>

                            </div>

                        </div>


                        {/* Right Side Image */}
                        <div className="retirement-planning-sidebar">

                            <div className="retirement-planning-image-card">

                                <img
                                    src="/media/images/retirement-planning1.jpeg"
                                    alt="Retirement Planning"
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

export default RetirementPlanning;