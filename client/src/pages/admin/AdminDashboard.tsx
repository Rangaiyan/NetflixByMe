import React from "react";
import AddMovieForm from "./AddMovieForm";
import MovieList from "./MovieList";

const AdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AddMovieForm />
      <MovieList />
    </div>
  );
};

export default AdminDashboard;
