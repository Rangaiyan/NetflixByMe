import heroImg from "../assets/hero.png";
import { Link, useNavigate } from "react-router-dom";
import { FiChevronRight } from "react-icons/fi";
import { useState } from "react";

const HeroSection = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleGetStarted = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(email)) {
      navigate("/signup", { state: { email } });
    } else {
      setError("please enter valid email address");
    }
  };

  return (
    <div className="relative w-full h-screen">
      <div className="relative z-2 px-12 md:px-10 py-4 flex flex-col h-full space-y-6">
        <div className="flex justify-between items-center mb-2">
          <h1 className="text-3xl font-bold text-red-600">NETFLIX</h1>
          <div className="flex items-center gap-4 ">
            <select className="bg-transparent border text-grey border-gray-400 text-blue  px-2 py-1 rounded">
              <option>English</option>
              <option>हिंदी</option>
            </select>
            <Link to="/login">
              <button className="bg-red-600 text-white font-semibold px-4 py-1 rounded">
                Sign In
              </button>
            </Link>
          </div>
        </div>
        <div
          className="relative bg-cover bg-center p-16 md:p-20 rounded-3xl overflow-hidden  bottom-0 left-0 w-full mt-7 "
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/90 to-black/40 opacity-90 z-0" />

          <div className="relative z-10 flex flex-col justify-center items-center text-center space-y-6">
            <h1
              className="text-2xl md:text-7xl font-black mb-4 text-white leading-tight pt-18"
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

            <div className="flex flex-col md:flex-row items-center w-full max-w-xl gap-3 px-4 mt-4">
              <input
                type="email"
                value={email}
                placeholder="Email address"
                onChange={(e) => setEmail(e.target.value)}
                className="w-full md:flex-1 px-6 py-3 rounded text-white bg-black placeholder-white focus:outline-none opacity-50 border"
              />
              <button
                type="button"
                onClick={handleGetStarted}
                className="flex items-center justify-center gap-2 font-bold text-white bg-red-600 hover:bg-red-500 rounded text-lg px-6 py-3 transition"
              >
                Get Started
                <FiChevronRight size={24} />
              </button>
            </div>

            {error && (
              <p className="text-red-500 text-sm mt-2 text-center">{error}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
