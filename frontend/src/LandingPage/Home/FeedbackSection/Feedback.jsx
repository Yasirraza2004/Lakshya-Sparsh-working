import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./feedback.css";

function Feedback() {
  const reviews = [
    {
      title: "Delightful Service & Personalized Financial Guidance",
      text: "I am extremely pleased with the service provided. It was refreshing to work with a financial adviser who genuinely took the time to understand my needs, circumstances, and preferences. Their knowledge, thoughtful approach, and attention to detail helped create a financial plan that truly suited my goals. Their professionalism, integrity, and caring attitude earned my complete trust and respect. I would gladly recommend their services to anyone seeking reliable and personalized financial advice.",
      name: "Medha Shekhar",
    },
    {
      title: "Exceptional Service & Trusted Advice",
      text: "The guidance I received was exceptional. They took the time to understand my family's financial and protection needs and provided thoughtful advice tailored to our goals. Their professionalism, transparency, and commitment gave us complete confidence in planning for both today and the future.",
      name: "Vijay Singh",
    },
    {
      title: "Great Work & Reliable Service",
      text: "A highly professional and reliable team. Their expertise, dedication, and personalized approach made the entire experience smooth and reassuring. I would gladly recommend their services to anyone looking for trustworthy financial guidance.",
      name: "Aditya Singh",
    },
    {
      title: "Great Work & Trusted Guidance",
      text: "They provided excellent support in understanding all of my family's protection and financial needs. Their advice was clear, practical, and thoughtfully tailored to our present requirements as well as our future goals. From beginning to end, the team was professional, reliable, and genuinely committed to helping us make informed financial decisions.",
      name: "Manoj Joshi",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Automatic slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) =>
        prev === reviews.length - 1 ? 0 : prev + 1
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [reviews.length]);

  // Previous
  const previousSlide = () => {
    setCurrentSlide((prev) =>
      prev === 0 ? reviews.length - 1 : prev - 1
    );
  };

  // Next
  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev === reviews.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className="feedback-section">

      {/* Heading */}
      <h1 className="feedback-title">
        What they say about us
      </h1>

      <h5 className="feedback-subtitle">
        Write us a review, your comment is a key of our success.
      </h5>

      {/* Review area */}
      <div className="feedback-review-area">

        {/* LEFT ARROW */}
        <button
          className="feedback-arrow feedback-arrow-left"
          onClick={previousSlide}
          aria-label="Previous review"
        >
          ‹
        </button>

        {/* RIGHT ARROW */}
        <button
          className="feedback-arrow feedback-arrow-right"
          onClick={nextSlide}
          aria-label="Next review"
        >
          ›
        </button>

        {/* REVIEW */}
        <div
          key={currentSlide}
          className="feedback-review"
        >
          <h2 className="feedback-review-title">
            {reviews[currentSlide].title}
          </h2>

          <p className="feedback-review-text">
            {reviews[currentSlide].text}
          </p>

          {/* Line */}
          <hr className="feedback-line" />

          {/* Name */}
          <p className="feedback-review-name">
            {reviews[currentSlide].name}
          </p>
        </div>
      </div>

      {/* BUTTON */}
      <Link
        to="/feedbacks"
        className="btn-feedback"
      >
        Post/Read feedback
      </Link>

    </div>
  );
}

export default Feedback;
