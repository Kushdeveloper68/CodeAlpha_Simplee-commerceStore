import axios from 'axios';
import { useAuth } from '../context/authContext'; // Import hook

const API = axios.create({
  baseURL: 'http://localhost:5000/',
  withCredentials: true,
});

// Add request interceptor to attach token to every request
export function useApi() {
  const { authToken } = useAuth();

  API.interceptors.request.use((config) => {
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    return config;
  });

  return API;
}

export const loginApi = async (email, password) => {
  try {
    const response = await API.post('/api/login', { email, password });
    return response.data; // Should return { success: true, token: "...", user: {...} }
  } catch (error) {
    console.error('Error logging in:', error.response?.data);
    return error.response?.data || { success: false, message: "Login failed" };
  }
};

export const sendOtpApi = async (email) => {
  const response = await API.post('/api/send-otp', { email });
  return response.data;
};

export const verifySignupApi = async (data) => {
  try {
  // data: { fullName, email, password, otp }
  const response = await API.post('/api/verify-signup', data);
  return response.data;
  } catch (error) {
    console.error('Error verifying signup:', error.response?.data);
    return error.response?.data || { success: false, message: "Signup verification failed" };
  }
};

export const addToCartApi = async (productId, quantity) => {
  try {
    const response = await API.post('/api/add-to-cart', { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error.response?.data);
    return error.response?.data || { success: false, message: "Failed to add to cart" };
  }
};

// export const signupApi = async (fullName, email, password) => {
//   try {
//     const response = await API.post('/api/signup', { fullName, email, password });
//     return response.data; // Should return { success: true, token: "...", user: {...} }
//   } catch (error) {
//     console.error('Error signing up:', error.response?.data);
//     return error.response?.data || { success: false, message: "Signup failed" };
//   }
// };


export const getAllProducts = async () => {
  try {
    const response = await API.get('/api/get/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return error.response?.data || { success: false, message: "Failed to fetch products" };
  }
};

// Example: Protected API call (with token in header)
export const getProtectedData = async () => {
  try {
    const response = await API.get('/api/protected-route');
    return response.data;
  } catch (error) {
    console.error('Error fetching protected data:', error);
    return error.response?.data || { success: false, message: "Failed to fetch data" };
  }
};

export default API;