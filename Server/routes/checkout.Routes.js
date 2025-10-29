import express from "express";
import { checkout } from "../controllers/checkout.Controller.js";

const router = express.Router();
router.post("/", checkout);

export default router;
