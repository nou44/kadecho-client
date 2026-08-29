import "dotenv/config";

import express from "express";
import cors from "cors";

import { connectDB } from "./config/db.js";

import productRoutes from "./routes/productRoutes.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import invoiceRoutes from "./routes/invoiceRoutes.js";
import topProductRoutes from "./routes/topProductRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";
import subscriberRoutes from "./routes/subscriberRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";



const app = express();

const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "KadeCho API is running 🚀",
  });
});

app.use("/api/products", productRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/invoices", invoiceRoutes);
app.use("/api/top-products", topProductRoutes);
app.use("/api/analytics", analyticsRoutes);
app.use("/api/subscribers", subscriberRoutes);
app.use("/api/settings", settingsRoutes);

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log("=================================");
      console.log("🚀 KadeCho server running");
      console.log(`📡 http://localhost:${PORT}`);
      console.log("=================================");
    });
  } catch (error) {
    console.error("❌ Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();