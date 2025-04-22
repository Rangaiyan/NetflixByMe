import heroImg from "../../assets/hero.png";
import logo from "../../assets/netflix-logo.png"
import { FiChevronRight } from "react-icons/fi";
import TrendingCarousel from "./TrendingCarousel.tsx";

const HomeScreen = () => {
  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-black to-transparent">
      {/* Background Image inside Hero Text */}

      {/* Content */}
      <div className="relative z-2 px-12 md:px-10 py-4 flex flex-col h-full space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-red-600">NETFLIX</h1>
          <div className="flex items-center gap-4">
            <select className="bg-transparent border text-grey border-gray-400 text-blue px-2 py-1 rounded-2xl">
              <option>English</option>
              <option>हिंदी</option>
            </select>
            <button className="bg-white text-black font-semibold px-4 py-1 rounded-2xl">
              Sign In
            </button>
          </div>
        </div>

        {/* Navbar */}
        <div className="flex gap-4 text-sm md:text-base mb-6 justify-center relative">
          <div className="flex flex-row bg-gray-900 rounded-4xl">
            {["Popular Now", "Plans", "Reasons to Join", "FAQ"].map((item) => (
              <button
                key={item}
                className="hover:underline relative p-3.5 pr-5"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Text */}
        <div
          className="relative bg-cover bg-center p-16 md:p-20 rounded-3xl overflow-hidden  bottom-0 left-0 w-full "
          style={{
            backgroundImage: `url(${heroImg})`,

            WebkitMaskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0) 100%)",
            maskImage:
              "radial-gradient(ellipse at center, rgba(0,0,0,1) 60%, rgba(0,0,0,0.7) 80%, rgba(0,0,0,0) 100%)",
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskSize: "cover",
            maskSize: "cover",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/90 to-black/40 opacity-90 z-0" />

          {/* Content */}
          <div className="relative z-10 flex flex-col justify-center items-center text-center space-y-6">
            <h1
              className="text-5xl md:text-7xl font-black mb-4 text-white leading-tight pt-18"
              style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Unlimited movies, TV <br /> shows and more
            </h1>

            <p
              className="text-xl md:text-2xl text-white"
              style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Starts at ₹149. Cancel at any time.
            </p>

            <p
              className="text-base md:text-lg text-white max-w-2xl"
              style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
            >
              Ready to watch? Enter your email to create or restart your
              membership.
            </p>

            {/* Input Form */}
            <div className="flex flex-col md:flex-row items-center w-full max-w-xl gap-3 px-4 mt-4">
              <input
                type="email"
                placeholder="Email address"
                className="w-full md:flex-1 px-6 py-3 rounded-full backdrop-blur-md text-white bg-gray-800/70 placeholder-white focus:outline-none"
                style={{ fontFamily: "Helvetica Neue, Arial, sans-serif" }}
              />
              <button
                type="button"
                className="flex items-center justify-center gap-2 text-white bg-red-600 hover:bg-red-500 font-semibold rounded-full text-lg px-6 py-3 transition"
              >
                Get Started
                <FiChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
      <TrendingCarousel/>
    </div>
  );
};

export default HomeScreen;
