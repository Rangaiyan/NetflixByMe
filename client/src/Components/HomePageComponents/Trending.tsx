import React, { useRef, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";

interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  viewsCount: number;
}

export default function Trending() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  const scroll = (direction: "left" | "right") => {
    const container = scrollRef.current;
    if (container) {
      container.scrollBy({
        left: direction === "left" ? -300 : 300,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const token = localStorage.getItem("accessToken"); 
        const headers = token
          ? { Authorization: `Bearer ${token}` }
          : {};

        const response = await axios.get("http://localhost:3000/movies/trending", {
          headers,
        });
        console.log(response.data)

        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    };

    fetchTrending();
  }, []);

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
            <div key={movie._id} className="relative min-w-[150px]">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-dvh h-60 object-cover rounded-xl shadow-lg"
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
