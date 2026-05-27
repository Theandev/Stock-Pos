import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const fetchProducts = () => api.get('/products');
export const fetchProduct = (id) => api.get(`/products/${id}`);
export const createOrder = (orderData) => api.post('/orders', orderData);

export default api;