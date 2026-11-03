import { useState } from 'react';
import PreFooter from '../../../PreFooter';

function LongTermDebtFunds() {
  const [step, setStep] = useState(1);
  const [principal, setPrincipal] = useState('');
  const [years, setYears] = useState('');

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

  // Math Calculations for Table (Based on Simple Interest as per screenshot)
  const p = Number(principal) || 0;
  const y = Number(years) || 0;
  
  // Debt Fund Calculations
  const debtPreTax = Math.round((p * 7.5 * y) / 100);
  const indexedValue = Math.round((p * 5 * y) / 100); // 5% inflation assumption
  const debtTaxableAmount = Math.max(0, debtPreTax - indexedValue);
  const debtTax = Math.round(debtTaxableAmount * 0.20); // 20% tax after indexation
  const debtPostTax = debtPreTax - debtTax;
  const debtEffectiveROI = y > 0 ? ((debtPostTax / y) / p) * 100 : 0;

  // Fixed Deposit Calculations
  const fdPreTax = Math.round((p * 6.75 * y) / 100);
  const fdTax = Math.round(fdPreTax * 0.30); // Flat 30% slab, no indexation
  const fdPostTax = fdPreTax - fdTax;
  const fdEffectiveROI = y > 0 ? ((fdPostTax / y) / p) * 100 : 0;

  const whatYouLose = debtPostTax - fdPostTax;

  return (
    <>
      <style>
        {`
          .debt-page {
            font-family: sans-serif;
            color: #222;
            padding-top: 60px;
            text-align: center;
          }

          /* Headers */
          .debt-page h1 {
            font-size: 32px;
            font-weight: 400;
            color: #111;
            margin-bottom: 10px;
            padding: 0 20px;
          }
          .debt-page h3 {
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
            position: relative;
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
            right: 40px;
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
            min-height: 25px;
          }
          .tip-text {
            position: absolute;
            top: -40px;
            right: -100px;
            font-size: 15px;
            color: #555;
          }
          .sub-text {
            font-size: 15px;
            color: #888;
            margin-bottom: 30px;
            margin-top: -20px;
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
            max-width: 1100px;
            margin: 0 auto 80px auto;
          }
          .result-headline {
            font-size: 24px;
            color: #333;
            margin-bottom: 25px;
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
            padding: 20px 10px;
            font-weight: 500;
            font-size: 15px;
            border-right: 1px solid rgba(255,255,255,0.1);
          }
          .calc-table th.yellow-text { color: #ffdc3b; border-right: none; }
          .calc-table td {
            padding: 20px 10px;
            font-size: 15px;
            color: #333;
            text-align: center;
          }
          .calc-table .section-row td {
            background-color: #f1f1f1;
            font-weight: 600;
            font-size: 14px;
            letter-spacing: 0.5px;
            padding: 15px;
          }
          .calc-table .data-row td {
            background-color: #f9f9f9;
          }

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

      <div className="debt-page">
        <h1>You can earn better with Debt Funds instead of Fixed deposit</h1>
        <h3>except this, you will gain INDEXATION benefit while investing in Debt Mutual Funds</h3>

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
                <p>Quick redemption<br/>(Within 24 Hrs)~</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-placeholder"></div>
                <p>Taxation benefit<br/>on Returns^</p>
              </div>
              <div className="feature-item">
                <div className="feature-icon-placeholder"></div>
                <p>Better Returns<br/>over Fixed Deposits</p>
              </div>
            </div>

            <div className="cta-section">
              <p>Let's find out what you LOSE by investing in a Fixed Deposit.</p>
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
            <div className="tip-text">💡 For 5 yrs & above, invest in Equity Oriented Funds</div>
            
            <div className="input-title">Ok Great! How long do you want to invest</div>
            <div className="input-box-wrapper">
              <input 
                type="number" 
                className="custom-input" 
                style={{ paddingRight: '120px' }}
                value={years} 
                onChange={(e) => setYears(e.target.value)} 
                autoFocus
              />
              <span className="input-suffix">Years</span>
            </div>
            <div className="sub-text">Minimum investment for 3 Yrs to get Indexation benefit in Debt Mutual Fund</div>
            
            <button className="cta-btn" onClick={() => setStep(4)}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        )}

        {/* STEP 4: Results Table */}
        {step === 4 && (
          <div className="result-container">
            <div className="result-headline">
              Amount Invested <span className="orange-text">{formatAmountText(principal)}</span> for <span className="orange-text">{years} Years</span>
            </div>
            
            <table className="calc-table">
              <thead>
                <tr>
                  <th>Rate of Interest<sup>#</sup></th>
                  <th>Return (Pre Tax)</th>
                  <th>Indexed Value*</th>
                  <th>Income Tax^</th>
                  <th>Post Tax Return</th>
                  <th>Effective ROI</th>
                  <th className="yellow-text">What you Lose</th>
                </tr>
              </thead>
              <tbody>
                <tr className="section-row">
                  <td colSpan="7">IF INVESTED IN DEBT FUNDS</td>
                </tr>
                <tr className="data-row">
                  <td>7.50 %</td>
                  <td>{debtPreTax.toLocaleString('en-IN')}</td>
                  <td>{indexedValue.toLocaleString('en-IN')}</td>
                  <td>{debtTax.toLocaleString('en-IN')}</td>
                  <td>{debtPostTax.toLocaleString('en-IN')}</td>
                  <td>{debtEffectiveROI.toFixed(2).replace(/\.00$/, '')} %</td>
                  <td>---</td>
                </tr>
                <tr className="section-row">
                  <td colSpan="7">IF INVESTED FIXED DEPOSIT</td>
                </tr>
                <tr className="data-row">
                  <td>6.75 %</td>
                  <td>{fdPreTax.toLocaleString('en-IN')}</td>
                  <td>{indexedValue.toLocaleString('en-IN')}</td>
                  <td>{fdTax.toLocaleString('en-IN')}</td>
                  <td>{fdPostTax.toLocaleString('en-IN')}</td>
                  <td>{fdEffectiveROI.toFixed(2)} %</td>
                  <td>{whatYouLose.toLocaleString('en-IN')}</td>
                </tr>
              </tbody>
            </table>

            <div className="table-footer">
              <div className="disclaimer-text">
                # Interest rate may vary as per RBI credit policy.<br/>
                * Inflation (applied at the rate of 5% Per annum) may vary as per Indian economy.<br/>
                &lt; Calculated over Simple Interest.<br/>
                ^ Assuming 30% Tax Slab/20% after Indexation.<br/>
                ~ Except on Holidays.<br/>
                This calculation is just for illustration purpose.<br/>
                Please contact your Chartered Accountant for detailed calculation on Indexation.
              </div>
              <div>
                <span className="recalc-link" onClick={() => setStep(2)}>Recalculate</span>
                <button className="invest-now-btn">Invest Now in Debt Fund</button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Links (Pre-Footer) */}
        <PreFooter/>

      </div>
    </>
  );
}

export default LongTermDebtFunds;