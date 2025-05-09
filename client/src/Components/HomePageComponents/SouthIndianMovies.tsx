const SouthIndianMovies = ({ movies }: { movies: any[] }) => {
  const tamilMovies = movies.filter((movie) => movie.language?.toLowerCase() === "tamil");

  return (
    <div className="px-8 py-6">
      <h2 className="text-xl font-semibold mb-3">South Indian Movies</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {tamilMovies.map((movie) => (
          <div
            key={movie._id}
            className="min-w-[160px] flex-shrink-0 cursor-pointer hover:scale-105 transition-transform"
          >
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-48 object-cover rounded"
            />
            <p className="text-sm text-center mt-1">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SouthIndianMovies;
