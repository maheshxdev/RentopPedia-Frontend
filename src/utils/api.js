import axios from 'axios';

const api = axios.create({
  baseURL: 'rentop-pedia-backend.vercel.app/',
  withCredentials: true // ✅ Important for session cookie
});

export default api;