import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "@api/axiosInstance";
import TrendingCard from "@ui/TrendingCard";

interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  viewsCount: number;
}

const Trending: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const response = await api.get("/movies/trending");
        setMovies(response.data);
      } catch (error) {
        console.error("Failed to fetch trending movies:", error);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="px-8 mb-10 mt-10">
      <h2 className="text-white text-2xl font-bold mb-4">Trending Now</h2>
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 scrollbar-hide"
      >
        {movies.map((movie, index) => (
          <TrendingCard key={movie._id} movie={movie} index={index} />
        ))}
      </motion.div>
    </div>
  );
};

export default Trending;
