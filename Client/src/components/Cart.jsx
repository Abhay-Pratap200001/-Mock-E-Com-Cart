// /Cart.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Trash2, Plus, Minus, ArrowLeft, ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "./LoadingSpinner";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Cart = () => {
  // State for cart data, total price, and loading status
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  //Fetch cart data from backend
  const fetchCart = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/cart`);
      setCart(res.data.cart);
      setTotal(res.data.total);
    } catch (error) {
      toast.error("Failed to load cart");
    } finally {
      setLoading(false);
    }
  };


  // Run once when page loads
  useEffect(() => {
    fetchCart();
  }, []);



  // Increase quantity of an item
  const increaseQty = async (item) => {
    try {
        await axios.post(`${BASE_URL}/api/cart`, {
        productId: item.productId._id,
        qty: 1,});
      fetchCart();
      toast.success("Quantity increased");
    } catch {
      toast.error("Failed to increase quantity");
    }
  };



  // Decrease quantity remove if only 1 left
  const decreaseQty = async (item) => {
    if (item.quantity === 1) return removeItem(item._id);
    try {
     await axios.post(`${BASE_URL}/api/cart`, { productId: item.productId._id, qty: -1,});
      fetchCart();
      toast.success("Quantity decreased ✅");
    } catch {
      toast.error("Failed to decrease quantity");
    }
  };




  //  Remove item from cart
  const removeItem = async (id) => {
    try {
        await axios.delete(`${BASE_URL}/api/cart/${id}`);
      fetchCart();
      toast.success("Item removed");
    } catch {
      toast.error("Failed to remove item");
    }
  };



  // Show loading screen while fetching cart
  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-green-500 font-semibold text-xl">
        <LoadingSpinner/>
      </div>
    );



  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white py-10 px-6 flex flex-col items-center">
      {/* Page Title */}
      <h1 className="text-4xl font-extrabold text-green-500 mb-8 flex items-center gap-2">
        <ShoppingCart className="w-8 h-8 text-green-400" />
        Your Cart
      </h1>

      {/* Empty Cart Message */}
      {cart.length === 0 ? (
        <div className="flex flex-col items-center text-gray-400 mt-20">
          <ShoppingCart className="w-20 h-20 text-gray-600 mb-4" />
          <p className="text-lg mb-4">Your cart is empty 😔</p>

          <button
            onClick={() => navigate("/")}
            className="bg-green-500 hover:bg-green-600 text-black font-semibold px-6 py-2 rounded-lg flex items-center gap-2 transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Shop
          </button>

        </div>
      ) : (
        // Render all cart items
        <div className="w-full max-w-4xl space-y-6">
          {cart.map((item) => (
            <div
              key={item._id}
              className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-center gap-6 shadow-md hover:shadow-green-500/30 transition duration-300">

              {/* 🖼️ Product Info */}
              <div className="flex items-center gap-4 w-full sm:w-auto">
                <img
                  src={item.productId.image}
                  alt={item.productId.name}
                  className="w-20 h-20 object-cover rounded-xl border border-zinc-800"/>
                  
                  
                <div>
                  <h2 className="font-semibold text-lg">{item.productId.name}</h2>
                  <p className="text-green-400 font-bold">
                    ₹{item.productId.price}
                  </p>
                  <p className="text-sm text-gray-400">
                    Subtotal: ₹{item.productId.price * item.quantity}
                  </p>
                </div>
              </div>

              {/*Quantity Controls*/}
              <div className="flex items-center gap-4">
                <button
                  onClick={() => decreaseQty(item)}
                  className="p-2 bg-green-600 hover:bg-green-700 rounded-full transition">
                  <Minus className="w-4 h-4" />
                </button>


                <span className="text-lg font-semibold">{item.quantity}</span>
                <button
                  onClick={() => increaseQty(item)}
                  className="p-2 bg-green-600 hover:bg-green-700 rounded-full transition">
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/*Remove Button */}
              <button
                onClick={() => removeItem(item._id)}
                className="p-2 text-red-400 hover:text-red-600 transition">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}

          {/* Summary Card */}
          <div className="bg-zinc-950 border border-zinc-800 rounded-2xl mt-8 p-6 shadow-md flex flex-col sm:flex-row justify-between items-center">
            <div className="text-center sm:text-left mb-4 sm:mb-0">
              <p className="text-lg text-gray-300">Total Amount</p>
              <p className="text-3xl font-bold text-green-400">₹{total}</p>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-xl transition shadow-lg shadow-green-500/20">
              Proceed to Checkout
            </button>
            
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
