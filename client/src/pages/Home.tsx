import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

interface Movie {
  _id: string;
  title: string;
  year: number;
  genre: string[];
  imageUrl: string;
}

const HomePage: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [selectedGenre, setSelectedGenre] = useState<string>('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/login');
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const fetchMovies = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await axios.get('http://localhost:3000/movies/list', {
        params: {
          limit: 50,
          page,
          sort: 'title',
          orderBy: 'asc',
          genre: selectedGenre,
          query: searchQuery,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(response.data.data);
      setTotalPages(response.data.totalPage);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const fetchGenres = async () => {
    try {
      const response = await axios.get('http://localhost:3000/movies/genres');
      setGenres(response.data);
    } catch (error) {
      console.error('Error fetching genres:', error);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page, selectedGenre, searchQuery]);

  useEffect(() => {
    fetchGenres();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-8 py-4 bg-gradient-to-b from-black to-transparent">
        <div className="text-3xl font-bold text-red-600">NETFLIX</div>
        <div className="flex gap-6 items-center text-sm">
          <button onClick={() => navigate('/favlist')} className="hover:underline">FavList</button>
          <button onClick={() => navigate('/watched')} className="hover:underline">Watched</button>
          <button onClick={() => navigate('/search')} className="hover:underline">Search</button>
          <div className="relative">
            <div onClick={toggleDropdown} className="cursor-pointer bg-gray-800 px-3 py-1 rounded hover:bg-gray-600">Profile</div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white text-black rounded shadow">
                <button className="block w-full px-4 py-2 hover:bg-gray-200" onClick={() => navigate('/profile')}>Profile</button>
                <button className="block w-full px-4 py-2 hover:bg-gray-200" onClick={handleLogout}>Logout</button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-24 px-6">
        {/* Genre Filter as scrollable horizontal bar */}
        <div className="flex overflow-x-auto gap-4 py-4 scrollbar-hide">
          <button
            onClick={() => setSelectedGenre('')}
            className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${selectedGenre === '' ? 'bg-red-600' : 'bg-gray-800'}`}
          >
            All Genres
          </button>
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setSelectedGenre(genre)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                selectedGenre === genre ? 'bg-red-600' : 'bg-gray-800'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Movie Rows */}
        <div className="mt-8 space-y-8">
          <h2 className="text-2xl font-semibold mb-2">Your Next Watch</h2>
          <div className="flex overflow-x-auto gap-4 scrollbar-hide pb-2">
            {movies.map((movie) => (
              <div key={movie._id} className="min-w-[160px] cursor-pointer hover:scale-105 transition-transform">
                <img src={movie.imageUrl} alt={movie.title} className="rounded-lg h-48 w-full object-cover" />
                <p className="mt-2 text-sm text-center">{movie.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6 space-x-4">
          <button
            className="px-4 py-2 bg-gray-700 rounded text-white"
            onClick={() => setPage(page > 1 ? page - 1 : 1)}
            disabled={page === 1}
          >
            Previous
          </button>
          <span className="py-2">{`Page ${page} of ${totalPages}`}</span>
          <button
            className="px-4 py-2 bg-gray-700 rounded text-white"
            onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
            disabled={page === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
