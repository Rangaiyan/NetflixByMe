import TresndingCarousel from "@components/landingPageComponents/TrendingCarousel";
import JoinBenefits from "@components/landingPageComponents/JoinBenifts";
import HeroSection from "@components/landingPageComponents/HeroSection";
import FAQAccordion from "@components/landingPageComponents/FAQAccordion";
import Footer from "@components/landingPageComponents/Footer";

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
