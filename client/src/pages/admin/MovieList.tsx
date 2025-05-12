import React, { useEffect, useState } from "react";
import axios from "axios";
import EditMovieForm from "./EditMovieForm";

interface Movie {
  _id: string;
  title: string;
  year: string;
  description: string;
  director: string;
  language: string;
  genre: string;
  contentRating: string;
  imageUrl: string;
}

const MovieList = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editMovie, setEditMovie] = useState<Movie | null>(null);

  const fetchMovies = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await axios.get("http://localhost:3000/movies", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      alert("Unauthorized. Please log in again.");
    }
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("accessToken");
    if (!token) return alert("Unauthorized. Please log in again.");

    if (window.confirm("Are you sure you want to delete this movie?")) {
      try {
        await axios.delete(`http://localhost:3000/movies/delete/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        fetchMovies();
      } catch (error) {
        console.error("Delete error:", error);
      }
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h2 className="text-xl font-bold text-black mb-4">All Movies</h2>
      {editMovie ? (
        <EditMovieForm
          movie={editMovie}
          onClose={() => setEditMovie(null)}
          onUpdate={fetchMovies}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {movies.map((movie) => (
            <div key={movie._id} className="bg-white shadow rounded-lg overflow-hidden">
              <img
                src={movie.imageUrl}
                alt={movie.title}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-black">
                  {movie.title} ({movie.year})
                </h3>
                <p className="text-sm text-gray-600">{movie.description}</p>
                <p className="text-xs text-gray-500 mt-2">
                  Language: {movie.language}
                </p>
                <p className="text-xs text-gray-500">Genre: {movie.genre}</p>
                <div className="mt-4 flex justify-between">
                  <button
                    onClick={() => setEditMovie(movie)}
                    className="text-blue-500 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(movie._id)}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;
