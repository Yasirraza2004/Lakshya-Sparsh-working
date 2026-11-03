import { useState } from "react";
import "./Download.css";
import PreFooter from "../PreFooter";

function Download() {
  const [activeTab, setActiveTab] = useState("online");

  const tabs = [
    { id: "online", name: "MF Forms Online" },
    { id: "offline", name: "MF Forms Offline" },
    { id: "income", name: "Income Tax Forms" },
    { id: "kyc", name: "KYC" },
    { id: "fatca", name: "FATCA/UBO" },
    { id: "challan", name: "Challan" },
    { id: "pan", name: "PAN" },
    { id: "misc", name: "Misc. Forms" },
  ];

  const handleTabChange = (tab) => {
    setActiveTab(tab);

    window.history.replaceState(null, "", `/downloads/#${tab}`);
  };

  return (
    <>
    <div className="download-page">
      {/* =========================
                BANNER
            ========================= */}

      <section className="download-banner">
        <div className="download-banner-content">
          <div className="download-banner-text">
            <h1>Download Area</h1>
          </div>
        </div>
      </section>

      {/* =========================
                DOWNLOAD SECTION
            ========================= */}

      <section className="download-section">
        <div className="download-container">
          <p className="download-intro">
            We have collected all the forms related to your need in one place so
            that you don't have to hassle around the whole web for the same.
          </p>

          {/* =========================
                        TABS
                    ========================= */}

          <div className="download-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={
                  activeTab === tab.id ? "download-tab active" : "download-tab"
                }
                onClick={() => handleTabChange(tab.id)}
              >
                {tab.name}
              </button>
            ))}
          </div>

          {/* =========================
                        MF FORMS ONLINE
                    ========================= */}

          {activeTab === "online" && (
            <div className="download-content">
              <h2>MF Forms Online</h2>

              <table className="download-table online-table">
                <thead>
                  <tr>
                    <th>SL No</th>

                    <th>Documentation required</th>

                    <th>If, Yes</th>

                    <th>If, No</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>

                    <td>
                      <strong>KYC</strong>

                      <br />

                      <a
                        href="https://karvykra.com/KARVYKRAKYCEnquiry.aspx"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="status-link"
                      >
                        Check status here
                      </a>
                    </td>

                    <td>
                      <strong>Proceed to Step 2</strong>

                      <br />

                      <em>(Fill the IIN form)</em>
                    </td>

                    <td>
                      <a
                        href="https://www.armfintech.com/mftools/downloadforms/Kyc_forms/NewCKYApplication.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-yellow"
                      >
                        Download form
                        <span>Individual</span>
                      </a>
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                      <a
                        href="https://www.armfintech.com/mftools/downloadforms/Kyc_forms/NonIndividual-KYC.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-yellow"
                      >
                        Download form
                        <span>Non Individual</span>
                      </a>
                      <ul>
                        <li>Attach required documents</li>

                        <li>Self attest all documents</li>

                        <li>Sign on the form</li>

                        <li>
                          Call us at: +91-9262 737 373, +91-9835 070 564 for
                          collection
                        </li>
                      </ul>
                      <p className="online-extra">
                        OR
                        <br />
                        <a href="#">Ask us for biometric KYC</a>
                        <br />
                        OR
                        <br />
                        <a href="#">Get your E-KYC done yourself.</a>
                      </p>
                    </td>
                  </tr>

                  <tr>
                    <td>2</td>

                    <td>
                      <strong>IIN form</strong>

                      <br />

                      <span>
                        (This is one time registration form for online
                        transaction)
                      </span>
                    </td>

                    <td>
                      Proceed to our
                      <br />
                      <a href="/login">Login</a>
                      &nbsp;section and start investing
                    </td>

                    <td>
                      <a
                        href="https://www.armfintech.com/mftools/downloadforms/IIN/IIN_investor_form.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="download-yellow"
                      >
                        Download form
                      </a>

                      <ul>
                        <li>Attach a cancelled cheque</li>

                        <li>Sign the form</li>

                        <li>
                          Send us the scanned copy at:
                          <br />
                          <strong>lakshaysparsh1@gmail.com</strong>
                        </li>
                      </ul>

                      <p>
                        OR Call to connect at: +91-9262 737 373, +91-9835 070
                        564
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* =========================
                        MF FORMS OFFLINE
                    ========================= */}

          {activeTab === "offline" && (
            <div className="download-content">
              <h2>MF Forms Offline</h2>

              <p className="section-description">
                Investment in mutual funds at your ease in any fund house of
                your choice shown below. We have gathered all the common, STP,
                SIP forms with ARN and EUIN code attached so that you can track
                all your investment with us.
              </p>

              <div className="offline-frame">
                <iframe
                  src="https://amcforms.armfintech.com/download.php?arn=10770&euin=E036279&sub_br="
                  title="Mutual Fund Forms"
                ></iframe>
              </div>
            </div>
          )}

          {/* =========================
                        INCOME TAX FORMS
                    ========================= */}

          {activeTab === "income" && (
            <div className="download-content">
              <h2>Income Tax Forms</h2>

              <p className="section-description">
                We have collected all the forms related to Income tax at one
                place, according to your needs to get relief from tax from
                Investment, property, etc; for your ease and to save time so
                that you don't have to hassle around to find each of them
                throughout the site.
              </p>

              <table className="simple-download-table">
                <thead>
                  <tr>
                    <th colSpan="2">Tax Forms</th>
                  </tr>

                  <tr>
                    <th>Name</th>

                    <th>Forms</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      For Individuals having income from Salary & Interest
                    </td>

                    <td>
                      <a href="#">Form No. ITR-1 (SAHAJ)</a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      For Individuals and HUFs not having income from profit
                      gains of business or profession
                    </td>

                    <td>
                      <a href="#">Form No. ITR-2</a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      For Individuals & HUFs having income from a proprietary
                      business or profession
                    </td>

                    <td>
                      <a href="#">Form No. ITR-3</a>
                    </td>
                  </tr>

                  <tr>
                    <td>For Presumptive Income from Business & Profession</td>

                    <td>
                      <a href="#">Form No. ITR-4 (SUGAM)</a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      For persons other than: (i) Individual, (ii) HUF, (iii)
                      company and (iv) person filing Form ITR-7
                    </td>

                    <td>
                      <a href="#">Form No. ITR-5</a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      For Companies other than companies claiming exemption
                      under section 11
                    </td>

                    <td>
                      <a href="#">Form No. ITR-6</a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      For persons including companies required to furnish return
                      under sections 139(4A), 139(4B), 139(4C), 139(4D), 139(4E)
                      or 139(4F)
                    </td>

                    <td>
                      <a href="#">Form No. ITR-7</a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      Where the data of the Return of Income in Form ITR-1
                      (SAHAJ), ITR-2, ITR-3, ITR-4 (SUGAM), ITR-5, ITR-6, ITR-7
                      has not been verified electronically
                    </td>

                    <td>
                      <a href="#">Form ITR-V</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* =========================
                        KYC
                    ========================= */}

          {activeTab === "kyc" && (
            <div className="download-content">
              <h2>KYC Forms</h2>

              <p className="section-description">
                <strong>Know your customer (KYC)</strong> is the process of a
                business verifying the identity of its clients. Know your
                customer processes are also employed by companies of all sizes
                for the purpose of ensuring their proposed agents, consultants,
                or distributors are antibribery compliant.
              </p>

              <table className="document-table">
                <thead>
                  <tr>
                    <th>#</th>

                    <th>Document Type</th>

                    <th>Link</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>

                    <td>Central KYC</td>
                    <td>
                      <a
                        href="https://www.armfintech.com/mftools/downloadforms/Kyc_forms/NewCKYApplication.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-link"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>2</td>

                    <td>KYC Non-Individual Form</td>

                    <td>
                      <a
                        href="https://www.armfintech.com/mftools/downloadforms/Kyc_forms/NonIndividual-KYC.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-link"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>3</td>

                    <td>Annexure KYC Non-Individual Form</td>

                    <td>
                      <a
                        href="https://www.armfintech.com/mftools/downloadforms/Kyc_forms/AnnexureNonIndividuals.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-link"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* =========================
                        FATCA / UBO
                    ========================= */}

          {activeTab === "fatca" && (
            <div className="download-content">
              <h2>FATCA/UBO Forms</h2>

              <p className="section-description">
                <strong>Permanent Account Number (PAN)</strong> is a code that
                acts as identification of Indians especially those who pay
                Income Tax. It is a unique, 10-character alpha-numeric
                identifier, issued to all judicial entities identifiable under
                the Indian Income Tax Act 1961.
              </p>

              <table className="document-table">
                <thead>
                  <tr>
                    <th>#</th>

                    <th>Document Type</th>

                    <th>Link</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>

                    <td>FATCA Individual Forms</td>

                    <td>
                      <a
                        href="https://www.armfintech.com/mftools/downloadforms/FATCA/FATCA_Ind_Form.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-link"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>2</td>

                    <td>FATCA Corporate Forms</td>

                    <td>
                      <a
                        href="https://www.armfintech.com/mftools/downloadforms/FATCA/FATCA_Cor_Form.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-link"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>3</td>

                    <td>UBO Forms</td>

                    <td>
                      <a
                        href="https://www.armfintech.com/mftools/downloadforms/FATCA/UBO_Form.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-link"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* =========================
                        CHALLAN
                    ========================= */}

          {activeTab === "challan" && (
            <div className="download-content">
              <h2>Download Challan Forms</h2>

              <table className="document-table challan-table">
                <thead>
                  <tr>
                    <th colSpan="2">Challan Forms</th>
                  </tr>

                  <tr>
                    <th>Name</th>

                    <th>Forms</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>
                      For depositing Advance tax, Self Assessment tax, Tax on
                      Regular Assessment, Surcharge, Tax on Distributed Profits
                      of Domestic Company and Tax on Distributed Income to unit
                      holders
                    </td>

                    <td>
                      <a href="#">280</a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      For depositing TDS/TCS by company or non-company deductees
                    </td>

                    <td>
                      <a href="#">281</a>
                    </td>
                  </tr>

                  <tr>
                    <td>
                      For depositing Securities transaction tax, Estate duty,
                      Wealth-tax, Gift-tax, Interest-tax, Expenditure-tax and
                      Hotel Receipt tax
                    </td>

                    <td>
                      <a href="#">282</a>
                    </td>
                  </tr>

                  <tr>
                    <td>For depositing banking cash transaction tax and FBT</td>

                    <td>
                      <a href="#">283</a>
                    </td>
                  </tr>

                  <tr>
                    <td>For Depositing taxes under Black Money</td>

                    <td>
                      <a href="#">284</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* =========================
                        PAN
                    ========================= */}

          {activeTab === "pan" && (
            <div className="download-content">
              <h2>PAN Forms</h2>

              <p className="section-description">
                <strong>Permanent Account Number (PAN)</strong> is a code that
                acts as identification of Indians especially those who pay
                Income Tax. It is a unique, 10-character alpha-numeric
                identifier, issued to all judicial entities identifiable under
                the Indian Income Tax Act 1961.
              </p>

              <table className="document-table">
                <thead>
                  <tr>
                    <th>#</th>

                    <th>Document Type</th>

                    <th>Link</th>
                  </tr>
                </thead>

                <tbody>
                  <tr>
                    <td>1</td>

                    <td>PAN 49A New Form</td>

                    <td>
                      <a
                        href="https://www.armfintech.com/mftools/downloadforms/Pan_form/PAN49A.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-link"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                      </a>
                    </td>
                  </tr>

                  <tr>
                    <td>2</td>

                    <td>PAN Change Form</td>

                    <td>
                      <a
                        href="https://www.armfintech.com/mftools/downloadforms/Pan_form/PANchangeform.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="pdf-link"
                      >
                        <i className="fa-solid fa-file-pdf"></i>
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* =========================
                        MISCELLANEOUS
                    ========================= */}

          {activeTab === "misc" && (
            <div className="download-content">
              <h2>Miscellaneous Downloads</h2>

              <p className="section-description">
                We gathered all the forms and documents related to financial
                education, investments and disclosure here at single place.
              </p>

              <div className="misc-download">
                <p>
                  <strong>1. </strong>

                  <a href="#">Test.txt</a>
                </p>

                <p>
                  (right click the file and click <u>Save Target As</u>) to save
                  the file
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>

    <PreFooter />
    </>
  );
}

export default Download;
