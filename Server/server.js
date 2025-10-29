import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./utils/DbConnection.js";
import productRoutes from "./routes/product.Routes.js";
import cartRoutes from "./routes/cart.Routes.js";
import checkoutRoutes from "./routes/checkout.Routes.js";
import { errorHandler } from "./Middleware/error.Middleware.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 2000;

// Fix __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct CORS for your deployed frontend
app.use(
  cors({
    origin: ["https://mock-e-com-cart-1-mco1.onrender.com"], // your Render frontend
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.json());

// ✅ Routes
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

// ✅ Serve frontend in production
if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "Client", "dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.resolve(__dirname, "Client", "dist", "index.html"));
  });
}

// ✅ Root route for testing
app.get("/", (_, res) => {
  res.send("Mock E-Com Cart Backend is running ✅");
});

// ✅ Error middleware
app.use(errorHandler);

// ✅ Connect to MongoDB & Start Server
connectDB()
  .then(() => {
    const server = app.listen(PORT, () =>
      console.log(`✅ Server running on port ${PORT}`)
    );
    server.on("error", (err) => {
      console.error("❌ Server Error:", err);
      process.exit(1);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err);
    process.exit(1);
  });
