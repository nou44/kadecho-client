import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protect = async (req, res, next) => {
  try {
    // =================================================
    // GET TOKEN
    // =================================================

    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith("Bearer ")
    ) {
      return res.status(401).json({
        success: false,
        message: "Not authorized. No token provided.",
      });
    }

    const token = authHeader.split(" ")[1];

    // =================================================
    // VERIFY TOKEN
    // =================================================

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // =================================================
    // FIND USER
    // =================================================

    const user = await User.findById(
      decoded.userId
    ).select("-password");

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User no longer exists.",
      });
    }

    // =================================================
    // ATTACH USER TO REQUEST
    // =================================================

    req.user = user;

    next();

  } catch (error) {
    console.error(
      "❌ Auth middleware error:",
      error.message
    );

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired. Please login again.",
      });
    }

    return res.status(401).json({
      success: false,
      message: "Not authorized. Invalid token.",
    });
  }
};