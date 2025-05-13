import axios from "axios";

export const OnAddToFav = async (movieId: string) => {
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        alert("Please log in to add favorites.");
        return;
      }

      await axios.post(
        "http://localhost:3000/users/favorites",
        { movieId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Movie added to favorites!");
    } catch (error) {
      console.error("Error adding to favorites:", error);
      alert("Failed to add to favorites.");
    }
  };
  