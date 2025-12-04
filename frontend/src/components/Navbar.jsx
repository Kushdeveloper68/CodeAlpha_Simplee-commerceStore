import React from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/authContext';

const isDark = false; // Set this if you add dark mode logic
const col = (light, dark) => (isDark ? dark : light);
const colors = {
  primary: "#2563EB",
  backgroundLight: "#FFFFFF",
  backgroundDark: "#111827",
};

function Navbar() {
  const { authToken, setToken } = useAuth();
  const navigate = useNavigate();
  const loggedIn = Boolean(authToken || localStorage.getItem('token'));

  function handleLogout() {
    setToken(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <header
      className="border-b border-solid sticky top-0 z-50 w-full"
      style={{
        backgroundColor: col(colors.backgroundLight, colors.backgroundDark),
        borderColor: col("#E5E7EB", "#374151"),
      }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between whitespace-nowrap h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-2" style={{ color: col("#1F2937", "#fff") }}>
              <span
                className="material-symbols-outlined text-3xl"
                style={{ color: colors.primary }}
              >
                shopping_bag
              </span>
              <h2 className="text-xl font-bold tracking-tight">ShopSmart</h2>
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `text-sm font-medium ${isActive ? 'text-white' : ''}`
                }
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : col("#1F2937", "#D1D5DB"),
                  background: isActive ? colors.primary : undefined,
                  padding: '8px 12px',
                  borderRadius: 8,
                })}
              >
                Home
              </NavLink>

              <NavLink
                to="/productlisting"
                className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-white' : ''}`}
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : col("#1F2937", "#D1D5DB"),
                  background: isActive ? colors.primary : undefined,
                  padding: '8px 12px',
                  borderRadius: 8,
                })}
              >
                Products
              </NavLink>

              <NavLink
                to="/orders"
                className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-white' : ''}`}
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : col("#1F2937", "#D1D5DB"),
                  background: isActive ? colors.primary : undefined,
                  padding: '8px 12px',
                  borderRadius: 8,
                })}
              >
                Orders
              </NavLink>

              <NavLink
                to="/cart"
                className={({ isActive }) => `text-sm font-medium ${isActive ? 'text-white' : ''}`}
                style={({ isActive }) => ({
                  color: isActive ? '#fff' : col("#1F2937", "#D1D5DB"),
                  background: isActive ? colors.primary : undefined,
                  padding: '8px 12px',
                  borderRadius: 8,
                })}
              >
                Cart
              </NavLink>
            </nav>
          </div>

          <div className="flex flex-1 justify-end items-center gap-4">
            <label className="hidden lg:flex flex-col min-w-40 !h-10 max-w-64">
              <div className="flex w-full flex-1 items-stretch rounded-lg h-full">
                <div
                  className="flex items-center justify-center pl-3 rounded-l-lg border border-solid border-r-0"
                  style={{
                    color: "#6B7280",
                    background: col("#F3F4F6", "#374151"),
                    borderColor: col("#D1D5DB", "#4B5563"),
                    borderRight: 0,
                  }}
                >
                  <span className="material-symbols-outlined text-xl">search</span>
                </div>
                <input
                  className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg focus:outline-0 focus:ring-2 focus:ring-primary focus:ring-opacity-50 h-full px-4 rounded-l-none border-l-0 pl-2 text-sm"
                  style={{
                    color: col("#1F2937", "#E5E7EB"),
                    background: col("#F3F4F6", "#374151"),
                    borderColor: col("#D1D5DB", "#4B5563"),
                    borderLeft: 0,
                  }}
                  placeholder="Search products..."
                  defaultValue=""
                />
              </div>
            </label>

            <div className="flex gap-2 items-center">
              {/* Wishlist - keep as-is for future update */}
              <button
                className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-transparent hover:bg-[#F3F4F6] dark:hover:bg-gray-700 text-[#6B7280] dark:text-gray-400 hover:text-[#1F2937] dark:hover:text-white"
                style={{
                  color: col("#6B7280", "#9CA3AF")
                }}
                title="Wishlist (coming soon)"
                aria-label="Wishlist"
              >
                <span className="material-symbols-outlined">favorite</span>
              </button>

              {/* Cart icon - navigates to /cart */}
              <Link to="/cart">
                <button
                  className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-transparent hover:bg-[#F3F4F6] dark:hover:bg-gray-700 text-[#6B7280] dark:text-gray-400 hover:text-[#1F2937] dark:hover:text-white"
                  style={{
                    color: col("#6B7280", "#9CA3AF")
                  }}
                  title="Cart"
                  aria-label="Cart"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                </button>
              </Link>

              {/* Profile - keep for future update, but quick behavior: go to login if logged out, else go to orders */}
              <button
                onClick={() => {
                  if (loggedIn) navigate('/orders');
                  else navigate('/login');
                }}
                className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-transparent hover:bg-[#F3F4F6] dark:hover:bg-gray-700 text-[#6B7280] dark:text-gray-400 hover:text-[#1F2937] dark:hover:text-white"
                style={{
                  color: col("#6B7280", "#9CA3AF")
                }}
                title="Profile"
                aria-label="Profile"
              >
                <span className="material-symbols-outlined">person</span>
              </button>

              {/* Auth actions */}
              {!loggedIn ? (
                <div className="hidden sm:flex items-center gap-2 ml-2">
                  <Link to="/login">
                    <button
                      className="h-9 px-4 rounded-md text-sm font-medium"
                      style={{
                        background: 'transparent',
                        color: col("#1F2937", "#E5E7EB"),
                        border: `1px solid ${col("#E5E7EB", "#374151")}`,
                      }}
                    >
                      Log in
                    </button>
                  </Link>
                  <Link to="/signup">
                    <button
                      className="h-9 px-4 rounded-md text-sm font-medium"
                      style={{
                        background: colors.primary,
                        color: '#fff'
                      }}
                    >
                      Sign up
                    </button>
                  </Link>
                </div>
              ) : (
                <div className="hidden sm:flex items-center gap-2 ml-2">
                  <button
                    onClick={handleLogout}
                    className="h-9 px-4 rounded-md text-sm font-medium"
                    style={{
                      background: 'transparent',
                      color: col("#1F2937", "#E5E7EB"),
                      border: `1px solid ${col("#E5E7EB", "#374151")}`,
                    }}
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Navbar;