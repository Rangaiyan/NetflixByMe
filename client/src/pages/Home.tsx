import React, { useEffect, useState } from "react";
import api from "../api/axiosInstance";
import AllMovies from "../Components/HomePageComponents/AllMovies";
import Banner from "../Components/HomePageComponents/Banner";
import Navbar from "../Components/HomePageComponents/Navbar";
import SouthIndianMovies from "../Components/HomePageComponents/SouthIndianMovies";
import { OnAddToFav, OnAddToWatched } from "../utils/movieActions";
import Trending from "../Components/HomePageComponents/Trending";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
      } catch (err) {
        console.error("Error loading movies:", err);
      }
    };
    fetchMovies();
  }, []);

  const handleAddToFav = async (movieId: string) => {
    await OnAddToFav(movieId);
  };

  const handleAddToWatched = async (movieId: string) => {
    await OnAddToWatched(movieId);
  };

  return (
    <div className="bg-black text-white min-h-screen relative">
      <Navbar setSearchResults={setSearchResults} />
      <Banner movie={movies[13]} />

      {!!searchResults.length && (
        <div className="px-8 py-6">
          <h2 className="text-xl mb-3">Search Results</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {searchResults.map((movie) => (
              <div
                key={movie._id}
                className="cursor-pointer hover:scale-105 transition-transform"
              >
                <img
                  src={movie.imageUrl}
                  alt={movie.title}
                  className="w-full h-48 object-cover rounded"
                />
                <p className="text-sm text-center mt-1">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <AllMovies
        movies={movies}
        onAddToFav={handleAddToFav}
        onAddToWatched={handleAddToWatched}
      />
      <SouthIndianMovies
        movies={movies}
        onAddToFav={handleAddToFav}
        onAddToWatched={handleAddToWatched}
      />
      <Trending />
    </div>
  );
};

export default HomePage;
