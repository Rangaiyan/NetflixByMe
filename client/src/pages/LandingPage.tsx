import TresndingCarousel from "../Components/landingPageComponents/TrendingCarousel";
import JoinBenefits from "../Components/landingPageComponents/JoinBenifts";
import HeroSection from "../Components/landingPageComponents/HeroSection";
import FAQAccordion from "../Components/landingPageComponents/FAQAccordion";
import Footer from "../Components/landingPageComponents/Footer";
// just trying pull request
export default function Landing() {
  return (
    <div className="bg-black text-white">
      <HeroSection />
      <TresndingCarousel />
      <JoinBenefits />
      <FAQAccordion />
      <Footer />
    </div>
  );
}
