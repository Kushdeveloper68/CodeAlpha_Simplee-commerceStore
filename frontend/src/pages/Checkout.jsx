import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getUserAddressApi, updateUserAddressApi, createOrderApi,useApi } from "../api";

const colors = {
  primary: "#2764e7",
  backgroundLight: "#f6f6f8",
  backgroundDark: "#111621",
};

const isDark = false;
const col = (light, dark) => (isDark ? dark : light);

export default function Checkout() {
  const location = useLocation();
  const navigate = useNavigate();
  const { authToken } = useAuth();
  const api = useApi();

  const [cartItems, setCartItems] = useState([]);
  const [totals, setTotals] = useState({ subtotal: 0, shipping: 0, tax: 0, total: 0 });
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    streetAddress: '',
    apartment: '',
    city: '',
    stateOrProvince: '',
    postalCode: '',
    country: 'United States'
  });

  // Redirect if not authenticated
  useEffect(() => {
    if (!authToken) {
      navigate('/login');
    }
  }, [authToken, navigate]);

  // Load cart data from location state or redirect
  useEffect(() => {
    if (location.state?.cartItems) {
      setCartItems(location.state.cartItems);
      setTotals(location.state.totals);
    } else if (authToken) {
      // If no state data, redirect back to cart
      navigate('/cart');
      return;
    }

    // Fetch user address
    if (authToken) {
      fetchUserAddress();
    }
  }, [authToken, location.state, navigate]);

  const fetchUserAddress = async () => {
    try {
      setLoading(true);
      const response = await getUserAddressApi();

      if (response.success) {
        setFormData(prev => ({
          ...prev,
          fullName: response.fullName || '',
          email: response.email || '',
          streetAddress: response.address?.streetAddress || '',
          apartment: response.address?.apartment || '',
          city: response.address?.city || '',
          stateOrProvince: response.address?.stateOrProvince || '',
          postalCode: response.address?.postalCode || '',
          country: response.address?.country || 'United States'
        }));
      } else {
        setError('Failed to load user information');
      }
    } catch (err) {
      console.error('Error fetching user address:', err);
      setError('Error loading user information');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.streetAddress || !formData.city || !formData.stateOrProvince || !formData.postalCode || !formData.country) {
      setError('Please fill in all address fields');
      return;
    }

    setSubmitting(true);
    setError('');
    setMessage('');

    try {
      const shippingDetails = {
        streetAddress: formData.streetAddress,
        apartment: formData.apartment,
        city: formData.city,
        stateOrProvince: formData.stateOrProvince,
        postalCode: formData.postalCode,
        country: formData.country
      };

      const response = await createOrderApi(shippingDetails);

      if (response.success) {
        setMessage('Order created successfully!');
        // Redirect to order confirmation after 1.5 seconds
        setTimeout(() => {
          navigate('/orderconformation', {
            state: {
              order: response.order,
              cartItems: cartItems,
              totals: totals
            }
          });
        }, 1500);
      } else {
        setError(response.message || 'Failed to create order');
      }
    } catch (err) {
      console.error('Error creating order:', err);
      setError('Error creating order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div style={{ backgroundColor: col(colors.backgroundLight, colors.backgroundDark), minHeight: '100vh' }} className="flex items-center justify-center">
        <p style={{ color: col("#6B7280", "#9CA3AF") }}>Loading checkout...</p>
      </div>
    );
  }

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display"
      style={{
        backgroundColor: col(colors.backgroundLight, colors.backgroundDark),
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Left: Checkout Forms */}
              <div className="w-full lg:w-[60%] xl:w-[65%]">
                <div className="flex flex-col gap-8">
                  {/* Breadcrumbs */}
                  <div className="flex flex-wrap gap-2 px-4">
                    <a className="text-primary text-sm font-medium" style={{ color: colors.primary }}>Address</a>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">/</span>
                    <span className="text-gray-800 dark:text-gray-200 text-sm font-medium"
                      style={{ color: col("#1F2937", "#E5E7EB") }}
                    >Shipping</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">/</span>
                    <span className="text-gray-500 dark:text-gray-400 text-sm font-medium">Payment</span>
                  </div>

                  <div className="flex flex-wrap justify-between gap-3 px-4">
                    <p className="text-3xl md:text-4xl font-black leading-tight tracking-tighter"
                      style={{ color: col("#1F2937", "#fff") }}>Shipping Address</p>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <div className="mx-4 p-4 rounded-lg bg-red-100 text-red-800">
                      {error}
                    </div>
                  )}

                  {/* Success Message */}
                  {message && (
                    <div className="mx-4 p-4 rounded-lg bg-green-100 text-green-800">
                      {message}
                    </div>
                  )}

                  {/* Contact Info */}
                  <section className="p-6 rounded-xl shadow-sm mx-4"
                    style={{ background: col("#fff", "rgba(31,22,33,0.5)") }}
                  >
                    <h2 className="text-lg font-bold leading-tight pb-4"
                      style={{ color: col("#1F2937", "#fff") }}>Contact Information</h2>
                    <div className="flex max-w-lg flex-wrap items-end gap-4">
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-sm font-medium pb-2"
                          style={{ color: col("#1F2937", "#E5E7EB") }}>Full Name</p>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-sm font-normal h-12 p-3"
                          style={{
                            color: col("#1F2937", "#fff"),
                            background: col(colors.backgroundLight, "#374151"),
                            borderColor: col("#D1D5DB", "#4B5563"),
                            border: '1px solid'
                          }}
                          placeholder="John Doe"
                          type="text"
                          name="fullName"
                          value={formData.fullName}
                          readOnly
                        />
                      </label>
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-sm font-medium pb-2"
                          style={{ color: col("#1F2937", "#E5E7EB") }}>Email Address</p>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-sm font-normal h-12 p-3"
                          style={{
                            color: col("#1F2937", "#fff"),
                            background: col(colors.backgroundLight, "#374151"),
                            borderColor: col("#D1D5DB", "#4B5563"),
                            border: '1px solid'
                          }}
                          placeholder="you@example.com"
                          type="email"
                          name="email"
                          value={formData.email}
                          readOnly
                        />
                      </label>
                    </div>
                  </section>

                  {/* Shipping Address Section */}
                  <section className="p-6 rounded-xl shadow-sm mx-4"
                    style={{ background: col("#fff", "rgba(31,22,33,0.5)") }}
                  >
                    <h2 className="text-lg font-bold pb-4"
                      style={{ color: col("#1F2937", "#fff") }}>Shipping Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <label className="flex flex-col col-span-2">
                        <p className="text-sm font-medium pb-2"
                          style={{ color: col("#1F2937", "#E5E7EB") }}>Street Address</p>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-sm font-normal h-12 p-3"
                          style={{
                            color: col("#1F2937", "#fff"),
                            background: col(colors.backgroundLight, "#374151"),
                            borderColor: col("#D1D5DB", "#4B5563"),
                            border: '1px solid'
                          }}
                          placeholder="123 Main Street"
                          type="text"
                          name="streetAddress"
                          value={formData.streetAddress}
                          onChange={handleInputChange}
                          required
                        />
                      </label>

                      <label className="flex flex-col col-span-2">
                        <p className="text-sm font-medium pb-2"
                          style={{ color: col("#1F2937", "#E5E7EB") }}>Apartment, suite, etc. (Optional)</p>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-sm font-normal h-12 p-3"
                          style={{
                            color: col("#1F2937", "#fff"),
                            background: col(colors.backgroundLight, "#374151"),
                            borderColor: col("#D1D5DB", "#4B5563"),
                            border: '1px solid'
                          }}
                          placeholder="Apt 4B"
                          type="text"
                          name="apartment"
                          value={formData.apartment}
                          onChange={handleInputChange}
                        />
                      </label>

                      <label className="flex flex-col">
                        <p className="text-sm font-medium pb-2"
                          style={{ color: col("#1F2937", "#E5E7EB") }}>City</p>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-sm font-normal h-12 p-3"
                          style={{
                            color: col("#1F2937", "#fff"),
                            background: col(colors.backgroundLight, "#374151"),
                            borderColor: col("#D1D5DB", "#4B5563"),
                            border: '1px solid'
                          }}
                          placeholder="New York"
                          type="text"
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </label>

                      <label className="flex flex-col">
                        <p className="text-sm font-medium pb-2"
                          style={{ color: col("#1F2937", "#E5E7EB") }}>State / Province</p>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-sm font-normal h-12 p-3"
                          style={{
                            color: col("#1F2937", "#fff"),
                            background: col(colors.backgroundLight, "#374151"),
                            borderColor: col("#D1D5DB", "#4B5563"),
                            border: '1px solid'
                          }}
                          placeholder="NY"
                          type="text"
                          name="stateOrProvince"
                          value={formData.stateOrProvince}
                          onChange={handleInputChange}
                          required
                        />
                      </label>

                      <label className="flex flex-col">
                        <p className="text-sm font-medium pb-2"
                          style={{ color: col("#1F2937", "#E5E7EB") }}>Postal Code</p>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-sm font-normal h-12 p-3"
                          style={{
                            color: col("#1F2937", "#fff"),
                            background: col(colors.backgroundLight, "#374151"),
                            borderColor: col("#D1D5DB", "#4B5563"),
                            border: '1px solid'
                          }}
                          placeholder="10001"
                          type="text"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          required
                        />
                      </label>

                      <label className="flex flex-col">
                        <p className="text-sm font-medium pb-2"
                          style={{ color: col("#1F2937", "#E5E7EB") }}>Country</p>
                        <select className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-sm font-normal h-12 p-3"
                          style={{
                            color: col("#1F2937", "#fff"),
                            background: col(colors.backgroundLight, "#374151"),
                            borderColor: col("#D1D5DB", "#4B5563"),
                            border: '1px solid'
                          }}
                          name="country"
                          value={formData.country}
                          onChange={handleInputChange}
                          required
                        >
                          <option>United States</option>
                          <option>Canada</option>
                          <option>Mexico</option>
                          <option>India</option>
                          <option>United Kingdom</option>
                          <option>Australia</option>
                        </select>
                      </label>
                    </div>
                  </section>

                  {/* Place Order Button */}
                  <button
                    className="mx-4 w-auto flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 gap-2 text-base font-bold leading-normal tracking-[-0.015em] hover:bg-blue-700 transition-colors shadow-sm hover:shadow-md disabled:opacity-50"
                    style={{
                      background: colors.primary,
                      color: "#fff",
                    }}
                    onClick={handlePlaceOrder}
                    disabled={submitting}
                  >
                    {submitting ? 'Creating Order...' : 'Place Order'}
                  </button>
                </div>
              </div>

              {/* Right: Order Summary */}
              <div className="w-full lg:w-[40%] xl:w-[35%]">
                <div className="sticky top-12 rounded-xl shadow-sm p-6"
                  style={{
                    background: col("#fff", "rgba(31,22,33,0.5)"),
                  }}
                >
                  <h2 className="text-lg font-bold pb-4 border-b"
                    style={{
                      color: col("#1F2937", "#fff"),
                      borderColor: col("#E5E7EB", "#22223B"),
                    }}>
                    Order Summary
                  </h2>
                  <div className="py-4 space-y-4 border-b max-h-64 overflow-y-auto" style={{ borderColor: col("#E5E7EB", "#22223B") }}>
                    {cartItems.map((item, idx) => (
                      <div key={item.productId} className={`flex items-center gap-4 ${idx > 0 ? 'border-t pt-4' : ''}`}
                        style={idx > 0 ? { borderColor: col("#E5E7EB", "rgba(31,22,33,0.5)") } : undefined}
                      >
                        <div className="relative">
                          <div
                            className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 bg-gray-100"
                            style={{
                              backgroundImage: `url("${item.mainImageUrl}")`,
                            }}
                          />
                          <span className="absolute -top-2 -right-2 flex items-center justify-center size-5 rounded-full"
                            style={{
                              background: col("#F3F4F6", "#374151"),
                              color: col("#374151", "#fff"),
                              fontSize: "0.75rem",
                              fontWeight: 600,
                            }}>
                            {item.cartQuantity}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium" style={{ color: col("#1F2937", "#fff") }}>{item.productTitle}</p>
                          <p className="text-xs" style={{ color: col("#6B7280", "#9CA3AF") }}>
                            ${item.price} x {item.cartQuantity}
                          </p>
                        </div>
                        <p className="text-sm font-semibold" style={{ color: col("#1F2937", "#fff") }}>
                          ${item.totalPrice.toFixed(2)}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Charges */}
                  <div className="py-4 space-y-2 border-b" style={{ borderColor: col("#E5E7EB", "#22223B") }}>
                    <div className="flex justify-between items-center text-sm">
                      <p style={{ color: col("#6B7280", "#D1D5DB") }}>Subtotal</p>
                      <p className="font-medium" style={{ color: col("#1F2937", "#E5E7EB") }}>${totals.subtotal.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p style={{ color: col("#6B7280", "#D1D5DB") }}>Shipping</p>
                      <p className="font-medium" style={{ color: col("#1F2937", "#E5E7EB") }}>${totals.shipping.toFixed(2)}</p>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <p style={{ color: col("#6B7280", "#D1D5DB") }}>Taxes</p>
                      <p className="font-medium" style={{ color: col("#1F2937", "#E5E7EB") }}>${totals.tax.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="py-4 flex justify-between items-center">
                    <p className="text-base font-bold" style={{ color: col("#1F2937", "#fff") }}>Total</p>
                    <p className="text-xl font-black" style={{ color: col("#1F2937", "#fff") }}>${totals.total.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}