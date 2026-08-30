import { motion } from "framer-motion";
import { useEffect, useState } from "react";

import CheckoutHeader from "../components/Checkout/CheckoutHeader";
import CheckoutForm from "../components/Checkout/CheckoutForm";
import OrderSummary from "../components/Checkout/OrderSummary";
import OrderReview from "../components/Checkout/OrderReview";
import SuccessMessage from "../components/ui/SuccessMessage";

import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const [checkoutData, setCheckoutData] = useState(null);

  const [confirming, setConfirming] = useState(false);

  const [orderError, setOrderError] = useState("");

  const [orderSuccess, setOrderSuccess] = useState(false);

  const [orderCompleted, setOrderCompleted] = useState(false);

  const [createdOrder, setCreatedOrder] = useState(null);

  const {
    items,
    subtotal,
    clearCart,
  } = useCart();

  // =====================================================
  // CONTINUE TO REVIEW
  // =====================================================

  const handleContinue = (data) => {
    console.log("🔥 CHECKOUT DATA:", data);

    setOrderError("");

    setCheckoutData(data);
  };

  // =====================================================
  // BACK TO FORM
  // =====================================================

  const handleBack = () => {
    if (confirming) return;

    setOrderError("");

    setCheckoutData(null);
  };

  // =====================================================
  // CONFIRM ORDER
  // =====================================================

  const handleConfirm = async () => {
    if (!checkoutData) {
      return;
    }

    if (!items.length) {
      setOrderError("Your cart is empty.");
      return;
    }

    try {
      setConfirming(true);

      setOrderError("");

      // =================================================
      // PREPARE ORDER ITEMS
      // =================================================

      const orderItems = items.map((item) => ({
        productId: item.productId,

        name: item.name,

        image: item.image,

        price: Number(item.price || 0),

        quantity: Number(item.quantity || 0),

        category: item.category || "",

        material: item.material || "",

        finish: item.finish || "",
      }));

      // =================================================
      // ORDER DATA
      // =================================================

      const orderData = {
        customer: {
          name: checkoutData.name,
          email: checkoutData.email,
          phone: checkoutData.phone,
          address: checkoutData.address,
        },

        items: orderItems,

        subtotal: Number(subtotal || 0),

        shipping: 0,

        total: Number(subtotal || 0),
      };

      console.log("🔥 SENDING ORDER:", orderData);

      // =================================================
      // SEND TO BACKEND
      // =================================================

    const response = await fetch(
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/orders`,
  {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(orderData),
  }
);

      const data = await response.json();

      console.log("🔥 ORDER RESPONSE:", data);

      // =================================================
      // ERROR
      // =================================================

      if (!response.ok) {
        throw new Error(
          data?.message || "Failed to create order."
        );
      }

      // =================================================
      // ORDER CREATED
      // =================================================

      console.log(
        "✅ ORDER CREATED:",
        data.order
      );

      // Save created order
      setCreatedOrder(data.order);

      // Clear cart
      clearCart();

      // Show success overlay
      setOrderSuccess(true);

    } catch (error) {
      console.error(
        "❌ ORDER CREATION ERROR:",
        error
      );

      setOrderError(
        error.message ||
          "Something went wrong while creating your order."
      );
    } finally {
      setConfirming(false);
    }
  };

  // =====================================================
  // SUCCESS TIMER
  // =====================================================

  useEffect(() => {
    if (!orderSuccess) return;

    const timer = setTimeout(() => {
      setOrderSuccess(false);

      setOrderCompleted(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [orderSuccess]);

  // =====================================================
  // BACK TO SHOP
  // =====================================================

  const handleBackToShop = () => {
    window.location.href = "/shop";
  };

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =================================================
          SUCCESS OVERLAY
      ================================================= */}

      <SuccessMessage
        show={orderSuccess}
        title="Order Confirmed"
        message="Your order has been successfully placed. Thank you for choosing KadeCho."
      />

      {/* =================================================
          PAGE
      ================================================= */}

      <section
        className="
          relative
          min-h-screen

          overflow-hidden

          bg-[#050505]

          pt-10
          pb-20

          lg:pt-16
        "
      >
        {/* Background Glow */}

        <div
          className="
            pointer-events-none

            absolute
            left-1/2
            top-0

            h-[450px]
            w-[450px]

            -translate-x-1/2

            rounded-full

            bg-red-600/10

            blur-[170px]
          "
        />

        <div
          className="
            relative
            z-10

            mx-auto

            max-w-7xl

            px-4
            sm:px-6
            lg:px-8
          "
        >
          {/* Header */}

          <CheckoutHeader />

          {/* ERROR */}

          {orderError && (
            <motion.div
              initial={{
                opacity: 0,
                y: -10,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="
                mt-6

                rounded-2xl

                border
                border-red-500/20

                bg-red-500/10

                px-4
                py-3

                text-sm

                text-red-400
              "
            >
              {orderError}
            </motion.div>
          )}

          {/* =================================================
              ORDER COMPLETED
          ================================================= */}

          {orderCompleted ? (
            <motion.div
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.6,
              }}
              className="
                mx-auto

                mt-10

                max-w-4xl
              "
            >
              {/* Final Order Card */}

              <div
                className="
                  overflow-hidden

                  rounded-[30px]

                  border
                  border-white/10

                  bg-[#090909]

                  shadow-[0_30px_90px_rgba(0,0,0,.5)]
                "
              >
                {/* Header */}

                <div
                  className="
                    border-b
                    border-white/10

                    p-6
                    sm:p-8
                  "
                >
                  <p
                    className="
                      text-[10px]
                      uppercase
                      tracking-[0.3em]

                      text-green-400
                    "
                  >
                    Order Completed
                  </p>

                  <h1
                    className="
                      mt-2

                      font-bebas

                      text-4xl
                      sm:text-5xl

                      uppercase

                      tracking-wide

                      text-white
                    "
                  >
                    Thank You For Your Order
                  </h1>

                  <p
                    className="
                      mt-3

                      text-sm
                      leading-6

                      text-zinc-500
                    "
                  >
                    Your order has been received successfully.
                    We'll contact you shortly to confirm the
                    details and delivery.
                  </p>
                </div>

                {/* Customer */}

                <div className="p-6 sm:p-8">

                  <div
                    className="
                      rounded-2xl

                      border
                      border-white/10

                      bg-white/[0.025]

                      p-5
                    "
                  >
                    <p
                      className="
                        text-[9px]
                        uppercase
                        tracking-[0.25em]

                        text-zinc-600
                      "
                    >
                      Customer
                    </p>

                    <h3
                      className="
                        mt-2

                        font-bebas

                        text-2xl
                        uppercase

                        text-white
                      "
                    >
                      {createdOrder?.customer?.name ||
                        checkoutData?.name}
                    </h3>

                    <div className="mt-4 space-y-2">

                      <p className="text-sm text-zinc-400">
                        {createdOrder?.customer?.email ||
                          checkoutData?.email}
                      </p>

                      <p className="text-sm text-zinc-400">
                        {createdOrder?.customer?.phone ||
                          checkoutData?.phone}
                      </p>

                      <p className="text-sm text-zinc-400">
                        {createdOrder?.customer?.address ||
                          checkoutData?.address}
                      </p>

                    </div>
                  </div>

                  {/* Products */}

                  <div className="mt-6">

                    <div
                      className="
                        mb-4

                        flex
                        items-center
                        justify-between
                      "
                    >
                      <h3
                        className="
                          font-bebas

                          text-2xl

                          uppercase
                          tracking-wide

                          text-white
                        "
                      >
                        Your Order
                      </h3>

                      <span
                        className="
                          text-[10px]

                          uppercase
                          tracking-wider

                          text-zinc-600
                        "
                      >
                        {createdOrder?.items?.length || 0} Items
                      </span>
                    </div>

                    <div className="space-y-3">

                      {(createdOrder?.items || []).map(
                        (item, index) => (
                          <motion.div
                            key={
                              item.productId ||
                              index
                            }
                            initial={{
                              opacity: 0,
                              x: -10,
                            }}
                            animate={{
                              opacity: 1,
                              x: 0,
                            }}
                            transition={{
                              delay:
                                index * 0.05,
                            }}
                            className="
                              flex
                              items-center
                              gap-4

                              rounded-2xl

                              border
                              border-white/10

                              bg-white/[0.025]

                              p-3
                            "
                          >
                            {/* Image */}

                            <div
                              className="
                                h-16
                                w-16

                                shrink-0

                                overflow-hidden

                                rounded-xl

                                border
                                border-white/10

                                bg-[#111]
                              "
                            >
                              <img
                                src={item.image}
                                alt={item.name}
                                className="
                                  h-full
                                  w-full

                                  object-cover
                                "
                              />
                            </div>

                            {/* Info */}

                            <div
                              className="
                                min-w-0
                                flex-1
                              "
                            >
                              <h4
                                className="
                                  truncate

                                  font-bebas

                                  text-lg

                                  uppercase

                                  text-white
                                "
                              >
                                {item.name}
                              </h4>

                              <p
                                className="
                                  mt-1

                                  text-xs

                                  text-zinc-600
                                "
                              >
                                x{item.quantity}
                                {" · "}
                                {Number(
                                  item.price || 0
                                ).toLocaleString()}{" "}
                                DH each
                              </p>
                            </div>

                            {/* Price */}

                            <div
                              className="
                                shrink-0

                                font-bebas

                                text-lg

                                text-white
                              "
                            >
                              {(
                                Number(
                                  item.price || 0
                                ) *
                                Number(
                                  item.quantity || 0
                                )
                              ).toLocaleString()}{" "}
                              DH
                            </div>
                          </motion.div>
                        )
                      )}

                    </div>

                  </div>

                  {/* Total */}

                  <div
                    className="
                      mt-6

                      rounded-2xl

                      border
                      border-white/10

                      bg-[#101010]

                      p-5
                    "
                  >
                    <div
                      className="
                        flex
                        items-center
                        justify-between
                      "
                    >
                      <span
                        className="
                          font-bebas

                          text-2xl

                          uppercase

                          text-white
                        "
                      >
                        Total
                      </span>

                      <span
                        className="
                          font-bebas

                          text-3xl

                          text-white
                        "
                      >
                        {Number(
                          createdOrder?.total || 0
                        ).toLocaleString()}{" "}
                        DH
                      </span>
                    </div>
                  </div>

                  {/* Back To Shop */}

                  <motion.button
                    type="button"
                    onClick={handleBackToShop}
                    whileHover={{
                      scale: 1.02,
                      boxShadow:
                        "0 20px 45px rgba(239,68,68,.3)",
                    }}
                    whileTap={{
                      scale: 0.98,
                    }}
                    className="
                      mt-6

                      flex
                      h-14
                      w-full

                      items-center
                      justify-center

                      rounded-2xl

                      bg-gradient-to-r
                      from-red-600
                      via-red-500
                      to-red-600

                      font-semibold

                      text-white

                      transition-all
                      duration-300
                    "
                  >
                    Back To Shop
                  </motion.button>

                </div>
              </div>
            </motion.div>
          ) : (
            /* =================================================
               NORMAL CHECKOUT
            ================================================= */

            <div
              className="
                mt-10

                grid
                gap-8

                lg:grid-cols-[1fr_420px]
                xl:grid-cols-[1fr_430px]
              "
            >
              {/* LEFT */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: -30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  duration: 0.6,
                }}
              >
                {!checkoutData ? (
                  <CheckoutForm
                    onContinue={handleContinue}
                  />
                ) : (
                  <OrderReview
                    customer={checkoutData}
                    onBack={handleBack}
                    onConfirm={handleConfirm}
                  />
                )}

                {/* Confirming */}

                {confirming && (
                  <div
                    className="
                      mt-4

                      text-center

                      text-xs

                      uppercase

                      tracking-[0.25em]

                      text-zinc-500
                    "
                  >
                    Creating your order...
                  </div>
                )}
              </motion.div>

              {/* RIGHT */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 30,
                }}
                animate={{
                  opacity: 1,
                  x: 0,
                }}
                transition={{
                  delay: 0.1,
                  duration: 0.6,
                }}
                className="
                  self-start

                  lg:sticky
                  lg:top-24
                "
              >
                <OrderSummary />
              </motion.div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}