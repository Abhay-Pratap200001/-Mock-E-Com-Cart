import { ApiError } from "../utils/ApiError.js";


export const checkout = async (req, res) => {
  try {
    // Extract cartItems from req.body
    const { cartItems } = req.body;
   
    if (!cartItems || cartItems.length === 0) {
      throw new ApiError(400, "Cart is empty. Please add products before checkout.");
    }

    // Calculate total price of all products in the cart
    // We use Array.reduce() to loop through each item and sum  price , quantity
    const total = cartItems.reduce( (sum, item) => sum + item.productId.price * item.quantity,
      0 //default value
    );

    // Create a fake receipt o
    const receipt = {
      total, // total amount of the cart
      timestamp: new Date().toLocaleString(), // current date & time 
      message: "Mock checkout successful!", //success message
    };

    res.status(200).json(receipt);
  } catch (error) {
    throw new ApiError(500, "Server error while processing checkout.");
  }
};
