import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import MovieCard from "../ui/MovieCard";

interface Movie {
  _id: string;
  title: string;
  imageUrl: string;
  description: string;
  year: number;
  contentRating: string;
  genre: string;
}


const MyList = () => {
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const navigate = useNavigate();

  const fetchFavorites = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) return alert("You need to log in to view your favorites.");

      const response = await axios.get("http://localhost:3000/users/favorites", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // console.log(response.data);
      setFavoriteMovies(response.data.favoriteMovies);
    } catch (error) {
      console.error("Error fetching favorite movies:", error);
    }
  };

  useEffect(() => {
    fetchFavorites();
  }, []);

  return (
    <div className="px-8 py-6">
      <button
        onClick={() => navigate("/home")}
        className="mb-4 text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition"
      >
        ← Home
      </button>

      <h2 className="text-xl font-semibold mb-3">My Favorite List</h2>

      <div className="flex overflow-x-auto space-x-4 scrollbar-hide">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
           <MovieCard key={movie._id} movie={movie}/>
          ))
        ) : (
          <p className="text-gray-400 text-sm">No favorite movies yet.</p>
        )}
      </div>
    </div>
  );
};

export default MyList;
