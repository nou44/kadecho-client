import "dotenv/config";
import mongoose from "mongoose";

import { connectDB } from "../config/db.js";
import User from "../models/User.js";

const createAdmin = async () => {
  try {
    await connectDB();

    console.log("🔐 Creating admin...");

    const email = "admin@gmail.com";
    const password = "123456";

    const existingAdmin = await User.findOne({ email });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      console.log(`📧 Email: ${existingAdmin.email}`);
      console.log(`👤 Role: ${existingAdmin.role}`);

      await mongoose.connection.close();
      process.exit(0);
    }

    const admin = await User.create({
      name: "Admin",
      email,
      password,
      role: "admin",
    });

    console.log("=================================");
    console.log("✅ Admin created successfully");
    console.log(`📧 Email: ${admin.email}`);
    console.log(`👤 Role: ${admin.role}`);
    console.log("=================================");

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("❌ Failed to create admin:");
    console.error(error.message);

    await mongoose.connection.close();
    process.exit(1);
  }
};

createAdmin();