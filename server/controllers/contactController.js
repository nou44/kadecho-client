
import ContactMessage from "../models/Contact.js";
import mongoose from "mongoose";


// =====================================================
// CREATE CONTACT MESSAGE
// =====================================================

const createContactMessage = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      subject,
      message,
    } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, subject and message are required.",
      });
    }

    const contactMessage =
      await ContactMessage.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || "",
        subject: subject.trim(),
        message: message.trim(),
      });

    return res.status(201).json({
      success: true,
      message:
        "Your message has been sent successfully 🚀",
      contactMessage,
    });

  } catch (error) {
    console.error(
      "CREATE CONTACT MESSAGE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to send contact message.",
      error: error.message,
    });
  }
};


// =====================================================
// GET CONTACT MESSAGES
// =====================================================

const getContactMessages = async (req, res) => {
  try {
    const messages =
      await ContactMessage.find()
        .sort({
          createdAt: -1,
        });

    return res.status(200).json({
      success: true,
      messages,
    });

  } catch (error) {
    console.error(
      "GET CONTACT MESSAGES ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch contact messages.",
      error: error.message,
    });
  }
};


// =====================================================
// DELETE CONTACT MESSAGE
// =====================================================

const deleteContactMessage = async (req, res) => {
  try {
    const { id } = req.params;

    // -----------------------------------------------
    // Check ID
    // -----------------------------------------------

    if (!id) {
      return res.status(400).json({
        success: false,
        message:
          "Contact message ID is required.",
      });
    }


    // -----------------------------------------------
    // Check MongoDB ObjectId
    // -----------------------------------------------

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid contact message ID.",
      });
    }


    // -----------------------------------------------
    // Find message
    // -----------------------------------------------

    const contactMessage =
      await ContactMessage.findById(id);

    if (!contactMessage) {
      return res.status(404).json({
        success: false,
        message:
          "Contact message not found.",
      });
    }


    // -----------------------------------------------
    // Delete message
    // -----------------------------------------------

    await ContactMessage.findByIdAndDelete(id);


    // -----------------------------------------------
    // Success
    // -----------------------------------------------

    return res.status(200).json({
      success: true,
      message:
        "Contact message deleted successfully.",
      deletedId: id,
    });

  } catch (error) {
    console.error(
      "DELETE CONTACT MESSAGE ERROR:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to delete contact message.",
      error: error.message,
    });
  }
};


// =====================================================
// EXPORT CONTROLLER
// =====================================================

const contactController = {
  createContactMessage,
  getContactMessages,
  deleteContactMessage,
};

export default contactController;

