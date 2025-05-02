import TresndingCarousel from "../Components/TrendingCarousel";
import JoinBenefits from "../Components/JoinBenifts";
import HeroSection from "../Components/HeroSection";
import FAQAccordion from "../Components/FAQAccordion";
import Footer from "../Components/Footer";
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
