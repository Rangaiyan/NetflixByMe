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

// export const OnAddToFav = async (movieId: string) => {
//   try {
//     const response = await api.post("/users/favorites", { movieId });
//     if (response.data.exists) {
//       toast.info("This movie is already in your favorites");
//     } else {
//       toast.success("Movie added to favorites!");
//     }
//     return response.data;
//   } catch (error:any) {
//     if (error.response?.data?.exists) {
//       toast.info("This movie is already in your favorites");
//     } else {
//       toast.error("Error while adding favorite movie");
//     }
//     console.error("Error while adding favorite movie:", error);
//     throw error;
//   }
// };

// export const OnAddToWatched = async (movieId: string) => {
//   try {
//     const response = await api.post("/users/watched", { movieId });
//     if (response.data.exists) {
//       toast.info("This movie is already in your watched list");
//     } else {
//       toast.success("Movie marked as watched!");
//     }
//     return response.data;
//   } catch (error:any) {
//     if (error.response?.data?.exists) {
//       toast.info("This movie is already in your watched list");
//     } else {
//       toast.error("Failed to add to watched list");
//     }
//     console.error("Error while adding watched movie:", error);
//     throw error;
//   }
// };
