import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import HomePage from "./LandingPage/Home/HomePage";
import Login from "./LandingPage/Login/Login";
import Wealth from "./LandingPage/WealthPlanning/Wealth";
import ELSS from "./ELSS/ELSS";

import AboutUs from "./LandingPage/About Us/AboutUs";
import StartInvesting from "./LandingPage/Start Investing/StartInvesting";
import NriCorner from "./LandingPage/NRICorner/NriCorner";
import Download from "./LandingPage/Download/Download";
import Gallery from "./LandingPage/Gallery/Gallery";
import Contact from "./LandingPage/Contact Us/Contact";

import LiquidFunds from "./LandingPage/Home/DebtFundsSection/LiquidFunds/LiquidFunds";
import ConservativeHybridFunds from "./LandingPage/Home/DebtFundsSection/ConservativeHybridFunds/ConservativeHybridFunds";
import LongTermDebtFunds from "./LandingPage/Home/DebtFundsSection/LongTermDebtFunds/LongTermDebtFunds";

import LargeCapFund from "./LandingPage/Home/EquityMutalFundSection/LargeCapFund/LargeCapFund";
import MidCapFund from "./LandingPage/Home/EquityMutalFundSection/MidCapFund/MidCapFund";
import MultiCapFund from "./LandingPage/Home/EquityMutalFundSection/MultiCapFund/MultiCapFund";
import SmallCapFund from "./LandingPage/Home/EquityMutalFundSection/SmallCapFund/SmallCapFund";
import ThematicFund from "./LandingPage/Home/EquityMutalFundSection/ThematicFund/ThematicFund";
import Insurance from "./LandingPage/Home/ServicesWeProvide/InsuranceServices/Insurance";
import LifeInsurance from "./LandingPage/Home/ServicesWeProvide/InsuranceServices/LifeInsurance/LifeInsurance";
import FinancialWorkout from "./LandingPage/FinancialWorkout/FinancialWorkout";
import Layout from "./Layout";
import Navbar from "./LandingPage/Navbar";
import CommissionDisclosure from "./LandingPage/Commision-Disclosure/CommisionDisclosure";
import Disclaimer from "./LandingPage/Disclaimer/Disclaimer";
import SubmitFeedback from "./LandingPage/Home/FeedbackSection/SubmitFeedback";
import KnowledgeCenter from "./LandingPage/Start Investing/KnowledgeCenter/KnowledgeCenter";
import NewToInvesting from "./LandingPage/Start Investing/KnowledgeCenter/NewToInvesting/NewToInvesting";
import SmartTaxPlanning from "./LandingPage/Start Investing/KnowledgeCenter/SmartTaxPlanning/SmartTaxPlanning";
import RetirementPlanning from "./LandingPage/Start Investing/KnowledgeCenter/RetirementPlanning/RetirementPlanning";
import WhyToInvest from "./LandingPage/Start Investing/KnowledgeCenter/WhyToInvest/WhyToInvest";
import UnderstandingRisk from "./LandingPage/Start Investing/KnowledgeCenter/UnderstandingRisk/UnderstandingRisk";
import HowToChooseFund from "./LandingPage/Start Investing/KnowledgeCenter/GoodFunds/HowToChooseFund";
import HowToCreateFinancialGoals from "./LandingPage/Start Investing/KnowledgeCenter/FinancialGoals/HowToCreateFinancialGoals";
import HowSmallSavingsBecomeBig from "./LandingPage/Start Investing/KnowledgeCenter/SmallSavings/HowSmallSavingsBecomeBig";
import FundSelector from "./LandingPage/Start Investing/FundSelector/FundSelector";
import BasketPage from "./basket/BasketPage";
import GeneralInsurance from "./LandingPage/General-Insurance/GeneralInsurance";
import SIPCalculator from "./SipCalculator/SipCalculator";
import LumpsumCalculator from "./LumpsumCalculator/LumpsumCalculator";
import Taxation from "./Taxation/Taxation";
import ClientDashboard from "./ClientDashboard/ClientDashboard";
import RoleDashboard from "./RoleDashboard";
import AdminDashboard from "./AdminDashboard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* Pages with Navbar + Footer */}
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/wealth" element={<Wealth />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/start" element={<StartInvesting />} />
          <Route path="/nri" element={<NriCorner />} />
          <Route path="/downloads" element={<Download />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<Contact />} />

          <Route path="/elss" element={<ELSS />} />

          <Route path="/liquid_funds" element={<LiquidFunds />} />
          <Route path="/long_term_debt_funds" element={<LongTermDebtFunds />} />
          <Route path="/hybrid_funds" element={<ConservativeHybridFunds />} />

          <Route path="/large_cap_fund" element={<LargeCapFund />} />
          <Route path="/thematic_fund" element={<ThematicFund />} />
          <Route path="/multi_cap_fund" element={<MultiCapFund />} />
          <Route path="/mid_cap_fund" element={<MidCapFund />} />
          <Route path="/small_cap_fund" element={<SmallCapFund />} />

          <Route path="/insurance" element={<Insurance />} />
          <Route path="/insurance/life_insurance" element={<LifeInsurance />} />

          <Route path="/feedbacks" element={<SubmitFeedback />} />

          <Route
            path="/commission_disclosure"
            element={<CommissionDisclosure />}
          />
          <Route path="/disclaimer" element={<Disclaimer />} />

          <Route path="/knowledge_center" element={<KnowledgeCenter />} />
          <Route
            path="/knowledge_center/new_to_investing"
            element={<NewToInvesting />}
          />
          <Route
            path="/knowledge_center/smart_tax_planning"
            element={<SmartTaxPlanning />}
          />
          <Route
            path="/knowledge_center/retirement_planning"
            element={<RetirementPlanning />}
          />
          <Route
            path="/knowledge_center/why_to_invest"
            element={<WhyToInvest />}
          />
          <Route
            path="/knowledge_center/understanding_risk"
            element={<UnderstandingRisk />}
          />
          <Route
            path="/knowledge_center/how_to_choose_fund"
            element={<HowToChooseFund />}
          />
          <Route
            path="/knowledge_center/how_small_savings_become_big"
            element={<HowSmallSavingsBecomeBig />}
          />
          <Route
            path="/knowledge_center/how_to_create_financial_goals"
            element={<HowToCreateFinancialGoals />}
          />

          <Route path="/fundselector" element={<FundSelector />} />

          <Route path="/basket" element={<BasketPage />} />

          <Route path="/general_insurance" element={<GeneralInsurance />} />

          <Route path="/sip_calculator" element={<SIPCalculator />} />

          <Route path="/lumpsum_calculator" element={<LumpsumCalculator />} />

          <Route path="/Taxation" element={<Taxation />} />
        </Route>

        {/* ONLY Navbar + FinancialWorkout */}
        <Route
          path="/financial_workout"
          element={
            <>
              <Navbar />
              <FinancialWorkout />
            </>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ClientDashboard />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/owner" element={<RoleDashboard role="owner" />} />

        {/* <Route path="*" element={<PageNotFound />} /> */}
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
