import { useState } from 'react';
import PreFooter from '../../../PreFooter';

function LiquidFunds() {
  const [step, setStep] = useState(1);
  const [principal, setPrincipal] = useState('');
  const [months, setMonths] = useState('');

  // Number formatting logic (Lakhs, Thousands, Hundreds)
  const formatAmountText = (value) => {
    if (!value || isNaN(value)) return "";
    const num = Number(value);
    if (num >= 10000000) return (num / 10000000).toFixed(2).replace(/\.00$/, '') + " Crores";
    if (num >= 100000) return (num / 100000).toFixed(2).replace(/\.00$/, '') + " Lakhs";
    if (num >= 1000) return (num / 1000).toFixed(2).replace(/\.00$/, '') + " Thousands";
    if (num > 0) return (num / 100).toFixed(2).replace(/\.00$/, '') + " Hundred";
    return "";
  };

  // Time formatting logic
  const formatYearsText = (value) => {
    if (!value || isNaN(value)) return "";
    return (Number(value) / 12).toFixed(1) + " Year";
  };

  // Math Calculations for Table
  const p = Number(principal) || 0;
  const t = (Number(months) || 0) / 12;
  
  const liquidEarn = Math.round((p * 6 * t) / 100);
  const savingsEarn = Math.round((p * 3.5 * t) / 100);
  const currentEarn = 0;

  return (
    <>
      <style>
        {`
          .liquid-page {
            font-family: sans-serif;
            color: #222;
            padding-top: 60px;
            text-align: center;
          }

          /* Headers */
          .liquid-page h1 {
            font-size: 32px;
            font-weight: 400;
            color: #111;
            margin-bottom: 10px;
            padding: 0 20px;
          }
          .liquid-page h3 {
            font-size: 22px;
            font-weight: 300;
            color: #666;
            margin-top: 0;
            margin-bottom: 70px;
          }

          /* Step 1 Grid */
          .features-grid {
            display: flex;
            justify-content: center;
            flex-wrap: wrap;
            gap: 60px;
            max-width: 1200px;
            margin: 0 auto 80px auto;
          }
          .feature-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 200px;
          }
          .feature-icon-placeholder {
            width: 70px;
            height: 70px;
            margin-bottom: 20px;
            background-color: #f0f0f0;
            border-radius: 8px;
          }
          .feature-item p {
            font-size: 18px;
            font-weight: 300;
            color: #777;
            margin: 0;
            line-height: 1.4;
          }

          /* Input Screens (Steps 2 & 3) */
          .input-container {
            margin: 0 auto 80px auto;
            max-width: 600px;
          }
          .input-title {
            font-size: 24px;
            font-weight: 300;
            color: #555;
            margin-bottom: 30px;
          }
          .input-box-wrapper {
            position: relative;
            width: 100%;
            max-width: 400px;
            margin: 0 auto 15px auto;
          }
          .custom-input {
            width: 100%;
            background-color: #f1f1f1;
            border: none;
            border-radius: 8px;
            font-size: 32px;
            color: #444;
            padding: 20px;
            text-align: center;
            outline: none;
            box-sizing: border-box;
          }
          .input-suffix {
            position: absolute;
            right: 30px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 24px;
            color: #555;
            pointer-events: none;
          }
          .formatted-blue-text {
            color: #458ff0;
            font-size: 18px;
            font-weight: 300;
            margin-bottom: 40px;
            min-height: 25px; /* Keeps layout from jumping if empty */
          }

          /* Buttons */
          .cta-btn {
            width: 50px;
            height: 50px;
            background-color: #2ab6b6;
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 20px;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto;
            transition: background-color 0.2s;
          }
          .cta-btn:hover { background-color: #229999; }
          .cta-section p {
            font-size: 20px;
            font-weight: 300;
            color: #666;
            margin-bottom: 25px;
          }

          /* Step 4 Table */
          .result-container {
            max-width: 900px;
            margin: 0 auto 80px auto;
          }
          .result-headline {
            font-size: 22px;
            color: #333;
            margin-bottom: 20px;
          }
          .orange-text { color: #e67e22; }
          
          .calc-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          }
          .calc-table th {
            background-color: #458ff0;
            color: white;
            padding: 20px;
            font-weight: 500;
            font-size: 16px;
          }
          .calc-table th.yellow-text { color: #ffdc3b; }
          .calc-table td {
            padding: 20px;
            font-size: 16px;
            color: #333;
            border-bottom: 1px solid #eee;
          }
          .calc-table tr:nth-child(even) td { background-color: #f9f9f9; }
          .calc-table tr:nth-child(odd) td { background-color: #f1f1f1; }
          .calc-table td:first-child { font-weight: 500; background-color: #fff !important; }

          .table-footer {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            text-align: left;
          }
          .disclaimer-text {
            font-size: 12px;
            color: #777;
            line-height: 1.6;
            margin: 0;
          }
          .recalc-link {
            color: #777;
            text-decoration: underline;
            cursor: pointer;
            margin-right: 20px;
            font-size: 15px;
          }
          .invest-now-btn {
            background-color: #458ff0;
            color: white;
            border: none;
            padding: 12px 25px;
            border-radius: 4px;
            font-size: 15px;
            cursor: pointer;
            transition: 0.2s;
          }
          .invest-now-btn:hover { background-color: #357ae8; }

          /* Pre-Footer Links Area */
          .pre-footer-wrapper {
            width: 90%;
            max-width: 1500px;
            margin: 100px auto 30px auto;
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

      <div className="liquid-page">
        <h1>You can earn better with Liquid Fund instead of parking in Current A/c or Savings A/c</h1>
        <h3>As the name says... it is as good as liquid money in your bank account.</h3>

        {/* STEP 1: Features */}
        {step === 1 && (
          <>
            <div className="features-grid">
              <div className="feature-item">
                <div className="feature-icon-placeholder"></div>
                <p>Risk free<br/>investment</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-placeholder"></div>
                <p>No Lock-in<br/>period</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-placeholder"></div>
                <p>Quick redemption<br/>(Within 24 Hrs)~</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-placeholder"></div>
                <p>Better Returns over<br/>current and savings a\c</p>
              </div>
            </div>

            <div className="cta-section">
              <p>Let's find out what you LOSE by parking in your Bank Account.</p>
              <button className="cta-btn" onClick={() => setStep(2)}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </div>
          </>
        )}

        {/* STEP 2: Amount Input */}
        {step === 2 && (
          <div className="input-container">
            <div className="input-title">How much do you want to invest</div>
            <div className="input-box-wrapper">
              <input 
                type="number" 
                className="custom-input" 
                value={principal} 
                onChange={(e) => setPrincipal(e.target.value)} 
                autoFocus
              />
            </div>
            <div className="formatted-blue-text">{formatAmountText(principal)}</div>
            
            <button className="cta-btn" onClick={() => setStep(3)}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        )}

        {/* STEP 3: Duration Input */}
        {step === 3 && (
          <div className="input-container">
            <div className="input-title">How long is it ideal for you</div>
            <div className="input-box-wrapper">
              <input 
                type="number" 
                className="custom-input" 
                style={{ paddingRight: '120px' }}
                value={months} 
                onChange={(e) => setMonths(e.target.value)} 
                autoFocus
              />
              <span className="input-suffix">Months</span>
            </div>
            <div className="formatted-blue-text">{formatYearsText(months)}</div>
            
            <button className="cta-btn" onClick={() => setStep(4)}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        )}

        {/* STEP 4: Results Table */}
        {step === 4 && (
          <div className="result-container">
            <div className="result-headline">
              Amount Invested <span className="orange-text">{formatAmountText(principal)}</span> for <span className="orange-text">{formatYearsText(months)}</span>
            </div>
            
            <table className="calc-table">
              <thead>
                <tr>
                  <th style={{backgroundColor: '#6da2d8'}}></th>
                  <th>Rate of Interest<sup>#</sup></th>
                  <th>What you Earn</th>
                  <th className="yellow-text">What you Lose</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Liquid Fund</td>
                  <td>6 %</td>
                  <td>{liquidEarn.toLocaleString('en-IN')}</td>
                  <td>---</td>
                </tr>
                <tr>
                  <td>Savings Account</td>
                  <td>3.5 %</td>
                  <td>{savingsEarn.toLocaleString('en-IN')}</td>
                  <td>{(liquidEarn - savingsEarn).toLocaleString('en-IN')}.00</td>
                </tr>
                <tr>
                  <td>Current Account</td>
                  <td>0 %</td>
                  <td>{currentEarn.toLocaleString('en-IN')}</td>
                  <td>{(liquidEarn - currentEarn).toLocaleString('en-IN')}.00</td>
                </tr>
              </tbody>
            </table>

            <div className="table-footer">
              <div className="disclaimer-text">
                # Interest rate may vary as per RBI credit policy.<br/>
                * Calculated over Simple Interest.<br/>
                ^ Except on Holidays.<br/>
                Terms and Conditions apply.<br/>
                This calculation is just for illustration purpose.
              </div>
              <div>
                <span className="recalc-link" onClick={() => setStep(2)}>Recalculate</span>
                <button className="invest-now-btn">Invest Now in Liquid Fund</button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Links (Pre-Footer) */}
        <PreFooter />

      </div>
    </>
  );
}

export default LiquidFunds;