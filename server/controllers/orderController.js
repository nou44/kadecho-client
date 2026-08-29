import Order from "../models/Order.js";

// =====================================================
// CREATE ORDER
// =====================================================

export const createOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      subtotal,
      shipping = 0,
      total,
    } = req.body;

    // ==============================
    // VALIDATION
    // ==============================

    if (
      !customer?.name ||
      !customer?.email ||
      !customer?.phone ||
      !customer?.address
    ) {
      return res.status(400).json({
        success: false,
        message: "Customer information is required.",
      });
    }

    if (!Array.isArray(items) || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Order must contain at least one product.",
      });
    }

    // ==============================
    // CREATE ORDER
    // ==============================

    const order = await Order.create({
      customer: {
        name: customer.name,
        email: customer.email,
        phone: customer.phone,
        address: customer.address,
      },

      items: items.map((item) => ({
        productId: item.productId,

        name: item.name || "",

        image: item.image || "",

        price: Number(item.price) || 0,

        quantity: Number(item.quantity) || 1,

        category: item.category || "",

        material: item.material || "",

        finish: item.finish || "",
      })),

      subtotal: Number(subtotal) || 0,

      shipping: Number(shipping) || 0,

      total: Number(total) || 0,

      status: "pending",
    });

    // ==============================
    // RESPONSE
    // ==============================

    return res.status(201).json({
      success: true,
      message: "Order created successfully.",
      order,
    });
  } catch (error) {
    console.error("❌ Create order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create order.",
      error: error.message,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedOrder = await Order.findByIdAndDelete(id);

    if (!deletedOrder) {
      return res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order deleted successfully.",
      orderId: id,
    });
  } catch (error) {
    console.error("❌ Delete order error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete order.",
      error: error.message,
    });
  }
};
// =====================================================
// GET ALL ORDERS
// =====================================================

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("❌ Get orders error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch orders.",
      error: error.message,
    });
  }
};