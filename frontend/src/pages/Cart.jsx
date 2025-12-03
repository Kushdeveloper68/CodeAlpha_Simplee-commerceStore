// ShoppingCart.jsx
import React from "react";

// Palette from Tailwind config
const colors = {
  primary: "#2563eb",
  backgroundLight: "#ffffff",
  backgroundDark: "#111621",
};

const isDark = false; // Implement dark mode logic if needed
const col = (light, dark) => (isDark ? dark : light);

export default function Cart() {
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
     
      {/* Main Content */}
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Breadcrumbs */}
          <div className="flex flex-wrap gap-2 pb-4">
            <a
              className="text-sm font-medium leading-normal hover:text-primary"
              style={{ color: col("#6B7280", "#9CA3AF") }}
              href="#"
            >
              Home
            </a>
            <span className="text-sm font-medium leading-normal"
              style={{ color: col("#6B7280", "#9CA3AF") }}
            >
              /
            </span>
            <span className="text-sm font-medium leading-normal"
              style={{ color: col("#1F2937", "#E5E7EB") }}>Cart</span>
          </div>
          {/* Cart Heading */}
          <div className="flex flex-wrap justify-between gap-3 pb-8">
            <p className="text-4xl font-black leading-tight min-w-72" style={{ color: col("#1F2937", "#fff"), letterSpacing: "-0.033em" }}>
              Shopping Cart
            </p>
          </div>
          {/* Cart Contents & Order Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Cart Items */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <div className="flex flex-col divide-y border rounded-lg overflow-hidden"
                style={{
                  borderColor: col("#E5E7EB", "#22223B"),
                  boxShadow: "0 1px 3px 0 rgba(0,0,0,0.02)"
                }}>
                {[
                  {
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6J52tD25wZBlt3A1VVAK06RfDeApWo7NUMWUnZMfuXMXj7kPIe6dQd2edKD6HkWBZ9EgdkyBPwR5Hpwvuyd5rderWAxcAzWBWaGncm4-45ygGb2yBYtFM9ie-8Huvymgh6N6nDLPCnJELbydbJmCdtUMTP8ecYBoF0WG9-DZbhsJpzaR_088HmRYsEbS6YYpPDbmVf2_0CzG0h_XleC1dMhMyzNAqAVl86JunsY6nooOPS-R-mfLqXA7e6gAcx1YVzw6owhCIiH6p",
                    title: "Minimalist Smart Watch",
                    desc: "Color: Midnight Black",
                    price: "$199.99",
                  },
                  {
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBCM8xvWhtuVt4ZKUcNh03qLXAkt8vb_aZjBotY-BFGba1Omdc2mtAHctRM17GchWL79dhU9QB6O8Qn3FQVtmzsnn83ZePfwlcuzx_uuxZm1c831aZnb2D58ElU8AEQbA4MUILyl_-eOASGFCYv6_P0jUGEtHt2KrpmtVeIeYtRrYbL93E9d8MNt3e28HkE7Y-QaH0T7XO7xi8XOGH-GN-weArwjRuIotM_9t6DYdwRv5E3j-qZwktpjZKshGNBESVKlHRlH9seqTXY",
                    title: "Leather Crossbody Bag",
                    desc: "Size: Medium",
                    price: "$89.50",
                  },
                  {
                    img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBN3G_W7HBeq9rb8kAh0XId16POa91yjHTOuvHvYnUSN5DqVEQH_YnkCi_ul3GN-Bn_xrfoShN6PjcwyFeQhhnvScLM51bkhqqaEZdibvz523KrXUyya2BEb9-zehwh7nkNTgeKGzDUCg6N6p7fYxbLwo5v2xaBC_5AHgAaSpBNudNeeivZOeGoXL3HEN2WRMM84N2dllbDZHh75aHNjykLJsrriwh55Na_EG4ejpau2rTPOCqIxNz1bv8JC0n7vZjX1HPTMNvonq3O",
                    title: "Wireless Headphones",
                    desc: "Color: Cream",
                    price: "$149.00",
                  },
                ].map((item, idx) => (
                  <div key={item.title}
                    className="flex gap-4 px-6 py-5 justify-between items-center"
                    style={{
                      background: col("#F9FAFB", "rgba(31,22,33,0.3)"),
                    }}
                  >
                    <div className="flex items-center gap-4 w-full">
                      <div
                        className="bg-center aspect-square bg-no-repeat bg-cover rounded-lg"
                        style={{
                          backgroundImage: `url("${item.img}")`,
                          width: 70,
                          height: 70,
                        }}
                        title={item.title}
                      ></div>
                      <div className="flex flex-1 flex-col justify-center">
                        <p
                          className="text-base font-medium leading-normal"
                          style={{ color: col("#1F2937", "#fff") }}
                        >
                          {item.title}
                        </p>
                        <p
                          className="text-sm font-normal leading-normal"
                          style={{ color: col("#6B7280", "#9CA3AF") }}
                        >
                          {item.desc}
                        </p>
                      </div>
                      <div className="shrink-0">
                        <div className="flex items-center gap-2"
                          style={{ color: col("#1F2937", "#E5E7EB") }}>
                          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer">
                            -
                          </button>
                          <input className="w-6 p-0 text-center bg-transparent border-none [appearance:textfield]"
                            type="number"
                            value={1}
                            readOnly
                            style={{
                              color: col("#1F2937", "#fff"),
                              background: "transparent"
                            }}
                          />
                          <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer">
                            +
                          </button>
                        </div>
                      </div>
                      <p
                        className="text-base font-medium leading-normal w-24 text-right"
                        style={{ color: col("#1F2937", "#fff") }}
                      >
                        {item.price}
                      </p>
                      <button
                        className="hover:text-red-500"
                        style={{ color: col("#6B7280", "#9CA3AF") }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: 22 }}>
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <a
                className="flex items-center gap-2 text-primary font-medium text-sm hover:underline w-fit"
                style={{ color: colors.primary }}
                href="#"
              >
                <span className="material-symbols-outlined" style={{ fontSize: 20 }}>
                  arrow_back
                </span>
                Continue Shopping
              </a>
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
                  {[
                    { label: "Subtotal", val: "$438.49" },
                    { label: "Estimated Shipping", val: "$5.00" },
                    { label: "Estimated Tax", val: "$21.92" },
                  ].map((row) => (
                    <div key={row.label} className="flex justify-between items-center">
                      <p style={{ color: col("#6B7280", "#9CA3AF") }}>{row.label}</p>
                      <p className="font-medium" style={{ color: col("#1F2937", "#E5E7EB") }}>{row.val}</p>
                    </div>
                  ))}
                </div>
                <div className="border-t" style={{ borderColor: col("#E5E7EB", "#22223B") }}></div>
                <div className="flex justify-between items-center">
                  <p className="text-lg font-bold" style={{ color: col("#1F2937", "#fff") }}>Total</p>
                  <p className="text-lg font-bold" style={{ color: col("#1F2937", "#fff") }}>$465.41</p>
                </div>
                <button
                  className="w-full flex cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 gap-2 text-base font-bold leading-normal tracking-[-0.015em] hover:bg-primary/90 transition-colors shadow-sm hover:shadow-md"
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
        </div>
      </main>
    </div>
  );
}
