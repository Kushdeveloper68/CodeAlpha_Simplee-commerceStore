// MyOrders.jsx
import React from "react";

const colors = {
  primary: "#2563eb",
  backgroundLight: "#f6f6f8",
  backgroundDark: "#111621",
  slate900: "#0f172a",
};

const isDark = false; // Set for dark mode support
const col = (light, dark) => (isDark ? dark : light);

export default function Orders() {
  // Example order data
  const orders = [
    {
      id: "#SS-102523",
      status: "Completed",
      statusColor: col("#bbf7d0", "rgba(34,197,94,0.5)"),
      statusTextColor: col("#166534", "#bbf7d0"),
      placed: "24 Oct, 2023",
      total: "$128.50",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCU9W8GmrUbQq_Zc8L25gtuMwwDARi9OvW6qSxX_wtpiCPwQ1USpXYu18CkB_4xJFFiAOhYVIXsq4NN_sKp_y9v7uf-XQq7rTrDqiGby6QHZAU0eMNjHqQrRTGmfgioPeb3re_v26y7KOJr4uCSIIWjApOEnmd0Ful-4vpz12w7g3tNRTkOHAMYZTZ1DPIKSwOh8Fr7pJD_PGEz15bF7SX45EXgmSQUFndQIEklEwVwTQMrHX7RwUz32xy3nZw7UObd6Z_MFi6WrQtq",
    },
    {
      id: "#SS-102522",
      status: "Pending",
      statusColor: col("#dbeafe", "rgba(37,99,235,0.5)"),
      statusTextColor: col("#1e40af", "#dbeafe"),
      placed: "21 Oct, 2023",
      total: "$49.99",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDNmnQbJldpYQI091iye1tobaH3sY4mcQSailwm6qCsBlhlCPD_x4c5oaemSA9eo2HnBV2IOyFoBuPIwD2lgjrlcKIAjZeRUKwnerbbHtm3LqDYeoyFPRm2AdvZRGPcZ4sOo5L3AWb34yWnX5YUdkcC8Ca77FmgV6qS8pouTjFMJf6GJ1vmL1TFaf1Nh2zs8C0SGavyedJJN6JMxUUaSET4HZEvfLmMpE4fxowRSC4yLb_Dtha3uDaVSzTRe7WsBpqbjf1wPjgEawef",
    },
    {
      id: "#SS-102521",
      status: "Completed",
      statusColor: col("#bbf7d0", "rgba(34,197,94,0.5)"),
      statusTextColor: col("#166534", "#bbf7d0"),
      placed: "15 Oct, 2023",
      total: "$299.00",
      img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA6xlMFmMnk2sQeDUAn0gF8wEII5VKXeDmsTDCs9Hd1lZejBB9z3L9fmdIAfsCDf5p3ErE9sxBZTL5NLyfkkKSeKvFgCaJGZeefNc7C1TEb3NFAM8dwtCWxq0Hs9bHNv-_yR1o3gjgoO0oweV4VHYeTSrgXxE5B6_UKpYP2g11Yf0fl7Lbu5BK70N75yJIg3RhgIvi0Fo67tHDuoW0ArgPXIgUzAHdeHXhTb5CpB0Zd8Ozrje7Lb4RPDvzVQz5PMwkmNWjaingJNLW6",
    },
  ];

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden font-display"
      style={{
        backgroundColor: col(colors.backgroundLight, colors.backgroundDark),
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <div className="flex h-full grow flex-col">
        <div className="px-4 sm:px-8 md:px-20 lg:px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col w-full max-w-4xl flex-1">
            {/* TopNavBar */}
            <header
              className="flex items-center justify-between whitespace-nowrap border-b px-4 md:px-10 py-3 rounded-t-lg"
              style={{
                background: col("#fff", colors.backgroundDark),
                borderColor: col("#e2e8f0", "#1e293b")
              }}
            >
              <div className="flex items-center gap-4"
                style={{ color: col("#1e293b", "#fff") }}>
                <div className="size-6" style={{ color: colors.primary }}>
                  <svg fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.982 21.993c0 0-3.18-5.04-0.636-9.99A8.99 8.99 0 0 0 21.018 4h-18a9.01 9.01 0 0 0 1.672 8.004c2.545 4.95-0.636 9.99 0.636 9.99h15.306Z"></path>
                  </svg>
                </div>
                <h2
                  className="text-lg font-bold leading-tight"
                  style={{ color: col("#1e293b", "#fff"), letterSpacing: "-0.015em" }}
                >
                  ShopSmart
                </h2>
              </div>
              <div className="hidden md:flex flex-1 justify-end gap-8">
                <div className="flex items-center gap-9">
                  {[
                    "Home",
                    "Shop",
                    "Deals",
                    <span key="orders" style={{ color: colors.primary, fontWeight: 700 }}>My Orders</span>,
                  ].map((txt, i) => (
                    typeof txt === "string" ?
                      <a
                        key={txt}
                        className="text-sm font-medium leading-normal hover:text-primary"
                        style={{ color: col("#1e293b", "#e2e8f0") }}
                        href="#"
                      >
                        {txt}
                      </a>
                      : txt
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {["search", "shopping_cart"].map(icon => (
                    <button
                      key={icon}
                      className="flex items-center justify-center rounded-full h-10 w-10"
                      style={{
                        background: col("#f1f5f9", "#1e293b"),
                        color: col("#1e293b", "#e2e8f0"),
                      }}
                    >
                      <span className="material-symbols-outlined">{icon}</span>
                    </button>
                  ))}
                  <div
                    className="bg-center aspect-square bg-no-repeat bg-cover rounded-full size-10"
                    style={{
                      backgroundImage:
                        'url("https://lh3.googleusercontent.com/aida-public/AB6AXuD5lqwoL7rmB8jJ3Gt_aX83Kjy4yXbV76IOHr_478eGrg8PF9MUa0cl0Qyw9rYd35XPzzSX4J2Ebc8giQpxlI5BM25UPY7RSiftW0UcUU2ZOwauB7WoRXZp5R69U4PfUdoVzYXfIFhB2w39Px3DcALEpfgNhM3QOZvqiERIL9CozxA0bSa35X-QUquqiJ3CGE_vFOODZ0i68-ZgoRvXEL7X5HEYbAONhQy9adO5YEXQgKv8NqlVPK-93rPcudhRRDuDcx1P6fiaq6en")',
                    }}
                    title="User profile picture"
                  ></div>
                </div>
              </div>
              <button className="md:hidden flex items-center justify-center rounded-full h-10 w-10"
                style={{
                  background: col("#f1f5f9", "#1e293b"),
                  color: col("#1e293b", "#e2e8f0"),
                }}
              >
                <span className="material-symbols-outlined">menu</span>
              </button>
            </header>
            {/* Main */}
            <main
              className="flex flex-col flex-1 bg-white p-4 sm:p-6 md:p-8 rounded-b-lg"
              style={{ background: col("#fff", "rgba(17,22,33,0.5)") }}
            >
              {/* Heading */}
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <p className="text-4xl font-black leading-tight"
                  style={{ color: col("#1e293b", "#fff"), letterSpacing: "-0.033em" }}>
                  My Orders
                </p>
              </div>
              {/* Segmented Buttons */}
              <div className="flex px-4 py-3">
                <div className="flex h-10 w-full md:w-auto items-center rounded-lg p-1"
                  style={{
                    background: col("#f1f5f9", "#1e293b"),
                  }}>
                  {["All Orders", "Pending", "Completed"].map((btn, i) => (
                    <label
                      key={btn}
                      className="flex cursor-pointer h-full grow items-center justify-center overflow-hidden rounded-md px-4 text-sm font-medium leading-normal"
                      style={{
                        color: col("#64748b", "#94a3b8"),
                        background: i === 0 ? colors.primary : undefined,
                        boxShadow: i === 0 ? "0 1px 3px 0 rgba(0,0,0,0.02)" : undefined,
                        color: i === 0 ? "#fff" : col("#64748b", "#94a3b8"),
                        transition: "background 0.2s, color 0.2s"
                      }}
                    >
                      <span className="truncate">{btn}</span>
                      <input
                        className="invisible w-0"
                        name="order_filter"
                        type="radio"
                        value={btn}
                        defaultChecked={i === 0}
                        readOnly
                      />
                    </label>
                  ))}
                </div>
              </div>
              {/* Orders List */}
              <div className="flex flex-col gap-4 mt-4">
                {orders.map(order => (
                  <div key={order.id} className="p-4">
                    <div
                      className="flex flex-col sm:flex-row items-stretch justify-between gap-6 rounded-lg shadow-sm p-6"
                      style={{
                        background: col("#f8fafc", "rgba(51,65,85,0.5)"),
                      }}
                    >
                      <div className="flex flex-1 flex-col gap-4">
                        <div className="flex flex-col gap-1.5">
                          <div className="flex items-center gap-3">
                            <p className="text-base font-bold leading-tight"
                              style={{ color: col("#1e293b", "#e2e8f0") }}>
                              Order {order.id}
                            </p>
                            <span
                              className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                              style={{
                                background: order.statusColor,
                                color: order.statusTextColor,
                              }}
                            >
                              {order.status}
                            </span>
                          </div>
                          <p className="text-sm font-normal leading-normal"
                            style={{ color: col("#64748b", "#94a3b8") }}>
                            Placed on {order.placed}
                          </p>
                          <p className="text-lg font-bold leading-tight mt-2"
                            style={{ color: col("#1e293b", "#fff") }}>
                            Total: {order.total}
                          </p>
                        </div>
                        <button
                          className="flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-10 px-5 text-sm font-medium leading-normal w-fit shadow-sm hover:bg-primary/90"
                          style={{
                            background: colors.primary,
                            color: "#fff",
                          }}
                        >
                          <span className="truncate">View Details</span>
                        </button>
                      </div>
                      <div
                        className="w-full sm:w-48 h-32 sm:h-auto bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0"
                        style={{
                          backgroundImage: `url("${order.img}")`,
                        }}
                        title="Order product image"
                      ></div>
                    </div>
                  </div>
                ))}
                {/* Uncomment below for Empty State
                <div className="flex flex-col items-center justify-center text-center p-10 mt-8 rounded-lg"
                  style={{ background: col("#f8fafc", "rgba(51,65,85,0.5)") }}
                >
                  <div className="w-16 h-16 mb-4" style={{ color: col("#94a3b8", "#64748b") }}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-6.818A1.125 1.125 0 0 0 18.106 5H4.269a1.125 1.125 0 0 0-1.086.835L2.25 14.25Z" />
                    </svg>
                  </div>
                  <p className="text-xl font-semibold"
                    style={{ color: col("#1e293b", "#fff") }}>
                    No orders yet
                  </p>
                  <p className="text-sm mt-2" style={{ color: col("#64748b", "#94a3b8") }}>
                    You haven't placed any orders. Start shopping to see them here.
                  </p>
                  <button className="mt-6 flex min-w-[84px] max-w-[480px] items-center justify-center overflow-hidden rounded-lg h-10 px-5 text-sm font-medium leading-normal shadow-sm hover:bg-primary/90"
                    style={{
                      background: colors.primary,
                      color: "#fff",
                    }}>
                    <span className="truncate">Start Shopping</span>
                  </button>
                </div>
                */}
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}
