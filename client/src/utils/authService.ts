import api from '../api/axiosInstance'; 

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/signin", {
      email,
      password,
    });

    if (response.status === 201 && response.data.access_token) {
      return response.data.access_token;
    } else {
      throw new Error("Invalid credentials, please try again.");
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong. Please try again."
    );
  }
};
