import { useState } from "react";
import "./submitFeedback.css";

function SubmitFeedback() {

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        mobile: "",
        city: "",
        feedback: ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        alert("Thank you for your feedback!");

        setFormData({
            name: "",
            email: "",
            mobile: "",
            city: "",
            feedback: ""
        });
    };

    const feedbacks = [
        {
            name: "Aditya Dubey",
            from: "Agra",
            date: "09.Aug.2018",
            message:
                "Lovely firm to deal with. Friendly, professional and above all honest."
        },
        {
            name: "Akash Kodesia",
            from: "Lucknow",
            date: "07.Aug.2018",
            message:
                "Very big thank you for helping us sort out our mortgage, we really appreciate the effort and hours you put in just so that we were able to buy our first house."
        },
        {
            name: "Deep Rastogi",
            from: "Mumbai",
            date: "04.Aug.2018",
            message:
                "Great help discussing all of mine and my families protection needs giving us sound financial advice now and for the future."
        },
        {
            name: "Satya Mishra",
            from: "Delhi",
            date: "04.Aug.2018",
            message:
                ""
        }
    ];

    return (
        <div className="feedback-page">

            {/* =========================
                HERO SECTION
            ========================= */}

            <section className="feedback-hero">

                <div className="feedback-hero-overlay">

                    <div className="feedback-container">

                        <div className="feedback-hero-content">

                            <span className="feedback-hero-small">
                                Lakshya Sparsh Financial Services
                            </span>

                            <h1>Feedback</h1>

                        </div>

                    </div>

                </div>

            </section>


            {/* =========================
                MAIN SECTION
            ========================= */}

            <section className="feedback-main">

                <div className="feedback-container">

                    <div className="feedback-grid">


                        {/* =========================
                            LEFT SIDE
                        ========================= */}

                        <div className="feedback-testimonials">

                            <div className="feedback-section-heading">

                                <span className="feedback-heading-line"></span>

                                <div>
                                    <span className="feedback-heading-small">
                                        What our clients say
                                    </span>

                                    <h2>
                                        Testimonials / Feedbacks
                                        <br />
                                        <span>from our Investors</span>
                                    </h2>
                                </div>

                            </div>


                            <div className="feedback-list">

                                {feedbacks.map((feedback, index) => (

                                    <div
                                        className="feedback-card"
                                        key={index}
                                    >

                                        <div className="feedback-card-top">

                                            <div className="feedback-avatar">
                                                {feedback.name.charAt(0)}
                                            </div>

                                            <div className="feedback-person">

                                                <h3>
                                                    {feedback.name}
                                                </h3>

                                                <span>
                                                    {feedback.from}
                                                </span>

                                            </div>

                                            <div className="feedback-date">
                                                {feedback.date}
                                            </div>

                                        </div>


                                        <div className="feedback-card-details">

                                            <p>
                                                <strong>Posted By:</strong>{" "}
                                                {feedback.name}
                                            </p>

                                            <p>
                                                <strong>Posted From:</strong>{" "}
                                                {feedback.from}
                                            </p>

                                            <p>
                                                <strong>Posted On:</strong>{" "}
                                                {feedback.date}
                                            </p>

                                            {feedback.message && (
                                                <p className="feedback-message">
                                                    <strong>Message:</strong>{" "}
                                                    {feedback.message}
                                                </p>
                                            )}

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* =========================
                            RIGHT SIDE
                        ========================= */}

                        <div className="feedback-form-wrapper">

                            <div className="feedback-form-header">

                                <span className="feedback-form-icon">
                                    ✦
                                </span>

                                <div>
                                    <span>
                                        We value your opinion
                                    </span>

                                    <h2>
                                        Post Feedback
                                    </h2>
                                </div>

                            </div>


                            <div className="feedback-form-intro">

                                <h3>
                                    We are happy to hear from you.
                                </h3>

                                <p>
                                    Share your experience with Lakshya Sparsh
                                    and help us serve you better.
                                </p>

                            </div>


                            <form
                                className="feedback-form"
                                onSubmit={handleSubmit}
                            >

                                {/* Name */}

                                <div className="feedback-input-group">

                                    <label htmlFor="name">
                                        Your Name:
                                    </label>

                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Enter your name"
                                        required
                                    />

                                </div>


                                {/* Email */}

                                <div className="feedback-input-group">

                                    <label htmlFor="email">
                                        Your Email:
                                    </label>

                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="Enter your email"
                                        required
                                    />

                                </div>


                                {/* Mobile */}

                                <div className="feedback-input-group">

                                    <label htmlFor="mobile">
                                        Your Mobile/
                                        <br />
                                        Landline Number:
                                    </label>

                                    <input
                                        type="tel"
                                        id="mobile"
                                        name="mobile"
                                        value={formData.mobile}
                                        onChange={handleChange}
                                        placeholder="Enter your mobile number"
                                    />

                                </div>


                                {/* City */}

                                <div className="feedback-input-group">

                                    <label htmlFor="city">
                                        Your City:
                                    </label>

                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        value={formData.city}
                                        onChange={handleChange}
                                        placeholder="Enter your city"
                                    />

                                </div>


                                {/* Feedback */}

                                <div className="feedback-input-group feedback-textarea-group">

                                    <label htmlFor="feedback">
                                        Your Feedback:
                                        <br />
                                        <span>
                                            (max 2000 characters)
                                        </span>
                                    </label>

                                    <textarea
                                        id="feedback"
                                        name="feedback"
                                        value={formData.feedback}
                                        onChange={handleChange}
                                        maxLength="2000"
                                        placeholder="Write your feedback here..."
                                        required
                                    ></textarea>

                                </div>


                                {/* Submit */}

                                <div className="feedback-submit-wrapper">

                                    <button
                                        type="submit"
                                        className="feedback-submit-button"
                                    >
                                        Post your Feedback
                                    </button>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>

            </section>

        </div>
        
    );
}

export default SubmitFeedback;