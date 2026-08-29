import { useAuth } from "../../context/AuthContext";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Store,
  Truck,
  MessageCircle,
  Bell,
  Palette,
  User,
  ShieldCheck,
  Save,
  RotateCcw,
  Check,
  Eye,
  EyeOff,
  MapPin,
  Phone,
  Mail,
  DollarSign,
  Lock,
  Smartphone,
  PackageCheck,
  AlertTriangle,
  LogOut,
  ChevronRight,
} from "lucide-react";

const API_URL = "http://localhost:5000/api/settings";

const defaultSettings = {
  store: {
    name: "KADECHO",
    email: "",
    phone: "",
    city: "Tangier",
    address: "",
    currency: "MAD",
    description: "",
  },

  delivery: {
    deliveryFee: "0",
    freeDeliveryFrom: "0",
    minimumOrder: "0",
    availableCities: "Tangier, Casablanca, Rabat",
    processingTime: "1-3 days",
    enableDelivery: true,
  },

  whatsapp: {
    enabled: true,
    number: "",
    message: "Salam 👋 Bghit n3ref aktar 3la had product.",
    position: "bottom-right",
    showOnMobile: true,
    showOnDesktop: true,
  },

  notifications: {
    newOrders: true,
    newMessages: true,
    newSubscribers: true,
    lowStock: true,
    orderUpdates: true,
  },

  appearance: {
    darkMode: true,
    accentColor: "red",
    announcementEnabled: true,
    announcementText: "FREE DELIVERY ON SELECTED ORDERS",
  },

  account: {
    name: "Admin",
    email: "",
  },

  security: {
    twoFactor: false,
    loginNotifications: true,
  },
};

const sections = [
  {
    id: "store",
    label: "Store",
    description: "Business information",
    icon: Store,
  },
  {
    id: "delivery",
    label: "Delivery",
    description: "Shipping & orders",
    icon: Truck,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    description: "Customer contact",
    icon: MessageCircle,
  },
  {
    id: "notifications",
    label: "Notifications",
    description: "Alerts & updates",
    icon: Bell,
  },
  {
    id: "appearance",
    label: "Appearance",
    description: "Website experience",
    icon: Palette,
  },
  {
    id: "account",
    label: "Account",
    description: "Admin profile",
    icon: User,
  },
  {
    id: "security",
    label: "Security",
    description: "Access & protection",
    icon: ShieldCheck,
  },
];

/* =========================================================
   SECTION TITLE
========================================================= */

function SectionTitle({ icon: Icon, title, description }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <div
        className="
          relative flex h-9 w-9 shrink-0 items-center justify-center
          rounded-lg border border-red-500/15
          bg-red-500/[0.055] text-red-400
          shadow-[0_0_22px_rgba(239,68,68,.06)]
        "
      >
        <Icon size={16} />

        <span
          className="
            absolute -right-0.5 -top-0.5
            h-1.5 w-1.5 rounded-full
            bg-red-500
            shadow-[0_0_8px_rgba(239,68,68,.8)]
          "
        />
      </div>

      <div className="min-w-0">
        <h2
          className="
            font-bebas text-[21px] uppercase
            leading-none tracking-[0.10em] text-white
          "
        >
          {title}
        </h2>

        <p className="mt-1 text-[10px] leading-4 text-zinc-600">
          {description}
        </p>
      </div>
    </div>
  );
}

/* =========================================================
   INPUT
========================================================= */

function InputField({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  icon: Icon,
}) {
  return (
    <label className="block min-w-0">
      <span
        className="
          mb-1.5 block text-[9px] font-semibold
          uppercase tracking-[0.14em] text-zinc-600
        "
      >
        {label}
      </span>

      <div className="relative">
        {Icon && (
          <Icon
            size={13}
            className="
              pointer-events-none absolute left-3
              top-1/2 -translate-y-1/2
              text-zinc-700 transition-colors
            "
          />
        )}

        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            h-10 w-full rounded-lg border
            border-white/[0.065]
            bg-[#0b0b0b]
            ${Icon ? "pl-9" : "pl-3.5"}
            pr-3.5
            text-[12px] text-zinc-200
            outline-none
            transition-all duration-200
            placeholder:text-zinc-800
            hover:border-white/[0.10]
            focus:border-red-500/30
            focus:bg-red-500/[0.018]
            focus:ring-1 focus:ring-red-500/[0.08]
          `}
        />
      </div>
    </label>
  );
}

/* =========================================================
   TEXTAREA
========================================================= */

function TextareaField({
  label,
  value,
  onChange,
  placeholder,
}) {
  return (
    <label className="block">
      <span
        className="
          mb-1.5 block text-[9px] font-semibold
          uppercase tracking-[0.14em] text-zinc-600
        "
      >
        {label}
      </span>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={3}
        className="
          min-h-[82px] w-full resize-none rounded-lg
          border border-white/[0.065]
          bg-[#0b0b0b]
          px-3.5 py-2.5
          text-[12px] leading-5 text-zinc-200
          outline-none transition-all duration-200
          placeholder:text-zinc-800
          hover:border-white/[0.10]
          focus:border-red-500/30
          focus:bg-red-500/[0.018]
          focus:ring-1 focus:ring-red-500/[0.08]
        "
      />
    </label>
  );
}

/* =========================================================
   SELECT
========================================================= */

function SelectField({
  label,
  value,
  onChange,
  options,
}) {
  return (
    <label className="block min-w-0">
      <span
        className="
          mb-1.5 block text-[9px] font-semibold
          uppercase tracking-[0.14em] text-zinc-600
        "
      >
        {label}
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          h-10 w-full rounded-lg
          border border-white/[0.065]
          bg-[#0b0b0b]
          px-3.5
          text-[12px] text-zinc-200
          outline-none transition-all duration-200
          focus:border-red-500/30
          focus:ring-1 focus:ring-red-500/[0.08]
        "
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

/* =========================================================
   TOGGLE
========================================================= */

function Toggle({
  enabled,
  onChange,
  label,
  description,
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className="
        group flex w-full items-center justify-between
        gap-3 rounded-lg border
        border-white/[0.055]
        bg-white/[0.012]
        px-3.5 py-3
        text-left transition-all duration-200
        hover:border-white/[0.09]
        hover:bg-white/[0.018]
      "
    >
      <div className="min-w-0">
        <p className="text-[12px] font-medium text-zinc-300">
          {label}
        </p>

        {description && (
          <p className="mt-0.5 truncate text-[9px] leading-4 text-zinc-700">
            {description}
          </p>
        )}
      </div>

      <span
        className={`
          relative h-5 w-9 shrink-0 rounded-full
          transition-colors duration-200
          ${enabled ? "bg-red-600" : "bg-zinc-800"}
        `}
      >
        <span
          className={`
            absolute top-0.5 h-4 w-4 rounded-full
            bg-white shadow-sm
            transition-transform duration-200
            ${enabled ? "translate-x-[18px]" : "translate-x-0.5"}
          `}
        />
      </span>
    </button>
  );
}

/* =========================================================
   SETTINGS
========================================================= */

export default function Settings() {
  const { token } = useAuth();

  const [settings, setSettings] = useState(defaultSettings);
  const [activeSection, setActiveSection] = useState("store");

  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [passwords, setPasswords] = useState({
    current: "",
    newPassword: "",
    confirm: "",
  });

  /* =========================================================
     LOAD SETTINGS
  ========================================================= */

  useEffect(() => {
    const loadSettings = async () => {
      try {
        setLoading(true);
        setError("");

        if (!token) {
          throw new Error(
            "Authentication token not found. Please login again."
          );
        }

        const response = await fetch(API_URL, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Failed to load settings."
          );
        }

        const data = result.settings || {};

        setSettings((prev) => ({
          ...prev,

          store: {
            ...prev.store,
            name: data.siteName ?? prev.store.name,
            email: data.email ?? prev.store.email,
            phone: data.phone ?? prev.store.phone,
            address: data.address ?? prev.store.address,
            currency: data.currency ?? prev.store.currency,
            description:
              data.siteDescription ?? prev.store.description,
          },

          delivery: {
            ...prev.delivery,
            deliveryFee: String(
              data.shippingFee ?? prev.delivery.deliveryFee
            ),
          },

          whatsapp: {
            ...prev.whatsapp,
            number: data.whatsapp ?? prev.whatsapp.number,
          },

          notifications: {
            ...prev.notifications,
            newOrders:
              data.orderNotifications ??
              prev.notifications.newOrders,

            newMessages:
              data.contactNotifications ??
              prev.notifications.newMessages,

            newSubscribers:
              data.subscriberNotifications ??
              prev.notifications.newSubscribers,
          },

          appearance: {
            ...prev.appearance,
            darkMode:
              data.darkMode ?? prev.appearance.darkMode,
          },
        }));
      } catch (err) {
        console.error(
          "❌ Failed to load dashboard settings:",
          err
        );

        setError(
          err.message ||
            "Something went wrong while loading settings."
        );
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      loadSettings();
    } else {
      setLoading(false);
      setError(
        "Authentication token not found. Please login again."
      );
    }
  }, [token]);

  /* =========================================================
     UPDATE
  ========================================================= */

  const updateSection = (section, key, value) => {
    setSettings((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [key]: value,
      },
    }));

    setSaved(false);
  };

  /* =========================================================
     SAVE
  ========================================================= */

  const handleSave = async () => {
    try {
      setSaving(true);
      setSaved(false);
      setError("");

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      const payload = {
        siteName: settings.store.name,
        siteDescription: settings.store.description,

        email: settings.store.email,
        phone: settings.store.phone,

        whatsapp: settings.whatsapp.number,

        address: settings.store.address,

        currency: settings.store.currency,

        shippingFee:
          Number(settings.delivery.deliveryFee) || 0,

        freeShipping:
          Number(settings.delivery.freeDeliveryFrom) > 0,

        instagram: "",
        facebook: "",
        tiktok: "",

        emailNotifications:
          settings.notifications.newMessages,

        orderNotifications:
          settings.notifications.newOrders,

        contactNotifications:
          settings.notifications.newMessages,

        subscriberNotifications:
          settings.notifications.newSubscribers,

        darkMode: settings.appearance.darkMode,
      };

      const response = await fetch(API_URL, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to save settings."
        );
      }

      const data = result.settings || {};

      setSettings((prev) => ({
        ...prev,

        store: {
          ...prev.store,
          name: data.siteName ?? prev.store.name,
          email: data.email ?? prev.store.email,
          phone: data.phone ?? prev.store.phone,
          address: data.address ?? prev.store.address,
          currency: data.currency ?? prev.store.currency,
          description:
            data.siteDescription ?? prev.store.description,
        },

        delivery: {
          ...prev.delivery,
          deliveryFee: String(
            data.shippingFee ?? prev.delivery.deliveryFee
          ),
        },

        whatsapp: {
          ...prev.whatsapp,
          number: data.whatsapp ?? prev.whatsapp.number,
        },

        notifications: {
          ...prev.notifications,
          newOrders:
            data.orderNotifications ??
            prev.notifications.newOrders,

          newMessages:
            data.contactNotifications ??
            prev.notifications.newMessages,

          newSubscribers:
            data.subscriberNotifications ??
            prev.notifications.newSubscribers,
        },

        appearance: {
          ...prev.appearance,
          darkMode:
            data.darkMode ?? prev.appearance.darkMode,
        },
      }));

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      console.error(
        "❌ Failed to save dashboard settings:",
        err
      );

      setError(
        err.message ||
          "Something went wrong while saving settings."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     RESET
  ========================================================= */

  const handleReset = async () => {
    const confirmed = window.confirm(
      "Reset all dashboard settings to default?"
    );

    if (!confirmed) return;

    try {
      setSaving(true);
      setSaved(false);
      setError("");

      if (!token) {
        throw new Error(
          "Authentication token not found. Please login again."
        );
      }

      const payload = {
        siteName: defaultSettings.store.name,

        siteDescription:
          defaultSettings.store.description,

        email: defaultSettings.store.email,

        phone: defaultSettings.store.phone,

        whatsapp: defaultSettings.whatsapp.number,

        address: defaultSettings.store.address,

        currency: "MAD",

        shippingFee:
          Number(defaultSettings.delivery.deliveryFee) || 0,

        freeShipping:
          Number(
            defaultSettings.delivery.freeDeliveryFrom
          ) > 0,

        instagram: "",
        facebook: "",
        tiktok: "",

        emailNotifications: true,

        orderNotifications:
          defaultSettings.notifications.newOrders,

        contactNotifications:
          defaultSettings.notifications.newMessages,

        subscriberNotifications:
          defaultSettings.notifications.newSubscribers,

        darkMode: defaultSettings.appearance.darkMode,
      };

      const response = await fetch(API_URL, {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },

        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Failed to reset settings."
        );
      }

      setSettings(defaultSettings);

      setSaved(true);

      setTimeout(() => {
        setSaved(false);
      }, 2500);
    } catch (err) {
      console.error(
        "❌ Failed to reset settings:",
        err
      );

      setError(
        err.message ||
          "Something went wrong while resetting settings."
      );
    } finally {
      setSaving(false);
    }
  };

  /* =========================================================
     PASSWORD
  ========================================================= */

  const handlePasswordChange = () => {
    if (!passwords.current) {
      alert("Please enter your current password.");
      return;
    }

    if (!passwords.newPassword) {
      alert("Please enter a new password.");
      return;
    }

    if (passwords.newPassword.length < 6) {
      alert(
        "New password must contain at least 6 characters."
      );
      return;
    }

    if (passwords.newPassword !== passwords.confirm) {
      alert("Passwords do not match.");
      return;
    }

    alert(
      "Password change UI is ready. Connect this action to your backend auth API."
    );

    setPasswords({
      current: "",
      newPassword: "",
      confirm: "",
    });
  };

  /* =========================================================
     STORE
  ========================================================= */

  const renderStore = () => (
    <motion.div
      key="store"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <SectionTitle
        icon={Store}
        title="Store Settings"
        description="Manage your business information."
      />

      <div className="grid gap-3.5 sm:grid-cols-2">
        <InputField
          label="Store Name"
          value={settings.store.name}
          onChange={(value) =>
            updateSection("store", "name", value)
          }
          placeholder="KADECHO"
          icon={Store}
        />

        <InputField
          label="Store Email"
          type="email"
          value={settings.store.email}
          onChange={(value) =>
            updateSection("store", "email", value)
          }
          placeholder="contact@kadecho.com"
          icon={Mail}
        />

        <InputField
          label="Phone"
          value={settings.store.phone}
          onChange={(value) =>
            updateSection("store", "phone", value)
          }
          placeholder="+212 6XX XXX XXX"
          icon={Phone}
        />

        <InputField
          label="City"
          value={settings.store.city}
          onChange={(value) =>
            updateSection("store", "city", value)
          }
          placeholder="Tangier"
          icon={MapPin}
        />

        <div className="sm:col-span-2">
          <InputField
            label="Address"
            value={settings.store.address}
            onChange={(value) =>
              updateSection("store", "address", value)
            }
            placeholder="Store address"
            icon={MapPin}
          />
        </div>

        <SelectField
          label="Currency"
          value={settings.store.currency}
          onChange={(value) =>
            updateSection("store", "currency", value)
          }
          options={[
            {
              value: "MAD",
              label: "MAD — Moroccan Dirham",
            },
            {
              value: "USD",
              label: "USD — US Dollar",
            },
            {
              value: "EUR",
              label: "EUR — Euro",
            },
          ]}
        />

        <div className="hidden sm:block" />

        <div className="sm:col-span-2">
          <TextareaField
            label="Store Description"
            value={settings.store.description}
            onChange={(value) =>
              updateSection(
                "store",
                "description",
                value
              )
            }
            placeholder="Short description about your store..."
          />
        </div>
      </div>
    </motion.div>
  );

  /* =========================================================
     DELIVERY
  ========================================================= */

  const renderDelivery = () => (
    <motion.div
      key="delivery"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <SectionTitle
        icon={Truck}
        title="Delivery & Orders"
        description="Configure shipping and order rules."
      />

      <div className="mb-4 grid gap-3.5 sm:grid-cols-2">
        <InputField
          label="Delivery Fee"
          value={settings.delivery.deliveryFee}
          onChange={(value) =>
            updateSection(
              "delivery",
              "deliveryFee",
              value
            )
          }
          placeholder="0"
          icon={DollarSign}
        />

        <InputField
          label="Free Delivery From"
          value={settings.delivery.freeDeliveryFrom}
          onChange={(value) =>
            updateSection(
              "delivery",
              "freeDeliveryFrom",
              value
            )
          }
          placeholder="500"
          icon={PackageCheck}
        />

        <InputField
          label="Minimum Order"
          value={settings.delivery.minimumOrder}
          onChange={(value) =>
            updateSection(
              "delivery",
              "minimumOrder",
              value
            )
          }
          placeholder="0"
          icon={DollarSign}
        />

        <InputField
          label="Processing Time"
          value={settings.delivery.processingTime}
          onChange={(value) =>
            updateSection(
              "delivery",
              "processingTime",
              value
            )
          }
          placeholder="1-3 days"
          icon={Truck}
        />

        <div className="sm:col-span-2">
          <InputField
            label="Available Cities"
            value={settings.delivery.availableCities}
            onChange={(value) =>
              updateSection(
                "delivery",
                "availableCities",
                value
              )
            }
            placeholder="Tangier, Casablanca, Rabat"
            icon={MapPin}
          />
        </div>
      </div>

      <Toggle
        enabled={settings.delivery.enableDelivery}
        onChange={(value) =>
          updateSection(
            "delivery",
            "enableDelivery",
            value
          )
        }
        label="Enable Delivery"
        description="Allow customers to place delivery orders."
      />
    </motion.div>
  );

  /* =========================================================
     WHATSAPP
  ========================================================= */

  const renderWhatsapp = () => (
    <motion.div
      key="whatsapp"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <SectionTitle
        icon={MessageCircle}
        title="WhatsApp"
        description="Configure the floating WhatsApp customer button."
      />

      <div className="mb-4">
        <Toggle
          enabled={settings.whatsapp.enabled}
          onChange={(value) =>
            updateSection(
              "whatsapp",
              "enabled",
              value
            )
          }
          label="WhatsApp Button"
          description="Show the floating WhatsApp button on the website."
        />
      </div>

      <div className="grid gap-3.5 sm:grid-cols-2">
        <InputField
          label="WhatsApp Number"
          value={settings.whatsapp.number}
          onChange={(value) =>
            updateSection(
              "whatsapp",
              "number",
              value
            )
          }
          placeholder="2126XXXXXXXX"
          icon={Smartphone}
        />

        <SelectField
          label="Position"
          value={settings.whatsapp.position}
          onChange={(value) =>
            updateSection(
              "whatsapp",
              "position",
              value
            )
          }
          options={[
            {
              value: "bottom-right",
              label: "Bottom Right",
            },
            {
              value: "bottom-left",
              label: "Bottom Left",
            },
          ]}
        />

        <div className="sm:col-span-2">
          <TextareaField
            label="Automatic Message"
            value={settings.whatsapp.message}
            onChange={(value) =>
              updateSection(
                "whatsapp",
                "message",
                value
              )
            }
            placeholder="Default WhatsApp message..."
          />
        </div>
      </div>

      <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
        <Toggle
          enabled={settings.whatsapp.showOnMobile}
          onChange={(value) =>
            updateSection(
              "whatsapp",
              "showOnMobile",
              value
            )
          }
          label="Show On Mobile"
          description="Display WhatsApp on mobile devices."
        />

        <Toggle
          enabled={settings.whatsapp.showOnDesktop}
          onChange={(value) =>
            updateSection(
              "whatsapp",
              "showOnDesktop",
              value
            )
          }
          label="Show On Desktop"
          description="Display WhatsApp on desktop devices."
        />
      </div>
    </motion.div>
  );

  /* =========================================================
     NOTIFICATIONS
  ========================================================= */

  const renderNotifications = () => (
    <motion.div
      key="notifications"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <SectionTitle
        icon={Bell}
        title="Notifications"
        description="Choose which dashboard events should notify you."
      />

      <div className="space-y-2.5">
        <Toggle
          enabled={settings.notifications.newOrders}
          onChange={(value) =>
            updateSection(
              "notifications",
              "newOrders",
              value
            )
          }
          label="New Orders"
          description="Notify when a new order is created."
        />

        <Toggle
          enabled={settings.notifications.newMessages}
          onChange={(value) =>
            updateSection(
              "notifications",
              "newMessages",
              value
            )
          }
          label="New Messages"
          description="Notify when a customer sends a message."
        />

        <Toggle
          enabled={settings.notifications.newSubscribers}
          onChange={(value) =>
            updateSection(
              "notifications",
              "newSubscribers",
              value
            )
          }
          label="New Subscribers"
          description="Notify when someone subscribes to the newsletter."
        />

        <Toggle
          enabled={settings.notifications.lowStock}
          onChange={(value) =>
            updateSection(
              "notifications",
              "lowStock",
              value
            )
          }
          label="Low Stock"
          description="Notify when products are running low."
        />

        <Toggle
          enabled={settings.notifications.orderUpdates}
          onChange={(value) =>
            updateSection(
              "notifications",
              "orderUpdates",
              value
            )
          }
          label="Order Updates"
          description="Notify when an order status changes."
        />
      </div>
    </motion.div>
  );

  /* =========================================================
     APPEARANCE
  ========================================================= */

  const renderAppearance = () => (
    <motion.div
      key="appearance"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <SectionTitle
        icon={Palette}
        title="Appearance"
        description="Control the visual experience of your store."
      />

      <div className="space-y-2.5">
        <Toggle
          enabled={settings.appearance.darkMode}
          onChange={(value) =>
            updateSection(
              "appearance",
              "darkMode",
              value
            )
          }
          label="Dark Mode"
          description="Keep the website in its dark visual theme."
        />

        <Toggle
          enabled={settings.appearance.announcementEnabled}
          onChange={(value) =>
            updateSection(
              "appearance",
              "announcementEnabled",
              value
            )
          }
          label="Announcement Bar"
          description="Show the announcement bar at the top of the website."
        />
      </div>

      <div className="mt-4">
        <TextareaField
          label="Announcement Text"
          value={settings.appearance.announcementText}
          onChange={(value) =>
            updateSection(
              "appearance",
              "announcementText",
              value
            )
          }
          placeholder="Announcement message..."
        />
      </div>

      <div className="mt-5">
        <span
          className="
            mb-2.5 block text-[9px] font-semibold
            uppercase tracking-[0.14em] text-zinc-600
          "
        >
          Accent Color
        </span>

        <div className="flex gap-2.5">
          {[
            {
              id: "red",
              className: "bg-red-500",
            },
            {
              id: "purple",
              className: "bg-purple-500",
            },
            {
              id: "gold",
              className: "bg-yellow-500",
            },
          ].map((color) => (
            <button
              key={color.id}
              type="button"
              onClick={() =>
                updateSection(
                  "appearance",
                  "accentColor",
                  color.id
                )
              }
              className={`
                flex h-8 w-8 items-center justify-center
                rounded-full ${color.className}
                transition-all duration-200
                ${
                  settings.appearance.accentColor ===
                  color.id
                    ? "scale-110 ring-2 ring-white/70 ring-offset-2 ring-offset-[#090909]"
                    : "opacity-50 hover:scale-105 hover:opacity-100"
                }
              `}
            >
              {settings.appearance.accentColor ===
                color.id && <Check size={13} />}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );

  /* =========================================================
     ACCOUNT
  ========================================================= */

  const renderAccount = () => (
    <motion.div
      key="account"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <SectionTitle
        icon={User}
        title="Admin Account"
        description="Manage your dashboard profile."
      />

      <div className="grid gap-3.5 sm:grid-cols-2">
        <InputField
          label="Admin Name"
          value={settings.account.name}
          onChange={(value) =>
            updateSection(
              "account",
              "name",
              value
            )
          }
          placeholder="Admin"
          icon={User}
        />

        <InputField
          label="Admin Email"
          type="email"
          value={settings.account.email}
          onChange={(value) =>
            updateSection(
              "account",
              "email",
              value
            )
          }
          placeholder="admin@kadecho.com"
          icon={Mail}
        />
      </div>

      <div className="mt-6 border-t border-white/[0.05] pt-5">
        <div className="mb-4">
          <h3 className="text-[12px] font-semibold text-zinc-200">
            Change Password
          </h3>

          <p className="mt-0.5 text-[9px] text-zinc-700">
            Update your dashboard access credentials.
          </p>
        </div>

        <div className="grid gap-3.5 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span
              className="
                mb-1.5 block text-[9px] font-semibold
                uppercase tracking-[0.14em] text-zinc-600
              "
            >
              Current Password
            </span>

            <div className="relative">
              <Lock
                size={13}
                className="
                  pointer-events-none absolute left-3
                  top-1/2 -translate-y-1/2 text-zinc-700
                "
              />

              <input
                type={showPassword ? "text" : "password"}
                value={passwords.current}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    current: e.target.value,
                  }))
                }
                className="
                  h-10 w-full rounded-lg
                  border border-white/[0.065]
                  bg-[#0b0b0b]
                  px-9 pr-10
                  text-[12px] text-zinc-200
                  outline-none transition-all
                  focus:border-red-500/30
                  focus:ring-1 focus:ring-red-500/[0.08]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword((prev) => !prev)
                }
                className="
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  text-zinc-700 transition-colors
                  hover:text-zinc-300
                "
              >
                {showPassword ? (
                  <EyeOff size={14} />
                ) : (
                  <Eye size={14} />
                )}
              </button>
            </div>
          </label>

          <label className="block">
            <span
              className="
                mb-1.5 block text-[9px] font-semibold
                uppercase tracking-[0.14em] text-zinc-600
              "
            >
              New Password
            </span>

            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={passwords.newPassword}
                onChange={(e) =>
                  setPasswords((prev) => ({
                    ...prev,
                    newPassword: e.target.value,
                  }))
                }
                className="
                  h-10 w-full rounded-lg
                  border border-white/[0.065]
                  bg-[#0b0b0b]
                  px-3.5 pr-10
                  text-[12px] text-zinc-200
                  outline-none transition-all
                  focus:border-red-500/30
                  focus:ring-1 focus:ring-red-500/[0.08]
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowNewPassword((prev) => !prev)
                }
                className="
                  absolute right-3 top-1/2
                  -translate-y-1/2
                  text-zinc-700 transition-colors
                  hover:text-zinc-300
                "
              >
                {showNewPassword ? (
                  <EyeOff size={14} />
                ) : (
                  <Eye size={14} />
                )}
              </button>
            </div>
          </label>

          <InputField
            label="Confirm Password"
            type="password"
            value={passwords.confirm}
            onChange={(value) =>
              setPasswords((prev) => ({
                ...prev,
                confirm: value,
              }))
            }
            placeholder="Repeat new password"
          />
        </div>

        <button
          type="button"
          onClick={handlePasswordChange}
          className="
            mt-4 inline-flex h-9 items-center gap-2
            rounded-lg border border-white/[0.08]
            bg-white/[0.02] px-3.5
            text-[9px] font-semibold uppercase
            tracking-[0.12em] text-zinc-500
            transition-all duration-200
            hover:border-red-500/25
            hover:bg-red-500/[0.04]
            hover:text-white
          "
        >
          <Lock size={13} />
          UPDATE PASSWORD
        </button>
      </div>
    </motion.div>
  );

  /* =========================================================
     SECURITY
  ========================================================= */

  const renderSecurity = () => (
    <motion.div
      key="security"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22 }}
    >
      <SectionTitle
        icon={ShieldCheck}
        title="Security"
        description="Protect your dashboard account."
      />

      <div className="space-y-2.5">
        <Toggle
          enabled={settings.security.twoFactor}
          onChange={(value) =>
            updateSection(
              "security",
              "twoFactor",
              value
            )
          }
          label="Two-Factor Authentication"
          description="Add an additional verification step to your account."
        />

        <Toggle
          enabled={settings.security.loginNotifications}
          onChange={(value) =>
            updateSection(
              "security",
              "loginNotifications",
              value
            )
          }
          label="Login Notifications"
          description="Receive an alert when a new dashboard login occurs."
        />
      </div>

      <div
        className="
          mt-4 flex gap-2.5 rounded-lg
          border border-yellow-500/10
          bg-yellow-500/[0.025]
          px-3.5 py-3
        "
      >
        <AlertTriangle
          size={15}
          className="mt-0.5 shrink-0 text-yellow-500"
        />

        <div>
          <p className="text-[10px] font-semibold text-yellow-400">
            Security reminder
          </p>

          <p className="mt-0.5 text-[9px] leading-4 text-zinc-600">
            Keep your admin credentials private and use a
            strong password for your dashboard.
          </p>
        </div>
      </div>

      <button
        type="button"
        className="
          mt-4 flex w-full items-center justify-between
          rounded-lg border border-red-500/[0.08]
          bg-red-500/[0.018]
          px-3.5 py-3
          text-left transition-all duration-200
          hover:border-red-500/20
          hover:bg-red-500/[0.035]
        "
      >
        <div className="flex items-center gap-2.5">
          <div
            className="
              flex h-8 w-8 items-center justify-center
              rounded-lg border border-red-500/10
              bg-red-500/[0.045] text-red-400
            "
          >
            <LogOut size={14} />
          </div>

          <div>
            <p className="text-[11px] font-medium text-zinc-300">
              Sign out other sessions
            </p>

            <p className="mt-0.5 text-[9px] text-zinc-700">
              Backend session management can be connected here.
            </p>
          </div>
        </div>

        <ChevronRight
          size={14}
          className="text-zinc-700"
        />
      </button>
    </motion.div>
  );

  /* =========================================================
     SECTION SWITCH
  ========================================================= */

  const renderSection = () => {
    switch (activeSection) {
      case "store":
        return renderStore();

      case "delivery":
        return renderDelivery();

      case "whatsapp":
        return renderWhatsapp();

      case "notifications":
        return renderNotifications();

      case "appearance":
        return renderAppearance();

      case "account":
        return renderAccount();

      case "security":
        return renderSecurity();

      default:
        return renderStore();
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <section
        className="
          min-h-[calc(100vh-2rem)]
          rounded-2xl
          border border-white/[0.07]
          bg-[#090909]
          p-5
        "
      >
        <div className="flex min-h-[360px] items-center justify-center">
          <div className="text-center">
            <div
              className="
                mx-auto mb-3 h-8 w-8 animate-spin
                rounded-full border-2
                border-white/[0.07]
                border-t-red-500
              "
            />

            <p
              className="
                font-bebas text-[11px]
                tracking-[0.20em] text-zinc-600
              "
            >
              LOADING SETTINGS...
            </p>
          </div>
        </div>
      </section>
    );
  }

  /* =========================================================
     MAIN UI
  ========================================================= */

  return (
    <section
      className="
        relative min-h-[calc(100vh-2rem)]
        overflow-hidden rounded-2xl
        border border-white/[0.07]
        bg-[#090909]
      "
    >
      {/* PREMIUM BACKGROUND GLOW */}

      <div
        className="
          pointer-events-none absolute
          -right-32 -top-32 h-64 w-64
          rounded-full bg-red-600/[0.035]
          blur-3xl
        "
      />

      <div
        className="
          pointer-events-none absolute
          -bottom-40 -left-32 h-72 w-72
          rounded-full bg-red-600/[0.018]
          blur-3xl
        "
      />

      <div className="relative p-3.5 sm:p-5 lg:p-6">
        {/* =================================================
            ERROR
        ================================================= */}

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="
                mb-4 flex items-start gap-2.5
                rounded-lg border border-red-500/10
                bg-red-500/[0.035]
                px-3.5 py-3
                text-[11px] text-red-300
              "
            >
              <AlertTriangle
                size={14}
                className="mt-0.5 shrink-0 text-red-400"
              />

              <p>{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            HEADER
        ================================================= */}

        <div
          className="
            mb-5 flex flex-col gap-3.5
            border-b border-white/[0.05]
            pb-4
            lg:flex-row lg:items-center
            lg:justify-between
          "
        >
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span
                className="
                  h-1.5 w-1.5 rounded-full
                  bg-red-500
                  shadow-[0_0_10px_rgba(239,68,68,.8)]
                "
              />

              <span
                className="
                  font-bebas text-[9px]
                  uppercase tracking-[0.20em]
                  text-zinc-700
                "
              >
                Control Center
              </span>
            </div>

            <h1
              className="
                mt-1.5 font-bebas
                text-3xl uppercase
                leading-none tracking-[0.08em]
                text-white sm:text-4xl
              "
            >
              Settings
            </h1>

            <p className="mt-1 text-[10px] text-zinc-700">
              Manage your store, communication and dashboard
              preferences.
            </p>
          </div>

          {/* ACTIONS */}

          <div className="flex items-center gap-1.5">
            <AnimatePresence mode="wait">
              {saved && (
                <motion.div
                  key="saved"
                  initial={{
                    opacity: 0,
                    scale: 0.94,
                    x: 5,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    x: 0,
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.94,
                    x: 5,
                  }}
                  className="
                    flex h-9 items-center gap-1.5
                    rounded-lg
                    border border-emerald-500/15
                    bg-emerald-500/[0.045]
                    px-2.5
                    text-[9px] font-semibold
                    text-emerald-400
                  "
                >
                  <Check size={12} />
                  SAVED
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="button"
              onClick={handleReset}
              disabled={saving}
              className="
                inline-flex h-9 items-center gap-1.5
                rounded-lg
                border border-white/[0.07]
                bg-white/[0.018]
                px-2.5
                text-[9px] font-semibold
                uppercase tracking-[0.10em]
                text-zinc-600
                transition-all duration-200
                hover:border-white/[0.12]
                hover:text-zinc-300
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <RotateCcw size={12} />
              Reset
            </button>

            <motion.button
              type="button"
              onClick={handleSave}
              disabled={saving}
              whileTap={{ scale: 0.97 }}
              className="
                relative inline-flex h-9
                items-center gap-1.5
                overflow-hidden rounded-lg
                bg-red-600 px-3
                text-[9px] font-semibold
                uppercase tracking-[0.10em]
                text-white
                shadow-[0_6px_20px_rgba(239,68,68,.14)]
                transition-all duration-200
                hover:bg-red-500
                hover:shadow-[0_8px_25px_rgba(239,68,68,.22)]
                disabled:cursor-not-allowed
                disabled:opacity-40
              "
            >
              <span
                className="
                  pointer-events-none absolute inset-0
                  bg-gradient-to-r
                  from-transparent via-white/[0.08]
                  to-transparent
                  -translate-x-full
                  transition-transform duration-700
                  group-hover:translate-x-full
                "
              />

              <Save size={12} />

              {saving ? "Saving..." : "Save Changes"}
            </motion.button>
          </div>
        </div>

        {/* =================================================
            CONTENT
        ================================================= */}

        <div
          className="
            grid gap-4
            lg:grid-cols-[205px_minmax(0,1fr)]
          "
        >
          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="lg:sticky lg:top-4 lg:h-fit">
            <div
              className="
                overflow-hidden rounded-xl
                border border-white/[0.055]
                bg-white/[0.012]
              "
            >
              {/* SIDEBAR TOP */}

              <div
                className="
                  border-b border-white/[0.045]
                  px-3 py-2.5
                "
              >
                <div className="flex items-center justify-between">
                  <span
                    className="
                      font-bebas text-[9px]
                      uppercase tracking-[0.15em]
                      text-zinc-700
                    "
                  >
                    Configuration
                  </span>

                  <span className="text-[8px] text-zinc-800">
                    {sections.length} SECTIONS
                  </span>
                </div>
              </div>

              <div className="p-1.5">
                {sections.map((section) => {
                  const Icon = section.icon;
                  const active =
                    activeSection === section.id;

                  return (
                    <button
                      key={section.id}
                      type="button"
                      onClick={() =>
                        setActiveSection(section.id)
                      }
                      className={`
                        group relative flex w-full
                        items-center gap-2
                        rounded-lg px-2 py-2
                        text-left
                        transition-all duration-200
                        ${
                          active
                            ? "bg-red-500/[0.055]"
                            : "hover:bg-white/[0.018]"
                        }
                      `}
                    >
                      {/* ACTIVE LINE */}

                      {active && (
                        <motion.span
                          layoutId="settings-active-line"
                          className="
                            absolute left-0 top-1/2
                            h-5 w-[2px]
                            -translate-y-1/2
                            rounded-full
                            bg-red-500
                            shadow-[0_0_8px_rgba(239,68,68,.7)]
                          "
                        />
                      )}

                      <div
                        className={`
                          flex h-7 w-7 shrink-0
                          items-center justify-center
                          rounded-md border
                          transition-all duration-200
                          ${
                            active
                              ? "border-red-500/15 bg-red-500/[0.07] text-red-400"
                              : "border-white/[0.045] bg-white/[0.012] text-zinc-700 group-hover:text-zinc-400"
                          }
                        `}
                      >
                        <Icon size={13} />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p
                          className={`
                            truncate text-[9px]
                            font-semibold uppercase
                            tracking-[0.07em]
                            ${
                              active
                                ? "text-zinc-200"
                                : "text-zinc-600 group-hover:text-zinc-400"
                            }
                          `}
                        >
                          {section.label}
                        </p>

                        <p className="mt-0.5 truncate text-[8px] text-zinc-800">
                          {section.description}
                        </p>
                      </div>

                      {active && (
                        <ChevronRight
                          size={11}
                          className="shrink-0 text-red-500/60"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* =================================================
              MAIN PANEL
          ================================================= */}

          <div
            className="
              min-w-0
              rounded-xl
              border border-white/[0.055]
              bg-white/[0.010]
              p-4 sm:p-5
              lg:p-6
            "
          >
            <AnimatePresence mode="wait">
              {renderSection()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}