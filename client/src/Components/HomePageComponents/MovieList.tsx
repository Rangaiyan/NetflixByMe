import React from "react";
import MovieCard from "@ui/MovieCard";
import { Movie } from "@shared/movieInterface";

interface MovieListProps {
  movies: Movie[];
  onAddToFav: (movieId: string) => void;
  onAddToWatched: (movieId: string) => void;
  title?: string;
  filterLanguage?: string;
  emptyMessage?: string;
}

const MovieList: React.FC<MovieListProps> = ({
  movies,
  onAddToFav,
  onAddToWatched,
  title = "Movies",
  filterLanguage,
  emptyMessage = "No movies found.",
}) => {
  const filteredMovies = filterLanguage
    ? movies.filter((movie) => movie.language === filterLanguage)
    : movies;

  return (
    <div className="px-8 mb-10">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onAddToFav={onAddToFav}
              onAddToWatched={onAddToWatched}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm">{emptyMessage}</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;