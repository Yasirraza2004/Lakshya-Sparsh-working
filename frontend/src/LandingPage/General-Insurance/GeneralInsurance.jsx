import { useState } from 'react';
import "./GeneralInsurance.css";

function GeneralInsurance() {

  const [activeTab, setActiveTab] = useState('health');

  return (
    <div className="gi-page">

      {/* Banner Section */}
      <div className="gi-hero">
        <h1>General Insurance</h1>
      </div>

      {/* Top Description Area */}
      <div className="gi-top-desc">
        <p>
          Insurance other than "Life Insurance" falls under the category of
          General Insurance. General Insurance comprises of insurance of
          property against fire, burglary etc, personal insurance such as
          Accident and Health Insurance, and liability insurance which covers
          legal liabilities. There are also other covers such as Errors and
          Omissions insurance for professionals, credit insurance etc.
        </p>
      </div>

      {/* Tab Navigation Menu */}
      <div className="gi-tabs-container">
        <div className="gi-tabs">

          <button
            className={`gi-tab-btn ${
              activeTab === 'health' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('health')}
          >
            Health Insurance
          </button>

          <button
            className={`gi-tab-btn ${
              activeTab === 'car' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('car')}
          >
            Car Insurance
          </button>

          <button
            className={`gi-tab-btn ${
              activeTab === 'travel' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('travel')}
          >
            Travel Insurance
          </button>

          <button
            className={`gi-tab-btn ${
              activeTab === 'home' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('home')}
          >
            Home Insurance
          </button>

          <button
            className={`gi-tab-btn ${
              activeTab === 'corporate' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('corporate')}
          >
            Corporate Insurance
          </button>

        </div>
      </div>

      {/* Full Bleed Split Section */}
      <div className="gi-split-section">

        <div className="gi-left-fill"></div>

        <div className="gi-center-content">

          {/* Left Sidebar */}
          <div className="gi-sidebar">

            <h2>
              Don't Have an<br />
              Insurance ! <span>or</span>
            </h2>

            <p>
              Want guidance in selecting a plan, just fill the form below
              & get in touch with us
            </p>

            <form
              className="gi-form"
              onSubmit={(e) => e.preventDefault()}
            >

              <div className="floating-group">
                <input
                  type="text"
                  className="floating-input"
                  required
                />
                <label className="floating-label">
                  YOUR NAME
                </label>
              </div>

              <div className="floating-group">
                <input
                  type="email"
                  className="floating-input"
                  required
                />
                <label className="floating-label">
                  EMAIL
                </label>
              </div>

              <div className="floating-group">
                <input
                  type="tel"
                  className="floating-input"
                  required
                />
                <label className="floating-label">
                  MOBILE
                </label>
              </div>

              <div className="floating-group">
                <textarea
                  className="floating-input floating-textarea"
                  required
                ></textarea>

                <label className="floating-label">
                  YOUR MESSAGE
                </label>
              </div>

              <button
                type="submit"
                className="submit-btn"
              >
                Get Help From Us
              </button>

            </form>
          </div>

          {/* Right Content */}
          <div className="gi-content">

            {activeTab === 'health' && (
              <>
                <h3 className="content-heading">
                  Health Insurance
                </h3>

                <p>
                  Medical expenses are sky high these days, but was never
                  cheap ever. Even a small treatment or an appointment with
                  a doctor might consume a lot of money. Health insurance is
                  a must, it saves money and covers unexpected calamities.
                  Health insurance comes in handy to meet emergencies of
                  severe ailment or accident. Sometimes it is associated
                  with covering disability and custodial needs. Life is
                  unpredictable, insurance can make it safe and secure from
                  bearing huge loss. Health insurance is affordable and
                  carries the assurance and freedom from insecurities that
                  threaten life now and then.
                </p>

                <p>
                  We liaise with the leading health insurance providers in
                  India and buying through us enables analyzing costs and
                  benefits from the pool of policies matching your
                  requirements and of course not to forget the quality
                  service offered by us.
                </p>
              </>
            )}

            {activeTab === 'car' && (
              <>
                <h3 className="content-heading">
                  Car Insurance
                </h3>

                <p>
                  Car insurance technically provides protection against
                  the losses incurred as a result of unavoidable instances.
                  It helps cover against theft, financial loss caused by
                  accidents and any subsequent liabilities. The cover level
                  of Car insurance can be the insured party, the insured
                  vehicle, third parties (car and people). The premium of
                  Car insurance is dependent on certain parameters like
                  gender, age, vehicle classification, etc.
                </p>

                <p>
                  With so many car insurance companies vying for customer
                  base in the market, it is quite difficult to make a
                  decision like choosing the right policy covering the
                  requirement, right insurer, etc. Figuring out the right
                  insurance policy fulfilling the requirement and being
                  cost effective can be time consuming.
                </p>
              </>
            )}

            {activeTab === 'travel' && (
              <>
                <h3 className="content-heading">
                  Travel Insurance
                </h3>

                <p>
                  Be it business or pleasure travel, having a trouble free
                  trip is what everyone looks forward to. Illness is
                  uncertain, it can spoil the planned trip. But with
                  insurance in hand, medical bills are taken care of.
                  Other difficult situations like loss of passport or
                  baggage while traveling can also add on financial
                  difficulties.
                </p>

                <p>
                  It may save spending a fortune in any tragic unforeseen
                  incident. But the challenge is to find the right policy
                  that fits the budget at a short notice.
                </p>
              </>
            )}

            {activeTab === 'home' && (
              <>
                <h3 className="content-heading">
                  Home Insurance
                </h3>

                <p>
                  Home insurance, also commonly called hazard insurance or
                  homeowner's insurance, is the type of property insurance
                  that covers private homes. It is an insurance policy that
                  combines various personal insurance protections.
                </p>

                <p>
                  The home insurance policy is usually a term contract—a
                  contract that is in effect for a fixed period of time.
                  The payment the insured makes to the insurer is called
                  the premium.
                </p>
              </>
            )}

            {activeTab === 'corporate' && (
              <>
                <h3 className="content-heading">
                  Corporate Insurance
                </h3>

                <p>
                  Our corporate Insurance Advisory, is capable to include
                  end to end Insurance Solutions and Services to
                  corporates. We cater to the Corporate Insurance and Risk
                  Management needs for Large Industrial Houses, Medium
                  Scale Companies and SMEs.
                </p>

                <ul className="corporate-list">
                  <li>
                    Provide Comparative and Competitive Quotes from
                    Insurance Companies
                  </li>

                  <li>
                    Assist in Policy Administration
                  </li>

                  <li>
                    Personalized Claims Assistance
                  </li>
                </ul>
              </>
            )}

          </div>
        </div>

        <div className="gi-right-fill"></div>

      </div>
    </div>
  );
}

export default GeneralInsurance;