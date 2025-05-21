import api from "@api/axiosInstance";
import { toast } from "react-toastify";

export const OnAddToFav = async (movieId: string) => {
  try {
    await api.post("/users/favorites", { movieId });
    toast.success("Movie added to favorites!");
    console.log("Movie added to favorites");
  } catch (error) {
    toast.error("Error while adding favorite movie")
    console.error("Error while adding favorite movie:", error);
  }
};

export const OnAddToWatched = async (movieId: string) => {
  try {
    await api.post("/users/watched", { movieId });
    toast.success("Movie added to watched list!")
  } catch (error) {
    toast.error("Failed to add to watched list.")
    console.error("Error while adding watched movie:", error);
   
  }
};
