import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";

interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  year: number;
  contentRating: string;
  genre: string;
}

interface MovieCardProps {
  movie: Movie;
  onAddToFav: (movieId: string) => void;
  onAddToWatched: (movieId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onAddToFav,
  onAddToWatched,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="relative group">
      <div
        className="min-w-[160px] flex-shrink-0 cursor-pointer"
        onClick={() => setShowPopup(true)}
      >
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>

      {showPopup && (
        <>
          <div
            className="fixed inset-0  bg-opacity-0 z-[9998]"
            onClick={() => setShowPopup(false)}
          ></div>
          <div className="fixed z-[9999] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[320px] lg:w-[400px] bg-zinc-900 text-white rounded-lg shadow-2xl transition-transform duration-300">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-56 object-cover rounded-t-lg"
            />

            <div className="p-4 space-y-2">
              <h3 className="text-2xl font-bold">{movie.title}</h3>
              <div className="text-sm text-gray-300 flex gap-4">
                <span>{movie.year}</span>
                <span>{movie.contentRating}</span>
                <span>HD</span>
              </div>
              <p className="text-sm text-gray-400 italic">{movie.genre}</p>
              <p className="text-sm text-gray-300 line-clamp-3">
                {movie.description}
              </p>

              <div className="flex items-center gap-3 mt-4">
                <button
                  onClick={() => {
                    onAddToFav(movie._id);
                    setShowPopup(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 bg-red-600 text-sm rounded hover:bg-red-700"
                >
                  <FaPlus /> Fav
                </button>
                <button
                  onClick={() => {
                    onAddToWatched(movie._id);
                    setShowPopup(false);
                  }}
                  className="px-3 py-2 bg-green-600 text-sm rounded hover:bg-green-700"
                >
                  ✔ Watched
                </button>
              </div>

              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-2 right-3 text-white text-xl hover:text-red-400"
              >
                ✕
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieCard;
