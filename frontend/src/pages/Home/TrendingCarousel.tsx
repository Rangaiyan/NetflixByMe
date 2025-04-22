import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import extraction from "../../assets/extraction.jpg";

const movies = [
  { id: 1, title: "WrestleMania", image: extraction },
  { id: 2, title: "Chhaava", image: extraction },
  { id: 3, title: "Court", image: extraction },
  { id: 4, title: "Pushpa 2", image: extraction },
  { id: 5, title: "Deva", image: extraction },
  { id: 6, title: "Dragon", image: extraction },
  { id: 7, title: "Officer", image: extraction },
  { id: 8, title: "When Life...", image: extraction },
  { id: 9, title: "WrestleMania", image: extraction },
  { id: 10, title: "Chhaava", image: extraction },
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
    <div className="relative mt-10 px-[10%] pb-20 ">
      <h2 className="text-white text-2xl font-bold mb-4">Trending Now</h2>
      <div className="relative flex items-center">
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 z-10 bg-black/50 p-2 rounded-full"
        >
          <ChevronLeft className="text-white w-6 h-6" />
        </button>
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-12 scrollbar-hide overflow-y-hidden"
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
        </div>

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
