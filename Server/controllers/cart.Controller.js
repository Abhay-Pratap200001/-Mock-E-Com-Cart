import { Cart } from "../models/cart.Model.js";
import { Product } from "../models/product.Model.js";
import { ApiError } from "../utils/ApiError.js";

// ADD TO CART
export const addToCart = async (req, res) => {
  try {
    const { productId, qty } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      throw new ApiError(400, "Product not found");
    }

    // Step 2: Check if the same product exixt send buy user if yes increment or add new product into card
    let item = await Cart.findOne({ productId });

    if (item) {
      item.quantity += qty || 1;
      await item.save(); // save updated quantity
    } else {
      item = new Cart({ productId, quantity: qty || 1 });
      await item.save();
    }
    res.status(201).json({ message: "Item added to cart", item });
  } catch (error) {
    throw new ApiError(500, "Server error while adding product into cart");
  }
};





//  GET ALL CART ITEMS
export const getCart = async (req, res) => {
  try {
    // Fetch all cart items and populate product details , so we get product name, price,
    const cart = await Cart.find().populate("productId");

    //  //filter out card if they no longer exixt
    const validCart = cart.filter((item) => item.productId);

    //  Calculate total cart value safely
    const total = validCart.reduce(
      (sum, item) => sum + (item.productId.price || 0) * (item.quantity || 1),
      0 // default value
    );
    return res.status(200).json({cart: validCart, total,});
  } catch (error) {
    return res.status(500).json({
      message: "Server error while getting cart",
      error: error.message,
    });
  }
};





//  DELETE CART ITEM
export const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    await Cart.findByIdAndDelete(id);
    res.json({ message: "Item removed successfully" });
  } catch (error) {
    throw new ApiError(500, "Server error while deleting cart");
  }
};
