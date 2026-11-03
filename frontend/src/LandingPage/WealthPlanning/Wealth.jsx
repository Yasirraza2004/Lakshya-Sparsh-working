import { useState } from "react";
import "./Wealth.css";

function Wealth() {
    const [goal, setGoal] = useState("Wealth Creation");
    const [goalName, setGoalName] = useState("");

    const [goalAmount, setGoalAmount] = useState(5000000);
    const [currentSavings, setCurrentSavings] = useState("100000");

    const [years, setYears] = useState(15);
    const [returnRate, setReturnRate] = useState(12);
    const [inflation, setInflation] = useState(7);

    const goals = [
        "Retirement",
        "Child Education",
        "Home",
        "Car",
        "Marriage",
        "Wealth Creation"
    ];

    // Future value after considering inflation
    const futureGoal = goalAmount * Math.pow(1 + inflation / 100, years);

    // Monthly rate of return
    const monthlyRate = returnRate / 100 / 12;

    // Total number of months
    const months = years * 12;

    // Future value of current savings
    const futureCurrentSavings =
        currentSavings * Math.pow(1 + monthlyRate, months);

    // Amount still required
    const amountRequired = Math.max(
        futureGoal - futureCurrentSavings,
        0
    );

    // Monthly SIP required
    const monthlySIP =
        monthlyRate === 0
            ? amountRequired / months
            : amountRequired *
              (monthlyRate /
                  (Math.pow(1 + monthlyRate, months) - 1));

    // Total amount invested through SIP
    const totalSIPInvestment = monthlySIP * months;

    // Wealth created
    const wealthCreated =
        totalSIPInvestment + currentSavings - goalAmount;

    // Format Indian currency
    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            maximumFractionDigits: 0
        }).format(Math.max(amount, 0));
    };

    return (
        <section className="wealth-planner">

            {/* HEADER */}
            <div className="wealth-header">
                <span className="planner-tag">
                    FINANCIAL PLANNING
                </span>

                <h1>Wealth Planner</h1>

                <p>
                    Plan today. Build your tomorrow.
                </p>
            </div>


            {/* MAIN CONTENT */}
            <div className="planner-container">

                {/* LEFT SIDE */}
                <div className="planner-form">

                    <h2>Create Your Wealth Plan</h2>

                    <p className="form-description">
                        Tell us about your goal and we'll help you
                        calculate the investment required.
                    </p>


                    {/* GOALS */}
                    <div className="form-group">

                        <label>
                            What are you planning for?
                        </label>

                        <div className="goal-buttons">

                            {goals.map((item) => (
                                <button
                                    key={item}
                                    type="button"
                                    className={
                                        goal === item
                                            ? "goal-btn selected"
                                            : "goal-btn"
                                    }
                                    onClick={() => setGoal(item)}
                                >
                                    {item}
                                </button>
                            ))}

                        </div>

                    </div>


                    {/* GOAL NAME */}
                    <div className="form-group">

                        <label>Goal Name</label>

                        <input
                            type="text"
                            value={goalName}
                            onChange={(e) =>
                                setGoalName(e.target.value)
                            }
                            placeholder="e.g. My Dream Home"
                        />

                    </div>


                    {/* GOAL AMOUNT */}
                    <div className="form-group">

                        <label>
                            How much do you need?
                        </label>

                        <div className="amount-input">

                            <span>₹</span>

                            <input
                                type="number"
                                value={goalAmount}
                                onChange={(e) =>
                                    setGoalAmount(
                                        Number(e.target.value)
                                    )
                                }
                            />

                        </div>

                    </div>


                    {/* CURRENT SAVINGS */}
                    <div className="form-group">

                        <label>
                            Current Savings
                        </label>

                        <div className="amount-input">

                            <span>₹</span>

                            <input
                                type="number"
                                value={currentSavings}
                                onChange={(e) =>
                                    setCurrentSavings(
                                        Number(e.target.value)
                                    )
                                }
                            />

                        </div>

                    </div>


                    {/* YEARS */}
                    <div className="form-group">

                        <div className="slider-heading">

                            <label>
                                When do you need it?
                            </label>

                            <strong>
                                {years} Years
                            </strong>

                        </div>

                        <input
                            className="planner-slider"
                            type="range"
                            min="1"
                            max="40"
                            value={years}
                            onChange={(e) =>
                                setYears(Number(e.target.value))
                            }
                        />

                        <div className="slider-values">
                            <span>1 Year</span>
                            <span>40 Years</span>
                        </div>

                    </div>


                    {/* RETURN */}
                    <div className="form-group">

                        <div className="slider-heading">

                            <label>
                                Expected Return
                            </label>

                            <strong>
                                {returnRate}% p.a.
                            </strong>

                        </div>

                        <input
                            className="planner-slider"
                            type="range"
                            min="1"
                            max="30"
                            value={returnRate}
                            onChange={(e) =>
                                setReturnRate(
                                    Number(e.target.value)
                                )
                            }
                        />

                        <div className="slider-values">
                            <span>1%</span>
                            <span>30%</span>
                        </div>

                    </div>


                    {/* INFLATION */}
                    <div className="form-group">

                        <div className="slider-heading">

                            <label>
                                Expected Inflation
                            </label>

                            <strong>
                                {inflation}% p.a.
                            </strong>

                        </div>

                        <input
                            className="planner-slider inflation"
                            type="range"
                            min="1"
                            max="15"
                            value={inflation}
                            onChange={(e) =>
                                setInflation(
                                    Number(e.target.value)
                                )
                            }
                        />

                        <div className="slider-values">
                            <span>1%</span>
                            <span>15%</span>
                        </div>

                    </div>

                </div>


                {/* RIGHT RESULT */}
                <div className="planner-result">

                    <div className="result-header">

                        <span>Your Plan</span>

                        <h2>
                            {goalName || goal}
                        </h2>

                    </div>


                    <div className="main-result">

                        <span>
                            Required Monthly Investment
                        </span>

                        <strong>
                            {formatCurrency(monthlySIP)}
                        </strong>

                        <small>
                            per month
                        </small>

                    </div>


                    <div className="result-grid">

                        <div className="result-box">
                            <span>Goal Amount</span>

                            <strong>
                                {formatCurrency(goalAmount)}
                            </strong>
                        </div>


                        <div className="result-box">
                            <span>Future Goal Value</span>

                            <strong>
                                {formatCurrency(futureGoal)}
                            </strong>
                        </div>


                        <div className="result-box">
                            <span>Current Savings</span>

                            <strong>
                                {formatCurrency(currentSavings)}
                            </strong>
                        </div>


                        <div className="result-box">
                            <span>Time Period</span>

                            <strong>
                                {years} Years
                            </strong>
                        </div>

                    </div>


                    {/* SUMMARY */}
                    <div className="result-summary">

                        <div>
                            <span>Total SIP Investment</span>

                            <strong>
                                {formatCurrency(
                                    totalSIPInvestment
                                )}
                            </strong>
                        </div>

                        <div>
                            <span>Wealth Created</span>

                            <strong>
                                {formatCurrency(
                                    wealthCreated
                                )}
                            </strong>
                        </div>

                    </div>


                    <button className="invest-button">
                        Start Investing
                        <span>→</span>
                    </button>

                </div>

            </div>

        </section>
        
    );
}

export default Wealth;