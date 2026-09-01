import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { AnimatePresence } from "framer-motion";

import FloatingCard from "./FloatingCard";

const API_URL =
  `${
    import.meta.env.VITE_API_URL ||
    "http://localhost:5000/api"
  }/products`;

const FIRST_DELAY = 5000;
const PRODUCT_INTERVAL = 30000;
const VISIBLE_DURATION = 6000;

export default function FloatingProduct() {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(null);

  const productsRef = useRef([]);
  const indexRef = useRef(0);

  const showTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const isPageVisibleRef = useRef(
    document.visibilityState === "visible"
  );

  /* =====================================================
     CLEAR TIMERS
  ===================================================== */

  const clearShowTimer = useCallback(() => {
    if (showTimerRef.current) {
      clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  }, []);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  /* =====================================================
     CLOSE CARD
  ===================================================== */

  const closeProduct = useCallback(() => {
    clearHideTimer();
    setVisible(false);
  }, [clearHideTimer]);

  /* =====================================================
     SHOW NEXT PRODUCT

     1 → 2 → 3 → ... → 1
  ===================================================== */

  const showNextProduct = useCallback(() => {
    const products = productsRef.current;

    if (
      !isPageVisibleRef.current ||
      !products.length
    ) {
      return;
    }

    const nextProduct =
      products[indexRef.current];

    indexRef.current =
      (indexRef.current + 1) %
      products.length;

    if (!nextProduct) return;

    clearHideTimer();

    setProduct(nextProduct);
    setVisible(true);

    /* Hide after 6 seconds */

    hideTimerRef.current = window.setTimeout(() => {
      if (!isPageVisibleRef.current) return;

      setVisible(false);
      hideTimerRef.current = null;
    }, VISIBLE_DURATION);
  }, [clearHideTimer]);

  /* =====================================================
     FETCH PRODUCTS
  ===================================================== */

  useEffect(() => {
    const controller = new AbortController();

    const loadProducts = async () => {
      try {
        const response = await fetch(API_URL, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch products: ${response.status}`
          );
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(
            data.message ||
            "Failed to fetch products"
          );
        }

        /*
          Filter once.

          This is better than checking all products
          every 30 seconds.
        */

        const validProducts = (
          data.products || []
        ).filter(
          (item) =>
            item?._id &&
            Array.isArray(item.images) &&
            item.images.length > 0 &&
            item.images[0]
        );

        if (!validProducts.length) {
          return;
        }

        /*
          Keep backend order.

          Product 1 → Product 2 → Product 3
        */

        productsRef.current = validProducts;
        indexRef.current = 0;

        /* First product after 5 seconds */

        showTimerRef.current =
          window.setTimeout(() => {
            showNextProduct();
          }, FIRST_DELAY);

      } catch (error) {
        /*
          Don't show error when component
          intentionally aborts the request.
        */

        if (error.name !== "AbortError") {
          console.error(
            "❌ Floating product error:",
            error
          );
        }
      }
    };

    loadProducts();

    return () => {
      controller.abort();

      clearShowTimer();
      clearHideTimer();
    };
  }, [
    showNextProduct,
    clearShowTimer,
    clearHideTimer,
  ]);

  /* =====================================================
     PRODUCT LOOP

     Runs every 30 seconds.

     Product 1
     ↓
     30s
     ↓
     Product 2
     ↓
     30s
     ↓
     Product 3
     ↓
     LOOP → Product 1
  ===================================================== */

  useEffect(() => {
    let intervalRef = null;

    const startLoop = () => {
      if (intervalRef) return;

      intervalRef = window.setInterval(() => {
        if (!isPageVisibleRef.current) return;

        showNextProduct();
      }, PRODUCT_INTERVAL);
    };

    /*
      Small delay to ensure products have
      enough time to load first.
    */

    const startTimer = window.setTimeout(() => {
      startLoop();
    }, 1000);

    return () => {
      clearTimeout(startTimer);

      if (intervalRef) {
        clearInterval(intervalRef);
      }
    };
  }, [showNextProduct]);

  /* =====================================================
     PAGE VISIBILITY

     Stop unnecessary UI updates
     when user changes browser tab.
  ===================================================== */

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisibleNow =
        document.visibilityState === "visible";

      isPageVisibleRef.current = isVisibleNow;

      if (!isVisibleNow) {
        clearHideTimer();
        setVisible(false);
      }
    };

    document.addEventListener(
      "visibilitychange",
      handleVisibilityChange
    );

    return () => {
      document.removeEventListener(
        "visibilitychange",
        handleVisibilityChange
      );
    };
  }, [clearHideTimer]);

  /* =====================================================
     RENDER
  ===================================================== */

  return (
    <AnimatePresence mode="wait">
      {visible && product && (
        <FloatingCard
          key={product._id}
          product={{
            id: product._id,
            name: product.name,
            price: product.price,
            category: product.category,
            image: product.images[0],
          }}
          onClose={closeProduct}
        />
      )}
    </AnimatePresence>
  );
}