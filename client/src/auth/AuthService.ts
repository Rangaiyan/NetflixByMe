import api from '../api/axiosInstance';
import { saveTokens} from '../utils/storage';

export async function login(email: string, password: string) {
  const response = await api.post('/auth/login', { email, password });
  saveTokens(response.data);
}

export async function signup(name: string, email: string, password: string) {
  const response = await api.post('/auth/signup', { name, email, password });
  saveTokens(response.data);
}


export function logout() {
  localStorage.clear();
  window.location.href = '/login';
}
