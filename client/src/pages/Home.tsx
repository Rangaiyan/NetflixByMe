import React, { useEffect, useState } from "react";
import api from "@api/axiosInstance";
import Banner from "@components/HomePageComponents/Banner";
import Navbar from "@components/HomePageComponents/Navbar";
import { OnAddToFav, OnAddToWatched } from "@utils/movieActions";
import Trending from "@components/HomePageComponents/Trending";
import { Movie } from "@shared/movieInterface";
import MovieList from "@components/HomePageComponents/MovieList";

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await api.get("/movies");
        setMovies(res.data);
      } catch (err) {
        console.error("Error loading movies:", err);
      } finally {
        setLoading(false); 
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
    <div className="text-white min-h-screen relative">
      <Navbar />

      {loading ? (
        <div className="flex justify-center items-center mt-90 text-2xl">
          Loading.....
        </div>
      ) : (
        <>
          <Banner movie={movies[14]} />

          <MovieList
            movies={movies}
            onAddToFav={handleAddToFav}
            onAddToWatched={handleAddToWatched}
            title="All Movies"
          />
          <MovieList
            movies={movies}
            onAddToFav={handleAddToFav}
            onAddToWatched={handleAddToWatched}
            title="South Indian Movies"
            filterLanguage="Tamil"
            emptyMessage="No South Indian movies found."
          />
          <MovieList
            movies={movies}
            onAddToFav={handleAddToFav}
            onAddToWatched={handleAddToWatched}
            title="HollyWood Movies"
            filterLanguage="English"
            emptyMessage="No Hollywood movies found."
          />
          <Trending />
          <MovieList
            movies={movies}
            onAddToFav={handleAddToFav}
            onAddToWatched={handleAddToWatched}
            title="Korean Movies"
            filterLanguage="Korean"
            emptyMessage="No Korean movies found."
          />
        </>
      )}
    </div>
  );
};

export default HomePage;
