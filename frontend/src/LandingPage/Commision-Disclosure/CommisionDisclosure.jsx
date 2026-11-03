import PreFooter from "../PreFooter";
import "./CommisionDisclosure.css";

function CommissionDisclosure() {
    return (
        <>
        <div className="commission-disclosure-page">

            {/* Hero Section */}
            <section className="commission-disclosure-hero">
                <div className="commission-disclosure-hero-overlay">
                    <div className="commission-disclosure-container">
                        <h1>Commission Disclosure</h1>
                    </div>
                </div>
            </section>


            {/* Main Content */}
            <section className="commission-disclosure-content">
                <div className="commission-disclosure-container">

                    <p>
                        We are purely a distributor of Mutual fund and hence earn
                        our commission as a product distributor. However
                        incidental to our services, we provide add on services
                        like- Financial Planning , Fixed Deposit investments,
                        Insurance advisory and others. However we do not charge
                        any extra fees for any of these incidental services due
                        to our key source of Income as a distributor of Mutual
                        Funds.
                    </p>

                    <p>
                        As a part of our own philosophy we keep a very
                        transparent and clear disclosure of our earnings for the
                        understanding of our clients:
                    </p>


                    {/* Commission Table */}
                    <div className="commission-table-wrapper">

                        <table className="commission-table">

                            <thead>
                                <tr>
                                    <th>SL No</th>
                                    <th>Mutual Fund Type</th>
                                    <th>Commission Method</th>
                                    <th>Rate Range</th>
                                    <th>Paid from</th>
                                </tr>
                            </thead>

                            <tbody>

                                <tr>
                                    <td>1</td>
                                    <td>Debt</td>
                                    <td>Trail</td>
                                    <td>1% to 1.5%</td>
                                    <td>
                                        Portfolio Expenses charged by the AMC
                                    </td>
                                </tr>

                                <tr>
                                    <td>2</td>
                                    <td>Equity</td>
                                    <td>Trail</td>
                                    <td>1% to 1.5%</td>
                                    <td>
                                        Portfolio Expenses charged by the AMC
                                    </td>
                                </tr>

                                <tr>
                                    <td>3</td>
                                    <td>Hybrid Funds</td>
                                    <td>Trail</td>
                                    <td>1% to 1.5%</td>
                                    <td>
                                        Portfolio Expenses charged by the AMC
                                    </td>
                                </tr>

                                <tr>
                                    <td>4</td>
                                    <td>Liquid Funds</td>
                                    <td>Trail</td>
                                    <td>.10% to .20%</td>
                                    <td>
                                        Portfolio Expenses charged by the AMC
                                    </td>
                                </tr>

                            </tbody>

                        </table>

                    </div>


                    {/* Additional Information */}
                    <ul className="commission-disclosure-list">

                        <li>
                            Portfolio Expenses are capped at certain level from
                            1.5% to 2.75% by SEBI and is charges as per the
                            Asset size and on annualized calculation method
                        </li>

                        <li>
                            The net NAV announced by the Fund under its regular
                            plan is less of such charges taken on weekly average
                            valuation of the portfolio assets
                        </li>

                    </ul>


                    {/* Contact Information */}
                    <p className="commission-disclosure-contact">
                        In case you need any clarification or wish to understand
                        more on Expense ratio or our commissions, do E mail us
                        freely or visit the branch any time from Monday to
                        Saturday (working time: 10 am to 6 pm)
                    </p>

                </div>
            </section>

        </div>

        <PreFooter />
        </>
    );
}

export default CommissionDisclosure;