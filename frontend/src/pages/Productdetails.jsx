// ProductDetails.jsx
import React from "react";
import { TrendingProducts, MainProductDetails } from "../components";

const colors = {
  primary: "#2563EB",
  backgroundLight: "#FFFFFF",
  backgroundDark: "#111827",
};

const isDark = false; // Set this if you add dark mode logic
const col = (light, dark) => (isDark ? dark : light);

export default function Productdetails() {
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display"
      style={{
        backgroundColor: col(colors.backgroundLight, colors.backgroundDark),
        color: col("#1F2937", "#E5E7EB"),
        fontFamily: "'Inter', sans-serif",
      }}
    >
      {/* Navbar */}
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
              <div
                className="flex items-center gap-2"
                style={{ color: col("#1F2937", "#fff") }}
              >
                <span
                  className="material-symbols-outlined text-3xl"
                  style={{ color: colors.primary }}
                >
                  shopping_bag
                </span>
                <h2 className="text-xl font-bold tracking-tight">ShopSmart</h2>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                {["Electronics", "Fashion", "Accessories", "Deals"].map(t => (
                  <a
                    key={t}
                    className="text-sm font-medium hover:text-primary"
                    style={{
                      color: col("#1F2937", "#D1D5DB"),
                    }}
                    href="#"
                  >
                    {t}
                  </a>
                ))}
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
              <div className="flex gap-2">
                {["favorite", "shopping_cart", "person"].map(icon => (
                  <button
                    key={icon}
                    className="flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 w-10 bg-transparent hover:bg-[#F3F4F6] dark:hover:bg-gray-700 text-[#6B7280] dark:text-gray-400 hover:text-[#1F2937] dark:hover:text-white"
                    style={{
                      color: col("#6B7280", "#9CA3AF")
                    }}
                  >
                    <span className="material-symbols-outlined">{icon}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="layout-container flex h-full grow flex-col">
        <div className="container mx-auto px-4 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1">
           <MainProductDetails/>
            
            {/* Similar Products Carousel */}
            <div className="pt-12">
              <h3
                className="text-2xl font-bold mb-6"
                style={{ color: col("#1F2937", "#fff") }}
              >
                Similar Products
              </h3>
              <div className="flex overflow-x-auto pb-4 -mx-4 px-4">
                <div className="flex items-stretch gap-6">
                 <TrendingProducts/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
