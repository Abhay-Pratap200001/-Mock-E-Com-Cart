// src/App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Product from "./components/Product";
import Cart from "./components/Cart"; // 👈 Make sure Cart.jsx is placed under /src/pages/
import { Toaster } from "react-hot-toast";
import Checkout from "./components/Checkout";

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white">
      <Routes>
        <Route path="/" element={<Product />} /> 
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>
      <Toaster position="top-right" />
    </div>
  );
};

export default App;
