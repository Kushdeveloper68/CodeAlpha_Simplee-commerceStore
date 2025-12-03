import React, {useEffect , useCallback, useState} from 'react'
import { TrendingProducts, MainProductDetails } from "../components";
import { useParams } from "react-router-dom";
import {NavLink, Navigate, useNavigate, Link} from 'react-router-dom'
import {getAllProducts} from "../api"
const colors = {
  primary: "#2563EB",
  backgroundLight: "#FFFFFF",
  backgroundDark: "#111827",
};

const isDark = false; // Set this if you add dark mode logic
const col = (light, dark) => (isDark ? dark : light);

export default function Productdetails() {
  const { id } = useParams();
  const [matchedProduct, SetMatchedProduct] = useState([]);
    // get all product one time when page load
      const fetchProducts = useCallback( async() => {
          try {
              const response = await getAllProducts();
              const matched = response.products.filter(p => p._id === id);
              SetMatchedProduct(matched);
              console.log("matched",matched)
          } catch (error) {
              console.error("Error fetching products:", error);
          }
      }, [id]);
  
      useEffect(() => {
          fetchProducts();
      }, [fetchProducts, id]);

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
     

      {/* Main */}
      <main className="layout-container flex h-full grow flex-col">
        <div className="container mx-auto px-4 flex flex-1 justify-center py-8">
          <div className="layout-content-container flex flex-col w-full max-w-6xl flex-1">
           <MainProductDetails product={matchedProduct}/>
            
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
