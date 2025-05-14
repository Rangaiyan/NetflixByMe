import{ useState } from "react";
import { useNavigate } from "react-router-dom";
import AddMovieForm from "./AddMovieForm";
import MovieList from "./MovieList";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState<"add" | "list">("add");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow px-6 py-4 flex justify-between items-center sticky top-0 z-10">
        <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>

        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab("add")}
            className={`px-4 py-2 rounded ${
              activeTab === "add"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Add Movie
          </button>

          <button
            onClick={() => setActiveTab("list")}
            className={`px-4 py-2 rounded ${
              activeTab === "list"
                ? "bg-red-600 text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
          >
            Movie List
          </button>
          <button
            onClick={() => navigate("/home")}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Home
          </button>
        </div>
      </div>
      <div className="p-6">
        {activeTab === "add" && <AddMovieForm />}
        {activeTab === "list" && <MovieList />}
      </div>
    </div>
  );
};

export default AdminDashboard;
