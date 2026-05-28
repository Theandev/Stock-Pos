import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL,
});

export const fetchProducts = () => api.get('/products');
export const fetchProduct = (id) => api.get(`/products/${id}`);
export const createOrder = (orderData) => api.post('/orders', orderData);
export const fetchOrderReports = (token) => api.get('/orders/report', { headers: { Authorization: `Bearer ${token}` } });
export const signInWithGoogle = (id_token) => api.post('/auth/google', { id_token });

export default api;