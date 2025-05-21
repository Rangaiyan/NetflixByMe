import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Movie } from "@shared/movieInterface";

const SearchResultsPage: React.FC = () => {
  const location = useLocation();
  const searchResults = location.state?.searchResults as Movie[];
   const navigate = useNavigate();

  return (
    <div className="bg-black text-white min-h-screen px-8 py-6">
            <button
        onClick={() => navigate("/home")}
        className="mb-4 text-white bg-red-600 px-4 py-1 rounded hover:bg-red-700 transition"
      >
        Home
      </button>
      <h2 className="text-xl mb-4">Search Results</h2>
      {searchResults?.length ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {searchResults.map((movie) => (
            <div
              key={movie._id}
              className="cursor-pointer hover:scale-105 transition-transform"
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
      ) : (
        <p>No results found.</p>
      )}
    </div>
  );
};

export default SearchResultsPage;
