import { Link } from "react-router-dom";

function EquityMutalFund() {
  return (
    <>
        <style>
  {`
    .fund-card {
      transition: transform 0.3s ease;
      cursor: pointer;
    }

    .fund-card:hover {
      transform: scale(1.15);
    }

    .fund-card i {
      color: #4285e8;
    }

    .fund-card p {
      color: black;
    }
  `}
</style>

      <div className="container mb-5 text-center">
        <div className="row">
          <p style={{ fontSize: "35px" }}>
            Taking risk with <b>Equity Mutual Fund</b>
          </p>
          <p style={{ fontSize: "25px", marginTop: "-7px" }}>
            is necessary & essential for getting Inflation Beating Returns
          </p>

          <div
            style={{
              position: "relative",
              display: "flex",
              justifyContent: "space-evenly",
              marginTop: "40px",
            }}
          >
            <Link to="/large_cap_fund" className="fund-card">
              <i
                className="fa-solid fa-chart-pie"
                style={{
                  fontSize: "100px",
                  color: "#4285e8",
                }}
              >
                <p
                  style={{
                    fontSize: "19px",
                    fontWeight: "500",
                    color: "black",
                    marginTop: "15px",
                  }}
                >
                  Large Cap Fund
                </p>
              </i>
            </Link>

            <Link to="/thematic_fund" className="fund-card">
              <i
                className="fa-solid fa-trowel-bricks"
                style={{ color: "#4285e8", fontSize: "90px" }}
              >
                <p
                  style={{
                    fontSize: "19px",
                    fontWeight: "500",
                    color: "black",
                    marginTop: "15px",
                  }}
                >
                  Thematic Fund
                </p>
              </i>
            </Link>

            <Link to="/multi_cap_fund" className="fund-card">
              <i
                className="fa-solid fa-chart-line"
                style={{ color: "#4285e8", fontSize: "100px" }}
              >
                <p
                  style={{
                    fontSize: "19px",
                    fontWeight: "500",
                    color: "black",
                    marginTop: "15px",
                  }}
                >
                  Multi Cap Fund
                </p>
              </i>
            </Link>

            <Link to="/mid_cap_fund" className="fund-card">
              <i
                className="fa-solid fa-chart-column"
                style={{ color: "#4285e8", fontSize: "100px" }}
              >
                <p
                  style={{
                    fontSize: "19px",
                    fontWeight: "500",
                    color: "black",
                    marginTop: "15px",
                  }}
                >
                  Mid Cap Fund
                </p>
              </i>
            </Link>

            <Link to="/small_cap_fund" className="fund-card">
              <i
                className="fa-solid fa-chart-pie"
                style={{ color: "#4285e8", fontSize: "100px" }}
              >
                <p
                  style={{
                    fontSize: "19px",
                    fontWeight: "500",
                    color: "black",
                    marginTop: "15px",
                  }}
                >
                  Small Cap Fund
                </p>
              </i>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default EquityMutalFund;
