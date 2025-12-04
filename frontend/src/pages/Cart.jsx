import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { useApi,getUserCartApi, removeFromCartApi, updateCartQuantityApi } from "../api";

const colors = {
  primary: "#2563eb",
  backgroundLight: "#ffffff",
  backgroundDark: "#111621",
};

const isDark = false;
const col = (light, dark) => (isDark ? dark : light);

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, tax: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [updatingId, setUpdatingId] = useState(null);
  const { authToken } = useAuth();
  const navigate = useNavigate();
const api = useApi();
  // Redirect if not logged in
  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken, navigate]);

  // Fetch cart items
  useEffect(() => {
    if (authToken) {
      fetchCart();
    }
  }, [authToken]);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError('');
      const response = await getUserCartApi();

      if (response.success) {
        setCartItems(response.cartItems || []);
        setTotals({
          subtotal: response.subtotal || 0,
          shipping: response.shipping || 0,
          tax: response.tax || 0,
          total: response.total || 0
        });
      } else {
        setError(response.message || 'Failed to fetch cart');
      }
    } catch (err) {
      console.error('Error fetching cart:', err);
      setError('Error loading cart. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      setUpdatingId(productId);
      const response = await removeFromCartApi(productId);

      if (response.success) {
        setMessage('Item removed from cart');
        setTimeout(() => setMessage(''), 2000);
        fetchCart();
      } else {
        setError(response.message || 'Failed to remove item');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      console.error('Error removing item:', err);
      setError('Error removing item. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleUpdateQuantity = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      handleRemoveItem(productId);
      return;
    }

    try {
      setUpdatingId(productId);
      const response = await updateCartQuantityApi(productId, newQuantity);

      if (response.success) {
        setMessage('Quantity updated');
        setTimeout(() => setMessage(''), 2000);
        fetchCart();
      } else {
        setError(response.message || 'Failed to update quantity');
        setTimeout(() => setError(''), 3000);
      }
    } catch (err) {
      console.error('Error updating quantity:', err);
      setError('Error updating quantity. Please try again.');
      setTimeout(() => setError(''), 3000);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleProceedToCheckout = () => {
    // Pass cart data via navigate state
    navigate('/checkout', {
      state: {
        cartItems,
        totals
      }
    });
  };

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display"
      style={{
        backgroundColor: col(colors.backgroundLight, colors.backgroundDark),
        color: col("#1F2937", "#E5E7EB"),
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          
          {/* Cart Heading */}
          <div className="flex flex-wrap justify-between gap-3 pb-8">
            <p className="text-4xl font-black leading-tight min-w-72" style={{ color: col("#1F2937", "#fff"), letterSpacing: "-0.033em" }}>
              Shopping Cart
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-4 rounded-lg bg-red-100 text-red-800">
              {error}
            </div>
          )}

          {/* Success Message */}
          {message && (
            <div className="mb-4 p-4 rounded-lg bg-green-100 text-green-800">
              {message}
            </div>
          )}

          {/* Loading State */}
          {loading ? (
            <div className="flex justify-center items-center py-12">
              <p style={{ color: col("#6B7280", "#9CA3AF") }}>Loading your cart...</p>
            </div>
          ) : cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12">
              <span className="material-symbols-outlined text-6xl mb-4" style={{ color: col("#D1D5DB", "#4B5563") }}>
                shopping_cart
              </span>
              <p className="text-lg font-medium" style={{ color: col("#6B7280", "#9CA3AF") }}>
                Your cart is empty
              </p>
              <button
                onClick={() => navigate('/')}
                className="mt-4 flex items-center gap-2 text-primary font-medium text-sm hover:underline"
                style={{ color: colors.primary }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                  arrow_back
                </span>
                Continue Shopping
              </button>
            </div>
          ) : (
            <>
              {/* Cart Contents & Order Summary */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                {/* Cart Items */}
                <div className="lg:col-span-2 flex flex-col gap-4">
                  <div className="flex flex-col divide-y border rounded-lg overflow-hidden"
                    style={{
                      borderColor: col("#E5E7EB", "#22223B"),
                      boxShadow: "0 1px 3px 0 rgba(0,0,0,0.02)"
                    }}>
                    {cartItems.map((item) => (
                      <div key={item.productId}
                        className="flex gap-4 px-6 py-5 justify-between items-center"
                        style={{
                          background: col("#F9FAFB", "rgba(31,22,33,0.3)"),
                        }}
                      >
                        <div className="flex items-center gap-4 w-full">
                          <div
                            className="bg-center aspect-square bg-no-repeat bg-cover rounded-lg"
                            style={{
                              backgroundImage: `url("${item.mainImageUrl}")`,
                              width: 70,
                              height: 70,
                            }}
                            title={item.productTitle}
                          ></div>
                          <div className="flex flex-1 flex-col justify-center">
                            <p
                              className="text-base font-medium leading-normal"
                              style={{ color: col("#1F2937", "#fff") }}
                            >
                              {item.productTitle}
                            </p>
                            <p
                              className="text-sm font-normal leading-normal"
                              style={{ color: col("#6B7280", "#9CA3AF") }}
                            >
                              ${item.price}
                            </p>
                          </div>
                          <div className="shrink-0">
                            <div className="flex items-center gap-2"
                              style={{ color: col("#1F2937", "#E5E7EB") }}>
                              <button 
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer disabled:opacity-50"
                                onClick={() => handleUpdateQuantity(item.productId, item.cartQuantity - 1)}
                                disabled={updatingId === item.productId}
                              >
                                -
                              </button>
                              <input className="w-6 p-0 text-center bg-transparent border-none [appearance:textfield]"
                                type="number"
                                value={item.cartQuantity}
                                readOnly
                                style={{
                                  color: col("#1F2937", "#fff"),
                                  background: "transparent"
                                }}
                              />
                              <button 
                                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer disabled:opacity-50"
                                onClick={() => handleUpdateQuantity(item.productId, item.cartQuantity + 1)}
                                disabled={updatingId === item.productId || item.cartQuantity >= item.availableQuantity}
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <p
                            className="text-base font-medium leading-normal w-24 text-right"
                            style={{ color: col("#1F2937", "#fff") }}
                          >
                            ${item.totalPrice.toFixed(2)}
                          </p>
                          <button
                            className="hover:text-red-500 disabled:opacity-50"
                            style={{ color: col("#6B7280", "#9CA3AF") }}
                            onClick={() => handleRemoveItem(item.productId)}
                            disabled={updatingId === item.productId}
                          >
                            <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                              delete
                            </span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button
                    className="flex items-center gap-2 text-primary font-medium text-sm hover:underline w-fit"
                    style={{ color: colors.primary }}
                    onClick={() => navigate('/')}
                  >
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                      arrow_back
                    </span>
                    Continue Shopping
                  </button>
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                  <div className="sticky top-28 rounded-lg p-6 flex flex-col gap-6"
                    style={{
                      background: col("#F9FAFB", "rgba(31,22,33,0.3)"),
                      borderColor: col("#E5E7EB", "#22223B"),
                      borderWidth: 1,
                      borderStyle: "solid"
                    }}
                  >
                    <h3 className="text-xl font-bold" style={{ color: col("#1F2937", "#fff") }}>Order Summary</h3>
                    <div className="flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <p style={{ color: col("#6B7280", "#9CA3AF") }}>Subtotal</p>
                        <p className="font-medium" style={{ color: col("#1F2937", "#E5E7EB") }}>${totals.subtotal.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p style={{ color: col("#6B7280", "#9CA3AF") }}>Estimated Shipping</p>
                        <p className="font-medium" style={{ color: col("#1F2937", "#E5E7EB") }}>${totals.shipping.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <p style={{ color: col("#6B7280", "#9CA3AF") }}>Estimated Tax</p>
                        <p className="font-medium" style={{ color: col("#1F2937", "#E5E7EB") }}>${totals.tax.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="border-t" style={{ borderColor: col("#E5E7EB", "#22223B") }}></div>
                    <div className="flex justify-between items-center">
                      <p className="text-lg font-bold" style={{ color: col("#1F2937", "#fff") }}>Total</p>
                      <p className="text-lg font-bold" style={{ color: col("#1F2937", "#fff") }}>${totals.total.toFixed(2)}</p>
                    </div>
                    <button
                      onClick={handleProceedToCheckout}
                      className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 gap-2 text-base font-bold leading-normal tracking-[-0.015em] hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md"
                      style={{
                        background: colors.primary,
                        color: "#fff",
                      }}
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}