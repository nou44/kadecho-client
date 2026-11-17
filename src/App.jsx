
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import AppRoutes from "./routes/AppRoutes";
import LoadingScreen from "./components/loading/LoadingScreen";

import FlyToCart from "./components/Cart/FlyToCart";
import { useFlyToCart } from "./context/FlyToCartContext";
import ScrollToTop from "./components/layout/ScrollToTop";

/* ==========================================
   LOADING CONFIG
========================================== */

const SESSION_KEY = "kadecho-intro-seen";

// Development: true = show on every refresh
// Production: false = show once per tab session
const PREVIEW_LOADER = import.meta.env.DEV;

// Duration long enough to see the animations
const LOADER_DURATION = 2000;

export default function App() {
  const [loading, setLoading] = useState(() => {
    if (PREVIEW_LOADER) return true;

    try {
      return sessionStorage.getItem(SESSION_KEY) !== "true";
    } catch {
      return true;
    }
  });

  const { animation, clearAnimation } = useFlyToCart();

  /* ==========================================
     LOADING TIMER
  ========================================== */

  useEffect(() => {
    if (!loading) return;

    const timer = window.setTimeout(() => {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // Storage may be unavailable
      }

      setLoading(false);
    }, LOADER_DURATION);

    return () => window.clearTimeout(timer);
  }, [loading]);

  return (
    <>
      {/* ======================================
          MAIN APPLICATION
      ====================================== */}

      <AppRoutes />

      <ScrollToTop />

      <FlyToCart
        animation={animation}
        onComplete={clearAnimation}
      />

      {/* ======================================
          CINEMATIC LOADER
      ====================================== */}

      <AnimatePresence mode="sync">
        {loading && (
          <motion.div
            key="kadecho-loader"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: {
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
            className="fixed inset-0 z-[9999]"
          >
            <LoadingScreen />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
