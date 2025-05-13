import React from "react";
import MovieCard from "../ui/MovieCard";
import { OnAddToFav } from "../../utils/OnAddToFav";
import { OnAddToWatched } from "../../utils/OnAddToWatched";
interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  year: number;
  contentRating: string;
  genre: string;
}

interface SouthMoviesProps {
  movies: Movie[];
  onAddToWatched: (id: string) => void;
}

const SouthMovies: React.FC<SouthMoviesProps> = ({
  movies,
}) => {
  return (
    <div className="px-8 mb-10">
      <h2 className="text-xl font-semibold mb-4">South Indian Movies</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {movies.map((movie) => (
          <MovieCard
            key={movie._id}
            movie={movie}
            onAddToFav={OnAddToFav}
            onAddToWatched={OnAddToWatched}
          />
        ))}
      </div>
    </div>
  );
};

export default SouthMovies;
