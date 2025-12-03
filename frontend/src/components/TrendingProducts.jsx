import React, { useEffect, useCallback, useState } from 'react'
import { getAllProducts, addToCartApi, useApi } from "../api"
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/authContext'

const colors = {
  primary: "#2563EB",
  backgroundLight: "#FFFFFF",
  backgroundDark: "#111827",
  cardLight: "#F3F4F6",
  cardDark: "#1F2937",
  textLight: "#111827",
  textDark: "#F3F4F6",
  textSubtleLight: "#6B7280",
  textSubtleDark: "#9CA3AF",
};

const isDark = false;
const t = isDark;

function get(mode, light, dark) {
  return mode ? dark : light;
}

function TrendingProducts() {
  const [products, setProducts] = useState([]);
  const [loadingId, setLoadingId] = useState(null); // Track which product is loading
  const [messages, setMessages] = useState({}); // Store messages per product
  const { authToken } = useAuth(); // Get auth token from context
  const navigate = useNavigate();
const api = useApi()
  // Fetch all products on component mount
  const fetchProducts = useCallback(async () => {
    try {
      const response = await getAllProducts();
      if (response.success) {
        setProducts(response.products || response.data || response);
      } else {
        console.error("Failed to fetch products:", response.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Handle Add to Cart
  const handleAddToCart = async (productId, productTitle) => {
    // Check if user is logged in
    if (!authToken) {
      setMessages(prev => ({
        ...prev,
        [productId]: 'Please login first to add items to cart'
      }));
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [productId]: ''
        }));
      }, 3000);
      return;
    }

    setLoadingId(productId);
    setMessages(prev => ({
      ...prev,
      [productId]: ''
    }));

    try {
      const response = await addToCartApi(productId, 1); // Add quantity 1 for trending products

      if (response.success) {
        setMessages(prev => ({
          ...prev,
          [productId]: 'Added to cart successfully!'
        }));
        setTimeout(() => {
          setMessages(prev => ({
            ...prev,
            [productId]: ''
          }));
        }, 2000);
      } else {
        setMessages(prev => ({
          ...prev,
          [productId]: response.message || 'Failed to add to cart'
        }));
        setTimeout(() => {
          setMessages(prev => ({
            ...prev,
            [productId]: ''
          }));
        }, 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => ({
        ...prev,
        [productId]: 'Error adding to cart. Please try again.'
      }));
      setTimeout(() => {
        setMessages(prev => ({
          ...prev,
          [productId]: ''
        }));
      }, 3000);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <section>
      <h2
        className="text-2xl sm:text-3xl font-bold leading-tight tracking-[-0.015em] px-4 pb-4 pt-5"
        style={{ color: get(t, colors.textLight, colors.textDark) }}>
        Trending Now
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
        {products && products.map((p, i) => {
          if (i >= 8) return null; // Limit to first 8 products
          return (
            <div
              key={p._id}
              className="flex flex-col gap-4 rounded-lg p-4 group overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300"
              style={{ background: get(t, colors.cardLight, colors.cardDark) }}
            >
              {/* Product Image Link */}
              <Link to={`/productdetails/${p._id}`}>
                <div
                  className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg cursor-pointer hover:opacity-90 transition-opacity duration-300"
                  style={{ backgroundImage: `url(${p.mainImageUrl})` }}
                />
              </Link>

              {/* Product Details */}
              <div className="flex flex-col gap-2">
                <h3
                  className="text-base font-medium leading-normal truncate"
                  style={{ color: get(t, colors.textLight, colors.textDark) }}>
                  {p.productTitle}
                </h3>
                <p
                  className="text-lg font-bold"
                  style={{ color: colors.primary }}>
                  ${p.price}
                </p>
              </div>

              {/* Message Display */}
              {messages[p._id] && (
                <div className={`p-2 rounded-lg text-xs font-medium text-center ${
                  messages[p._id].includes('successfully') 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {messages[p._id]}
                </div>
              )}

              {/* Add to Cart Button */}
              <button
                className="flex items-center justify-center w-full rounded-lg h-10 px-4 text-sm font-bold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  background: loadingId === p._id 
                    ? get(t, "rgba(37,99,235,0.5)", "rgba(37,99,235,0.5)")
                    : get(t, "rgba(37,99,235,0.2)", "rgba(37,99,235,0.3)"),
                  color: colors.primary,
                  border: `1px solid ${colors.primary}`
                }}
                onClick={() => handleAddToCart(p._id, p.productTitle)}
                disabled={loadingId === p._id}
              >
                <span className="material-symbols-outlined text-base mr-2">
                  {loadingId === p._id ? 'schedule' : 'add_shopping_cart'}
                </span>
                <span>{loadingId === p._id ? 'Adding...' : 'Add to Cart'}</span>
              </button>
            </div>
          );
        })}
      </div>
    </section>
  )
}

export default TrendingProducts