import React from 'react';

type CardProps = {
  imageUrl: string;
  title?: string;
  onClick?: () => void;
};

const Card: React.FC<CardProps> = ({ imageUrl, title, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="w-[150px] sm:w-[180px] md:w-[200px] lg:w-[240px] cursor-pointer transition-transform duration-300 transform hover:scale-105"
    >
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-auto object-cover rounded-lg shadow-md"
      />
      {title && (
        <p className="mt-2 text-sm text-white truncate text-center">{title}</p>
      )}
    </div>
  );
};

export default Card;
