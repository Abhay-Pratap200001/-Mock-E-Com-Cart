import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './utils/DbConnection.js';
import productRoutes from './routes/product.Routes.js'
import cartRoutes from './routes/cart.Routes.js'
import checkoutRoutes from './routes/checkout.Routes.js'
import { errorHandler } from './Middleware/error.Middleware.js';
import cors from 'cors'
import path from 'path'

dotenv.config();
const app = express()
const PORT = process.env.PORT || 2000
app.use(express.json())

const _dirname = path.resolve();

app.use(
  cors({origin: "https://mock-e-com-cart-client.onrender.com",}) // your Vite frontend
);


app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);

if (process.env.NODE_ENV === "PRODUCTION") {
  app.use(express.static(path.join(__dirname, "/Client/dist")))

  app.get('*', (req, res)=>{
    res.send(path.resolve(__dirname, "Client", "dist", "index.html"))
  })
}


app.get("/", (_, res) => {
  res.send("Mock E-Com Cart Backend is running ✅");
});

app.use(errorHandler);


connectDB().then(() => {
    const server = app.listen(PORT, () => {
      console.log(`✅ Server running at http://localhost:${PORT}`);
    });

    // server error handling
    server.on("error", (error) => {
      console.error("❌ Server Error:", error);
      process.exit(1); // Exit the app if server fails
    });
  })
  .catch((error) => {
    console.error("❌ MongoDB Connection Failed:", error);
    process.exit(1); // Exit app if DB connection fails
  });
