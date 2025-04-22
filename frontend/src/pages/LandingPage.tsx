import TresndingCarousel from "./Home/TrendingCarousel";
import JoinBenefits from "./Home/JoinBenifts";
import HeroSection from "./Home/HeroSection";
import FAQAccordion from "./Home/FAQAccordion";

export default function Landing() {
  return (
    <div className="bg-black text-white">
      <HeroSection />
      <TresndingCarousel />
      <JoinBenefits />
      <FAQAccordion/>
    </div>
  );
}
