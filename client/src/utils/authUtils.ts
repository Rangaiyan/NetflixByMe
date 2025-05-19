import { jwtDecode } from 'jwt-decode';

interface DecodedToken {
  id: string;
  email: string;
  isAdmin: boolean;
  exp: number; 
}

export const getToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const getUserInfo = (): DecodedToken | null => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000; 

    if (decoded.exp < currentTime) {
      console.warn("Token expired");
      localStorage.removeItem('accessToken');
      return null;
    }

    return decoded;
  } catch (error) {
    console.error('Token decode failed:', error);
    return null;
  }
};
