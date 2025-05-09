interface AllMoviesProps {
  movies: Movie[];
}

const AllMovies: React.FC<AllMoviesProps> = ({ movies }) => {
  return (
    <div className="px-8 mb-10">
      <h2 className="text-xl font-semibold mb-4">All Movies</h2>
      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {movies.map((movie) => (
          <div key={movie._id} className="min-w-[160px] flex-shrink-0">
            <img
              src={movie.imageUrl}
              alt={movie.title}
              className="w-full h-48 object-cover rounded-md"
            />
            <p className="text-sm text-center mt-2">{movie.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllMovies;
