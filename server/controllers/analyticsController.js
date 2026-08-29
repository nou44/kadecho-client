
import Order from "../models/Order.js";

export const getAnalytics = async (req, res) => {
  try {
    // =====================================================
    // BASIC ANALYTICS
    // =====================================================

    const orders = await Order.find().lean();

    const validOrders = orders.filter(
      (order) => order.status !== "cancelled"
    );

    const totalOrders = validOrders.length;

    const totalRevenue = validOrders.reduce(
      (sum, order) => sum + Number(order.total || 0),
      0
    );

    const pendingOrders = orders.filter(
      (order) => order.status === "pending"
    ).length;

    const confirmedOrders = orders.filter(
      (order) => order.status === "confirmed"
    ).length;

    const processingOrders = orders.filter(
      (order) => order.status === "processing"
    ).length;

    const shippedOrders = orders.filter(
      (order) => order.status === "shipped"
    ).length;

    const deliveredOrders = orders.filter(
      (order) => order.status === "delivered"
    ).length;

    const cancelledOrders = orders.filter(
      (order) => order.status === "cancelled"
    ).length;

    // =====================================================
    // REVENUE + ORDERS BY DAY
    // =====================================================

    const dailyStats = {};

    validOrders.forEach((order) => {
      const date = new Date(order.createdAt)
        .toISOString()
        .split("T")[0];

      if (!dailyStats[date]) {
        dailyStats[date] = {
          date,
          orders: 0,
          revenue: 0,
        };
      }

      dailyStats[date].orders += 1;
      dailyStats[date].revenue += Number(
        order.total || 0
      );
    });

    const chart = Object.values(dailyStats).sort(
      (a, b) =>
        new Date(a.date) - new Date(b.date)
    );

    // =====================================================
    // TOP PRODUCTS
    // =====================================================

    const productStats = {};

    validOrders.forEach((order) => {
      order.items.forEach((item) => {
        const productId = String(item.productId);

        if (!productStats[productId]) {
          productStats[productId] = {
            productId,
            name: item.name,
            image: item.image || "",
            category: item.category || "",
            material: item.material || "",
            finish: item.finish || "",
            totalSold: 0,
            revenue: 0,
          };
        }

        productStats[productId].totalSold +=
          Number(item.quantity || 0);

        productStats[productId].revenue +=
          Number(item.price || 0) *
          Number(item.quantity || 0);
      });
    });

    const topProducts = Object.values(
      productStats
    )
      .sort(
        (a, b) =>
          b.totalSold - a.totalSold
      )
      .slice(0, 10);

    // =====================================================
    // RESPONSE
    // =====================================================

    return res.status(200).json({
      success: true,

      overview: {
        totalOrders,
        totalRevenue,

        pendingOrders,
        confirmedOrders,
        processingOrders,
        shippedOrders,
        deliveredOrders,
        cancelledOrders,
      },

      chart,

      topProducts,
    });
  } catch (error) {
    console.error(
      "❌ Analytics error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to fetch analytics.",
      error: error.message,
    });
  }
};

