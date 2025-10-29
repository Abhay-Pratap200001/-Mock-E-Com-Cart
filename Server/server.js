import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './utils/DbConnection.js';

dotenv.config();

const app = express()
const PORT = process.env.PORT || 2000
app.use(express.json())


//error middle ware
// app.use(errorHandler);



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
