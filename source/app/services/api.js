import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.70:3001',
  withCredentials: true,
  headers: {Pragma: 'no-cache'},
});

export default api;
