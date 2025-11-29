// OrderConfirmation.jsx
import React from "react";

const colors = {
  primary: "#2563eb",
  backgroundLight: "#f6f6f8",
  backgroundDark: "#111621",
};

const isDark = false; // Set to true for dark mode
const col = (light, dark) => (isDark ? dark : light);

export default function Orderconformation() {
  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden"
      style={{
        backgroundColor: col(colors.backgroundLight, colors.backgroundDark),
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="flex h-full grow flex-col">
        <div className="flex flex-1 justify-center py-5">
          <div className="layout-content-container flex flex-col max-w-[960px] flex-1 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <header
              className="flex items-center justify-between whitespace-nowrap border-b border-solid px-6 py-4 rounded-xl"
              style={{
                background: col("#fff", "#1f2937"),
                borderColor: col("#E5E7EB", "#22223B")
              }}
            >
              <div className="flex items-center gap-4"
                style={{ color: col("#1F2937", "#fff") }}
              >
                <div className="size-6" style={{ color: colors.primary }}>
                  <svg fill="none" viewBox="0 0 48 48">
                    <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor"></path>
                  </svg>
                </div>
                <h2
                  className="text-xl font-bold leading-tight"
                  style={{ color: col("#1F2937", "#fff") }}
                >
                  ShopSmart
                </h2>
              </div>
              {/* Middle Nav */}
              <div className="hidden md:flex flex-1 justify-center gap-8">
                <div className="flex items-center gap-9">
                  {["Electronics", "Fashion", "Accessories", "Home"].map(txt => (
                    <a
                      key={txt}
                      className="text-sm font-medium leading-normal hover:text-primary"
                      style={{ color: col("#1F2937", "#D1D5DB") }}
                      href="#"
                    >
                      {txt}
                    </a>
                  ))}
                </div>
              </div>
              {/* Icons/Profile */}
              <div className="flex items-center gap-3">
                {["favorite", "shopping_cart"].map(icon => (
                  <button
                    key={icon}
                    className="flex items-center justify-center rounded-lg h-10 bg-gray-100 gap-2 min-w-0 px-2.5 hover:bg-gray-200 text-sm font-bold leading-normal"
                    style={{
                      color: col("#1F2937", "#D1D5DB"),
                      background: col("#F3F4F6", "#374151"),
                    }}
                  >
                    <span className="material-symbols-outlined">{icon}</span>
                  </button>
                ))}
                <div
                  className="bg-center aspect-square bg-no-repeat bg-cover rounded-full size-10"
                  style={{
                    backgroundImage:
                      "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAA-f_Et3AGtQnTMgKXw5blGnC6dZtKVqIRY_K9IsBFms8lfajDwqgZl1_UfxEi5aaCkv8qCFBUWb1lxiaek2dPBr7mR9uDMpWEs5NK1PyQa9-jn8p4pKFbn2OsYoJQxsR5xKCt2YXkC0RJyieNh3kVJjeA3vLbEimQf6yqBOlSzajIowhdK2zTKpxI1PImCnPWecUJjT2jDNuXsdo11UGmW0tWJI7aN-9nxOCOP40Jki609Tijp7JKq064nZb_yMIRT8lEYqoN0OXs')"
                  }}
                  title="User profile picture"
                ></div>
              </div>
            </header>
            {/* Main */}
            <main className="flex-grow pt-10 pb-16">
              {/* Confirmation Message */}
              <div className="text-center">
                <div
                  className="inline-flex justify-center items-center size-16 rounded-full mb-4"
                  style={{
                    background: col("#bbf7d0", "#166534"),
                  }}
                >
                  <span
                    className="material-symbols-outlined !text-4xl"
                    style={{ color: col("#16a34a", "#6ee7b7") }}
                  >
                    check_circle
                  </span>
                </div>
                <h1
                  className="tracking-tight font-bold leading-tight pb-2"
                  style={{
                    fontSize: 32,
                    color: col("#1F2937", "#E5E7EB"),
                  }}
                >
                  Thank You For Your Order!
                </h1>
                <p
                  className="text-base font-normal pb-3"
                  style={{ color: col("#6B7280", "#9CA3AF") }}
                >
                  Your order{" "}
                  <span
                    className="font-semibold"
                    style={{ color: col("#1F2937", "#E5E7EB") }}
                  >
                    #SS-12345678
                  </span>{" "}
                  has been placed. A confirmation email has been sent to your address.
                </p>
              </div>
              {/* Details Blocks */}
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left: Order Summary, Shipping, Payment */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Order Summary */}
                  <div
                    className="rounded-xl shadow-sm p-6 border"
                    style={{
                      background: col("#fff", "#1f2937"),
                      borderColor: col("#E5E7EB", "#22223B"),
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <h2
                        className="text-[22px] font-bold"
                        style={{ color: col("#1F2937", "#E5E7EB") }}
                      >
                        Order Summary
                      </h2>
                      <a
                        className="text-sm font-medium flex items-center gap-1.5 hover:underline"
                        style={{ color: colors.primary }}
                        href="#"
                      >
                        <span className="material-symbols-outlined text-base">print</span>
                        Print Receipt
                      </a>
                    </div>
                    <div
                      className="mt-4 border-t pt-4 space-y-4"
                      style={{ borderColor: col("#E5E7EB", "#22223B") }}
                    >
                      {[
                        {
                          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCl9uJ0t6MUs7Kf85SUwAQY9hzEjvFCF9ReOs1P2xIH1rnfP741cDJnpmK7zej1IrtbKYO-W4yI-4FRkYOQ0yFHDzShJrLoPzPHSPiMTQoAINYYPAtwUfhdDkt-iS0I9WjDiB8ZHBM1lW8dBpx1BCqwlNL_ADsGafEdsba56q_DLRQV_zpTsh8EMYj2cJzqEKTax2R0UB-oSugPHRkPM_09aXkvIAUXbLlNOAKjjdxs5NCeIkSsqRWw6S7JsNzN1Wxm-aPO21phGoxU",
                          title: "Smartwatch Pro X",
                          qty: "1",
                          price: "$249.99"
                        },
                        {
                          img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD8lwmzXEsFuPNXAIgA-JaPiRygjv_aridCPEhcbRIdsKSOIHOyVuwaaZQbYQDSPrWWKKv-8rjb0qGfgxwKLooE8SkPo8jF5amk23CeYiRPzd0IOCg6d8zh7yer3mW4G3hWaJNM4V8G1qVn3iMSlvnZC3hHQG5DxYK3rdB61qb4PGo2_FqJY3MvunWo1qzb3OFuqtNAslKo-Dl5DHCHQVfD7mXC3CaxCcecLxy1KCtCQeiX97py8Pn-1KrX8tUn0mEpDNgbkTtARFnY",
                          title: "Urban Explorer Backpack",
                          qty: "1",
                          price: "$89.50"
                        }
                      ].map((prod, i) => (
                        <div
                          key={prod.title}
                          className={
                            "flex items-center gap-4 py-2 justify-between" +
                            (i > 0 ? " border-t pt-4" : "")
                          }
                          style={i > 0 ? { borderColor: col("#E5E7EB", "rgba(31,22,33,0.5)") } : undefined}
                        >
                          <div className="flex items-center gap-4">
                            <div
                              className="bg-center aspect-square bg-no-repeat bg-cover rounded-lg"
                              style={{
                                width: 64,
                                height: 64,
                                backgroundImage: `url("${prod.img}")`,
                              }}
                              title={prod.title}
                            ></div>
                            <div className="flex flex-col justify-center">
                              <p
                                className="text-base font-medium line-clamp-1"
                                style={{ color: col("#1F2937", "#E5E7EB") }}
                              >
                                {prod.title}
                              </p>
                              <p
                                className="text-sm font-normal line-clamp-2"
                                style={{ color: col("#6B7280", "#9CA3AF") }}
                              >
                                Qty: {prod.qty}
                              </p>
                            </div>
                          </div>
                          <div className="shrink-0">
                            <p className="text-base font-semibold leading-normal"
                              style={{ color: col("#1F2937", "#E5E7EB") }}>
                              {prod.price}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Shipping and Payment */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Shipping Address */}
                    <div
                      className="rounded-xl shadow-sm p-6 border"
                      style={{
                        background: col("#fff", "#1f2937"),
                        borderColor: col("#E5E7EB", "#22223B")
                      }}
                    >
                      <h3
                        className="text-lg font-bold mb-3"
                        style={{ color: col("#1F2937", "#E5E7EB") }}
                      >
                        Shipping Address
                      </h3>
                      <address
                        className="text-sm not-italic leading-relaxed"
                        style={{ color: col("#6B7280", "#9CA3AF") }}
                      >
                        Alex Johnson<br />
                        123 Tech Avenue<br />
                        Innovation City, CA 90210<br />
                        United States
                      </address>
                    </div>
                    {/* Payment Method */}
                    <div
                      className="rounded-xl shadow-sm p-6 border"
                      style={{
                        background: col("#fff", "#1f2937"),
                        borderColor: col("#E5E7EB", "#22223B")
                      }}
                    >
                      <h3
                        className="text-lg font-bold mb-3"
                        style={{ color: col("#1F2937", "#E5E7EB") }}
                      >
                        Payment Method
                      </h3>
                      <div className="flex items-center gap-3">
                        <img
                          alt="Visa Card Logo"
                          className="h-6"
                          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaREO3F5h35U4e7uBaNh855y19EiUlkwiTrem1k7PBP1i33_uILtEGgRUa83LZ9ieSrA4kcNOZAeJXtmUNu1qOMcK3bAckruccmyjXw4bTdrMn59Xk0Orl47tM02mkgAJfW00MwCBP-8P708NlV39LNR265zXOXOSCvnhP5gl00ZHjcZST9TQWbC9m5tqXO4s4MqqkCHLRkbBhH-nP6QBmW0O758Y9kWzPbpTgBqveLw0G9rtiRsbwRcnkma54YNX4XCyIDTVoCQWz"
                        />
                        <p
                          className="text-sm"
                          style={{ color: col("#6B7280", "#9CA3AF") }}
                        >
                          Ending in 1234
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Right: Order Totals */}
                <div className="lg:col-span-1">
                  <div
                    className="rounded-xl shadow-sm p-6 border"
                    style={{
                      background: col("#fff", "#1f2937"),
                      borderColor: col("#E5E7EB", "#22223B")
                    }}
                  >
                    <h3
                      className="text-lg font-bold mb-4"
                      style={{ color: col("#1F2937", "#E5E7EB") }}
                    >
                      Order Totals
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between"
                        style={{ color: col("#6B7280", "#9CA3AF") }}>
                        <span>Subtotal</span>
                        <span>$339.49</span>
                      </div>
                      <div className="flex justify-between"
                        style={{ color: col("#6B7280", "#9CA3AF") }}>
                        <span>Shipping</span>
                        <span>$5.00</span>
                      </div>
                      <div className="flex justify-between"
                        style={{ color: col("#6B7280", "#9CA3AF") }}>
                        <span>Taxes</span>
                        <span>$27.16</span>
                      </div>
                      <div className="border-t my-3"
                        style={{ borderColor: col("#E5E7EB", "#22223B") }}></div>
                      <div className="flex justify-between text-base font-bold"
                        style={{ color: col("#1F2937", "#E5E7EB") }}>
                        <span>Grand Total</span>
                        <span>$371.65</span>
                      </div>
                    </div>
                    <button
                      className="w-full mt-6 flex items-center justify-center rounded-lg h-12 text-base font-bold leading-normal tracking-wide shadow-md hover:bg-primary/90 transition-colors"
                      style={{ background: colors.primary, color: "#fff" }}
                    >
                      Continue Shopping
                    </button>
                  </div>
                </div>
              </div>
            </main>
            {/* Footer */}
            <footer
              className="text-center py-8 border-t mt-8"
              style={{ borderColor: col("#E5E7EB", "#22223B") }}
            >
              <p
                className="text-sm"
                style={{ color: col("#6B7280", "#9CA3AF") }}
              >
                © 2024 ShopSmart. All rights reserved.
              </p>
              <div className="flex justify-center gap-4 mt-4">
                {["Customer Service", "FAQ", "Privacy Policy"].map(link => (
                  <a
                    key={link}
                    className="text-sm hover:text-primary"
                    style={{ color: col("#6B7280", "#9CA3AF") }}
                    href="#"
                  >
                    {link}
                  </a>
                ))}
              </div>
            </footer>
          </div>
        </div>
      </div>
    </div>
  );
}
