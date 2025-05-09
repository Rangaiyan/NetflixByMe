import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Components/HomePageComponents/Navbar";
import Banner from "../Components/HomePageComponents/Banner";
import AllMovies from "../Components/HomePageComponents/AllMovies";
import SouthIndianMovies from "../Components/HomePageComponents/SouthIndianMovies";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const token = localStorage.getItem("accessToken");

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:3000/movies", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMovies(res.data);
      } catch (err) {
        console.error("Error loading movies:", err);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar setSearchResults={setSearchResults} />
      <Banner movie={movies[7]} />

      {searchResults.length > 0 && (
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

      <AllMovies movies={movies} />
      <SouthIndianMovies movies={movies} />
    </div>
  );
};

export default HomePage;
