import React from "react";

interface TrendingMovie {
  _id: string;
  title: string;
  imageUrl: string;
  viewsCount: number;
}

interface TrendingCardProps {
  movie: TrendingMovie;
  index: number;
}

const TrendingCard: React.FC<TrendingCardProps> = ({ movie, index }) => {
  return (
    <div className="relative min-w-[150px] max-w-[150px] flex-shrink-0">
      <img
        src={movie.imageUrl}
        alt={movie.title}
        className="w-full h-60 object-cover rounded-xl shadow-lg"
      />
      <span className="absolute bottom-3 -left-2 text-8xl outline-text text-white">
        {index + 1}
      </span>
    </div>
  );
};

export default TrendingCard;
