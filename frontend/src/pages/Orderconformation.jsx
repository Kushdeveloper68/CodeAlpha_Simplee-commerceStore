import React, { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllProducts } from "../api";

const colors = {
  primary: "#2563eb",
  backgroundLight: "#f6f6f8",
  backgroundDark: "#111621",
};

const isDark = false;
const col = (light, dark) => (isDark ? dark : light);

function formatCurrency(value) {
  return (Number(value) || 0).toFixed(2);
}

export default function Orderconformation() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const order = state?.order;
  const totalsFromState = state?.totals;

  const [productsMap, setProductsMap] = useState(null);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [fetchError, setFetchError] = useState("");

  useEffect(() => {
    if (!order) {
      navigate("/", { replace: true });
    }
  }, [order, navigate]);

  // If order exists but items don't include product details, fetch products
  useEffect(() => {
    let needsFetch = false;
    if (!order) return;

    for (const it of order.items || []) {
      if (!it.productTitle || !it.price || !it.mainImageUrl) {
        needsFetch = true;
        break;
      }
    }

    if (!needsFetch) {
      // no fetch required
      return;
    }

    const loadProducts = async () => {
      try {
        setLoadingProducts(true);
        setFetchError("");
        const res = await getAllProducts();
        // res is expected { success: true, products: [...] } (or products directly)
        const products = res?.products ?? res?.data ?? res ?? [];
        const map = {};
        for (const p of products) {
          if (!p) continue;
          const id = String(p._id ?? p.id ?? p._id?.toString?.());
          map[id] = p;
        }
        setProductsMap(map);
      } catch (err) {
        console.error("Error loading products for order page:", err);
        setFetchError("Failed to load product information.");
      } finally {
        setLoadingProducts(false);
      }
    };

    loadProducts();
  }, [order]);

  // Build display items using order item fields first, fallback to fetched products map
  const displayItems = useMemo(() => {
    if (!order) return [];

    const map = productsMap || {};
    return (order.items || []).map((it) => {
      // productId may be a string or an object with _id
      const rawPid = it.productId;
      const pid = rawPid && (rawPid._id ? String(rawPid._id) : String(rawPid));

      const prod = map[pid];

      const productTitle = it.productTitle || prod?.productTitle || pid;
      const mainImageUrl = it.mainImageUrl || prod?.mainImageUrl || "";
      // price may be included, else use product price
      const unitPrice = it.price ?? prod?.price ?? 0;
      const quantity = it.quantity ?? it.cartQuantity ?? 1;
      const totalPrice = it.totalPrice ?? (unitPrice * quantity);

      return {
        productId: pid,
        productTitle,
        mainImageUrl,
        price: unitPrice,
        quantity,
        totalPrice,
      };
    });
  }, [order, productsMap]);

  // Compute totals (prefer passed totals, then order fields, then compute)
  const totals = useMemo(() => {
    if (totalsFromState) return totalsFromState;
    if (!order) return { subtotal: 0, shipping: 0, tax: 0, total: 0 };
    const subtotal = order.subtotal ?? displayItems.reduce((s, i) => s + (i.totalPrice || 0), 0);
    const shipping = order.shipping ?? 5.0 * (displayItems.length > 0 ? 1 : 0);
    const tax = order.tax ?? +(subtotal * 0.05).toFixed(2);
    const total = order.total ?? +(subtotal + shipping + tax).toFixed(2);
    return {
      subtotal: Number(subtotal),
      shipping: Number(shipping),
      tax: Number(tax),
      total: Number(total),
    };
  }, [totalsFromState, order, displayItems]);

  if (!order) return null;

  const createdAt = order.createdAt ? new Date(order.createdAt).toLocaleString() : "";

  return (
    <div
      className="relative flex h-auto min-h-screen w-full flex-col group/design-root overflow-x-hidden"
      style={{
        backgroundColor: col(colors.backgroundLight, colors.backgroundDark),
        fontFamily: "'Inter', sans-serif",
      }}
    >
      <main className="flex-grow">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-8">
            <div
              className="inline-flex justify-center items-center size-16 rounded-full mb-4"
              style={{ background: col("#bbf7d0", "#166534") }}
            >
              <span
                className="material-symbols-outlined !text-4xl"
                style={{ color: col("#16a34a", "#6ee7b7") }}
              >
                check_circle
              </span>
            </div>

            <h1
              className="text-3xl font-bold mb-2"
              style={{ color: col("#1F2937", "#E5E7EB") }}
            >
              Thank you — your order is confirmed
            </h1>

            <p className="text-sm text-muted" style={{ color: col("#6B7280", "#9CA3AF") }}>
              Order ID: <span className="font-semibold" style={{ color: col("#1F2937", "#E5E7EB") }}>{order._id}</span>
              {createdAt && <> • Placed on {createdAt}</>}
            </p>

            <p className="mt-2 text-sm" style={{ color: col("#6B7280", "#9CA3AF") }}>
              A confirmation email has been sent to your account.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Order & Shipping */}
            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-xl shadow-sm p-6 border" style={{ background: col("#fff", "#1f2937"), borderColor: col("#E5E7EB", "#22223B") }}>
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-lg font-bold" style={{ color: col("#1F2937", "#E5E7EB") }}>Order Summary</h2>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => window.print()}
                      className="text-sm px-3 py-1 rounded border"
                      style={{ color: colors.primary, borderColor: col("#E5E7EB", "#374151") }}
                    >
                      Print
                    </button>
                  </div>
                </div>

                {loadingProducts && (
                  <div className="py-4 text-center text-sm" style={{ color: col("#6B7280", "#9CA3AF") }}>
                    Loading product details...
                  </div>
                )}

                {fetchError && (
                  <div className="py-4 text-sm text-red-700 bg-red-100 rounded p-2">
                    {fetchError}
                  </div>
                )}

                <div className="space-y-3">
                  {displayItems.map((it, idx) => (
                    <div key={it.productId + "-" + idx} className={`flex items-center gap-4 py-3 ${idx > 0 ? "border-t" : ""}`} style={idx > 0 ? { borderColor: col("#E5E7EB", "#22223B") } : undefined}>
                      <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex items-center justify-center" style={{ background: "#fff" }}>
                        {it.mainImageUrl ? (
                          <img src={it.mainImageUrl} alt={it.productTitle || it.productId} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">No Image</div>
                        )}
                      </div>

                      <div className="flex-1">
                        <div className="font-medium" style={{ color: col("#1F2937", "#E5E7EB") }}>
                          {it.productTitle}
                        </div>
                        <div className="text-sm" style={{ color: col("#6B7280", "#9CA3AF") }}>
                          Qty: {it.quantity}
                        </div>
                      </div>

                      <div className="font-medium" style={{ color: col("#1F2937", "#E5E7EB") }}>
                        ${formatCurrency(it.totalPrice)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl shadow-sm p-6 border" style={{ background: col("#fff", "#1f2937"), borderColor: col("#E5E7EB", "#22223B") }}>
                <h3 className="text-lg font-bold mb-3" style={{ color: col("#1F2937", "#E5E7EB") }}>Shipping Address</h3>
                {order.shippingDetails ? (
                  <address className="not-italic text-sm leading-relaxed" style={{ color: col("#6B7280", "#9CA3AF") }}>
                    {order.shippingDetails.streetAddress}<br />
                    {order.shippingDetails.apartment && <>{order.shippingDetails.apartment}<br /></>}
                    {order.shippingDetails.city}{order.shippingDetails.stateOrProvince ? `, ${order.shippingDetails.stateOrProvince}` : ""} {order.shippingDetails.postalCode}<br />
                    {order.shippingDetails.country}
                  </address>
                ) : (
                  <p className="text-sm" style={{ color: col("#6B7280", "#9CA3AF") }}>No shipping details available.</p>
                )}
              </div>
            </div>

            {/* Right: Totals */}
            <div className="lg:col-span-1">
              <div className="rounded-xl shadow-sm p-6 border" style={{ background: col("#fff", "#1f2937"), borderColor: col("#E5E7EB", "#22223B") }}>
                <h3 className="text-lg font-bold mb-4" style={{ color: col("#1F2937", "#E5E7EB") }}>Order Totals</h3>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between" style={{ color: col("#6B7280", "#9CA3AF") }}>
                    <span>Subtotal</span>
                    <span>${formatCurrency(totals.subtotal)}</span>
                  </div>

                  <div className="flex justify-between" style={{ color: col("#6B7280", "#9CA3AF") }}>
                    <span>Shipping</span>
                    <span>${formatCurrency(totals.shipping)}</span>
                  </div>

                  <div className="flex justify-between" style={{ color: col("#6B7280", "#9CA3AF") }}>
                    <span>Tax</span>
                    <span>${formatCurrency(totals.tax)}</span>
                  </div>

                  <div className="border-t my-3" style={{ borderColor: col("#E5E7EB", "#22223B") }}></div>

                  <div className="flex justify-between text-base font-bold" style={{ color: col("#1F2937", "#E5E7EB") }}>
                    <span>Grand Total</span>
                    <span>${formatCurrency(totals.total)}</span>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button onClick={() => navigate("/orders")} className="flex-1 px-3 py-2 border rounded">
                    View Orders
                  </button>
                  <button onClick={() => navigate("/")} className="flex-1 px-3 py-2 rounded text-white" style={{ background: colors.primary }}>
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}