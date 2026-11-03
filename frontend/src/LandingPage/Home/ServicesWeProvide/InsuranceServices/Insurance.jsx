import PreFooter from "../../../PreFooter";
import "./Insurance.css";
import { Link } from "react-router-dom";

function Insurance() {
    return (
        <>
        <div className="insurance-page">

            {/* BANNER */}
            <section className="insurance-banner">

                <div className="insurance-banner-content">

                    <div className="insurance-banner-text">

                        <h1>
                            Insurance
                        </h1>
                        
                    </div>

                </div>

            </section>


            {/* INSURANCE INTRO */}
            <section className="insurance-section">

                <div className="insurance-container">

                    <h2>
                        Insuring the future of your loved ones
                    </h2>

                    <p className="insurance-intro">
                        Insurance is a means of protection from financial loss.
                        It is a form of risk management primarily used to hedge
                        against the risk of a contingent, uncertain loss.
                    </p>


                    {/* LIFE INSURANCE CARD */}
                    <div className="insurance-card-container">

                        <Link
                            to="/insurance/life_insurance"
                            className="insurance-card"
                        >

                            <img
                                src="/media/images/life-insurance-back.jpeg"
                                alt="Life Insurance"
                            />

                            <div className="insurance-card-overlay">

                                <h3>
                                    Life Insurance
                                </h3>

                            </div>

                        </Link>

                    </div>

                </div>

            </section>

        </div>

        <PreFooter />
        </>
    );
}

export default Insurance;