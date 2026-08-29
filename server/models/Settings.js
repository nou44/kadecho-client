import mongoose from "mongoose";

const settingsSchema = new mongoose.Schema(
  {
    siteName: {
      type: String,
      default: "KadeCho",
      trim: true,
    },

    siteDescription: {
      type: String,
      default: "",
      trim: true,
    },

    email: {
      type: String,
      default: "",
      trim: true,
    },

    phone: {
      type: String,
      default: "",
      trim: true,
    },

    whatsapp: {
      type: String,
      default: "",
      trim: true,
    },

    address: {
      type: String,
      default: "",
      trim: true,
    },

    currency: {
      type: String,
      default: "MAD",
      trim: true,
    },

    shippingFee: {
      type: Number,
      default: 0,
      min: 0,
    },

    freeShipping: {
      type: Boolean,
      default: false,
    },

    instagram: {
      type: String,
      default: "",
      trim: true,
    },

    facebook: {
      type: String,
      default: "",
      trim: true,
    },

    tiktok: {
      type: String,
      default: "",
      trim: true,
    },

    emailNotifications: {
      type: Boolean,
      default: true,
    },

    orderNotifications: {
      type: Boolean,
      default: true,
    },

    contactNotifications: {
      type: Boolean,
      default: true,
    },

    subscriberNotifications: {
      type: Boolean,
      default: true,
    },

    darkMode: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Settings = mongoose.model("Settings", settingsSchema);

export default Settings;