import React from "react";
import MovieCard from "@ui/MovieCard";
import { Movie } from "@shared/movieInterface";

interface AllMoviesProps {
  movies: Movie[];
  onAddToFav: (movieId: string) => void;
  onAddToWatched: (movieId: string) => void;
}

const AllMovies: React.FC<AllMoviesProps> = ({
  movies,
  onAddToFav,
  onAddToWatched,
}) => {
  return (
    <div className="px-8 mb-10">
      <h2 className="text-xl font-semibold mb-4">All Movies</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onAddToFav={onAddToFav}
            onAddToWatched={onAddToWatched}
          />
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
