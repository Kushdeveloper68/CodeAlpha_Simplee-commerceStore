// ProductListing.jsx
import React from "react";
import { AllProductCard } from "../components";

// Palette and helpers from Tailwind config
const colors = {
  primary: "#2563EB",
  backgroundLight: "#FFFFFF",
  backgroundDark: "#111621",
};

const isDark = false; // manual override (implement dark mode logic if needed)
function col(light, dark) {
  return isDark ? dark : light;
}

export default function Productlisting() {
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display"
      style={{
        backgroundColor: col(colors.backgroundLight, colors.backgroundDark),
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="layout-container flex h-full grow flex-col">
        {/* TopNavBar */}
        
        <main className="flex flex-1 justify-center py-5 lg:py-10 px-4 sm:px-6 lg:px-8">
          <div className="layout-content-container flex flex-col lg:flex-row w-full max-w-7xl flex-1 gap-8">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 xl:w-1/5 flex-shrink-0">
              <div className="flex flex-col gap-4">
                <h3
                  className="text-lg font-bold"
                  style={{ color: col("#1F2937", "#F3F4F6") }}
                >
                  Filters
                </h3>
                {/* Accordion Filters */}
                <div className="flex flex-col">
                  {[
                    {
                      label: "Category",
                      options: ["Electronics", "Fashion", "Accessories", "Home Goods"],
                      type: "checkbox",
                    },
                    {
                      label: "Price Range",
                      custom: true,
                    },
                    {
                      label: "Brand",
                      options: ["Apple", "Samsung", "Sony", "Nike"],
                      type: "checkbox",
                    },
                    {
                      label: "Rating",
                      options: [
                        { label: "5 Stars", type: "radio" },
                        { label: "4 Stars & Up", type: "radio" },
                        { label: "3 Stars & Up", type: "radio" },
                      ],
                      type: "radio",
                    },
                  ].map((group, i) => (
                    <details
                      key={group.label}
                      className="flex flex-col border-b py-2 group"
                      style={{
                        borderColor: col("#D1D5DB", "#374151"),
                      }}
                      open={i === 0}
                    >
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-2">
                        <p
                          className="text-sm font-medium"
                          style={{ color: col("#1F2937", "#E5E7EB") }}
                        >
                          {group.label}
                        </p>
                        <span
                          className="material-symbols-outlined group-open:rotate-180 transition-transform duration-200"
                          style={{ color: col("#1F2937", "#E5E7EB") }}
                        >
                          expand_more
                        </span>
                      </summary>
                      {group.custom ? (
                        <div className="text-sm font-normal pb-2 pt-4">
                          <input
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                            type="range"
                          />
                          <div
                            className="flex justify-between text-xs mt-2"
                            style={{ color: col("#6B7280", "#9CA3AF") }}
                          >
                            <span>$0</span>
                            <span>$1000</span>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm font-normal pb-2 space-y-2 pt-2">
                          {group.options.map(opt =>
                            typeof opt === "string" ? (
                              <label
                                key={opt}
                                className="flex items-center gap-2"
                                style={{ color: col("#6B7280", "#9CA3AF") }}
                              >
                                <input
                                  className="form-checkbox rounded"
                                  type={group.type}
                                  defaultChecked={opt === "Electronics"}
                                />
                                {opt}
                              </label>
                            ) : (
                              <label
                                key={opt.label}
                                className="flex items-center gap-2"
                                style={{ color: col("#6B7280", "#9CA3AF") }}
                              >
                                <input
                                  className="form-radio"
                                  type={opt.type}
                                  name="rating"
                                />
                                {opt.label}
                              </label>
                            )
                          )}
                        </div>
                      )}
                    </details>
                  ))}
                </div>
                <button
                  className="w-full flex items-center justify-center rounded-lg py-2.5 text-sm font-semibold shadow-sm hover:bg-primary/90 transition-colors"
                  style={{
                    background: colors.primary,
                    color: "#fff",
                  }}
                >
                  Apply Filters
                </button>
              </div>
            </aside>
            {/* Main Products */}
            <div className="flex-1">
          
              {/* Page Heading & Sort Chips */}
              <div className="flex flex-col sm:flex-row flex-wrap justify-between items-baseline gap-4 py-4 border-b mb-6"
                style={{ borderColor: col("#E5E7EB", "#374151") }}
              >
                <div className="flex flex-col gap-2">
                  <p
                    className="text-3xl font-bold tracking-tight"
                    style={{ color: col("#1F2937", "#F3F4F6") }}
                  >
                    Shop All Products
                  </p>
                  <p
                    className="text-sm font-normal leading-normal"
                    style={{ color: col("#6B7280", "#9CA3AF") }}
                  >
                    Showing 1-12 of 96 results
                  </p>
                </div>
                <div className="flex gap-3">
                  <button
                    className="flex h-10 shrink-0 items-center justify-center gap-x-2 rounded-lg px-4"
                    style={{
                      background: col("#F3F4F6", "#1F2937"),
                    }}
                  >
                    <p
                      className="text-sm font-medium leading-normal"
                      style={{ color: col("#1F2937", "#F3F4F6") }}
                    >
                      Sort by: Popularity
                    </p>
                    <span className="material-symbols-outlined text-lg"
                      style={{ color: col("#1F2937", "#F3F4F6") }}>
                      expand_more
                    </span>
                  </button>
                </div>
              </div>
              {/* Product Grid */}
             <AllProductCard/>
              {/* Pagination */}
              <nav
                className="mt-10 flex items-center justify-center border-t px-4 py-4 sm:px-0"
                style={{ borderColor: col("#E5E7EB", "#374151") }}
              >
                <div className="flex items-center gap-2">
                  <a
                    className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                    style={{
                      borderColor: col("#D1D5DB", "#4B5563"),
                      background: col("#fff", "#1F2937"),
                      color: col("#6B7280", "#9CA3AF"),
                    }}
                    href="#"
                  >
                    Previous
                  </a>
                  <a
                    className="inline-flex items-center rounded-md border border-primary bg-primary px-3 py-1.5 text-sm font-medium text-white"
                    style={{ borderColor: colors.primary, background: colors.primary, color: "#fff" }}
                    href="#"
                  >
                    1
                  </a>
                  <a
                    className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                    style={{
                      borderColor: col("#D1D5DB", "#4B5563"),
                      background: col("#fff", "#1F2937"),
                      color: col("#6B7280", "#9CA3AF"),
                    }}
                    href="#"
                  >
                    2
                  </a>
                  <a
                    className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                    style={{
                      borderColor: col("#D1D5DB", "#4B5563"),
                      background: col("#fff", "#1F2937"),
                      color: col("#6B7280", "#9CA3AF"),
                    }}
                    href="#"
                  >
                    3
                  </a>
                  <span
                    className="text-gray-500 dark:text-gray-400"
                    style={{ color: col("#6B7280", "#9CA3AF") }}
                  >
                    ...
                  </span>
                  <a
                    className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                    style={{
                      borderColor: col("#D1D5DB", "#4B5563"),
                      background: col("#fff", "#1F2937"),
                      color: col("#6B7280", "#9CA3AF"),
                    }}
                    href="#"
                  >
                    8
                  </a>
                  <a
                    className="inline-flex items-center rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-gray-50"
                    style={{
                      borderColor: col("#D1D5DB", "#4B5563"),
                      background: col("#fff", "#1F2937"),
                      color: col("#6B7280", "#9CA3AF"),
                    }}
                    href="#"
                  >
                    Next
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
