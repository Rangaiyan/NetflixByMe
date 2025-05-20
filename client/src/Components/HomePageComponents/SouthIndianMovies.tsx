import React from "react";
import MovieCard from "../ui/MovieCard";

interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  year: number;
  contentRating: string;
  genre: string;
  language: string;
}

interface SouthMoviesProps {
  movies: Movie[];
  onAddToFav: (movieId: string) => void;
  onAddToWatched: (movieId: string) => void;
}

const SouthMovies: React.FC<SouthMoviesProps> = ({
  movies,
  onAddToFav,
  onAddToWatched,
}) => {
  const tamilMovies = movies.filter((movie) => movie.language === "Tamil");

  return (
    <div className="px-8 mb-10">
      <h2 className="text-xl font-semibold mb-4">South Indian Movies</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {tamilMovies.length > 0 ? (
          tamilMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onAddToFav={onAddToFav}
              onAddToWatched={onAddToWatched}
            />
          ))
        ) : (
          <p className="text-gray-400 text-sm">No South Indian movies found.</p>
        )}
      </div>
    </div>
  );
};

export default SouthMovies;
