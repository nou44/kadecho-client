import Subscriber from "../models/Subscriber.js";

// =====================================================
// CREATE SUBSCRIBER
// =====================================================

export const createSubscriber = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required.",
      });
    }

    const normalizedEmail = email.trim().toLowerCase();

    const existingSubscriber = await Subscriber.findOne({
      email: normalizedEmail,
    });

    if (existingSubscriber) {
      return res.status(409).json({
        success: false,
        message: "This email is already subscribed.",
      });
    }

    const subscriber = await Subscriber.create({
      email: normalizedEmail,
    });

    return res.status(201).json({
      success: true,
      message: "Successfully subscribed.",
      subscriber,
    });
  } catch (error) {
    console.error("❌ Create subscriber error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to subscribe.",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL SUBSCRIBERS
// =====================================================

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find()
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: subscribers.length,
      subscribers,
    });
  } catch (error) {
    console.error("❌ Get subscribers error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch subscribers.",
      error: error.message,
    });
  }
};

// =====================================================
// DELETE SUBSCRIBER
// =====================================================

export const deleteSubscriber = async (req, res) => {
  try {
    const { id } = req.params;

    const subscriber =
      await Subscriber.findByIdAndDelete(id);

    if (!subscriber) {
      return res.status(404).json({
        success: false,
        message: "Subscriber not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Subscriber deleted successfully.",
      subscriberId: id,
    });
  } catch (error) {
    console.error("❌ Delete subscriber error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete subscriber.",
      error: error.message,
    });
  }
};