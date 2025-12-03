import React, {useEffect , useCallback, useState} from 'react'
import { useAuth } from '../context/authContext';
import { addToCartApi, useApi } from '../api';

const isDark = false;
const col = (light, dark) => (isDark ? dark : light);
const colors = {
  primary: "#2563EB",
  backgroundLight: "#FFFFFF",
  backgroundDark: "#111827",
};

function MainProductDetails({product = {}}) {
  const [matchedProduct , setMatchedProduct] = useState({})
  const [productQuantity, setProductQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { authToken } = useAuth(); // Get auth token from context
  const api = useApi()
  useEffect(() => {
    setMatchedProduct(product);
    console.log("Received product in MainProductDetails:", product);
  }, [product]);

  useEffect(() => {
    if(productQuantity > matchedProduct[0]?.quantity) {
      setProductQuantity(matchedProduct[0]?.quantity);
    }
  }, [productQuantity, matchedProduct]);
  
  useEffect(() => {
     setProductQuantity(1)
  },[matchedProduct])

  // Handle Add to Cart
  const handleAddToCart = async () => {
    // Check if user is logged in
    if (!authToken) {
      setMessage('Please login first to add items to cart');
      setTimeout(() => setMessage(''), 3000);
      return;
    }

    if (!matchedProduct[0]?._id) {
      setMessage('Product information not available');
      return;
    }

    setIsLoading(true);
    setMessage('');

    try {
      const response = await addToCartApi(matchedProduct[0]._id, productQuantity);
      
      if (response.success) {
        setMessage('Item added to cart successfully!');
        setProductQuantity(1); // Reset quantity
        setTimeout(() => setMessage(''), 3000);
      } else {
        setMessage(response.message || 'Failed to add item to cart');
        setTimeout(() => setMessage(''), 3000);
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage('Error adding to cart. Please try again.');
      setTimeout(() => setMessage(''), 3000);
    } finally {
      setIsLoading(false);
    }
  };

  return ( 
  <> 
    {/* Main Product Section */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
      {/* Left Column: Images */}
      <div className="flex flex-col gap-4">
        <div
          className="w-full bg-center bg-no-repeat aspect-square bg-cover rounded-xl"
          style={{
            backgroundImage:`url(${matchedProduct[0]?.mainImageUrl})`,
            backgroundColor: col("#F3F4F6", "#1F2937"),
          }}
        ></div>
        <div className="grid grid-cols-4 gap-4">
          {[
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCj9eD3xyd8zt39aug1l65jMYlX9xPnhOKLpMsvg5_8JbIlfb6mlq8gE8zmQpL3ml8FxPN7BStbiwBCvEMyoXA0J0r73WKdFSzYkU3ElVZi3HinjQZpzeA5WzaOEu-iwQNamZO5D2uotlrCa7BtXgNK4WlKueYTf-GOSSw671XMs41fuoJoyQtO-cFhixWQyEjRPSagqTGKz8aZzf8LqOjzEhDvc7hDdFE77QZnob_gilX5vJggcWpxnDVRw6oikhdxfdE9oTTDbDew",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuCnDfszdaTa1sGmb2N1mj_rqnPXa9LcPvnH5YgSKCWvEu6pftkttAWnNM4Iymx5NZX7LzKGr7xaelvpWJvtxjHG6su78zY8dRdovp4DNxQGd9VvOhTE6ntEnNMWB7s07CGSSR1RSpRXWHsHu-GYzP-1tmliux1a5GAxPRkyDElxM7dTnpcSvdRdXxrzgBHq0v-hZBvwpwwCakjV3G0l2H-RzlHANoTC__G425lt7HVmpp4gYiItV9TGYm6Ea6K2HVYt1fGeM4yeZNCN",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuBB-pucCVqzI1kejWbKlU2PRK4sRZC2gOySBGEooon1ZUtmhOPGYChouFORLtUOXJJyhmNPW5bLsMWVBR855G2HeuLYu6DaXvH6UEzdTj2aXDigBWYtMTb6MnshlmvD4I-XERzS1kpZZV6ume3tk-rkbRBL7o-MLyC1yrOUorAXCLQjtJwzx4Ywe6-ibA59cLmdUgey7QOQD86fkMzul5jNSseN53GwGAv1ZrJH2Z8vpBN-A07-yzMTd5-rSCQAB4y82Eg5v2hQUmn6",
            "https://lh3.googleusercontent.com/aida-public/AB6AXuDlR2S85t8pzMYEQVFSkFcgPuSv3t_ZyMAMVfwoyfQ4aJfUJjpYCbx3aQFeBIC258QyNttsniVsBtp87qOVvHqTKTv4zhkVGGy8oBnXf4TswJVUVOLy2VF5fprbDa_xqU86sJ83pZk4DMtQpJg_Q4cI8elkPjZB7cjttfM1FczKlJ_cq9PPKfK7mPI1TfRnNxaeSMfy7e9GC6DvQEku_5BBBgBM3WOwF7gLDlbgQIIH3WGimU_1pB-DYFe_bHjgk5S1Ol7LIf_svKMa",
          ].map((src, i) => (
            <div
              key={i}
              className={
                "w-full bg-center bg-no-repeat aspect-square bg-cover rounded-lg" +
                (i === 0
                  ? " ring-2 ring-primary"
                  : " opacity-70 hover:opacity-100 cursor-pointer")
              }
              style={{
                backgroundImage: `url("${src}")`,
              }}
            ></div>
          ))}
        </div>
      </div>
      {/* Right Column */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p
            className="text-3xl font-bold tracking-tight"
            style={{ color: col("#1F2937", "#fff") }}
          >
            {matchedProduct[0]?.productTitle}
          </p>
          <p
            className="text-base"
            style={{ color: col("#6B7280", "#9CA3AF") }}
          >
            {matchedProduct[0]?.shortDescription}
          </p>
        </div>
        {/* Ratings */}
        <div className="flex items-center gap-2">
          <div className="flex" style={{ color: "#F59E42" }}>
            <span
              key={matchedProduct[0]?.rating}
              className="material-symbols-outlined !text-xl"
              style={{ fontVariationSettings: "'FILL' 1", color: "#F59E42" }}
            >
              star
            </span>
            <p>{matchedProduct[0]?.rating}</p>
          </div>
          <a
            className="text-sm hover:text-primary"
            style={{ color: col("#6B7280", "#9CA3AF") }}
            href="#"
          >
            (1,284 reviews)
          </a>
        </div>
        {/* Price and Avail */}
        <div className="flex flex-col gap-2">
          <div className="flex items-baseline gap-3">
            <p
              className="text-3xl font-bold"
              style={{ color: colors.primary }}
            >
              ${matchedProduct[0]?.price}
            </p>
            <p
              className="text-xl font-normal line-through"
              style={{ color: col("#6B7280", "#9CA3AF") }}
            >
              ${matchedProduct[0]?.price + 500}
            </p>
          </div>
          <div className="flex items-center gap-2" style={{ color: col("#16A34A", "#22D3EE") }}>
            <span className="material-symbols-outlined text-base">check_circle</span>
            <p className="text-sm font-medium">In Stock</p>
          </div>
        </div>
        <div
          className="w-full border-t"
          style={{ borderColor: col("#E5E7EB", "#374151") }}
        ></div>
        {/* Message Display */}
        {message && (
          <div className={`p-3 rounded-lg text-sm font-medium ${
            message.includes('successfully') ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {message}
          </div>
        )}
        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div
            className="flex items-center rounded-lg border p-1"
            style={{ borderColor: col("#D1D5DB", "#4B5563") }}
          >
            <button
              key="remove"
              className="flex items-center justify-center size-8 rounded hover:bg-[#F3F4F6]"
              style={{ color: col("#6B7280", "#9CA3AF") }}
              onClick={() => setProductQuantity(prev => Math.max(1, prev - 1))}
            >
              <span className="material-symbols-outlined text-xl">remove</span>
            </button>

            <button
              key="add"
              className="flex items-center justify-center size-8 rounded hover:bg-[#F3F4F6]"
              style={{ color: col("#6B7280", "#9CA3AF") }}
              onClick={() => setProductQuantity(prev => prev + 1)}
            >
              <span className="material-symbols-outlined text-xl">add</span>
            </button>
            <input
              className="w-12 text-center bg-transparent border-0 focus:ring-0 font-medium"
              style={{
                color: col("#1F2937", "#fff"),
              }}
              type="text"
              value={productQuantity}
              readOnly
            />
          </div>
          <button
            className="flex w-full sm:w-auto flex-1 cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-lg h-12 px-8 text-base font-bold shadow-sm hover:bg-blue-700 dark:hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              background: colors.primary,
              color: "#fff",
            }}
            onClick={handleAddToCart}
            disabled={isLoading}
          >
            <span className="material-symbols-outlined">add_shopping_cart</span>
            <span>{isLoading ? 'Adding...' : 'Add to Cart'}</span>
          </button>
        </div>
      </div>
    </div>
    {/* Details Tabs and Description */}
    <div className="mt-16">
      <div
        className="border-b"
        style={{ borderColor: col("#E5E7EB", "#374151") }}
      >
        <nav aria-label="Tabs" className="-mb-px flex gap-6">
          <a
            className="whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium"
            style={{
              borderColor: colors.primary,
              color: colors.primary,
              borderBottomWidth: "2px",
              borderStyle: "solid",
            }}
            href="#"
          >
            Full Description
          </a>
          {["Specifications", "Reviews"].map(tab => (
            <a
              key={tab}
              className="whitespace-nowrap border-b-2 px-1 pb-4 text-sm font-medium hover:border-gray-300"
              style={{
                borderColor: "transparent",
                color: col("#6B7280", "#9CA3AF"),
              }}
              href="#"
            >
              {tab}
            </a>
          ))}
        </nav>
      </div>
      <div
        className="py-8 space-y-4 text-base leading-relaxed"
        style={{
          color: col("#6B7280", "#9CA3AF"),
        }}
      >
        <p>{matchedProduct[0]?.longDescription}</p>
      </div>
    </div>
    </>
  )
}

export default MainProductDetails