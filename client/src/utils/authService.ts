import api from '../api/axiosInstance'; 
import { toast } from "react-toastify";

export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post("/auth/signin", {
      email,
      password,
    });

    if (response.status === 201 && response.data.access_token) {
      toast.success("login successfull")

      return response.data.access_token;

    } else {
      toast.error("linvalid credentials")
      throw new Error("Invalid credentials, please try again.");
    }
  } catch (error: any) {
   
    throw new Error(
         
      error.response?.data?.message || "Something went wrong. Please try again."
    );
   
  }
};
