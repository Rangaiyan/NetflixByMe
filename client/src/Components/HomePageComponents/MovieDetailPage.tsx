import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa";
import api from "@api/axiosInstance";
import { Movie } from "@shared/movieInterface";
import { OnAddToFav, OnAddToWatched } from "@utils/movieActions";
import MovieList from "@components/HomePageComponents/MovieList";

const MovieDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [movie, setMovie] = useState<Movie | null>(null);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);
  const [isFav, setIsFav] = useState(false);
  const [isWatched, setIsWatched] = useState(false);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await api.get(`/movies/${id}`);
        setMovie(res.data);
      } catch (err) {
        console.error("Error loading movie:", err);
        navigate("/not-found");
      }
    };

    fetchMovie();
  }, [id, navigate]);

  useEffect(() => {
    const fetchRecommendedMovies = async () => {
      if (!movie?.genre) return;
      try {
        const res = await api.get(`/users/genre/${movie.genre}`, {
          params: { excludeId: id },
        });

        const filteredMovies = res.data.filter((m: Movie) => m._id !== id);
        setRecommendedMovies(filteredMovies);
      } catch (err) {
        console.error("Error loading recommended movies:", err);
        setRecommendedMovies([]);
      }
    };

    if (movie) {
      fetchRecommendedMovies();
    }
  }, [movie, id]);

  const handleAddToFav = async (movieId: string) => {
    await OnAddToFav(movieId);
    setIsFav(true);
  };

  const handleAddToWatched = async (movieId: string) => {
    await OnAddToWatched(movieId);
    setIsWatched(true);
  };

  if (!movie) return null;

  return (
    <div className="text-white min-h-screen">
      <div
        className="h-[100vh] bg-cover bg-center relative z-10"
        style={{ backgroundImage: `url(${movie.imageUrl})` }}
      >
       
        <div className="absolute top-4 left-4 z-50">
          <button
            onClick={() => navigate("/home")}
            className="text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition"
          >
            Home
          </button>
        </div>

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent px-8 pt-24 pb-16 flex flex-col justify-end">
          <h1 className="text-5xl font-bold mb-4">{movie.title}</h1>
          <p className="text-lg max-w-2xl mb-6">{movie.description}</p>
          <div className="text-sm text-gray-300 flex gap-4 mb-4">
            <span>{movie.year}</span>
            <span>{movie.contentRating}</span>
            <span>HD</span>
            <span>{movie.language}</span>
          </div>

          <p className="text-md text-gray-400 italic mb-6">{movie.genre}</p>
          <div className="flex gap-4">
            <button
              onClick={() => handleAddToFav(movie._id)}
              disabled={isFav}
              className={`flex items-center gap-2 px-6 py-2 ${
                isFav ? "bg-gray-600" : "bg-red-600"
              } text-sm rounded hover:bg-red-700`}
            >
              <FaPlus /> {isFav ? "Added to Fav" : "Add to Favorites"}
            </button>
            <button
              onClick={() => handleAddToWatched(movie._id)}
              disabled={isWatched}
              className={`flex items-center gap-2 px-6 py-2 ${
                isWatched ? "bg-gray-600" : "bg-green-700"
              } text-sm rounded hover:bg-green-800`}
            >
              <FaPlus /> {isWatched ? "Added to Watched" : "Add to Watched"}
            </button>
          </div>
        </div>
      </div>
      <div className="px-8 py-10">
        <MovieList
          movies={recommendedMovies}
          onAddToFav={handleAddToFav}
          onAddToWatched={handleAddToWatched}
          title={`More ${movie.genre} Movies`}
          emptyMessage={`No other ${movie.genre} movies found.`}
        />
      </div>
    </div>
  );
};

export default MovieDetailsPage;
