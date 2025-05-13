import axios from "axios";

export const OnAddToWatched = async (movieId: string) => {
  try {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("Please log in to add to watched list.");
      return;
    }

    await axios.post(
      "http://localhost:3000/users/watched",
      { movieId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    alert("Movie added to watched list!");
  } catch (error) {
    console.error("Error adding to watched list:", error);
    alert("Failed to add to watched list.");
  }
};
