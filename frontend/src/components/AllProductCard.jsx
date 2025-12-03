import React, {useEffect , useCallback, useState} from 'react'
import {NavLink, Navigate, useNavigate, Link} from 'react-router-dom'
import {getAllProducts} from "../api"
const colors = {
    primary: "#2563EB",
    backgroundLight: "#FFFFFF",
    backgroundDark: "#111621",
};

const isDark = false; // manual override (implement dark mode logic if needed)
function col(light, dark) {
    return isDark ? dark : light;
}
const productList = [
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuANjy5MtclUC2ikTJ3lueepmKJiuBZmre2cBShrIz8kqpWDwJ14fPlt5yMEL18kAyZBhZzs_qqj5m2Enszjkli3QfWcTXy0wFNs6w3gwSvETosMSFDWd07JsGxxssLkj1AF1-qsqXYBVBJMsjaP72APKlLug2Q1pD1G8wMk6k4UZ-6nywQP8DgEv8scRzUrD7aWnHTv-SV2kLCXRQohXPejl3T58uykODfswXUl0xyROxWi97DLmoWqezBsYy8ftzQdX_Wj1cUAhVDi",
        cat: "Accessories",
        name: "Classic Leather Watch",
        rating: [true, true, true, true, false],
        reviews: 124,
        price: "$149.99",
    },
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuDwG0C8UB-fFMppVRzVuoXJryMPmy-1fJjlAgL5SolMTNCL0NQa7GBaOXvbb8dG7fZwKsl4uaUx1IobzyOF3xzvfMp7dLFu3D2vk3nnrHbvDdjLBTimz8AaBy0yUntvVnPBE9tS8kbdzlmg-3TSKgD-WapUV8UBrK_Zf94MQXBrby-2TdQ_E4gKBetRrIzU8-REPnlJCODvGMu9QDdOGDIiBNrNORjm0tdNFIFXm0EAdMgPBrXy3iB1pollFKceaTWkC4jNSPrkPdTC",
        cat: "Electronics",
        name: "Vintage Polaroid Camera",
        rating: [true, true, true, true, true],
        reviews: 98,
        price: "$89.50",
    },     
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuC0lwFIlFFBvHSxz3n9OvtXdpG38Q5uMrpWNV-q4uWTtO07sSFhy8-xg7amG_8tzMBeLVeKnOrKb3aZYkU7JhgisqqFLUGuBKtzR8AUHBXen2AdBR1L9ZxxCWkUnJ100QWh17pVdHo9iWl9rewbO1fBb9reQjQiwiNpj-lECaTCJaFmmfaBneKg1037YbYER_Qr90P5zZMo9RloaqwFvX6RysNuzeRQHMlVT2vxGwIlmcfNSngFvi4cT0bG-SAX2rXiK6dxv5jiSSxR",
        cat: "Electronics",
        name: "Smart Fitness Watch",
        rating: [true, true, true, true, false],
        reviews: 255,
        price: "$225.00",
    },
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAcTGDQz859s2T6qDp6w8_pgI8uTShz8eSryC-kXo36HJVNfa7PENb4HwNPesYcZNsPvKxjausdcvtqEY-rxAZRHEscbPU7JBrWkqGhehxFi-xuEsU4GRjD9Owh1_lbhqKdz_q7FKy9eYfmIV40sYJzEL0Xc1iMyWALBhZqvEwUTuv5mqaqbELX9N-0HbyEbaltAwmeX1zonsTYQsJEDCWj3GiifQ4Pc7PbOEtwIUyK1fVmIEi2fW4oFQEenvnYXBKAv5tfeW_8otxU",
        cat: "Fashion",
        name: "Aviator Sunglasses",
        rating: [true, true, true, true, false],
        reviews: 76,
        price: "$75.99",
    },
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBhBCilDiazReku0dpUWyBBVQErVpqUDEjaYLmDXjmG1GtjuFtSYQRkgAgUXL1YbLyXzpjI_3wYex4QIq2CaNDwHcMmzZMkylCgE2ph6w1Otw_2OYvevRSTUwgyKJGxj_7kQ3ugGZhCTrObK-empM2nmxyPOw4f-LQqlf2LuXwm67eNjVpPEhOI5gOCldDl1l3_Eze7VmbSf-zBfL5IAK0eCElsEpJkonJNIPjEKM_IFUxJYXl4h7fS4kiAjr7vZJnw6CB0qg7XxgHs",
        cat: "Electronics",
        name: "Wireless Headphones",
        rating: [true, true, true, true, true],
        reviews: 431,
        price: "$199.00",
    },
    {
        img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBd0yQjTHalvau1eXSQRRnQzctXzUDMMfVz68oZt2Sooxz6Hd9J3kW3Dk9F2F9l4ARaeakRhuk854dPDWynRImwnIF_3JrPypaGBHjnLrf1s_QfKktluAcCozp0GGtX7jU5GA648xzMtpJWJiVwF4DYhASlu3EaCoy5cEJ2KPPeYJqqw2nYfXldgfSc2pk4IYfzHHFyfOtT27ueqkZDEjuKlANLx6HBTTC3J8X7cTLRuBlOUxqc2zORGrbgF1pYNKj_PtBVpNMexfuQ",
        cat: "Fashion",
        name: "Sport Running Shoes",
        rating: [true, true, true, true, false],
        reviews: 189,
        price: "$120.00",
    },
];
function AllProductCard() {
    const [product , setProduct] = useState([]);
  // get all product one time when page load
    const fetchProducts = useCallback( async() => {
        try {
            const response = await getAllProducts();
            console.log("Products fetched:", response);
            setProduct(response);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);


    return (
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {product.map(p => (
               
                <div
                    key={p.productTitle}
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
                        {/* <h3 className="text-sm font-medium"
                            style={{ color: col("#6B7280", "#9CA3AF") }}>{p.cat}</h3> */}
                        <p className="text-base font-semibold"
                            style={{ color: col("#111827", "#fff") }}>{p.productTitle}</p>
                        <div className="flex items-center gap-1">
                            {/* {p.rating.map((s, i) => (
                                <span key={i} className="material-symbols-outlined !text-base"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                        color: s ? "#FACC15" : col("#D1D5DB", "#6B7280") // yellow-400, gray-300/dark:gray-600
                                    }}>
                                    star
                                </span>
                            ))} */}
                            <span key={p.productTitle} className="material-symbols-outlined !text-base"
                                    style={{
                                        fontVariationSettings: "'FILL' 1",
                                         // yellow-400, gray-300/dark:gray-600
                                    }}>
                                        <p>{p.rating}</p>
                                    star
                                </span>
                            {/* <span className="text-xs ml-1"
                                style={{ color: col("#6B7280", "#9CA3AF") }}>
                                ({p.reviews})
                            </span> */}
                        </div>
                        <div className="flex flex-1 flex-col justify-end">
                            <p className="text-lg font-bold"
                                style={{ color: col("#111827", "#fff") }}>Price:{p.price}</p>
                        </div>
                    </div>
                    </Link>
                    <button
                        className="absolute bottom-4 right-4 h-10 w-10 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity transform group-hover:scale-100 scale-90 duration-200 shadow-lg hover:bg-primary/90"
                        style={{
                            background: colors.primary,
                            color: "#fff",
                        }}
                    >
                        <span className="material-symbols-outlined text-xl">add_shopping_cart</span>
                    </button>
                </div>
                
            ))}
        </div>
    )
}

export default AllProductCard