import React, { useEffect, useState } from "react";
import axios from "axios";
import EditMovieForm from "./EditMovieForm";
import api from "@api/axiosInstance";
import { toast } from "react-toastify";

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
    try {
      const response = await api.get("/movies");
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
      toast.error("unAuthourized user");
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
    <div className="p-6 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Movie Collection</h2>
      
      {editMovie ? (
        <EditMovieForm
          movie={editMovie}
          onClose={() => setEditMovie(null)}
          onUpdate={fetchMovies}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {movies.map((movie) => (
            <div key={movie._id} className="max-w-sm rounded overflow-hidden shadow-lg bg-white">
              <img 
                className="w-full h-64 object-cover" 
                src={movie.imageUrl || 'https://via.placeholder.com/300x450?text=No+Image'} 
                alt={movie.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=No+Image';
                }}
              />
              <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">
                  {movie.title} <span className="text-gray-600 text-lg">({movie.year})</span>
                </div>
                <p className="text-gray-700 text-base mb-4 line-clamp-3">
                  {movie.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-blue-800">
                    {movie.language}
                  </span>
                  <span className="inline-block bg-purple-100 rounded-full px-3 py-1 text-sm font-semibold text-purple-800">
                    {movie.genre}
                  </span>
                  {movie.contentRating && (
                    <span className="inline-block bg-green-100 rounded-full px-3 py-1 text-sm font-semibold text-green-800">
                      {movie.contentRating}
                    </span>
                  )}
                </div>
              </div>
              <div className="px-6 pt-2 pb-4 flex justify-between">
                <button
                  onClick={() => setEditMovie(movie)}
                  className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(movie._id)}
                  className="text-red-600 hover:text-red-800 font-medium flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;