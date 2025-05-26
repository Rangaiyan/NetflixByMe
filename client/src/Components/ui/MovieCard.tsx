import React from "react";
import { useNavigate } from "react-router-dom";
import { Movie } from "@shared/movieInterface";

interface MovieCardProps {
  movie: Movie;
  onAddToFav?: (movieId: string) => void;
  onAddToWatched?: (movieId: string) => void;
}

const MovieCard: React.FC<MovieCardProps> = ({
  movie,
}) => {
  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/movie/${movie._id}`);
  };

  return (
    <div className="relative group">
      <div
        className="min-w-[160px] flex-shrink-0 cursor-pointer"
        onClick={handleCardClick}
      >
        <img
          src={movie.imageUrl}
          alt={movie.title}
          className="w-full h-48 object-cover rounded-md"
        />
      </div>
    </div>
  );
};

export default MovieCard;