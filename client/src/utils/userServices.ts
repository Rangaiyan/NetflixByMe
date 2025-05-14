import api from "../api/axiosInstance";

export const getFavoriteMovies = async () => {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    alert("You need to log in to view your favorites.");
    throw new Error("No access token");
  }

  try {
    const response = await api.get("/users/favorites");
    return response.data.favoriteMovies;
  } catch (error) {
    console.error("Error fetching favorite movies:", error);
    throw error;
  }
};
