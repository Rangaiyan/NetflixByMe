import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import defaultUser from "@assets/netflix-profile.jpg";
import api from "@api/axiosInstance";

const Navbar: React.FC = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [userName, setUserName] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    navigate("/login");
  };

  const handleSearch = async () => {
    if (!search.trim()) return;
    try {
      const res = await api.get(`/movies/search/${search}`);
      navigate("/search", { state: { searchResults: res.data } });
      setSearch("");
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

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? "bg-black bg-opacity-90 shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="flex justify-between items-center text-white px-6 py-4">
        <div className="flex items-center gap-8">
          <h1
            className="text-red-600 font-bold text-2xl cursor-pointer"
            onClick={() => navigate("/home")}
          >
            NETFLIX
          </h1>
          <button
            onClick={() => navigate("/home")}
            className="hover:text-red-500 transition"
          >
            Home
          </button>
          <button
            onClick={() => navigate("/mylist")}
            className="hover:text-red-500 transition"
          >
            MyList
          </button>
          <button
            onClick={() => navigate("/watched")}
            className="hover:text-red-500 transition"
          >
            WatchedList
          </button>
        </div>
        <div className="flex items-center gap-6">
          <input
            type="text"
            placeholder="Search movies..."
            className="px-3 py-1 bg-gray-800 rounded text-white focus:outline-none focus:ring focus:ring-red-500"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
          <button
            onClick={handleSearch}
            className="bg-red-600 hover:bg-red-700 transition px-3 py-1 rounded text-white"
          >
            Search
          </button>
          <div className="relative">
            <img
              src={defaultUser}
              alt="User"
              className="w-8 h-8 rounded-full cursor-pointer border border-gray-400"
              onClick={() => setDropdownOpen((prev) => !prev)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 bg-white text-black rounded shadow-lg min-w-[160px] overflow-hidden">
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
      </div>
    </nav>
  );
};

export default Navbar;
