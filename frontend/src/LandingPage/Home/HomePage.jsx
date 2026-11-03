import PreFooter from "../PreFooter";
import AddressSection from "./AddressSection/AddressSection";
import DebtFunds from "./DebtFundsSection/DebtFunds";
import EquityMutalFund from "./EquityMutalFundSection/EquityMutalFund";
import Feedback from "./FeedbackSection/Feedback";
import FinancialWorkout from "./FinancialWorkoutSection/FinancialWorkout";
import HomeHero from "./HomeHeroSection/HomeHero";
import InvestingRule from "./RuleofInvestingSection/InvestingRule";
import Services from "./ServicesWeProvide/Services";

function HomePage() {
  return (
    <>
      <HomeHero />
      <Services />
      <FinancialWorkout />
      <InvestingRule />
      <DebtFunds />
      <EquityMutalFund />
      <Feedback />
      <AddressSection />
      <PreFooter/>
    </>
  );
}

export default HomePage;
