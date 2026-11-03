import { useState } from "react";

function InvestingRule() {
  const [active, setActive] = useState(0);
  const [age, setAge] = useState(25);
  const [debt, setDebt] = useState(30);
  const [income, setIncome] = useState(5);

  const rules = [
    {
      title: (
        <>
          Equity
          <br />
          Investment Rule
        </>
      ),
      icon: "fa-calendar-days",
    },
    {
      title: (
        <>
          Rule
          <br />
          of Saving
        </>
      ),
      icon: "fa-hand-holding-dollar",
    },
    {
      title: (
        <>
          Debt
          <br />
          Investment Rule
        </>
      ),
      icon: "fa-money-bill-transfer",
    },
    {
      title: (
        <>
          SIP
          <br />
          Investment Rule
        </>
      ),
      icon: "fa-chart-column",
    },
  ];

  return (
    <div
      style={{
        width: "100%",
        padding: "80px 0",
        backgroundColor: "#fff",
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: "1400px",
        }}
      >
        <div className="row align-items-center">
          {/* LEFT SIDE */}
          <div className="col-lg-5 mb-5 mb-lg-0">
            <h1
              style={{
                color: "#438de8",
                fontSize: "70px",
                fontWeight: "400",
                lineHeight: "1.05",
                marginBottom: "20px",
                marginLeft:"20px"
              }}
            >
              Rules of
              <br />
              <strong>Investing</strong>
            </h1>

            <p
              style={{
                fontSize: "27px",
                lineHeight: "1.35",
                color: "#222",
                marginLeft:"20px",
              }}
            >
              Confused about debt equity proportion ?
              <br />
              Here are some rules that can make things
              <br />
              <strong style={{ color: "#444" }}>easier for you!</strong>
            </p>
          </div>

          {/* RIGHT SIDE */}
          <div className="col-lg-7">
            {/* CARDS */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: "35px",
                flexWrap: "wrap",
                marginBottom: "35px",
              }}
            >
              {rules.map((rule, index) => (
                <div
                  key={index}
                  onClick={() => setActive(index)}
                  style={{
                    width: "120px",
                    textAlign: "center",
                    cursor: "pointer",
                    position: "relative",
                  }}
                >
                  {/* ICON BOX */}
                  <div
                    style={{
                      width: "140px",
                      height: "140px",
                      border:
                        active === index
                          ? "2px solid #222"
                          : "2px solid #e5e5e5",
                      borderRadius: "8px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#fff",
                      transition: "0.2s",
                    }}
                  >
                    <div
                      style={{
                        width: "95px",
                        height: "95px",
                        border: "1px solid #e5e5e5",
                        borderRadius: "9px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <i
                        className={`fa-solid ${rule.icon}`}
                        style={{
                          fontSize: "65px",
                          color: "#438de8",
                        }}
                      ></i>
                    </div>
                  </div>

                  {/* TITLE */}
                  <div
                    style={{
                      fontSize: "17px",
                      lineHeight: "1.15",
                      marginTop: "12px",
                      color: "#111",
                    }}
                  >
                    {rule.title}
                  </div>

                  {/* TRIANGLE */}
                  {active === index && (
                    <div
                      style={{
                        position: "absolute",
                        bottom: "-40px",
                        left: "50%",
                        transform: "translateX(-50%)",
                        width: 0,
                        height: 0,
                        borderLeft: "14px solid transparent",
                        borderRight: "14px solid transparent",
                        borderBottom: "14px solid #888",
                      }}
                    ></div>
                  )}
                </div>
              ))}
            </div>

            {/* INFORMATION BOX */}
            <div
              style={{
                border: "1px solid #888",
                borderTop: "6px solid #888",
                boxShadow: "0 5px 15px rgba(0,0,0,0.15)",
                padding: "50px 40px 30px",
                minHeight: "270px",
                marginLeft: "70px",
                backgroundColor: "#fff",
              }}
            >
              {/* EQUITY */}
              {active === 0 && (
                <>
                  <p
                    style={{
                      fontSize: "22px",
                      marginBottom: "30px",
                    }}
                  >
                    Select your age to know the{" "}
                    <strong style={{ color: "#438de8" }}>Equity</strong>{" "}
                    percentage in your portfolio
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "22px",
                        width: "80px",
                      }}
                    >
                      Age
                    </strong>

                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      style={{
                        flex: 1,
                        accentColor: "#438de8",
                      }}
                    />

                    <strong
                      style={{
                        color: "#438de8",
                        fontSize: "22px",
                        marginRight: "30px",
                      }}
                    >
                      {age}
                    </strong>
                  </div>

                  <p
                    style={{
                      fontSize: "20px",
                      marginTop: "35px",
                    }}
                  >
                    Considering your age you should keep{" "}
                    <strong style={{ color: "#438de8" }}>
                      {Math.max(40, 100 - age)}%
                    </strong>{" "}
                    in{" "}
                    <strong style={{ color: "#438de8" }}>
                      Equity mutual fund
                    </strong>
                    .
                  </p>
                </>
              )}

              {/* SAVING */}
              {active === 1 && (
                <>
                  <p style={{ fontSize: "22px", marginBottom: "35px" ,marginTop:"-15px" }}>
                    Follow the{" "}
                    <strong style={{ color: "#438de8" }}>Rule of Saving</strong>{" "}
                    to build a strong financial future.
                  </p>

                  <div
                    style={{
                      fontSize: "21px",
                      padding: "23px",
                      backgroundColor: "#f7faff",
                      borderRadius: "8px",
                    }}
                  >
                    Save at least{" "}
                    <strong style={{ color: "#438de8" }}>20%</strong> of your
                    monthly income.
                  </div>

                  <p
                    style={{
                      fontSize: "20px",
                      marginTop: "30px",
                    }}
                  >
                    Regular saving helps you achieve your financial goals
                    faster.
                  </p>
                </>
              )}

              {/* DEBT */}
              {active === 2 && (
                <>
                  <p style={{ fontSize: "22px", marginBottom: "35px" }}>
                    Maintain the right{" "}
                    <strong style={{ color: "#438de8" }}>Debt</strong>{" "}
                    allocation in your portfolio.
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "25px",
                    }}
                  >
                    <strong style={{ fontSize: "22px" }}>Age</strong>

                    <input
                      type="range"
                      min="18"
                      max="80"
                      value={debt}
                      onChange={(e) => setDebt(e.target.value)}
                      style={{
                        flex: 1,
                        accentColor: "#438de8",
                      }}
                    />

                    <strong
                      style={{
                        color: "#438de8",
                        fontSize: "22px",
                        marginRight:"30px"
                      }}
                    >
                      {debt}
                    </strong>
                  </div>

                  <p
                    style={{
                      fontSize: "20px",
                      marginTop: "35px",
                    }}
                  >
                    Considering your age you should keep{" "}
                    <strong style={{ color: "#438de8" }}>
                      {debt <= 39 ? 20 : debt <= 49 ? 30 : debt <= 59 ? 45 : 60}
                      %
                    </strong>{" "}
                    in{" "}
                    <strong style={{ color: "#438de8" }}>
                      Debt mutual fund.
                    </strong>
                    .
                  </p>
                </>
              )}

              {/* SIP */}
              {active === 3 && (
                <>
                  <p
                    style={{
                      fontSize: "21px",
                      marginBottom: "30px",
                      marginTop:"-15px"
                    }}
                  >
                    Find out how much you should invest via{" "}
                    <strong style={{ color: "#438de8" }}>SIP</strong>
                  </p>

                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "25px",
                    }}
                  >
                    <strong
                      style={{
                        fontSize: "22px",
                        width: "120px",
                      }}
                    >
                      Annual
                      <br />
                      income
                    </strong>

                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={income}
                      onChange={(e) => setIncome(e.target.value)}
                      style={{
                        flex: 1,
                        accentColor: "#438de8",
                      }}
                    />

                    <strong
                      style={{
                        color: "#438de8",
                        fontSize: "22px",
                      }}
                    >
                      {income <= 99 ? `${income}L` : `${income - 99}Cr`}
                    </strong>
                  </div>

                  <p
                    style={{
                      fontSize: "20px",
                      marginTop: "35px",
                    }}
                  >
                    As per your annual income you should invest minimum{" "}
                    <strong style={{ color: "#438de8" }}>
                      ₹ {Math.max(1000, income * 1000).toLocaleString()}
                    </strong>{" "}
                    per month via{" "}
                    <strong style={{ color: "#438de8" }}>SIP</strong>.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InvestingRule;

