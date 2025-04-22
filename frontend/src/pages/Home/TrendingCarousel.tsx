import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

import extraction from "../../assets/extraction.jpg";
import court from "../../assets/court.jpg";
import dragon from "../../assets/dragon.jpg";
import leo from "../../assets/leo.jpg";
import lifegivesyou from "../../assets/lifegivesyouT.jpg";
import officer from "../../assets/officer.jpg";
import test from "../../assets/test.jpg";
import pushpa from "../../assets/pushpa2.jpg";
import dev from "../../assets/deva.jpg";
import squid from "../../assets/squid.jpg";

const movies = [
  { id: 1, title: "leo", image: leo },
  { id: 2, title: "Chhaava", image: test },
  { id: 3, title: "Court", image: court },
  { id: 4, title: "Pushpa 2", image: pushpa },
  { id: 5, title: "Deva", image: extraction },
  { id: 6, title: "Dragon", image: dragon },
  { id: 7, title: "Officer", image: officer },
  { id: 8, title: "When Life...", image: lifegivesyou },
  { id: 9, title: "WrestleMania", image: dev },
  { id: 10, title: "Chhaava", image: squid },
];

export default function TrendingCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative mt-10 px-[10%] pb-20">
      <h2 className="text-white text-2xl font-bold mb-4">Trending Now</h2>
      <div className="relative flex items-center">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 bg-black/50 p-2 rounded-full"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>

        <motion.div
          ref={scrollRef}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex space-x-12 overflow-x-scroll no-scrollbar overflow-y-hidden"
        >
          {movies.map((movie, index) => (
            <div key={movie.id} className="relative min-w-[150px]">
              <img
                src={movie.image}
                alt={movie.title}
                className="w-96 h-60 object-cover rounded-xl shadow-lg"
              />
              <span className="absolute bottom-3 -left-2 text-8xl outline-text">
                {index + 1}
              </span>
            </div>
          ))}
        </motion.div>

        <button
          onClick={() => scroll("right")}
          className="absolute right-0 z-10 bg-black/50 p-2 rounded-full"
        >
          <ChevronRight className="text-white w-6 h-6" />
        </button>
      </div>
    </div>
  );
}
