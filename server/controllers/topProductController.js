import Order from "../models/Order.js";
import Product from "../models/Product.js";

// =====================================================
// GET TOP PRODUCTS
// =====================================================

export const getTopProducts = async (req, res) => {
  try {
    const MIN_SALES = 5;

    const topProducts = await Order.aggregate([
      // =================================================
      // 1. Ignore cancelled orders
      // =================================================

      {
        $match: {
          status: {
            $ne: "cancelled",
          },
        },
      },

      // =================================================
      // 2. Split order items
      // =================================================

      {
        $unwind: "$items",
      },

      // =================================================
      // 3. Group by product
      // =================================================

      {
        $group: {
          _id: "$items.productId",

          totalSold: {
            $sum: "$items.quantity",
          },

          name: {
            $first: "$items.name",
          },

          image: {
            $first: "$items.image",
          },

          price: {
            $first: "$items.price",
          },

          category: {
            $first: "$items.category",
          },

          material: {
            $first: "$items.material",
          },

          finish: {
            $first: "$items.finish",
          },
        },
      },

      // =================================================
      // 4. Only products with 5+ sales
      // =================================================

      {
        $match: {
          totalSold: {
            $gte: MIN_SALES,
          },
        },
      },

      // =================================================
      // 5. Sort by best seller
      // =================================================

      {
        $sort: {
          totalSold: -1,
        },
      },

      // =================================================
      // 6. Get current product information
      // =================================================

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },

      // =================================================
      // 7. Convert product array to object
      // =================================================

      {
        $unwind: {
          path: "$product",
          preserveNullAndEmptyArrays: true,
        },
      },

      // =================================================
      // 8. Final response shape
      // =================================================

      {
        $project: {
          _id: 0,

          productId: "$_id",

          name: {
            $ifNull: ["$product.name", "$name"],
          },

          image: {
            $ifNull: ["$product.image", "$image"],
          },

          price: {
            $ifNull: ["$product.price", "$price"],
          },

          category: {
            $ifNull: ["$product.category", "$category"],
          },

          material: {
            $ifNull: ["$product.material", "$material"],
          },

          finish: {
            $ifNull: ["$product.finish", "$finish"],
          },

          totalSold: 1,

          isTopProduct: {
            $gte: ["$totalSold", MIN_SALES],
          },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      count: topProducts.length,
      minimumSales: MIN_SALES,
      products: topProducts,
    });
  } catch (error) {
    console.error("❌ Get top products error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch top products.",
      error: error.message,
    });
  }
};