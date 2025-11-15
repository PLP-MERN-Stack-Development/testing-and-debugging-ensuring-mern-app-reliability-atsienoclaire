import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // Vite proxy will redirect this to your backend
});

export default api;
