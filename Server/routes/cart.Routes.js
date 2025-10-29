import express from "express";
import { addToCart, deleteCartItem, getCart } from "../controllers/cart.Controller.js";

const router = express.Router();
router.post("/", addToCart);
router.get("/", getCart);
router.delete("/:id", deleteCartItem);

export default router;
