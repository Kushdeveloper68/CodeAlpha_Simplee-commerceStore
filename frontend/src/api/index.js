import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/', // Update with your backend API URL
  withCredentials: true,
});

export const loginApi = async (email, password) => {
  try {
    const response = await API.post('/api/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const signupApi = async (userData) => {
  try {
    const response = await API.post('/api/signup', userData);
    return response.data;
  } catch (error) {
    console.error('Error signing up student:', error);
    throw error;
  }
};

export const getAllProducts = async () => {
  try {
    const response = await API.get('/api/get/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};