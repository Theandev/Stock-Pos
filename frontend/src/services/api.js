import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
const api = axios.create({
  baseURL,
});

export const fetchProducts = () => api.get('/products');
export const fetchProduct = (id) => api.get(`/products/${id}`);
export const createOrder = (orderData) => api.post('/orders', orderData);
export const fetchOrderReports = () => api.get('/orders/report');

export default api;