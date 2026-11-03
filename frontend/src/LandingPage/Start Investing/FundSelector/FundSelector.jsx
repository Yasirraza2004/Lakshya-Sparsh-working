import "./FundSelector.css";

function FundSelector() {
    const productTools = [
        {
            title: "TOP FUNDS",
            link: "/investment/mutual_funds/topfunds.html",
            icon: "chart"
        },
        {
            title: "COMPARE FUNDS",
            link: "/investment/mutual_funds/comparefunds.html",
            icon: "compare"
        },
        {
            title: "SEARCH FUNDS",
            link: "/",
            icon: "search"
        }
    ];

    const methodTools = [
        {
            title: "SIP INVESTMENT",
            link: "/sip_calculator",
            icon: "sip"
        },
        {
            title: "LUMPSUM INVESTMENT",
            link: "/lumpsum_calculator",
            icon: "lumpsum"
        }
    ];

    const renderIcon = (icon) => {

        if (icon === "chart") {
            return (
                <svg
                    viewBox="0 0 100 100"
                    className="fund-selector-icon"
                >
                    <polyline
                        points="15,75 30,60 42,65 58,45 72,50 87,20"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                    />

                    <polyline
                        points="72,20 87,20 87,35"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                    />

                    <rect
                        x="15"
                        y="78"
                        width="8"
                        height="10"
                        fill="currentColor"
                    />

                    <rect
                        x="30"
                        y="70"
                        width="8"
                        height="18"
                        fill="currentColor"
                    />

                    <rect
                        x="45"
                        y="62"
                        width="8"
                        height="26"
                        fill="currentColor"
                    />

                    <rect
                        x="60"
                        y="53"
                        width="8"
                        height="35"
                        fill="currentColor"
                    />

                    <rect
                        x="75"
                        y="42"
                        width="8"
                        height="46"
                        fill="currentColor"
                    />
                </svg>
            );
        }


        if (icon === "compare") {
            return (
                <svg
                    viewBox="0 0 100 100"
                    className="fund-selector-icon"
                >
                    <line
                        x1="12"
                        y1="80"
                        x2="88"
                        y2="80"
                        stroke="currentColor"
                        strokeWidth="4"
                    />

                    <line
                        x1="15"
                        y1="80"
                        x2="15"
                        y2="20"
                        stroke="currentColor"
                        strokeWidth="4"
                    />

                    <path
                        d="M18 72 C30 60, 28 38, 43 32 C57 26, 60 55, 85 70"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                    />

                    <path
                        d="M18 72 C30 65, 45 65, 55 45 C65 25, 74 52, 85 72"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="4"
                    />
                </svg>
            );
        }


        if (icon === "search") {
            return (
                <svg
                    viewBox="0 0 100 100"
                    className="fund-selector-icon"
                >
                    <circle
                        cx="43"
                        cy="43"
                        r="27"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="7"
                    />

                    <line
                        x1="63"
                        y1="63"
                        x2="86"
                        y2="86"
                        stroke="currentColor"
                        strokeWidth="8"
                        strokeLinecap="round"
                    />

                    <rect
                        x="28"
                        y="52"
                        width="8"
                        height="12"
                        fill="currentColor"
                    />

                    <rect
                        x="40"
                        y="45"
                        width="8"
                        height="19"
                        fill="currentColor"
                    />

                    <rect
                        x="52"
                        y="37"
                        width="8"
                        height="27"
                        fill="currentColor"
                    />
                </svg>
            );
        }


        if (icon === "sip") {
            return (
                <svg
                    viewBox="0 0 100 100"
                    className="fund-selector-icon"
                >
                    <circle
                        cx="48"
                        cy="48"
                        r="26"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                    />

                    <text
                        x="48"
                        y="57"
                        textAnchor="middle"
                        fontSize="27"
                        fontWeight="700"
                        fill="currentColor"
                    >
                        ₹
                    </text>

                    <path
                        d="M68 20 L82 20 L76 32"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                    />

                    <path
                        d="M78 22 C91 35, 91 55, 82 68"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                    />

                    <path
                        d="M25 70 C16 60, 13 45, 18 33"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                    />

                    <line
                        x1="18"
                        y1="33"
                        x2="10"
                        y2="39"
                        stroke="currentColor"
                        strokeWidth="5"
                    />
                </svg>
            );
        }


        if (icon === "lumpsum") {
            return (
                <svg
                    viewBox="0 0 100 100"
                    className="fund-selector-icon"
                >
                    <path
                        d="M27 26 L67 26 L75 38 L70 82 L24 82 L20 38 Z"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="5"
                    />

                    <text
                        x="48"
                        y="61"
                        textAnchor="middle"
                        fontSize="30"
                        fontWeight="700"
                        fill="currentColor"
                    >
                        ₹
                    </text>

                    <line
                        x1="75"
                        y1="52"
                        x2="91"
                        y2="52"
                        stroke="currentColor"
                        strokeWidth="5"
                    />

                    <line
                        x1="75"
                        y1="62"
                        x2="91"
                        y2="62"
                        stroke="currentColor"
                        strokeWidth="5"
                    />

                    <line
                        x1="75"
                        y1="72"
                        x2="91"
                        y2="72"
                        stroke="currentColor"
                        strokeWidth="5"
                    />
                </svg>
            );
        }

        return null;
    };


    return (
      <div className="fund-selector-page">
        {/* Hero Section */}
        <section className="fund-selector-hero">
          <div className="fund-selector-hero-overlay">
            <div className="fund-selector-container">
              <h1>INVESTING IN MUTUAL FUND CAN BE REWARDING</h1>
              <h2>IF YOU CHOOSE THE RIGHT FUND</h2>
            </div>
          </div>
        </section>

        {/* Fund Selector Section */}
        <section className="fund-selector-content">
          <div className="fund-selector-container">
            <div className="fund-selector-main-grid">
              {/* Right Product */}
              <div className="fund-selector-product-section">
                <h2>
                  <span className="fund-selector-check">✓</span>
                  <span className="fund-selector-green">RIGHT</span> PRODUCT
                </h2>

                <div className="fund-selector-tools product-tools">
                  {productTools.map((tool, index) => (
                    <a
                      href={tool.link}
                      className="fund-selector-tool"
                      key={index}
                    >
                      <div className="fund-selector-tool-icon">
                        {renderIcon(tool.icon)}
                      </div>

                      <div className="fund-selector-tool-title">
                        {tool.title}
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Vertical Divider */}
              <div className="fund-selector-divider"></div>

              {/* Right Method */}
              <div className="fund-selector-method-section">
                <h2>
                  <span className="fund-selector-check">✓</span>
                  <span className="fund-selector-green">RIGHT</span> METHOD
                </h2>

                <div className="fund-selector-tools method-tools">
                  {methodTools.map((tool, index) => (
                    <a
                      href={tool.link}
                      className="fund-selector-tool"
                      key={index}
                    >
                      <div className="fund-selector-tool-icon">
                        {renderIcon(tool.icon)}
                      </div>

                      <div className="fund-selector-tool-title">
                        {tool.title}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Line */}
            <div className="fund-selector-bottom-line"></div>
          </div>
        </section>
      </div>
    );
}

export default FundSelector;