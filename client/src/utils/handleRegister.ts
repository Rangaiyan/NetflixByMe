import api from "../api/axiosInstance";
import { toast } from "react-toastify";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const registerUser = async (data: RegisterData) => {
  try {
    const response = await api.post("/auth/signup", data);

    if (response.data.message === "User already exists") {
      toast.error("user already exist")
      throw new Error("Email already registered. Please use a different one.");
    }

    if (response.status === 201 || response.data.message === "User signed up successfully!") {
      toast.success("user signed up successfully")
      return response.data.message;
    } else {
      throw new Error("Signup failed. Please try again.");
    }
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Something went wrong. Please try again later."
    );
  }
};
