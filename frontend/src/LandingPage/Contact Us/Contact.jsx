import { useState } from "react";
import "./Contact.css";
import PreFooter from "../PreFooter";

function generateCaptcha() {
    return Math.floor(10000 + Math.random() * 90000).toString();
}

function Contact() {

    const [captcha, setCaptcha] = useState(generateCaptcha());
    const [captchaInput, setCaptchaInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if (captchaInput !== captcha) {
            alert("Invalid CAPTCHA!");

            // Generate new CAPTCHA
            setCaptcha(generateCaptcha());
            setCaptchaInput("");

            return;
        }

        alert("CAPTCHA verified successfully!");

        // Generate new CAPTCHA after successful submission
        setCaptcha(generateCaptcha());
        setCaptchaInput("");
    };


    return (
        <>
      <div className="contact-page">
        {/* Banner */}
        <section className="contact-banner">
          <div className="contact-banner-content">
            <div className="contact-banner-text">
              <h1>Contact Us</h1>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="contact-section">
          <div className="contact-container">
            {/* LEFT */}
            <div className="contact-form">
              <h2>Ready to start your next Investment with us?</h2>

              <p className="contact-intro">
                That's great! Give us a call or send us an email and we will get
                back to you as soon as possible!
              </p>

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <input type="text" placeholder="Your Name" required />

                  <input type="email" placeholder="Email" required />

                  <input type="tel" placeholder="Mobile" required />
                </div>

                <textarea placeholder="Your Message" required />

                <input
                  type="text"
                  placeholder="Enter the CAPTCHA code"
                  required
                />

                {/* CAPTCHA */}

                <div className="captcha-box">
                  <div className="captcha-code">{captcha}</div>

                  <input
                    type="text"
                    placeholder="Type the above code:"
                    value={captchaInput}
                    onChange={(e) => setCaptchaInput(e.target.value)}
                    required
                  />
                </div>

                <div className="form-button">
                  <button type="submit">Get Call Back</button>
                </div>
              </form>
            </div>

            {/* RIGHT */}
            <div className="contact-info">
              <div className="contact-info-item">
                <div className="contact-icon">
                  <i className="fa-solid fa-location-dot"></i>
                </div>

                <div>
                  <h3>Address</h3>

                  <h4>LAKSHYA SPARSH</h4>

                  <p>
                    Flat No. 63, 6th Floor, Vaibhav Apartment, Opposite Iskcon
                    Temple, Budh Marg, Patna, 800001
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <i className="fa-solid fa-phone"></i>
                </div>

                <div>
                  <h3>Phone</h3>

                  <p>
                    +91-926 273 7373
                    <br />
                    +91-983 507 0564
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <i className="fa-solid fa-envelope"></i>
                </div>

                <div>
                  <h3>Email</h3>

                  <p>lakshyasparsh1@gmail.com</p>
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

export default Contact;