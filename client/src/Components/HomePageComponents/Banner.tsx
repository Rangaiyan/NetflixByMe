import { Movie } from "@shared/movieInterface";
import { FaPlay } from "react-icons/fa";
import { ImInfo } from "react-icons/im";

const Banner = ({ movie }: { movie: Movie }) => {
  if (!movie) return null;

  return (
    <div
      className="h-[100vh] bg-cover bg-center relative z-10"
      style={{ backgroundImage: `url(${movie.imageUrl})` }}
    >
      <div className="absolute inset-20 bg-gradient-to-t from-black/60 to-transparent px-0 pt-24 pb-26 flex flex-col justify-end">
        <h1 className="text-6xl font-bold text-white mb-4">{movie.title}</h1>
        <p className="text-xl text-white mb-8 max-w-2xl">{movie.description}</p>
        <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-2 rounded font-bold flex items-center gap-2 hover:bg-opacity-80 transition">
            <FaPlay className="text-lg" />
            Play
          </button>
          <button className="bg-gray-600 bg-opacity-70 px-6 py-2 rounded text-white flex items-center gap-2 hover:bg-opacity-50 transition">
            <ImInfo className="text-lg" />
            More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Banner;