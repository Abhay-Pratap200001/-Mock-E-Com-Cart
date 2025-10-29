//Checkout.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
const BASE_URL = import.meta.env.VITE_API_BASE_URL; 


const Checkout = () => {
  //  State for cart form data total amount and mock receipt
  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({ name: "", email: "", address: "" });
  const [receipt, setReceipt] = useState(null);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  // Fetch cart data
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/cart`);
        setCartItems(res.data.cart);
        setTotal(res.data.total);
      } catch {
        toast.error("Failed to load cart data");
      }
    };
    fetchCart();
  }, []);

  //  Update form fields on input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  //Handle checkout submission form
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.address) {
      toast.error("Please fill all the details");
      return;
    }

    try {
      const res = await axios.post(`${BASE_URL}/api/checkout`, {cartItems,});
      setReceipt(res.data); // show success screen
      toast.success("Checkout successful");
    } catch {
      toast.error("Checkout failed");
    }
  };


  //  Success screen output
  if (receipt) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 flex flex-col items-center justify-center text-center text-white p-6">
        <CheckCircle2 className="w-16 h-16 text-green-400 mb-4" />
        <h2 className="text-3xl font-bold text-green-400 mb-2">
          Payment Successful 🎉
        </h2>
        <p className="text-gray-300 mb-1">Total Paid: ₹{receipt.total}</p>
        <p className="text-gray-400 mb-2">Time: {receipt.timestamp}</p>
        <p className="text-green-400 mt-2">{receipt.message}</p>

        <button
          onClick={() => navigate("/")}
          className="mt-8 bg-green-500 hover:bg-green-600 text-black font-semibold px-8 py-3 rounded-lg transition shadow-lg shadow-green-500/30">
          Back to Store
        </button>
      </div>
    );
  }


  //  Checkout Form + Cart Summary
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-zinc-900 text-white p-8 flex flex-col items-center">
      <h1 className="text-4xl font-extrabold text-green-500 mb-10">
         Checkout
      </h1>

      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-10">
        {/*Billing Form */}
        <form
          onSubmit={handleCheckout}
          className="bg-zinc-900/70 border border-zinc-800 rounded-2xl shadow-lg p-8 backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-6 text-green-400">
            Billing Details
          </h2>

          <div className="mb-5">
            <label className="block text-sm mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Enter your name"/>
          </div>

          <div className="mb-5">
            <label className="block text-sm mb-2">Email</label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Enter your email"/>
          </div>

          <div className="mb-8">
            <label className="block text-sm mb-2">Address</label>
            <textarea
              name="address"
              onChange={handleChange}
              rows="3"
              className="w-full p-3 rounded-lg bg-zinc-800 text-white focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              placeholder="Enter your shipping address"></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-black font-semibold py-3 rounded-lg transition shadow-md shadow-green-500/30">
            Confirm & Pay ₹{total}
          </button>

          <button
            type="button"
            onClick={() => navigate("/cart")}
            className="mt-5 flex items-center justify-center gap-2 text-green-400 hover:text-green-600 mx-auto transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Cart
          </button>
        </form>


        {/* Order Summary */}
        <div className="bg-zinc-900/70 border border-zinc-800 rounded-2xl p-8 shadow-lg backdrop-blur-md">
          <h2 className="text-2xl font-semibold mb-6 text-green-400">
            Order Summary
          </h2>

          {/* Cart Items */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {cartItems.map((item) => (
              <div
                key={item._id}
                className="flex justify-between items-center bg-zinc-950 p-3 rounded-xl border border-zinc-800">

                <div className="flex items-center gap-4">
                  <img
                    src={item.productId.image}
                    alt={item.productId.name}
                    className="w-14 h-14 rounded-lg object-cover"/>
                  <div>

                    <p className="font-medium">{item.productId.name}</p>
                    <p className="text-sm text-gray-400">
                      ₹{item.productId.price} × {item.quantity}
                    </p>
                  </div>
                </div>
                
                <p className="text-green-400 font-semibold">
                  ₹{item.productId.price * item.quantity}
                </p>
              </div>
            ))}
          </div>

          {/* Total Summary */}
          <div className="border-t border-zinc-800 mt-6 pt-4 flex justify-between text-lg font-semibold">
            <p>Total</p>
            <p className="text-green-400">₹{total}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
