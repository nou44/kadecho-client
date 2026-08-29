import Settings from "../models/Settings.js";

/* =========================================================
   GET SETTINGS
========================================================= */

export const getSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Create default settings if none exist
    if (!settings) {
      settings = await Settings.create({});
    }

    return res.status(200).json({
      success: true,
      settings,
    });
  } catch (error) {
    console.error(
      "❌ Get settings error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to get settings",
      error: error.message,
    });
  }
};


/* =========================================================
   UPDATE SETTINGS
========================================================= */

export const updateSettings = async (req, res) => {
  try {
    let settings = await Settings.findOne();

    // Create settings document if it doesn't exist
    if (!settings) {
      settings = await Settings.create(req.body);
    } else {
      const {
        siteName,
        siteDescription,
        email,
        phone,
        whatsapp,
        address,

        currency,
        shippingFee,
        freeShipping,

        instagram,
        facebook,
        tiktok,

        emailNotifications,
        orderNotifications,
        contactNotifications,
        subscriberNotifications,

        darkMode,
      } = req.body;

      /* =====================================================
         GENERAL
      ===================================================== */

      settings.siteName =
        siteName ?? settings.siteName;

      settings.siteDescription =
        siteDescription ?? settings.siteDescription;

      settings.email =
        email ?? settings.email;

      settings.phone =
        phone ?? settings.phone;

      settings.whatsapp =
        whatsapp ?? settings.whatsapp;

      settings.address =
        address ?? settings.address;


      /* =====================================================
         STORE
      ===================================================== */

      settings.currency =
        currency ?? settings.currency;

      if (shippingFee !== undefined) {
        settings.shippingFee =
          Number(shippingFee);
      }

      if (freeShipping !== undefined) {
        settings.freeShipping =
          freeShipping === true ||
          freeShipping === "true";
      }


      /* =====================================================
         SOCIAL
      ===================================================== */

      settings.instagram =
        instagram ?? settings.instagram;

      settings.facebook =
        facebook ?? settings.facebook;

      settings.tiktok =
        tiktok ?? settings.tiktok;


      /* =====================================================
         NOTIFICATIONS
      ===================================================== */

      if (emailNotifications !== undefined) {
        settings.emailNotifications =
          emailNotifications === true ||
          emailNotifications === "true";
      }

      if (orderNotifications !== undefined) {
        settings.orderNotifications =
          orderNotifications === true ||
          orderNotifications === "true";
      }

      if (contactNotifications !== undefined) {
        settings.contactNotifications =
          contactNotifications === true ||
          contactNotifications === "true";
      }

      if (subscriberNotifications !== undefined) {
        settings.subscriberNotifications =
          subscriberNotifications === true ||
          subscriberNotifications === "true";
      }


      /* =====================================================
         APPEARANCE
      ===================================================== */

      if (darkMode !== undefined) {
        settings.darkMode =
          darkMode === true ||
          darkMode === "true";
      }

      await settings.save();
    }

    return res.status(200).json({
      success: true,
      message: "Settings updated successfully 🚀",
      settings,
    });

  } catch (error) {
    console.error(
      "❌ Update settings error:",
      error
    );

    return res.status(500).json({
      success: false,
      message: "Failed to update settings",
      error: error.message,
    });
  }
};