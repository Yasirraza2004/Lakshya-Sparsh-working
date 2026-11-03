import { useState } from "react";
import "./LifeInsurance.css";
import PreFooter from "../../../../PreFooter";

function LifeInsurance() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        message: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Thank you! We will get back to you soon.");

        setFormData({
            name: "",
            email: "",
            mobile: "",
            message: ""
        });
    };


    return (
        <>
        <div className="life-insurance-page">

            {/* =========================
                TOP BANNER
            ========================= */}

            <section className="life-insurance-banner">

                <div className="life-insurance-banner-content">

                    <div className="life-insurance-banner-text">

                        <h1>Life Insurance</h1>

                    </div>

                </div>

            </section>


            {/* =========================
                MAIN CONTENT
            ========================= */}

            <section className="life-insurance-section">

                <div className="life-insurance-container">


                    {/* =========================
                        LEFT FORM
                    ========================= */}

                    <div className="life-insurance-form">

                        <h2>
                            Don’t Have an
                            <br />
                            Insurance ! <span>or</span>
                        </h2>

                        <h3>
                            Want guidance in selecting a
                            <br />
                            plan, just fill the form below &
                            <br />
                            get in touch with us
                        </h3>


                        <form onSubmit={handleSubmit}>

                            <input
                                type="text"
                                name="name"
                                placeholder="YOUR NAME"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />


                            <input
                                type="email"
                                name="email"
                                placeholder="EMAIL"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />


                            <input
                                type="tel"
                                name="mobile"
                                placeholder="MOBILE"
                                value={formData.mobile}
                                onChange={handleChange}
                                required
                            />


                            <textarea
                                name="message"
                                placeholder="YOUR MESSAGE"
                                value={formData.message}
                                onChange={handleChange}
                                required
                            />


                            <button type="submit">
                                Get Help From Us
                            </button>

                        </form>

                    </div>


                    {/* =========================
                        RIGHT CONTENT
                    ========================= */}

                    <div className="life-insurance-content">


                        {/* =========================
                            WHY LIFE INSURANCE
                        ========================= */}

                        <h2>
                            Why Life Insurance?
                        </h2>


                        <p>
                            We prioritize insurance planning is a must because
                            it is protection to the life cover risk. It will help
                            you understand whether you are under-insured or
                            over-insured and the existing policies can be
                            earmarked in the financial planning structure.
                        </p>


                        <p>
                            Life insurance is important to people who want to
                            protect their family from financial distress after
                            their death. It can be used to provide financial
                            security for loved ones.
                        </p>


                        {/* =========================
                            LIC IMAGE
                        ========================= */}

                        <div className="lic-image-container">

                            <a
                                href="https://www.licindia.in/"
                                target="_blank"
                                rel="noopener noreferrer"
                                title="Visit LIC Official Website"
                            >

                                <img
                                    src="/media/images/lic.jpeg"
                                    alt="Life Insurance Corporation of India"
                                />

                            </a>

                        </div>


                        <p>
                            The proceeds from a life insurance policy are paid
                            to the beneficiary on a tax-free basis, which
                            provides a lump sum that can be used for a number
                            of purposes. Depending on the type of policy chosen,
                            life insurance can also provide a savings component
                            for the policyholder.
                        </p>


                        {/* =========================
                            FINANCIAL SECURITY
                        ========================= */}

                        <h2>
                            How does life insurance provide financial security ?
                        </h2>


                        <p>
                            The main reason people consider buying life
                            insurance is to protect the people they leave
                            behind. Having coverage in place is especially
                            important during the policyholder's main earning
                            years. During this time, he or she may have major
                            expenses such as a mortgage, car payments and the
                            like.
                        </p>


                        <p>
                            He or she may have young children that need to be
                            cared for, and/or aging parents that require
                            assistance. In the case of a stay at home parent
                            or spouse the funds may be used to pay someone
                            else to perform the tasks, like cooking,
                            housekeeping and child care, that the deceased
                            once provided.
                        </p>


                        <p>
                            The death benefit that an insurance policy provides
                            is meant to replace income so that the
                            policyholder's family is less likely to have to
                            face a major lifestyle change in addition to
                            dealing with the loss of someone who is very
                            important to them. Most people are underinsured,
                            as opposed to having enough coverage.
                        </p>


                        <p>
                            Ideally, the level of protection chosen should be
                            enough to replace the policyholder's gross income
                            for a number of years. Where the policyholder has
                            a young family, it's not unrealistic to look a
                            plan that will pay out an amount that is equal
                            10 years of earnings or more.
                        </p>


                        {/* =========================
                            DEATH BENEFIT
                        ========================= */}

                        <h3>
                            What can a death benefit be used for ?
                        </h3>


                        <p>
                            The death benefit that is paid out under a life
                            insurance policy can be used for any purpose the
                            beneficiary deems appropriate. It's very common
                            for the proceeds from the policy to be used to
                            pay bills and debts the deceased has left behind.
                            That way, his or her survivors are not required
                            to pay them on the deceased's behalf.
                        </p>


                        <p>
                            The cost of final arrangements is something that
                            can be pricey, even for a very simple cremation
                            or burial. An insurance policy can also be used
                            to pay for funeral expenses and take that pressure
                            off the family.
                        </p>


                        <p>
                            Proceeds from a life insurance policy can also be
                            used to pay off a mortgage or for general living
                            expenses. If the policyholder has young children,
                            the money may be used for childcare expenses or
                            to hire a housekeeper or nanny. The funds can
                            also be used to pay for post-secondary education
                            for the insured's children, if desired.
                        </p>


                        <p>
                            Anything that the policyholder's salary was used
                            for when he or she was alive can be paid for with
                            the death benefit that an insurance policy
                            provides. The funds can also be invested to
                            provide a source of income for the surviving
                            spouse or partner in retirement.
                        </p>


                        {/* =========================
                            SAVINGS
                        ========================= */}

                        <h3>
                            How can life insurance provide savings ?
                        </h3>


                        <p>
                            Some types of life insurance plans have a savings
                            component as well as provide protection if the
                            policyholder dies. When the person chooses a
                            permanent, universal or whole life insurance
                            policy, part of the money that he or she pays in
                            premiums is used to fund an investment savings
                            plan. The money grows over time and the
                            policyholder can use the money as collateral for
                            a loan from the insurer if he or she needs to
                            get access to cash in a hurry.
                        </p>


                        <p>
                            The policyholder also has the option of canceling
                            the policy and gaining access to the pool of
                            funds if he or she wishes to do so. This is not
                            a move that should be taken lightly and the
                            policyholder should contact his or her agent or
                            insurance company to discuss options before
                            taking this step.
                        </p>


                        <p>
                            The individual may also choose to cancel the
                            existing policy and replace it with a term life
                            policy that still provides a level of financial
                            protection but does not include the savings
                            component.
                        </p>


                        {/* =========================
                            FINAL CONTENT
                        ========================= */}

                        <p>
                            Life insurance is a product that should be included
                            in a plan to protect the policyholder and his or
                            her family from financial disaster. Life insurance
                            is important because it can be used to pay bills
                            and expenses on behalf of the deceased. The funds
                            from a death benefit replace the policyholder's
                            income and can be used to help to maintain a
                            lifestyle similar to the one the policyholder's
                            family had before disaster struck. It is one of
                            the most loving things that a person can do for
                            his or her family, since the person who is
                            insured will not be benefiting from the coverage
                            - the ones he or she loves the most will instead.
                        </p>


                    </div>

                </div>

            </section>

        </div>

        <PreFooter/>
        </>
    );
}

export default LifeInsurance;