import { useState } from "react";
import "./KnowledgeCenter.css";
import { Link } from "react-router-dom";
import PreFooter from "../../PreFooter";

function KnowledgeCenter() {
  const [showTopics, setShowTopics] = useState(false);
  const [mobileNumber, setMobileNumber] = useState("");

  const topics = [
    {
      title: "NEW TO INVESTING",
      image: "/media/images/new-to-investing.jpeg",
      link: "/knowledge_center/new_to_investing",
    },
    {
      title: "SMART TAX PLANNING",
      image: "/media/images/smart-tax-planning.jpeg",
      link: "/knowledge_center/smart_tax_planning",
    },
    {
      title: "RETIREMENT PLANNING",
      image: "/media/images/retirement-planning.jpeg",
      link: "/knowledge_center/retirement_planning",
    },
  ];

  const questions = [
    {
      title: "Why to Invest ?",
      link: "/knowledge_center/why_to_invest",
    },
    {
      title: "Understanding Risk in Investing",
      link: "/knowledge_center/understanding_risk",
    },
    {
      title: "How to choose good funds",
      link: "/knowledge_center/how_to_choose_fund",
    },
    {
      title: "How small savings become Big ?",
      link: "/knowledge_center/how_small_savings_become_big",
    },
    {
      title: "How to create Financial Goals ?",
      link: "/knowledge_center/how_to_create_financial_goals",
    },
  ];

  const handleMobileChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");

    if (value.length <= 10) {
      setMobileNumber(value);
    }
  };

  const handleMobileSubmit = (e) => {
    e.preventDefault();

    if (mobileNumber.length !== 10) {
      alert("Please enter a valid 10 digit mobile number.");
      return;
    }

    alert(
      `Thank you! We will contact you on +91 ${mobileNumber}.`
    );

    setMobileNumber("");
  };

  return (
    <>
    <div className="knowledge-center-page">

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="knowledge-center-hero">
        <div className="knowledge-center-hero-overlay">
          <div className="knowledge-center-container">
            <h1>
              Knowledge Center
            </h1>
          </div>
        </div>
      </section>


      {/* =========================================
          MAIN KNOWLEDGE SECTION
      ========================================= */}

      <section className="knowledge-center-main">
        <div className="knowledge-center-container">

          <div className="knowledge-center-top-grid">

            {/* =================================
                LEFT - LEARNING CARD
            ================================= */}

            <div className="knowledge-learning-section">

              <div className="knowledge-learning-image">

                <img
                  src="/media/images/investment-knowledge.jpeg"
                  alt="Investment Knowledge"
                />

                <div className="knowledge-image-overlay">

                  <h2>
                    Investment is
                  </h2>

                  <p>
                    80% about behaviour &amp; 20% about knowledge
                  </p>

                </div>

              </div>


              {/* Topic Dropdown */}

              <div className="knowledge-topic-wrapper">

                <button
                  type="button"
                  className={
                    showTopics
                      ? "knowledge-topic-button active"
                      : "knowledge-topic-button"
                  }
                  onClick={() =>
                    setShowTopics(!showTopics)
                  }
                >

                  <span>
                    Choose your topic and learn easily
                  </span>

                  <span
                    className={
                      showTopics
                        ? "knowledge-arrow open"
                        : "knowledge-arrow"
                    }
                  >
                    ▼
                  </span>

                </button>


                {showTopics && (

                  <div className="knowledge-question-menu">

                    {questions.map(
                      (question, index) => (

                        <a
                          href={question.link}
                          className="knowledge-question"
                          key={index}
                        >

                          <span>
                            {question.title}
                          </span>

                          <span className="question-arrow">
                            →
                          </span>

                        </a>

                      )
                    )}

                  </div>

                )}

              </div>

            </div>


            {/* =================================
                RIGHT - CALLBACK SECTION
            ================================= */}

            <div className="knowledge-callback-section">

              {/* Image */}

              <div className="knowledge-callback-image">

                <img
                  src="/media/images/investment-calculator.jpeg"
                  alt="Investment Calculator"
                />

              </div>


              {/* Mobile Number Form */}

              <form
                className="knowledge-mobile-form"
                onSubmit={handleMobileSubmit}
              >

                <div className="knowledge-mobile-input-wrapper">

                  <div className="knowledge-country-code">

                    <span className="knowledge-flag">
                      🇮🇳
                    </span>

                    <span>
                      +91
                    </span>

                  </div>


                  <div className="knowledge-mobile-input-area">

                    <span className="knowledge-mobile-label">
                      Mobile Number
                    </span>

                    <input
                      type="tel"
                      value={mobileNumber}
                      onChange={handleMobileChange}
                      placeholder="Enter your 10 digit number"
                      maxLength="10"
                    />

                  </div>


                  <button
                    type="submit"
                    className="knowledge-go-button"
                  >
                    GO
                  </button>

                </div>


                <div className="knowledge-mobile-hint">

                  <span className="knowledge-phone-icon">
                    ☎
                  </span>

                  <div>

                    <strong>
                      Want a personal call?
                    </strong>

                    <span>
                      Drop your number and we'll get
                      back to you.
                    </span>

                  </div>

                </div>

              </form>

            </div>

          </div>

        </div>
      </section>


      {/* =========================================
          THREE MAIN TOPICS
      ========================================= */}

      <section className="knowledge-topics-section">

        <div className="knowledge-center-container">

          <div className="knowledge-topics-grid">

            {topics.map((topic, index) => (

              <Link
                to={topic.link}
                className="knowledge-topic-card"
                key={index}
              >

                <div className="knowledge-topic-image">

                  <img
                    src={topic.image}
                    alt={topic.title}
                  />

                  <div className="knowledge-topic-overlay">

                    <span>
                      Explore →
                    </span>

                  </div>

                </div>

                <h3>
                  {topic.title}
                </h3>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* =========================================
          IMPORTANT LESSONS
      ========================================= */}

      <section className="knowledge-lessons-section">

        <div className="knowledge-center-container">

          <div className="knowledge-lessons-card">

            <div className="knowledge-lessons-heading">

              <span className="knowledge-heading-line"></span>

              <h2>
                IMPORTANT LESSONS OF INVESTING
              </h2>

              <span className="knowledge-heading-line"></span>

            </div>


            <p>
              Investing is a tool for building wealth, but it is
              not only for the wealthy. Anyone can get started on
              an investing program, and various vehicles make it
              easy to begin with small amounts and add to a
              portfolio periodically. In fact, what differentiates
              investing from gambling is that it takes time—it is
              not a get-rich-quick scheme.
            </p>


            <p>
              We will help you to understand what investing is,
              what it means and how the "miracle" of
              compounding 
              works. We will also help you in building blocks of
              the investing world and the markets and provide
              some insights into techniques with the goal of
              helping you think about which investing strategies
              and vehicles are right for you.
            </p>

          </div>

        </div>

      </section>

    </div>

        <PreFooter />
    </>
  );
}

export default KnowledgeCenter;

