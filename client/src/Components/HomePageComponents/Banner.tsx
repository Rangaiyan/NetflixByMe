

const Banner = ({ movie }: { movie: any }) => {
  if (!movie) return null;

  return (
    <div
      className="h-[80vh] bg-cover bg-center relative"
      style={{ backgroundImage: `url(${movie.imageUrl})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black flex flex-col justify-end px-16 pb-24">
        <h1 className="text-6xl font-extrabold mb-4">{movie.title}</h1>
        <div className="flex gap-4">
          <button className="bg-white text-black px-6 py-2 rounded font-bold">Play</button>
          <button className="bg-gray-700 px-6 py-2 rounded text-white">More Info</button>
        </div>
      </div>
    </div>
  );
};

export default Banner;