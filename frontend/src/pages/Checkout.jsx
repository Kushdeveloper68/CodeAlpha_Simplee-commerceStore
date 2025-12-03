// Checkout.jsx
import React from "react";

// Custom palette from config
const colors = {
  primary: "#2764e7",
  backgroundLight: "#f6f6f8",
  backgroundDark: "#111621",
};

const isDark = false; // Add dark mode logic if needed
const col = (light, dark) => (isDark ? dark : light);

export default function Checkout() {
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
        

        {/* Main Checkout Content */}
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
                  {/* Contact Info */}
                  <section className="p-6 rounded-xl shadow-sm"
                    style={{ background: col("#fff", "rgba(31,22,33,0.5)") }}
                  >
                    <h2 className="text-lg font-bold leading-tight pb-4"
                      style={{ color: col("#1F2937", "#fff") }}>Contact Information</h2>
                    <div className="flex max-w-lg flex-wrap items-end gap-4">
                      <label className="flex flex-col min-w-40 flex-1">
                        <p className="text-sm font-medium pb-2"
                          style={{ color: col("#1F2937", "#E5E7EB") }}>Email Address</p>
                        <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-sm font-normal h-12 p-3"
                          style={{
                            color: col("#1F2937", "#fff"),
                            background: col(colors.backgroundLight, "#374151"),
                            borderColor: col("#D1D5DB", "#4B5563"),
                          }}
                          placeholder="you@example.com"
                          type="email"
                          defaultValue=""
                        />
                      </label>
                    </div>
                  </section>
                  {/* Shipping Address Section */}
                  <section className="p-6 rounded-xl shadow-sm"
                    style={{ background: col("#fff", "rgba(31,22,33,0.5)") }}
                  >
                    <h2 className="text-lg font-bold pb-4"
                      style={{ color: col("#1F2937", "#fff") }}>Shipping Address</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[
                        { label: "Full Name", placeholder: "John Doe", type: "text", span: true },
                        { label: "Street Address", placeholder: "123 Main Street", type: "text", span: true },
                        { label: "Apartment, suite, etc. (Optional)", placeholder: "Apt 4B", type: "text", span: true },
                        { label: "City", placeholder: "New York", type: "text" },
                        { label: "State / Province", placeholder: "NY", type: "text" },
                        { label: "Postal Code", placeholder: "10001", type: "text" },
                        {
                          label: "Country",
                          type: "select",
                          options: ["United States", "Canada", "Mexico"],
                        },
                      ].map((field, idx) =>
                        field.type === "select" ? (
                          <label className="flex flex-col" key={field.label}>
                            <p className="text-sm font-medium pb-2"
                              style={{ color: col("#1F2937", "#E5E7EB") }}>{field.label}</p>
                            <select className="form-select flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-sm font-normal h-12 p-3"
                              style={{
                                color: col("#1F2937", "#fff"),
                                background: col(colors.backgroundLight, "#374151"),
                                borderColor: col("#D1D5DB", "#4B5563"),
                              }}
                            >
                              {field.options.map(opt => <option key={opt}>{opt}</option>)}
                            </select>
                          </label>
                        ) : (
                          <label className={`flex flex-col${field.span ? " col-span-2" : ""}`} key={field.label}>
                            <p className="text-sm font-medium pb-2"
                              style={{ color: col("#1F2937", "#E5E7EB") }}>{field.label}</p>
                            <input className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-sm font-normal h-12 p-3"
                              style={{
                                color: col("#1F2937", "#fff"),
                                background: col(colors.backgroundLight, "#374151"),
                                borderColor: col("#D1D5DB", "#4B5563"),
                              }}
                              placeholder={field.placeholder}
                              type={field.type}
                              defaultValue=""
                            />
                          </label>
                        )
                      )}
                      <div className="flex items-center gap-3 col-span-2 mt-2">
                        <input defaultChecked className="form-checkbox h-4 w-4 rounded" id="billing-address" type="checkbox"
                          style={{
                            background: col(colors.backgroundLight, "#374151"),
                            color: colors.primary,
                            borderColor: col("#D1D5DB", "#4B5563"),
                          }}
                        />
                        <label className="text-sm" htmlFor="billing-address"
                          style={{ color: col("#374151", "#D1D5DB") }}>
                          Use as billing address
                        </label>
                      </div>
                    </div>
                  </section>
                  {/* Continue to Payment */}
                  <button
                    className="w-full mt-4 flex items-center justify-center rounded-lg h-12 text-base font-bold leading-normal tracking-wide shadow-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                    style={{
                      background: colors.primary,
                      color: "#fff",
                    }}
                  >
                    Continue to Payment
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
                  <div className="py-4 space-y-4 border-b" style={{ borderColor: col("#E5E7EB", "#22223B") }}>
                    {/* Item 1 */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 bg-gray-100"
                          style={{
                            backgroundImage:
                              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAmbPljTZ59iYOgsJ3SeNpV5jKk0Ke7PmkhKTqyYU0IVHyaCD099-awz9KdaQyD1NVFSpbY1IqWONmwVe-H0z5Bc9605Kno503CetTvvNJIok1PTDV-xtVNw0gEpCb68bdi753YHg3qL1jDmRAxoVxBAwVEcmaHx70donctDjBqRTDkeptrq3acm3l5viiwbKgkVO8BPxKH9e0AuABvAzAqBx_kVtpRTSfsnDzJow-hdv7O7WlqWHW4l760RnD2Mz5ZIedl-tKBZMXF")',
                          }}
                        />
                        <span className="absolute -top-2 -right-2 flex items-center justify-center size-5 rounded-full"
                          style={{
                            background: col("#F3F4F6", "#374151"),
                            color: col("#374151", "#fff"),
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}>
                          1
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: col("#1F2937", "#fff") }}>Wireless Headphones</p>
                        <p className="text-xs" style={{ color: col("#6B7280", "#9CA3AF") }}>Color: Black</p>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: col("#1F2937", "#fff") }}>$149.99</p>
                    </div>
                    {/* Item 2 */}
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <div
                          className="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-16 bg-gray-100"
                          style={{
                            backgroundImage:
                              'url("https://lh3.googleusercontent.com/aida-public/AB6AXuARaoC7UEOp4s6QhHDqvSWrKoSRam6ZA09lYD3Fv8A56-8Q6UkUZ3yLlQllQo_1C1EzZNqieSyYrBtrr6oppOedJ2JbFyvxRSn_PMBKylhk03v6tFXktGNojH_SCXYSbbYTxPzgg8t47_TxsG-LoNs9x-tyRan0UcaFbsbf1Xvu7l0mjG16swi2FuFImCPW0MxlKq74Zke-5QRf8fPE463JG3rrKsAMpsA-8PvoLlPp2NK2oDLJD0dNyjbjH2DOcYT9nT5SUG5FQ0bw")',
                          }}
                        />
                        <span className="absolute -top-2 -right-2 flex items-center justify-center size-5 rounded-full"
                          style={{
                            background: col("#F3F4F6", "#374151"),
                            color: col("#374151", "#fff"),
                            fontSize: "0.75rem",
                            fontWeight: 600,
                          }}>
                          1
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium" style={{ color: col("#1F2937", "#fff") }}>Smartwatch Pro</p>
                        <p className="text-xs" style={{ color: col("#6B7280", "#9CA3AF") }}>Band: Midnight</p>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: col("#1F2937", "#fff") }}>$279.00</p>
                    </div>
                  </div>
                  {/* Charges */}
                  <div className="py-4 space-y-2 border-b" style={{ borderColor: col("#E5E7EB", "#22223B") }}>
                    {[
                      { label: "Subtotal", value: "$428.99" },
                      { label: "Shipping", value: "$5.00" },
                      { label: "Taxes", value: "$25.74" },
                    ].map((row) => (
                      <div key={row.label} className="flex justify-between items-center text-sm">
                        <p style={{ color: col("#6B7280", "#D1D5DB") }}>{row.label}</p>
                        <p className="font-medium" style={{ color: col("#1F2937", "#E5E7EB") }}>{row.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="py-4 flex justify-between items-center">
                    <p className="text-base font-bold" style={{ color: col("#1F2937", "#fff") }}>Total</p>
                    <p className="text-xl font-black" style={{ color: col("#1F2937", "#fff") }}>$459.73</p>
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
