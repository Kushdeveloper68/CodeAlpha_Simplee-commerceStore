// ...existing code...
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
import Layout from "./Layout"
import { AuthProvider } from './context/authContext'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/orderconformation" element={<Orderconformation />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/productdetails/:id" element={<Productdetails />} />
            <Route path="/productlisting" element={<Productlisting />} />
          </Routes>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
// ...existing code...