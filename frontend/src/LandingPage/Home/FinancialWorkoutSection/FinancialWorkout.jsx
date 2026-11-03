import { Link } from "react-router-dom";
import "./financialWorkout.css";

function FinancialWorkout() {
  return (
    <div className="financial-workout-container">
      <div className="row h-100">

        {/* LEFT SIDE */}
        <div className="col-6">
          <div className="financial-workout-content">

            <h1 className="financial-workout-title">
              You are physically fit today.
            </h1>

            <p className="financial-workout-subtitle">
              But will you remain fit, if you don't
            </p>

            <h1 className="financial-workout-highlight">
              Workout Regularly?
            </h1>

            <Link
              to="/financial_workout"
              className="financial-workout-button"
            >
              Know your financial workout
            </Link>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-6">

          <img
            src="/media/images/financialWorkout.jpeg"
            alt="Financial planning"
            className="financial-workout-image"
          />

          {/* TOP LEFT YELLOW CORNER */}
          <div className="yellow-corner-top-horizontal"></div>

          <div className="yellow-corner-top-vertical"></div>

          {/* BOTTOM RIGHT YELLOW CORNER */}
          <div className="yellow-corner-bottom-horizontal"></div>

          <div className="yellow-corner-bottom-vertical"></div>

        </div>

      </div>
    </div>
  );
}

export default FinancialWorkout;
