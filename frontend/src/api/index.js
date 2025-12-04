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


// GET USER CART
export const getUserCartApi = async () => {
  try {
    const response = await API.get('/api/get/cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error.response?.data);
    return error.response?.data || { success: false, message: "Failed to fetch cart" };
  }
};

// REMOVE ITEM FROM CART
export const removeFromCartApi = async (productId) => {
  try {
    const response = await API.post('/api/remove-from-cart', { productId });
    return response.data;
  } catch (error) {
    console.error('Error removing from cart:', error.response?.data);
    return error.response?.data || { success: false, message: "Failed to remove from cart" };
  }
};

// UPDATE CART ITEM QUANTITY
export const updateCartQuantityApi = async (productId, quantity) => {
  try {
    const response = await API.post('/api/update-cart-quantity', { productId, quantity });
    return response.data;
  } catch (error) {
    console.error('Error updating cart:', error.response?.data);
    return error.response?.data || { success: false, message: "Failed to update cart" };
  }
};




// Add these new functions to your existing file

// GET USER ADDRESS
export const getUserAddressApi = async () => {
  try {
    const response = await API.get('/api/get/user-address');
    return response.data;
  } catch (error) {
    console.error('Error fetching user address:', error.response?.data);
    return error.response?.data || { success: false, message: "Failed to fetch user address" };
  }
};

// UPDATE OR CREATE USER ADDRESS
export const updateUserAddressApi = async (addressData) => {
  try {
    const response = await API.post('/api/update-address', addressData);
    return response.data;
  } catch (error) {
    console.error('Error updating address:', error.response?.data);
    return error.response?.data || { success: false, message: "Failed to update address" };
  }
};

// CREATE ORDER (from cart)
export const createOrderApi = async (shippingDetails) => {
  try {
    const response = await API.post('/api/create-order', shippingDetails);
    return response.data;
  } catch (error) {
    console.error('Error creating order:', error.response?.data);
    return error.response?.data || { success: false, message: "Failed to create order" };
  }
};

// GET USER ORDERS
export const getUserOrdersApi = async () => {
  try {
    const response = await API.get('/api/get/user-orders');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error.response?.data);
    return error.response?.data || { success: false, message: "Failed to fetch orders" };
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