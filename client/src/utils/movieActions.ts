import api from "../api/axiosInstance";

export const OnAddToFav = async (movieId: string) => {
  try {
    await api.post("/users/favorites", { movieId });
    alert("Movie added to favorites!");
    console.log("Movie added to favorites");
  } catch (error) {
    console.error("Error while adding favorite movie:", error);
    alert("Failed to add to favorites.");
  }
};

export const OnAddToWatched = async (movieId: string) => {
  try {
    await api.post("/users/watched", { movieId });
    alert("Movie added to watched list!");
    console.log("Movie added to watched");
  } catch (error) {
    console.error("Error while adding watched movie:", error);
    alert("Failed to add to watched list.");
  }
};
