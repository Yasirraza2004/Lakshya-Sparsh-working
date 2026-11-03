import { useState } from "react";
import { Link } from "react-router-dom";
import "./taxation.css";

function Taxation() {
  /* =====================================================
     TAX CALCULATOR
  ===================================================== */

  const [investmentAmount, setInvestmentAmount] = useState(150000);

  /* =====================================================
     ELSS INVESTMENT TYPE
  ===================================================== */

  const [investmentType, setInvestmentType] = useState("Lumpsum");

  /* =====================================================
     ELSS SELECTION
  ===================================================== */

  const [selectedScheme, setSelectedScheme] = useState(null);

  const [schemeAmount, setSchemeAmount] = useState("");

  const [debitDate, setDebitDate] = useState("");


  /* =====================================================
     TAX CALCULATOR VALUES
  ===================================================== */

  const amount = Number(investmentAmount) || 0;

  const slab10 = Math.round(amount * 0.10);
  const slab20 = Math.round(amount * 0.20);
  const slab30 = Math.round(amount * 0.30);


  /* =====================================================
     ELSS DATA
     
     These are placeholder display rows.
     Replace with your actual scheme/API data before
     using this for live investment decisions.
  ===================================================== */

  const elssSchemes = [
    {
      id: 1,
      name: "ELSS Scheme 01",
      category: "Equity Linked Savings Scheme",
      nav: "--",
      threeMonth: "--",
      sixMonth: "--",
      oneYear: "--",
      threeYear: "--",
    },
    {
      id: 2,
      name: "ELSS Scheme 02",
      category: "Equity Linked Savings Scheme",
      nav: "--",
      threeMonth: "--",
      sixMonth: "--",
      oneYear: "--",
      threeYear: "--",
    },
    {
      id: 3,
      name: "ELSS Scheme 03",
      category: "Equity Linked Savings Scheme",
      nav: "--",
      threeMonth: "--",
      sixMonth: "--",
      oneYear: "--",
      threeYear: "--",
    },
    {
      id: 4,
      name: "ELSS Scheme 04",
      category: "Equity Linked Savings Scheme",
      nav: "--",
      threeMonth: "--",
      sixMonth: "--",
      oneYear: "--",
      threeYear: "--",
    },
  ];


  /* =====================================================
     ELSS BENEFITS
  ===================================================== */

  const elssBenefits = [
    {
      number: "01",
      title: "Save Tax",
      text:
        "Eligible ELSS investments may qualify for deductions under applicable tax rules.",
    },
    {
      number: "03",
      title: "3 Year Lock-in",
      text:
        "ELSS has a minimum statutory lock-in period of three years.",
    },
    {
      number: "↗",
      title: "Market Linked",
      text:
        "ELSS returns are linked to the performance of the underlying equity investments.",
    },
  ];


  /* =====================================================
     OTHER TAX SAVING SCHEMES
  ===================================================== */

  const taxSavingSchemes = [
    {
      name: "ELSS",
      subtitle: "Equity Linked Savings Scheme",
      lockIn: "3 Years",
      taxation: "Subject to applicable rules",
      returnType: "Market-linked",
      highlight: true,
    },
    {
      name: "Tax-saving FD",
      subtitle: "Bank Fixed Deposit",
      lockIn: "5 Years",
      taxation: "Interest taxable as applicable",
      returnType: "Fixed / bank-declared",
      highlight: false,
    },
    {
      name: "ULIP",
      subtitle: "Unit Linked Insurance Plan",
      lockIn: "5 Years",
      taxation: "Subject to applicable rules",
      returnType: "Market-linked",
      highlight: false,
    },
    {
      name: "NSC",
      subtitle: "National Savings Certificate",
      lockIn: "5 / 10 Years",
      taxation: "Interest taxable as applicable",
      returnType: "Government-declared",
      highlight: false,
    },
    {
      name: "PPF",
      subtitle: "Public Provident Fund",
      lockIn: "15 Years",
      taxation: "Subject to applicable rules",
      returnType: "Government-declared",
      highlight: false,
    },
    {
      name: "EPF",
      subtitle: "Employees' Provident Fund",
      lockIn: "Employment-linked",
      taxation: "Subject to applicable rules",
      returnType: "Government-declared",
      highlight: false,
    },
  ];


  /* =====================================================
     SCHEME SELECT
  ===================================================== */

  const handleSchemeSelect = (scheme) => {
    setSelectedScheme(scheme);
  };


  /* =====================================================
     CONTINUE
  ===================================================== */

  const handleContinue = () => {
    if (!selectedScheme) {
      alert("Please select an ELSS scheme first.");
      return;
    }

    if (!schemeAmount) {
      alert(
        investmentType === "SIP"
          ? "Please enter your monthly SIP amount."
          : "Please enter your investment amount."
      );
      return;
    }

    if (investmentType === "SIP" && !debitDate) {
      alert("Please select your debit date.");
      return;
    }

    alert(
      `Selected ${selectedScheme.name} for ${investmentType} investment.`
    );
  };


  return (
    <div className="taxation-page">

      {/* =================================================
          HERO
      ================================================= */}

      <section className="taxation-hero">

        <div className="taxation-hero-overlay"></div>

        <div className="taxation-hero-content">

          <span className="taxation-eyebrow">
            TAX PLANNING & INVESTMENTS
          </span>

          <h1>
            Don't let taxes
            <br />
            bite into your earnings.
          </h1>

          <p>
            Plan your tax-saving investments early and
            make your money work towards your long-term
            financial goals.
          </p>

          <div className="taxation-hero-buttons">

            <a
              href="#tax-calculator"
              className="taxation-primary-btn"
            >
              Calculate Tax Saving
              <span>→</span>
            </a>

            <a
              href="#section6"
              className="taxation-secondary-btn"
            >
              Choose ELSS
            </a>

          </div>

        </div>

        <div className="taxation-hero-stat">

          <span>SMART TAX PLANNING</span>

          <strong>
            Plan early.
          </strong>

          <strong>
            Invest wisely.
          </strong>

        </div>

      </section>


      {/* =================================================
          INTRO
      ================================================= */}

      <section className="taxation-intro">

        <div className="taxation-container taxation-intro-grid">

          <div className="taxation-section-label">

            <span>01</span>

            <p>
              PLAN AHEAD
            </p>

          </div>


          <div className="taxation-intro-content">

            <span className="taxation-small-heading">
              SAVE YOUR TAX
            </span>

            <h2>
              Don't wait until the last minute
              to plan your taxes.
            </h2>

            <p>
              Last-minute tax planning can lead to rushed
              investment decisions. A planned approach gives
              you more time to understand your options and
              choose investments that fit your financial goals.
            </p>


            <div className="taxation-intro-points">

              <div>
                <span>01</span>
                <p>
                  Understand your tax-saving options
                </p>
              </div>

              <div>
                <span>02</span>
                <p>
                  Plan investments according to your goals
                </p>
              </div>

              <div>
                <span>03</span>
                <p>
                  Invest before the applicable deadline
                </p>
              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =================================================
          TAX SAVING CALCULATOR
      ================================================= */}

      <section
        className="taxation-calculator-section"
        id="tax-calculator"
      >

        <div className="taxation-container">

          <div className="taxation-calculator-heading">

            <span className="taxation-small-heading">
              TAX SAVING CALCULATOR
            </span>

            <h2>
              Check how much you
              can potentially save.
            </h2>

            <p>
              Select an investment amount to see an
              illustrative tax impact at different tax
              rates.
            </p>

          </div>


          <div className="taxation-calculator-card">

            {/* LEFT */}

            <div className="taxation-calculator-input">

              <label>
                Select your investment amount
              </label>


              <div className="taxation-amount-display">

                <span>₹</span>

                <input
                  type="number"
                  min="0"
                  max="150000"
                  value={investmentAmount}
                  onChange={(e) => {

                    let value = Number(
                      e.target.value
                    );

                    if (value > 150000) {
                      value = 150000;
                    }

                    if (value < 0) {
                      value = 0;
                    }

                    setInvestmentAmount(value);
                  }}
                />

              </div>


              <input
                className="taxation-range"
                type="range"
                min="0"
                max="150000"
                step="5000"
                value={investmentAmount}
                onChange={(e) =>
                  setInvestmentAmount(
                    Number(e.target.value)
                  )
                }
              />


              <div className="taxation-range-labels">

                <span>
                  ₹0
                </span>

                <span>
                  ₹75,000
                </span>

                <span>
                  ₹1,50,000
                </span>

              </div>


              <p className="taxation-input-note">
                Maximum shown here is ₹1,50,000
                for an illustrative calculation.
              </p>

            </div>


            {/* RIGHT */}

            <div className="taxation-saving-results">

              <div className="taxation-result-heading">

                <span>
                  ILLUSTRATIVE TAX IMPACT
                </span>

                <strong>
                  ₹{amount.toLocaleString("en-IN")}
                </strong>

              </div>


              <div className="taxation-result-grid">

                <div className="taxation-result-card">

                  <span>
                    10%
                  </span>

                  <strong>
                    ₹{slab10.toLocaleString("en-IN")}
                  </strong>

                  <small>
                    Illustrative tax impact
                  </small>

                </div>


                <div className="taxation-result-card featured">

                  <span>
                    20%
                  </span>

                  <strong>
                    ₹{slab20.toLocaleString("en-IN")}
                  </strong>

                  <small>
                    Illustrative tax impact
                  </small>

                </div>


                <div className="taxation-result-card">

                  <span>
                    30%
                  </span>

                  <strong>
                    ₹{slab30.toLocaleString("en-IN")}
                  </strong>

                  <small>
                    Illustrative tax impact
                  </small>

                </div>

              </div>


              <a
                href="#section6"
                className="taxation-invest-btn"
              >
                Get Schemes to Invest
                <span>→</span>
              </a>

            </div>

          </div>


          <p className="taxation-calculator-disclaimer">

            This calculator is an illustrative planning
            tool only. Actual tax liability depends on
            applicable tax rules, income, deductions,
            tax regime and individual circumstances.

          </p>

        </div>

      </section>


      {/* =================================================
          ELSS
      ================================================= */}

      <section
        className="taxation-elss-section"
        id="elss"
      >

        <div className="taxation-container taxation-elss-grid">


          {/* IMAGE */}

          <div className="taxation-elss-image">

            <img
              src="/media/images/tax-planning-banner.jpg"
              alt="Tax planning and ELSS investment"
            />

            <div className="taxation-image-badge">

              <span>
                ELSS
              </span>

              <strong>
                Tax-saving
                <br />
                mutual funds
              </strong>

            </div>

          </div>


          {/* CONTENT */}

          <div className="taxation-elss-content">

            <span className="taxation-small-heading">
              TAX-SAVING INVESTMENTS
            </span>

            <h2>
              Save smartly
              <br />
              through ELSS.
            </h2>

            <p className="taxation-elss-description">

              Equity Linked Savings Schemes (ELSS) are
              equity-oriented mutual fund investments that
              may be considered for tax-saving purposes
              under applicable tax rules.

            </p>


            <div className="taxation-benefits">

              {elssBenefits.map(
                (benefit, index) => (

                  <div
                    className="taxation-benefit"
                    key={index}
                  >

                    <div className="taxation-benefit-icon">
                      {benefit.number}
                    </div>

                    <div>

                      <h3>
                        {benefit.title}
                      </h3>

                      <p>
                        {benefit.text}
                      </p>

                    </div>

                  </div>

                )
              )}

            </div>


            <a
              href="#section6"
              className="taxation-outline-btn"
            >
              Choose ELSS
              <span>→</span>
            </a>

          </div>

        </div>

      </section>


      {/* =================================================
          COMPARISON
      ================================================= */}

      <section className="taxation-comparison-section">

        <div className="taxation-container">

          <div className="taxation-comparison-heading">

            <div>

              <span className="taxation-small-heading">
                KNOW YOUR OPTIONS
              </span>

              <h2>
                ELSS vs other
                <br />
                tax-saving options.
              </h2>

            </div>


            <p>

              Different tax-saving products have different
              lock-in periods, taxation, risk characteristics
              and investment objectives. Compare the broad
              features before making an investment decision.

            </p>

          </div>


          <div className="taxation-table-wrapper">

            <table className="taxation-table">

              <thead>

                <tr>

                  <th>
                    Investment
                  </th>

                  <th>
                    Lock-in
                  </th>

                  <th>
                    Taxation
                  </th>

                  <th>
                    Return Type
                  </th>

                </tr>

              </thead>


              <tbody>

                {taxSavingSchemes.map(
                  (scheme, index) => (

                    <tr
                      key={index}
                      className={
                        scheme.highlight
                          ? "taxation-table-highlight"
                          : ""
                      }
                    >

                      <td>

                        <div className="taxation-product-name">

                          <strong>
                            {scheme.name}
                          </strong>

                          <span>
                            {scheme.subtitle}
                          </span>

                        </div>

                      </td>


                      <td>
                        {scheme.lockIn}
                      </td>


                      <td>
                        {scheme.taxation}
                      </td>


                      <td>
                        {scheme.returnType}
                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>


          <p className="taxation-table-note">

            Tax treatment, limits, rates and other conditions
            are subject to applicable laws and product rules
            and may change.

          </p>

        </div>

      </section>


      {/* =================================================
          CHOOSE ELSS - SECTION 6
      ================================================= */}

      <section
        className="taxation-choose-elss-section"
        id="section6"
      >

        <div className="taxation-container">


          {/* HEADING */}

          <div className="taxation-choose-elss-heading">

            <div>

              <span className="taxation-small-heading">
                ELSS INVESTMENT
              </span>

              <h2>
                Choose ELSS and
                <br />
                don't miss the tax-saving deadline.
              </h2>

            </div>


            <p>

              Choose how you want to invest and explore
              ELSS schemes. Select a scheme, enter your
              investment amount and continue with your
              investment planning.

            </p>

          </div>


          {/* INVESTMENT TYPE */}

          <div className="taxation-investment-type">

            <span>
              Choose your investment type
            </span>


            <div className="taxation-investment-toggle">

              <button
                className={
                  investmentType === "Lumpsum"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setInvestmentType("Lumpsum")
                }
              >
                Lumpsum
              </button>


              <button
                className={
                  investmentType === "SIP"
                    ? "active"
                    : ""
                }
                onClick={() =>
                  setInvestmentType("SIP")
                }
              >
                SIP
              </button>

            </div>

          </div>


          {/* ELSS TABLE */}

          <div className="taxation-elss-table-wrapper">

            <table className="taxation-elss-table">

              <thead>

                <tr>

                  <th>
                    Select
                  </th>

                  <th>
                    Scheme Name
                  </th>

                  <th>
                    Latest NAV
                  </th>

                  <th>
                    Return %
                    <br />
                    3 Months
                  </th>

                  <th>
                    Return %
                    <br />
                    6 Months
                  </th>

                  <th>
                    Return %
                    <br />
                    1 Year
                  </th>

                  <th>
                    Return %
                    <br />
                    3 Years
                  </th>

                  <th>
                    {investmentType === "SIP"
                      ? "Monthly Amount"
                      : "Enter Amount"}
                  </th>

                  <th>
                    {investmentType === "SIP"
                      ? "Debit Date"
                      : "Action"}
                  </th>

                </tr>

              </thead>


              <tbody>

                {elssSchemes.map(
                  (scheme) => (

                    <tr
                      key={scheme.id}
                      className={
                        selectedScheme?.id === scheme.id
                          ? "selected-scheme"
                          : ""
                      }
                    >

                      {/* SELECT */}

                      <td>

                        <input
                          type="radio"
                          name="elssScheme"
                          checked={
                            selectedScheme?.id ===
                            scheme.id
                          }
                          onChange={() =>
                            handleSchemeSelect(
                              scheme
                            )
                          }
                        />

                      </td>


                      {/* SCHEME */}

                      <td>

                        <div className="taxation-scheme-name">

                          <strong>
                            {scheme.name}
                          </strong>

                          <span>
                            {scheme.category}
                          </span>

                        </div>

                      </td>


                      {/* NAV */}

                      <td>
                        {scheme.nav}
                      </td>


                      {/* RETURNS */}

                      <td>
                        {scheme.threeMonth}
                      </td>

                      <td>
                        {scheme.sixMonth}
                      </td>

                      <td>
                        {scheme.oneYear}
                      </td>

                      <td>
                        {scheme.threeYear}
                      </td>


                      {/* AMOUNT */}

                      <td>

                        <input
                          type="number"
                          className="taxation-scheme-input"
                          placeholder={
                            investmentType === "SIP"
                              ? "₹ / month"
                              : "₹ amount"
                          }
                          value={
                            selectedScheme?.id ===
                            scheme.id
                              ? schemeAmount
                              : ""
                          }
                          onChange={(e) => {

                            if (
                              selectedScheme?.id ===
                              scheme.id
                            ) {
                              setSchemeAmount(
                                e.target.value
                              );
                            }

                          }}
                        />

                      </td>


                      {/* DATE / ACTION */}

                      <td>

                        {investmentType ===
                        "SIP" ? (

                          <select
                            className="taxation-date-select"
                            value={
                              selectedScheme?.id ===
                              scheme.id
                                ? debitDate
                                : ""
                            }
                            onChange={(e) => {

                              if (
                                selectedScheme?.id ===
                                scheme.id
                              ) {
                                setDebitDate(
                                  e.target.value
                                );
                              }

                            }}
                          >

                            <option value="">
                              Date
                            </option>

                            <option value="1">
                              1st
                            </option>

                            <option value="5">
                              5th
                            </option>

                            <option value="10">
                              10th
                            </option>

                            <option value="15">
                              15th
                            </option>

                            <option value="20">
                              20th
                            </option>

                            <option value="25">
                              25th
                            </option>

                          </select>

                        ) : (

                          <button
                            className={
                              selectedScheme?.id ===
                              scheme.id
                                ? "taxation-select-btn active"
                                : "taxation-select-btn"
                            }
                            onClick={() =>
                              handleSchemeSelect(
                                scheme
                              )
                            }
                          >

                            {selectedScheme?.id ===
                            scheme.id
                              ? "Selected"
                              : "Select"}

                          </button>

                        )}

                      </td>

                    </tr>

                  )
                )}

              </tbody>

            </table>

          </div>


          {/* SELECTED SCHEME */}

          <div className="taxation-elss-bottom">

            <div>

              <span>
                Selected scheme
              </span>

              <strong>

                {selectedScheme
                  ? selectedScheme.name
                  : "No scheme selected"}

              </strong>

            </div>


            <div className="taxation-elss-bottom-right">

              <div className="taxation-investment-summary">

                <span>
                  Investment type
                </span>

                <strong>
                  {investmentType}
                </strong>

              </div>


              <button
                className="taxation-elss-continue"
                onClick={handleContinue}
              >

                Continue
                <span>
                  →
                </span>

              </button>

            </div>

          </div>


          <p className="taxation-elss-note">

            Scheme names, NAVs and return figures shown
            above are placeholders. Connect this section
            to your actual approved ELSS scheme data/API
            before using it for live investment decisions.

          </p>

        </div>

      </section>


      {/* =================================================
          FINAL CTA
      ================================================= */}

      <section className="taxation-deadline-section">

        <div className="taxation-container taxation-deadline">

          <div>

            <span className="taxation-small-heading">
              PLAN BEFORE THE DEADLINE
            </span>

            <h2>
              Don't make tax saving
              <br />
              a last-minute decision.
            </h2>

            <p>

              Start early, understand your options and
              make tax-saving investments as part of your
              overall financial plan.

            </p>

          </div>


          <div className="taxation-deadline-action">

            <a
              href="#section6"
              className="taxation-primary-btn dark"
            >
              Choose ELSS
              <span>
                →
              </span>
            </a>


            <Link
              to="/contact"
              className="taxation-text-link"
            >
              Talk to our team
              <span>
                →
              </span>
            </Link>

          </div>

        </div>

      </section>


      {/* =================================================
          DISCLAIMER
      ================================================= */}

      <section className="taxation-disclaimer-section">

        <div className="taxation-container">

          <div className="taxation-disclaimer-box">

            <span>
              DISCLAIMER
            </span>

            <p>

              The information provided on this page is for
              general educational and informational purposes
              only. Tax rules, deductions, exemptions, limits,
              rates and product taxation are subject to
              applicable laws and may change from time to time.

            </p>

            <p>

              Market-linked investments are subject to market
              risks and do not guarantee returns. The calculator
              and information on this page should not be treated
              as tax, investment or legal advice.

            </p>

          </div>

        </div>

      </section>

    </div>
  );
}

export default Taxation;