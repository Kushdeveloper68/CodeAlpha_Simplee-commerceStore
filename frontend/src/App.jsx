import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { 
    Home,
    Cart,
    Checkout,
    Login,
    Signup,
    Orderconformation,
    Orders,
    Productdetails,
    Productlisting} from "./pages/"
function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/orderconformation" element={<Orderconformation />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="/productdetails" element={<Productdetails />} />
      <Route path="/productlisting" element={<Productlisting />} />
      </Routes>
    </BrowserRouter>

  )
}

export default App