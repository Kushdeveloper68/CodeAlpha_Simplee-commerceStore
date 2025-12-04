import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { getUserOrdersApi, useApi } from "../api";

const colors = {
  primary: "#2563eb",
  backgroundLight: "#f6f6f8",
  backgroundDark: "#111621",
};

const isDark = false; // adjust if you add dark mode later
const col = (light, dark) => (isDark ? dark : light);

export default function Orders() {
  const api = useApi();
  const { authToken } = useAuth();
  const navigate = useNavigate();

  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All Orders");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [expanded, setExpanded] = useState({}); // track expanded orderIds

  // require login
  useEffect(() => {
    const token = authToken || localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, [authToken, navigate]);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);
      setError("");
      try {
        const res = await getUserOrdersApi();
        if (res && res.success) {
          // backend returns { success: true, orders: [...] }
          setOrders(res.orders || []);
        } else {
          setError(res && res.message ? res.message : "Failed to load orders.");
        }
      } catch (err) {
        setError((err && err.message) || "Error fetching orders.");
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  const toggleExpand = (orderId) => {
    setExpanded((prev) => ({ ...prev, [orderId]: !prev[orderId] }));
  };

  const visibleOrders = orders.filter((o) => {
    if (filter === "All Orders") return true;
    if (filter === "Pending") return o.status === "pending" || o.status === "Pending";
    if (filter === "Completed") return o.status === "completed" || o.status === "Completed";
    return true;
  });

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
            <main
              className="flex flex-col flex-1 bg-white p-4 sm:p-6 md:p-8 rounded-b-lg"
              style={{ background: col("#fff", "rgba(17,22,33,0.5)") }}
            >
              <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
                <p
                  className="text-4xl font-black leading-tight"
                  style={{ color: col("#1e293b", "#fff"), letterSpacing: "-0.033em" }}
                >
                  My Orders
                </p>
              </div>

              <div className="flex px-4 py-3">
                <div
                  className="flex h-10 w-full md:w-auto items-center rounded-lg p-1"
                  style={{
                    background: col("#f1f5f9", "#1e293b"),
                  }}
                >
                  {["All Orders", "Pending", "Completed"].map((btn) => {
                    const active = btn === filter;
                    return (
                      <button
                        key={btn}
                        onClick={() => setFilter(btn)}
                        className="flex cursor-pointer h-full items-center justify-center overflow-hidden rounded-md px-4 text-sm font-medium leading-normal"
                        style={{
                          background: active ? colors.primary : undefined,
                          color: active ? "#fff" : col("#64748b", "#94a3b8"),
                          boxShadow: active ? "0 1px 3px 0 rgba(0,0,0,0.02)" : undefined,
                          transition: "background 0.2s, color 0.2s",
                        }}
                      >
                        <span className="truncate">{btn}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Content */}
              <div className="mt-4">
                {loading && (
                  <div className="p-6 text-center text-sm" style={{ color: col("#64748b", "#94a3b8") }}>
                    Loading orders...
                  </div>
                )}

                {error && (
                  <div className="p-4 rounded-md bg-red-50 border border-red-200 text-red-700 text-sm">
                    {error}
                  </div>
                )}

                {!loading && !error && visibleOrders.length === 0 && (
                  <div
                    className="flex flex-col items-center justify-center text-center p-10 mt-8 rounded-lg"
                    style={{ background: col("#f8fafc", "rgba(51,65,85,0.5)") }}
                  >
                    <div className="w-16 h-16 mb-4" style={{ color: col("#94a3b8", "#64748b") }}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-full h-full">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l1.838-6.818A1.125 1.125 0 0 0 18.106 5H4.269a1.125 1.125 0 0 0-1.086.835L2.25 14.25Z" />
                      </svg>
                    </div>
                    <p className="text-xl font-semibold" style={{ color: col("#1e293b", "#fff") }}>
                      No orders yet
                    </p>
                    <p className="text-sm mt-2" style={{ color: col("#64748b", "#94a3b8") }}>
                      You haven't placed any orders. Start shopping to see them here.
                    </p>
                    <button
                      onClick={() => navigate("/productlisting")}
                      className="mt-6 flex min-w-[84px] max-w-[480px] items-center justify-center rounded-lg h-10 px-5 text-sm font-medium shadow-sm"
                      style={{ background: colors.primary, color: "#fff" }}
                    >
                      Start Shopping
                    </button>
                  </div>
                )}

                {/* Orders list */}
                <div className="flex flex-col gap-4">
                  {visibleOrders.map((order) => {
                    const created = new Date(order.createdAt || Date.now());
                    const placed = created.toLocaleDateString();
                    // make total from items if present
                    const total = (order.items || []).reduce((s, it) => s + (it.totalPrice || it.price * it.quantity || 0), 0);
                    const status = order.status || "pending";
                    const orderKey = order.orderId || order._id || String(created.getTime());

                    return (
                      <div key={orderKey} className="p-4">
                        <div
                          className="flex flex-col sm:flex-row items-stretch justify-between gap-6 rounded-lg shadow-sm p-6"
                          style={{
                            background: col("#f8fafc", "rgba(51,65,85,0.5)"),
                          }}
                        >
                          <div className="flex flex-1 flex-col gap-4">
                            <div className="flex flex-col gap-1.5">
                              <div className="flex items-center gap-3">
                                <p className="text-base font-bold leading-tight" style={{ color: col("#1e293b", "#e2e8f0") }}>
                                  Order {String(order.orderId || order._id).slice(0, 10)}
                                </p>
                                <span
                                  className="inline-flex items-center rounded-full px-2 py-1 text-xs font-medium"
                                  style={{
                                    background: status.toLowerCase() === "completed" ? col("#bbf7d0", "rgba(34,197,94,0.5)") : col("#dbeafe", "rgba(37,99,235,0.5)"),
                                    color: status.toLowerCase() === "completed" ? col("#166534", "#bbf7d0") : col("#1e40af", "#dbeafe"),
                                  }}
                                >
                                  {status}
                                </span>
                              </div>
                              <p className="text-sm font-normal leading-normal" style={{ color: col("#64748b", "#94a3b8") }}>
                                Placed on {placed}
                              </p>
                              <p className="text-lg font-bold leading-tight mt-2" style={{ color: col("#1e293b", "#fff") }}>
                                Total: ₹{total.toFixed ? total.toFixed(2) : total}
                              </p>
                            </div>

                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => toggleExpand(orderKey)}
                                className="flex items-center justify-center rounded-lg h-10 px-5 text-sm font-medium shadow-sm"
                                style={{ background: colors.primary, color: "#fff" }}
                              >
                                {expanded[orderKey] ? "Hide Details" : "View Details"}
                              </button>
                            </div>

                            {expanded[orderKey] && (
                              <div className="mt-3 border rounded-md p-3" style={{ borderColor: col("#E5E7EB", "#374151") }}>
                                <div className="mb-2">
                                  <div className="text-sm font-medium" style={{ color: col("#1e293b", "#e2e8f0") }}>
                                    Items
                                  </div>
                                  {(order.items || []).map((it, idx) => (
                                    <div key={idx} className="flex items-center gap-3 py-2 border-b" style={{ borderColor: col("#eef2f7", "#324155") }}>
                                      <div className="w-16 h-12 bg-center bg-no-repeat bg-cover rounded" style={{ backgroundImage: `url("${it.mainImageUrl || it.productImage || ""}")` }} />
                                      <div className="flex-1">
                                        <div className="text-sm font-semibold" style={{ color: col("#0f172a", "#fff") }}>{it.productTitle || it.name}</div>
                                        <div className="text-xs" style={{ color: col("#64748b", "#94a3b8") }}>{it.quantity} × ₹{(it.price || 0).toFixed ? (it.price).toFixed(2) : it.price}</div>
                                      </div>
                                      <div className="text-sm font-semibold">₹{(it.totalPrice || (it.price * it.quantity) || 0).toFixed ? (it.totalPrice || (it.price * it.quantity)).toFixed(2) : it.totalPrice}</div>
                                    </div>
                                  ))}
                                </div>

                                {order.shippingDetails && (
                                  <div className="mt-3">
                                    <div className="text-sm font-medium" style={{ color: col("#1e293b", "#e2e8f0") }}>
                                      Shipping
                                    </div>
                                    <div className="text-sm" style={{ color: col("#64748b", "#94a3b8") }}>
                                      {order.shippingDetails.streetAddress || ""} {order.shippingDetails.apartment || ""}
                                      <br />
                                      {order.shippingDetails.city || ""}, {order.shippingDetails.stateOrProvince || ""} {order.shippingDetails.postalCode || ""}
                                      <br />
                                      {order.shippingDetails.country || ""}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>

                          <div
                            className="w-full sm:w-48 h-32 sm:h-auto bg-center bg-no-repeat bg-cover rounded-lg flex-shrink-0"
                            style={{
                              backgroundImage: `url("${(order.items && order.items[0] && order.items[0].mainImageUrl) || ""}")`,
                            }}
                            title="Order product image"
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}