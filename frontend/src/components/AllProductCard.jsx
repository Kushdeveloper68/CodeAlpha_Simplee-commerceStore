// ...existing code...
import React, { useEffect, useCallback, useState } from 'react'
import { NavLink, Navigate, useNavigate, Link } from 'react-router-dom'
import { getAllProducts, addToCartApi, useApi } from "../api"
import { useAuth } from '../context/authContext'

const colors = {
    primary: "#2563EB",
    backgroundLight: "#FFFFFF",
    backgroundDark: "#111621",
};

const isDark = false; // manual override (implement dark mode logic if needed)
function col(light, dark) {
    return isDark ? dark : light;
}

function AllProductCard() {
    const [product , setProduct] = useState([]);
    const [loadingId, setLoadingId] = useState(null);
    const [messages, setMessages] = useState({});
    const { authToken } = useAuth();
    const api = useApi();

    // get all product one time when page load
    const fetchProducts = useCallback( async() => {
        try {
            const response = await getAllProducts();
            // response shape may vary: response.products or response.data
            const products = response?.products ?? response?.data ?? response ?? [];
            setProduct(products);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    const handleAddToCart = async (productId) => {
        if (!authToken) {
            setMessages(prev => ({ ...prev, [productId]: 'Please login to add to cart' }));
            setTimeout(() => setMessages(prev => ({ ...prev, [productId]: '' })), 3000);
            return;
        }

        setLoadingId(productId);
        setMessages(prev => ({ ...prev, [productId]: '' }));

        try {
            const res = await addToCartApi(productId, 1); // add qty 1
            if (res?.success) {
                setMessages(prev => ({ ...prev, [productId]: 'Added to cart' }));
                setTimeout(() => setMessages(prev => ({ ...prev, [productId]: '' })), 2000);
            } else {
                setMessages(prev => ({ ...prev, [productId]: res?.message || 'Failed to add to cart' }));
                setTimeout(() => setMessages(prev => ({ ...prev, [productId]: '' })), 3000);
            }
        } catch (err) {
            console.error('Add to cart error:', err);
            setMessages(prev => ({ ...prev, [productId]: 'Error adding to cart' }));
            setTimeout(() => setMessages(prev => ({ ...prev, [productId]: '' })), 3000);
        } finally {
            setLoadingId(null);
        }
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {product.map(p => (
                <div
                    key={p._id}
                    className="group relative flex flex-col overflow-hidden rounded-lg border shadow-sm transition-all hover:shadow-lg"
                    style={{
                        borderColor: col("#E5E7EB", "#374151"),
                        background: col("#F9FAFB", "rgba(31,22,33,0.5)"),
                    }}
                >
                    <Link to={`/productdetails/${p._id}`} key={p._id}>
                        <div
                            className="aspect-square bg-white overflow-hidden"
                            style={{ background: col("#fff", "#1F2937") }}
                        >
                            <img
                                className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                                alt={p.productTitle}
                                src={p.mainImageUrl}
                            />
                        </div>
                        <div className="flex flex-1 flex-col space-y-2 p-4">
                            <p className="text-base font-semibold"
                                style={{ color: col("#111827", "#fff") }}>{p.productTitle}</p>
                            <div className="flex items-center gap-1">
                                <span className="material-symbols-outlined !text-base"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                        color: "#FACC15"
                                    }}>
                                    star
                                </span>
                                <span className="text-sm" style={{ color: col("#6B7280", "#9CA3AF") }}>{p.rating ?? ''}</span>
                            </div>
                            <div className="flex flex-1 flex-col justify-end">
                                <p className="text-lg font-bold"
                                    style={{ color: col("#111827", "#fff") }}>Price: ${p.price}</p>
                            </div>
                        </div>
                    </Link>

                    {/* Message box */}
                    {messages[p._id] && (
                        <div className={`absolute left-4 top-4 p-2 rounded text-xs font-medium ${
                            messages[p._id].toLowerCase().includes('added') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                            {messages[p._id]}
                        </div>
                    )}

                    <button
                        onClick={() => handleAddToCart(p._id)}
                        className="absolute bottom-4 right-4 h-10 w-10 flex items-center justify-center rounded-full transition-opacity transform duration-200 shadow-lg"
                        style={{
                            background: loadingId === p._id ? "rgba(37,99,235,0.6)" : colors.primary,
                            color: "#fff",
                            opacity: 1
                        }}
                        disabled={loadingId === p._id}
                        title="Add to cart"
                    >
                        <span className="material-symbols-outlined text-xl">
                            {loadingId === p._id ? 'schedule' : 'add_shopping_cart'}
                        </span>
                    </button>
                </div>
            ))}
        </div>
    )
}

export default AllProductCard
// ...existing code...