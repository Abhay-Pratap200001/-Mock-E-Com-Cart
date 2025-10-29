// src/pages/Product.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowRight, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";

const Product = () => {
  //state for product loading 
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  // Function to fetch all products from backend API
  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:7000/api/products");
      setProducts(res.data); 
    } catch (error) {
      toast.error("Failed to load products"); 
    } finally {
      setLoading(false); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);


  //  Function to handle adding selected product to cart
  const handleAddToCart = async (product) => {
    try {
      // Send product ID and quantity to backend
      await axios.post("http://localhost:7000/api/cart", { productId: product._id, qty: 1, // default quantity 1
      });
      toast.success(`${product.name} added to cart 🛒`); // show success message
    } catch (error) {
      console.error("Add to cart error:", error);
      toast.error("Failed to add product to cart"); // handle failure
    }
  };

  // 💫 Show loading animation while data is being fetched
  if (loading)
    return (
     <LoadingSpinner/>
    );

  return (
    <div className="min-h-screen bg-black text-white py-16 px-6 sm:px-12">
      {/* 🏪 Page Header */}
      <h1 className="text-4xl font-bold text-green-500 mb-10 text-center tracking-wide">
        🛍️ Vibe Commerce Store
      </h1>

      {/* 🧱 Product Grid Section */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 py-28">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-zinc-900 rounded-2xl shadow-lg hover:shadow-green-500/40 overflow-hidden transform hover:-translate-y-2 transition-all duration-300"
          >
            {/* 🖼️ Product Image */}
            <div className="w-full h-64 overflow-hidden">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* 🧾 Product Details */}
            <div className="p-5 flex flex-col justify-between h-40">
              <div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-green-400 font-bold mt-1">
                  ₹{product.price.toLocaleString()}
                </p>
              </div>

              {/* 🛍️ Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(product)}
                className="mt-4 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-all duration-300 active:scale-95"
              >
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 🧭 Button to Navigate to Cart Page */}
      <div className="flex justify-center mt-">
        <button
          onClick={() => navigate("/cart")}
          className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-xl transition-all duration-300 active:scale-95"
        >
          Go to Cart
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Product;
