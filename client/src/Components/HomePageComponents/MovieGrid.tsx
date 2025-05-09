import React from "react";

interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
}

interface MovieGridProps {
  movies: Movie[];
}

const MovieGrid: React.FC<MovieGridProps> = ({ movies }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {movies.map((movie) => (
        <div
          key={movie._id}
          className="cursor-pointer hover:scale-105 transition-transform"
        >
          <img
            src={movie.imageUrl}
            alt={movie.title}
            className="w-full h-64 object-cover rounded"
          />
          <p className="mt-2 text-sm text-center">{movie.title}</p>
        </div>
      ))}
    </div>
  );
};

export default MovieGrid;
