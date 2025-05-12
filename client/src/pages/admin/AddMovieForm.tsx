import React, { useState } from "react";
import axios from "axios";
import { ContentRating, Language, Genre } from "../../utils/enums";

const AddMovieForm = () => {
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [director, setDirector] = useState("");
  const [language, setLanguage] = useState<Language | "">("");
  const [genre, setGenre] = useState<Genre[]>([]);
  const [contentRating, setContentRating] = useState<ContentRating | "">("");
  const [image, setImage] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    if (
      !title ||
      !year ||
      !description ||
      !director ||
      !language ||
      genre.length === 0 ||
      !contentRating ||
      !image
    ) {
      alert("Please fill in all required fields");
      setIsLoading(false);
      return;
    }

    const formData = new FormData();
    formData.set("title", title);
    formData.set("year", year);
    formData.set("description", description);
    formData.set("director", director);
    formData.set("language", language);
    formData.set("genre", genre.join(", "));
    formData.set("contentRating", contentRating);
    formData.append("image", image);

    try {
      const token = localStorage.getItem("accessToken");

      const response = await axios.post(
        "http://localhost:3000/movies/insertOne",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Movie added successfully!");
      console.log("Response:", response.data);

      setTitle("");
      setYear("");
      setDescription("");
      setDirector("");
      setLanguage("");
      setGenre([]);
      setContentRating("");
      setImage(null);
    } catch (error: any) {
      console.error("Error uploading movie:", error);
      alert(
        `Error: ${error?.response?.data?.message || "Something went wrong!"}`
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const options = e.target.options;
    const selectedGenres: Genre[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selectedGenres.push(options[i].value as Genre);
      }
    }
    setGenre(selectedGenres);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="bg-red-600 text-black py-4 px-6">
          <h1 className="text-2xl font-bold">Admin Panel</h1>
          <p className="text-sm opacity-80">Manage your movie database</p>
        </div>

        <div className="p-6">
          <h2 className="text-xl font-semibold mb-6 text-black">
            Add New Movie
          </h2>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Title
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Movie title"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Year
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="Release year"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Director
                  </label>
                  <input
                    type="text"
                    value={director}
                    onChange={(e) => setDirector(e.target.value)}
                    placeholder="Director's name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Language
                  </label>
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value as Language)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Language</option>
                    {Object.values(Language).map((lang) => (
                      <option key={lang} value={lang}>
                        {lang}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Genre (Select multiple)
                  </label>
                  <select
                    multiple
                    value={genre}
                    onChange={handleGenreChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 h-[calc(2.5rem*3)]" // Adjust height to show multiple options
                    required
                    size={5} // Show 5 options at once
                  >
                    {Object.values(Genre).map((g) => (
                      <option key={g} value={g}>
                        {g}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    Hold Ctrl/Cmd to select multiple genres
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Content Rating
                  </label>
                  <select
                    value={contentRating}
                    onChange={(e) =>
                      setContentRating(e.target.value as ContentRating)
                    }
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Rating</option>
                    {Object.values(ContentRating).map((rating) => (
                      <option key={rating} value={rating}>
                        {rating}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Movie Poster
                  </label>
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col w-full border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-red-400 transition-colors">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                          className="w-8 h-8 mb-4 text-gray-500"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 20 16"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                          />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>{" "}
                          or drag and drop
                        </p>
                        <p className="text-xs text-gray-500">
                          {image ? image.name : "PNG, JPG, JPEG (MAX. 5MB)"}
                        </p>
                      </div>
                      <input
                        type="file"
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className="hidden"
                        accept="image/*"
                        required
                      />
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Movie description"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
                rows={4}
                required
              />
            </div>

            <div className="mt-8">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-3 px-4 rounded-md text-white font-medium ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-red-600 hover:bg-red-700 transition-colors"
                }`}
              >
                {isLoading ? "Submitting..." : "Add Movie"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddMovieForm;
