import { useState } from 'react';
import PreFooter from '../PreFooter';

function NRICorner() {
  // State to track which FAQ is open. null means all are closed.
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    // If clicking the already open FAQ, close it. Otherwise open the new one.
    if (openFaq === index) {
      setOpenFaq(null);
    } else {
      setOpenFaq(index);
    }
  };

  // FAQ array updated with JSX to support Bold tags and Bullet Lists
  const faqs = [
    {
      q: "1. What are Foreign Exchange Assets and Specified Assets?",
      a: (
        <>
          <strong>Ans.</strong> As per Section 115C of Indian Income Tax Act, 1961 <strong>Foreign Exchange Asset</strong> means any Specified asset which the assessee has acquired or purchased with, or subscribed to in, convertible Foreign exchange.<br />
          <strong>Specified Asset</strong> means any of the following assets, namely:
          <ul>
            <li>shares in an Indian company;</li>
            <li>debentures issued by an Indian company which is not private company as defined in Companies Act, 1956;</li>
            <li>deposits with an Indian company which is not private company as defined in Companies Act, 1956;</li>
            <li>any security of the Central Government as defined in clause (2) of section 2 of the Public Debt Act, 1944;</li>
            <li>such other assets as the Central Government may specify in this behalf by notification in the Official Gazette.</li>
          </ul>
          Foreign Exchange for the purpose of the above means foreign exchange, which is for time being treated by Reserve Bank of India as convertible foreign exchange for the purposes of the Foreign Exchange Regulation Act, 1973(46 of 1973), and any rules made thereunder.
        </>
      )
    },
    {
      q: "2. Whether Right Shares and Bonus Shares form part of Foreign Exchange Assets?",
      a: (
        <>
          <strong>Ans.</strong> RBI notification is silent on the issue of bonus shares and right entitlements. In the case of bonus shares, one can safely take the view that if the bonus shares are allotted as a result of shares for which payment is made by the way of inward remittance in foreign currency or by debit to NRE / FCNR account they would be treated as foreign Exchange Assets.<br /><br />
          Though nothing specific has been mentioned regarding the right entitlement, one can apply the analogy of bonus shares to right entitlements also. If payment for the original shares has been made by the way of inward remittance in foreign currency or by debit to NRE/ FCNR Account they would be treated as foreign exchange assets.
        </>
      )
    },
    {
      q: "3. What are the various investment options available to NRIs under FDI route?",
      a: (
        <>
          <strong>Ans.</strong> Investment options available to NRIs under FDI route can be broadly classified under two heads namely:<br /><br />
          <strong>I. Automatic Approval Route.</strong><br /><br />
          <strong>II. Prior Approval from Government Route.</strong><br /><br />
          Presently most of the activities are under Automatic approval Route i.e 100% FDI. No approval is required for FDI in case of activities under Automatic Route only a notification to RBI is required within 30 days.<br /><br />
          Cases that are not covered under the Automatic Route fall under Prior Approval from Government Route. Approval from government is required in such cases.
        </>
      )
    },
    {
      q: "4. What is meant by investment through direct subscription route?",
      a: (
        <>
          <strong>Ans.</strong> As per the regulations NRIs are allowed to invest up to a certain percentage of the total paid up capital of the company by directly subscribing to the equity/convertible debentures of the company either though a public offering made by the company or through private placements on one to one basis. Regulations provide for different ceilings on such investments based on the industry to which the company belongs and also the nature of investments (repatriation/non-repatriation basis.
        </>
      )
    },
    {
      q: "5 . What is the Portfolio Investment Scheme?",
      a: (
        <>
          <strong>Ans.</strong> Portfolio Investment Scheme (PINS) is a scheme of the Reserve Bank of India (RBI) defined in Schedule 3 of Foreign Exchange Management Act 2000 under which the 'Non Resident Indians (NRIs)' and 'Person of Indian Origin (PIOs)' can purchase and sell shares and convertible debentures of Indian Companies on a recognized stock exchange in India by routing all such purchase/sale transactions through their account held with a Designated Bank Branch .
        </>
      )
    },
    {
      q: "6. What steps does an NRI need to take to begin his or her investment in the Indian stock Market?",
      a: (
        <>
          <strong>Ans.</strong><br />
          An NRI should open a new bank account with designated bank branch which is approved by RBI (Reserve Bank of India) for this purpose.<br />
          He should apply for a general approval for investment in Indian Stock Market through his designated bank branch.<br />
          He should open a Demat Account with a Depository Participant to hold his shares.<br />
          He needs to register with a broker to execute his buy/sell orders on the stock exchange(s).
        </>
      )
    },
    {
      q: "7. What is the distinction between NRE and NRO accounts?",
      a: (
        <>
          <strong>Ans.</strong> Funds remitted from abroad or local funds, which can otherwise be remitted abroad to the account holder, can be credited to NRE Accounts. Local funds, which do not qualify for remittance outside India, are required to be credited to NRO accounts.
        </>
      )
    },
    {
      q: "8. What is the permission, which an NRI has to obtain to invest under the Portfolio Investment Scheme?",
      a: (
        <>
          <strong>Ans.</strong> NRIs are allowed to invest in Indian equity markets under the Portfolio Investment Scheme. Under this scheme NRIs are permitted to invest in shares/debentures of Indian companies through Stock Exchanges in India. These investments require prior approval of RBI Designated branch of authorized banks have been now empowered to issue such permissions to NRIs.
        </>
      )
    },
    {
      q: "9. Which are the broad schemes under which an NRI can make investments in the Indian companies?",
      a: (
        <>
          <strong>Ans.</strong> Broadly, NRIs are allowed to invest under the Portfolio Investment Scheme (buying through the secondary market) and through the Direct Subscription route (Investments though IPOs/offer for sale /Private Placements).
        </>
      )
    },
    {
      q: "10. Can an NRI have investments under Portfolio Investment Scheme on repatriation as well as non-repatriation basis?",
      a: (
        <>
          <strong>Ans.</strong> Yes. Investment can be made on repatriation as well as non-repatriation basis. However, an NRI will have to open NRE account as well as NRO account with designated bank branch as the sale proceeds of non-repatriation investment can only be credited to NRO account.
        </>
      )
    },
    {
      q: "11. Under what circumstances can investments made under Portfolio Investment Scheme be repatriated?",
      a: (
        <>
          <strong>Ans.</strong> The repatriation of the sale proceeds, net of taxes, are allowed if the original purchase was made on repatriation basis and such investments were made out of funds from NRE/FCNR account or by means of remittance from abroad.
        </>
      )
    },
    {
      q: "12. Can NRI invest in shares/debentures of Indian Cos., and other securities on a non-repatriation basis?",
      a: (
        <>
          <strong>Ans.</strong> Yes, NRIs can invest without any limit on non-repatriation basis in shares and convertible debentures of Indian Cos., issued either by public issue or private placement or right issues. NRI can also purchase Govt. Securities (other than bearer securities), treasury bills, units of domestic mutual funds etc on non-repatriation basis.
        </>
      )
    },
    {
      q: "13. Can NRIs invest in Govt. Securities etc. on repatriation basis?",
      a: (
        <>
          <strong>Ans.</strong> Yes. NRIs can invest on repatriation basis in:
          <ul>
            <li>Govt. securities(other than bearer securities), treasury bills or units of domestic Mutual Funds</li>
            <li>Bonds issued by PSUs</li>
            <li>Shares in Public Sector Enterprise disinvestments by Govt. of India</li>
            <li>Fund for such investment are to be received through foreign inward remittance or to debit of NRE/FCNR accounts.</li>
          </ul>
          The above securities can be sold through stockbrokers on a recognized stock exchange or tender units of mutual funds to the issuer for repurchase or for payment of maturity proceeds or tender Govt. securities/Treasury Bills to RBI for payment of maturity proceeds. The sale proceeds can be repatriated net of Indian Tax.
        </>
      )
    },
    {
      q: "14. Can NRI/PIO invest in any immovable property in India?",
      a: (
        <>
          <strong>Ans.</strong> An NRI does not require any permission to acquire any immovable property in India or transfer any property in India to a Resident citizen of India.<br />
          PIO's who are citizens of Pakistan, Bangladesh, Sri Lanka, Afghanistan, China, Iran, Nepal or Bhutan, require prior permission of RBI for acquiring or transferring any immovable property in India.<br />
          PIO has some restrictions. He does not require any permission to
          <ul>
            <li>Purchase a property out of forex.</li>
            <li>Acquire a property by way of gift from a ROI.</li>
            <li>Acquire a property by way of inheritance from a Resident or a person Resident outside India who had acquired such property in accordance with the provisions of the foreign exchange law in force at the time of acquisition by him or FEMA.</li>
            <li>Sell any immovable property in India to a Resident.</li>
            <li>Gift or sell agricultural property to a Resident who is a citizen of India.</li>
            <li>Gift or sell a residential or commercial property in India to a Resident or person Resident outside India.</li>
          </ul>
        </>
      )
    }
  ];

  return (
    <>
      <style>
        {`
          .nri-page { 
            font-family: 'Open Sans', Arial, sans-serif; 
            color: #333; 
            background-color: #fff;
          }
          
          /* Hero Section */
          .nri-hero {
            background-image: url('/media/images/nri-banner.png'); 
            background-size: cover;
            background-position: center;
            background-color: #4a90e2; 
            padding: 80px 10%;
            color: white;
            text-align: center;
          }
          .nri-hero h1 {
            font-size: 36px;
            font-weight: 700;
            margin: 0 0 10px 0;
            text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
          }
          .nri-hero p {
            font-size: 14px;
            margin: 0;
            text-shadow: 1px 1px 4px rgba(0,0,0,0.5);
          }
          .nri-hero a { color: white; text-decoration: none; }
          .nri-hero a:hover { text-decoration: underline; }

          /* Content Container */
          .nri-content {
            max-width: 1050px;
            margin: 50px auto;
            padding: 0 20px;
          }

          /* Headings & Text */
          .nri-heading {
            color: #4a90e2;
            font-size: 22px;
            font-weight: 500;
            margin-top: 40px;
            margin-bottom: 15px;
          }
          .nri-heading:first-child { margin-top: 0; }
          
          .nri-text {
            font-size: 14px;
            line-height: 1.6;
            color: #222;
            margin-bottom: 20px;
            text-align: justify;
          }
          .nri-text strong {
            color: #000;
            font-weight: 600;
          }

          /* Top Info Section with Image */
          .nri-info-split {
            display: flex;
            gap: 40px;
            align-items: flex-start;
            margin-bottom: 40px;
          }
          .nri-info-text { flex: 1; }
          .nri-info-img {
            flex: 1;
            max-width: 450px;
          }
          .nri-info-img img {
            width: 100%;
            height: auto;
            border-radius: 4px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }

          /* Main Lists */
          .nri-list {
            margin-left: 20px;
            margin-bottom: 20px;
            font-size: 14px;
            line-height: 1.6;
            color: #222;
          }
          .nri-list li { margin-bottom: 8px; }
          
          /* FAQ Section */
          .faq-section {
            margin-top: 60px;
          }
          .faq-title {
            color: #4a90e2;
            font-size: 28px;
            font-weight: 600;
            margin-bottom: 25px;
          }

          /* FAQ Accordion Styling */
          .faq-item {
            margin-bottom: 10px; /* Space between questions */
          }
          
          .faq-question {
            background-color: #f4f5f7;
            padding: 15px 20px;
            font-size: 15px;
            font-weight: 600;
            color: #333;
            border: 1px solid #eaeaea;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.3s ease;
            display: flex;
            align-items: center;
          }
          
          .faq-question:hover {
            color: #4a90e2; /* Hover changes text to blue */
          }

          /* Open state for question */
          .faq-item.open .faq-question {
            border-bottom-left-radius: 0;
            border-bottom-right-radius: 0;
            border-bottom: none;
            color: #4a90e2; /* Stays blue when open */
          }

          /* Answer dropdown box with smooth ease transition */
          .faq-answer-wrapper {
            display: grid;
            grid-template-rows: 0fr; /* Collapsed state */
            transition: grid-template-rows 0.4s ease-in-out; 
          }

          .faq-item.open .faq-answer-wrapper {
            grid-template-rows: 1fr; /* Expanded state */
          }

          .faq-answer-content {
            overflow: hidden; 
          }

          .faq-answer {
            background-color: #f9f9f9;
            padding: 20px;
            font-size: 14px;
            line-height: 1.6;
            color: #444;
            border: 1px solid #eaeaea;
            border-top: none;
            border-bottom-left-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          
          /* Styling for Lists inside FAQs */
          .faq-answer ul {
            margin-top: 10px;
            margin-bottom: 15px;
            margin-left: 20px;
            padding-left: 20px;
          }
          
          .faq-answer li {
            margin-bottom: 5px;
          }

          /* Pre-Footer Links Area */
          .pre-footer-wrapper {
            width: 90%; max-width: 1200px; margin: 40px auto 30px auto;
            padding-top: 25px; border-top: 1px solid #ddd;
            display: flex; justify-content: space-between; align-items: center;
          }
          .pre-footer-links { display: flex; gap: 30px; }
          .pre-footer-links a { color: #555; text-decoration: none; font-size: 13px; }
          .pre-footer-socials { display: flex; gap: 15px; color: #999; font-size: 16px; }

          @media (max-width: 768px) {
            .nri-info-split { flex-direction: column; }
            .nri-info-img { max-width: 100%; }
          }
        `}
      </style>

      <div className="nri-page">
        {/* Banner Section */}
        <div className="nri-hero">
          <h1>NRI Corner</h1>
        </div>

        {/* Content Section */}
        <div className="nri-content">
          
          <h2 className="nri-heading">A complete guide for NRIs investing in Mutual Funds</h2>
          <p className="nri-text" style={{fontStyle: 'italic'}}>"NRIs are encouraged to invest in Indian Mutual Funds. Read more to know how."</p>
          <p className="nri-text">
            For decades, NRIs have been a considerable driving force behind the Indian economy. Remittances back home play an important part in making the Indian rupee strong. Beyond savings, there is another option—investing in mutual funds. Mutual funds offer a way for NRIs to participate in the India growth story. They give a performance advantage over traditional savings schemes, are professionally managed, and generally tax-efficient in the long run. If you are an NRI looking to invest in India, here is a quick guide.
          </p>

          <div className="nri-info-split">
            <div className="nri-info-text">
              <h2 className="nri-heading">Can NRIs invest in mutual funds?</h2>
              <p className="nri-text">
                Yes, Non-Resident Indians (NRIs) can easily invest in Indian mutual funds. To comply with the Foreign Exchange Management Act (FEMA), they cannot use standard bank accounts but must open NRE or NRO accounts. Funds remitted from abroad must go into the NRE account, while the income generated in India goes into the NRO account. An NRI must fulfill KYC (Know Your Customer) requirements before investing, which includes submitting necessary documents like a copy of passport, proof of foreign residence, and PAN card.
              </p>
            </div>
            <div className="nri-info-img">
              <img src="/media/images/nri-mutual-fund.png" alt="NRI Investment" onError={(e)=>e.target.style.display='none'} />
            </div>
          </div>

          <h2 className="nri-heading">Income Tax Provisions for NRIs:</h2>
          <p className="nri-text">
            Now let's turn our attention to the tax implications. As per the Indian Income Tax Act, tax rules for NRIs investing in mutual funds are mostly similar to those for resident Indians. However, the exact tax liability depends on the type of fund, holding period, and the capital gains earned. Short-term and long-term capital gains tax rules apply similarly. The difference lies in TDS (Tax Deducted at Source). For NRIs, TDS is mandatory on capital gains when redeeming mutual fund units.
          </p>
          <p className="nri-text"><strong>There are primarily two ways in which returns are earned in mutual funds:</strong></p>
          <ul className="nri-list">
            <li><strong>Dividends:</strong> These are portions of the profit distributed by the fund.</li>
            <li><strong>Capital Gains:</strong> This is the profit realized upon the sale of mutual fund units.</li>
          </ul>

          <h2 className="nri-heading">Applicable Deductions and Exemptions for NRIs:</h2>
          <p className="nri-text">
            The Indian Income Tax Act provides several deductions and exemptions that NRIs can avail themselves of to reduce their tax liability. Here are some of the key provisions:
          </p>
          <ul className="nri-list">
            <li><strong>Section 80C:</strong> Deductions up to ₹ 1.5 lakh per annum on investments in ELSS mutual funds, life insurance premiums, etc.</li>
            <li><strong>Section 80D:</strong> Deductions on premiums paid for health insurance policies for self, family, and parents.</li>
            <li><strong>Section 54:</strong> Exemptions on long-term capital gains from the sale of a residential house if reinvested in another residential property.</li>
          </ul>

          <h2 className="nri-heading">Key Income Tax Rules To Know:</h2>
          <p className="nri-text">
            For the taxation to be determined correctly, residential status is crucial. An individual is considered an NRI if they reside outside India for more than 182 days in a financial year.
          </p>
          <p className="nri-text">
            <strong>Taxability in India depends on the nature of income:</strong> Any income earned or accrued in India is taxable for an NRI. Therefore, capital gains and dividends earned from Indian mutual funds are subject to taxation. TDS is deducted by the AMC (Asset Management Company) at the applicable rates before the payout is credited to the NRI's account. NRIs can claim refunds if the overall tax liability is lower than the TDS deducted by filing an Income Tax Return (ITR) in India. Furthermore, DTAA (Double Taxation Avoidance Agreement) benefits can be claimed to avoid being taxed twice on the same income in India and their country of residence.
          </p>

          {/* FAQ Section */}
          <div className="faq-section">
            <h2 className="faq-title">FAQs For NRI:</h2>
            
            <div className="faq-container">
              {faqs.map((faq, index) => (
                <div key={index} className={`faq-item ${openFaq === index ? 'open' : ''}`}>
                  
                  {/* The clickable Question box */}
                  <div className="faq-question" onClick={() => toggleFaq(index)}>
                    {faq.q}
                  </div>
                  
                  {/* The dropdown Answer box */}
                  <div className="faq-answer-wrapper">
                    <div className="faq-answer-content">
                      <div className="faq-answer">
                        {faq.a}
                      </div>
                    </div>
                  </div>

                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Pre Footer */}
        <PreFooter />

      </div>
    </>
  );
}

export default NRICorner;