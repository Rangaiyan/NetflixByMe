import React, { useState } from "react";
import axios from "axios";

interface Movie {
  _id: string;
  title: string;
  year: string;
  description: string;
  director: string;
  language: string;
  genre: string;
  contentRating: string;
//   imageUrl: string;
}

interface Props {
  movie: Movie;
  onClose: () => void;
  onUpdate: () => void;
}

const EditMovieForm = ({ movie, onClose, onUpdate }: Props) => {
  const [formData, setFormData] = useState({ ...movie });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please login again.");
      return;
    }

    try {
      setIsLoading(true);

      const payload = {
        title: formData.title,
        year: formData.year, 
        description: formData.description,
        director: formData.director,
        language: formData.language,
        genre: formData.genre,
        contentRating: formData.contentRating,
        // imageUrl: formData.imageUrl,
      };

      const response = await axios.patch(
        `http://localhost:3000/movies/update/${movie._id}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

    //   console.log("Update response:", response.data);
      alert("Movie updated successfully!");
      onUpdate();
      onClose(); 
    } catch (error: any) {
      console.error("Update failed:", error);
      alert(error?.response?.data?.message || "Failed to update movie.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-6 rounded-lg shadow max-w-3xl mx-auto"
    >
      <h2 className="text-xl font-bold mb-4 text-black">Edit Movie</h2>

      {[
        "title",
        "year",
        "director",
        "language",
        "genre",
        "contentRating",
        "imageUrl",
      ].map((field) => (
        <div className="mb-3" key={field}>
          <label className="block text-sm font-medium text-gray-700 mb-1 capitalize">
            {field}
          </label>
          <input
            type="text"
            name={field}
            value={formData[field as keyof Movie]}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            required
          />
        </div>
      ))}

      <div className="mb-3">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
        ></textarea>
      </div>

      <div className="flex gap-4 mt-6">
        <button
          type="submit"
          disabled={isLoading}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="border border-gray-300 px-4 py-2 rounded text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditMovieForm;
