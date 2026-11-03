import { useState } from 'react';
import PreFooter from '../../../PreFooter';

function ConservativeHybridFunds() {
  const [step, setStep] = useState(1);
  const [investType, setInvestType] = useState('lumpsum'); // 'lumpsum' or 'sip'

  // Fund data parsed from your list
  const fundsData = [
    { name: "KOTAK MULTI ASSET OMNI FOF - REGULAR PLAN GROWTH", nav: "259.422", r3m: "5.28", r6m: "2.12", r1y: "8.52", r3y: "14.53" },
    { name: "SBI RETIREMENT BENEFIT FUND CONSERVATIVE HYBRID PLAN - REGULAR PLAN GROWTH", nav: "15.8211", r3m: "3.31", r6m: "3.62", r1y: "2.44", r3y: "6.19" },
    { name: "CANARA ROBECO CONSERVATIVE HYBRID FUND", nav: "99.534", r3m: "2.87", r6m: "3.45", r1y: "2.15", r3y: "6.54" },
    { name: "SBI MULTI ASSET ALLOCATION FUND REGULAR GROWTH", nav: "66.7616", r3m: "2.71", r6m: "1.77", r1y: "10.78", r3y: "13.79" },
    { name: "ADITYA BIRLA SUN LIFE CONSERVATIVE HYBRID ACTIVE FOF-GROWTH", nav: "35.6368", r3m: "2.50", r6m: "3.33", r1y: "4.44", r3y: "8.78" },
    { name: "BANDHAN CONSERVATIVE HYBRID FUND-GROWTH-(REGULAR P", nav: "32.8657", r3m: "2.35", r6m: "2.12", r1y: "2.50", r3y: "6.12" },
    { name: "FRANKLIN INDIA CONSERVATIVE HYBRID FUND - PLAN A - GROWTH", nav: "92.7817", r3m: "2.28", r6m: "2.11", r1y: "1.92", r3y: "6.99" },
    { name: "ICICI PRUDENTIAL RETIREMENT FUND HYBRID CONSERVATIVE PLAN GROWTH", nav: "18.3045", r3m: "2.15", r6m: "2.80", r1y: "4.76", r3y: "8.54" },
    { name: "LIC MF CONSERVATIVE HYBRID FUND - REGULAR PLAN-GROWTH - GROWTH", nav: "84.3799", r3m: "2.13", r6m: "1.77", r1y: "3.59", r3y: "5.66" },
    { name: "NIPPON INDIA CONSERVATIVE HYBRID FUND - GROWTH PLAN GROWTH OPTION", nav: "62.0799", r3m: "2.05", r6m: "3.10", r1y: "6.26", r3y: "7.83" },
    { name: "SBI CONSERVATIVE HYBRID FUND REGULAR GROWTH", nav: "76.5986", r3m: "1.94", r6m: "3.63", r1y: "4.81", r3y: "7.81" },
    { name: "DSP CONSERVATIVE HYBRID FUND - REGULAR PLAN - GROWTH", nav: "60.7073", r3m: "1.11", r6m: "1.97", r1y: "3.03", r3y: "7.87" },
    { name: "HSBC CONSERVATIVE HYBRID FUND - REGULAR GROWTH", nav: "63.3413", r3m: "0.91", r6m: "3.36", r1y: "2.13", r3y: "8.05" },
    { name: "ADITYA BIRLA SUN LIFE RETIREMENT FUND-50PLUS PLAN REGULAR GROWTH", nav: "13.6166", r3m: "0.87", r6m: "1.24", r1y: "2.94", r3y: "4.82" },
    { name: "HDFC CONSERVATION HYBRID FUND - REGULAR PLAN - GROWTH", nav: "83.2617", r3m: "0.87", r6m: "0.32", r1y: "1.76", r3y: "6.65" }
  ];

  return (
    <>
      <style>
        {`
          .hybrid-page {
            font-family: sans-serif;
            color: #222;
            padding-top: 60px;
            text-align: center;
          }

          /* Headers */
          .hybrid-page h1 {
            font-size: 32px;
            font-weight: 400;
            color: #111;
            margin-bottom: 30px;
            padding: 0 20px;
          }

          /* Step 1 Styles */
          .intro-text {
            max-width: 1100px;
            margin: 0 auto 20px auto;
            font-size: 18px;
            font-weight: 300;
            color: #444;
            line-height: 1.6;
            text-align: justify;
          }
          
          .warning-text {
            font-size: 16px;
            font-weight: 500;
            color: #111;
            margin-bottom: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 10px;
          }
          .alert-icon {
            color: #f39c12;
            font-size: 20px;
          }

          .features-grid {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 60px;
            max-width: 1000px;
            margin: 0 auto 60px auto;
          }
          .feature-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 180px;
          }
          .feature-icon-placeholder {
            width: 70px;
            height: 70px;
            margin-bottom: 20px;
            background-color: #f0f0f0;
            border-radius: 50%;
          }
          .feature-item p {
            font-size: 18px;
            font-weight: 300;
            color: #555;
            margin: 0;
            line-height: 1.3;
          }

          .invest-now-btn {
            background-color: #458ff0;
            color: white;
            border: none;
            padding: 12px 35px;
            border-radius: 4px;
            font-size: 16px;
            cursor: pointer;
            transition: 0.2s;
            margin-bottom: 60px;
          }
          .invest-now-btn:hover { background-color: #357ae8; }

          /* Step 2 Styles (Table) */
          .back-link {
            display: inline-block;
            margin-bottom: 30px;
            color: #555;
            text-decoration: underline;
            cursor: pointer;
            font-style: italic;
          }

          .table-container {
            width: 95%;
            max-width: 1400px;
            margin: 0 auto 40px auto;
            border: 1px solid #ddd;
            border-radius: 6px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }

          .table-header-control {
            background-color: #458ff0;
            color: white;
            padding: 15px;
            display: flex;
            justify-content: center;
            align-items: center;
            gap: 20px;
            font-size: 16px;
          }
          
          .radio-group {
            display: flex;
            gap: 15px;
            align-items: center;
            font-weight: 500;
          }
          .radio-group label {
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 5px;
          }

          .scrollable-table-wrapper {
            max-height: 500px;
            overflow-y: auto;
          }

          .data-table {
            width: 100%;
            border-collapse: collapse;
            text-align: center;
          }
          .data-table th {
            background-color: #f5f5f5;
            color: #333;
            padding: 15px 10px;
            font-size: 14px;
            font-weight: 600;
            border-bottom: 1px solid #ddd;
            position: sticky;
            top: 0;
            z-index: 2;
          }
          .data-table td {
            padding: 15px 10px;
            border-bottom: 1px solid #eee;
            font-size: 13px;
            color: #333;
            vertical-align: middle;
          }
          .data-table tr:hover {
            background-color: #f9f9f9;
          }
          
          .scheme-name {
            text-align: left;
            max-width: 250px;
            font-weight: 500;
          }
          .green-text {
            color: #28a745;
            font-weight: 500;
          }
          .green-arrow {
            color: #28a745;
            font-size: 10px;
            margin-left: 4px;
          }
          
          .table-input {
            padding: 6px 10px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 100px;
            text-align: center;
          }
          .table-select {
            padding: 6px;
            border: 1px solid #ccc;
            border-radius: 4px;
          }

          /* Pre-Footer Links Area */
          .pre-footer-wrapper {
            width: 90%;
            max-width: 1500px;
            margin: 80px auto 30px auto;
            padding-top: 25px;
            border-top: 1px solid #ddd;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .pre-footer-links { display: flex; gap: 30px; }
          .pre-footer-links a { color: #555; text-decoration: none; font-size: 14px; }
          .pre-footer-socials { display: flex; gap: 15px; color: #999; font-size: 18px; }
        `}
      </style>

      <div className="hybrid-page">
        <h1>Conservative Hybrid Fund</h1>

        {/* STEP 1: Info Screen */}
        {step === 1 && (
          <>
            <div className="intro-text">
              Equity savings funds aim to generate returns from equities, arbitrage trades, and fixed income securities. To retain equity taxation, funds will restrict the fixed income (debt) exposure to 35 per cent. Besides, to reduce volatility and hedge the portfolio, these funds actively use derivative strategies.
            </div>
            
            <div className="warning-text">
              <span className="alert-icon">⚠️</span> Suitable for first time equity investor looking for low volatile equity fund.
            </div>

            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon-placeholder"></div>
                <p>Tax free<br/>after 1 Year</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-placeholder"></div>
                <p>Returns above<br/>Debt Funds</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-placeholder"></div>
                <p>Short exit<br/>load (1 yr)</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-placeholder"></div>
                <p>Less<br/>volatile</p>
              </div>
            </div>

            <button className="invest-now-btn" onClick={() => setStep(2)}>
              Invest Now
            </button>
          </>
        )}

        {/* STEP 2: Table Selection */}
        {step === 2 && (
          <>
            <span className="back-link" onClick={() => setStep(1)}>Back</span>

            <div className="table-container">
              <div className="table-header-control">
                <span>Choose your investment type to show the scheme</span>
                <div className="radio-group">
                  <label>
                    <input 
                      type="radio" 
                      name="investType" 
                      checked={investType === 'lumpsum'}
                      onChange={() => setInvestType('lumpsum')} 
                    /> 
                    Lumpsum Investment
                  </label>
                  <label>
                    <input 
                      type="radio" 
                      name="investType" 
                      checked={investType === 'sip'}
                      onChange={() => setInvestType('sip')} 
                    /> 
                    SIP Investment
                  </label>
                </div>
              </div>

              <div className="scrollable-table-wrapper">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Select</th>
                      <th>Scheme name</th>
                      <th>Latest Nav</th>
                      <th>Return(%)<br/>3 Months</th>
                      <th>Return(%)<br/>6 Months</th>
                      <th>Return(%)<br/>1 Year</th>
                      <th>Return(%)<br/>3 Years</th>
                      <th>Enter Amount</th>
                      {investType === 'sip' && <th>Debit<br/>Date</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {fundsData.map((fund, index) => (
                      <tr key={index}>
                        <td><input type="checkbox" /></td>
                        <td className="scheme-name">{fund.name}</td>
                        <td className="green-text">{fund.nav}</td>
                        <td>{fund.r3m} <i className="fa-solid fa-caret-up green-arrow"></i></td>
                        <td>{fund.r6m} <i className="fa-solid fa-caret-up green-arrow"></i></td>
                        <td>{fund.r1y} <i className="fa-solid fa-caret-up green-arrow"></i></td>
                        <td>{fund.r3y} <i className="fa-solid fa-caret-up green-arrow"></i></td>
                        <td>
                          <input type="text" className="table-input" placeholder="enter amount" />
                        </td>
                        {investType === 'sip' && (
                          <td>
                            <select className="table-select">
                              <option value=""></option>
                            </select>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            
            <button className="invest-now-btn">Proceed to check out</button>
          </>
        )}

        {/* Bottom Links (Pre-Footer) */}
        <PreFooter />

      </div>
    </>
  );
}

export default ConservativeHybridFunds;