import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../ui/MovieCard";
import { useNavigate } from "react-router-dom";

interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  year: number;
  contentRating: string;
  genre: string;
}

const WatchedList: React.FC = () => {
  const [watchedMovies, setWatchedMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const fetchWatchedMovies = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Please log in to view watched movies.");
        return;
      }

      const response = await axios.get("http://localhost:3000/users/watched", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setWatchedMovies(response.data.watchedMovies || []);
    } catch (error) {
      console.error("Error fetching watched movies:", error);
    }
  };

  useEffect(() => {
    fetchWatchedMovies();
  }, []);

  return (
    <div className="px-8 py-6">
      <button
        onClick={() => navigate("/home")}
        className="mb-4 text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition"
      >
        ← Home
      </button>
      <h2 className="text-xl font-semibold mb-3">Watched Movies</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {watchedMovies.length > 0 ? (
          watchedMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))
        ) : (
          <p className="text-gray-400 text-sm">No watched movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default WatchedList;
