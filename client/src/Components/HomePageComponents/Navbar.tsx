import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultUser from "@assets/netflix-profile.jpg";
import api from "@api/axiosInstance";
import { Movie } from "@shared/movieInterface";
const Navbar: React.FC<{
  setSearchResults: (movies: Movie[]) => void;
}> = ({ setSearchResults }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const res = await api.get(`/movies/search/${search}`);
      setSearchResults(res.data);
    } catch (error) {
      console.error("Search error:", error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/users/profile");
        setUserName(res.data.name);
        setIsAdmin(res.data.isAdmin);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    const token = localStorage.getItem("accessToken");
    if (token) fetchUser();
  }, []);

  return (
    <nav className="flex justify-between items-center bg-black text-white px-6 py-4 sticky top-0 z-50 ">
      <div className="flex items-center gap-8">
        <h1
          className="text-red-600 font-bold text-2xl cursor-pointer"
          onClick={() => navigate("/home")}
        >
          NETFLIX
        </h1>
        <button onClick={() => navigate("/home")}>Home</button>
        <button onClick={() => navigate("/mylist")}>MyList</button>
        <button onClick={() => navigate("/watched")}>WatchedList</button>
      </div>

      <div className="flex items-center gap-6">
        <input
          type="text"
          placeholder="Search movies..."
          className="px-3 py-1 bg-gray-800 rounded text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
        <button
          onClick={handleSearch}
          className="bg-red-600 px-3 py-1 rounded text-white"
        >
          Search
        </button>

        <div className="relative">
          <img
            src={defaultUser}
            alt="User"
            className="w-8 h-8 rounded cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white text-black rounded shadow min-w-[160px]">
              <div className="px-4 py-2 font-semibold border-b border-gray-200">
                {userName || "Loading..."}
              </div>
              {isAdmin && (
                <button
                  className="px-4 py-2 hover:bg-gray-100 w-full text-left"
                  onClick={() => {
                    setDropdownOpen(false);
                    navigate("/admin");
                  }}
                >
                  Admin Dashboard
                </button>
              )}
              <button
                className="px-4 py-2 hover:bg-gray-100 w-full text-left"
                onClick={handleLogout}
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
