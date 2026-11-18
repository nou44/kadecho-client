
import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import { AnimatePresence } from "framer-motion";

import FloatingCard from "./FloatingCard";

const API_URL = `${
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api"
}/products`;

const FIRST_DELAY = 5000;
const PRODUCT_INTERVAL = 30000;
const VISIBLE_DURATION = 6000;

const getProductImage = (product) => {
  const firstImage = product?.images?.[0];

  if (typeof firstImage === "string" && firstImage.trim()) {
    return firstImage;
  }

  if (
    typeof product?.image === "string" &&
    product.image.trim()
  ) {
    return product.image;
  }

  return null;
};

export default function FloatingProduct() {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(null);

  const productsRef = useRef([]);
  const indexRef = useRef(0);

  const showTimerRef = useRef(null);
  const hideTimerRef = useRef(null);

  const pageVisibleRef = useRef(
    typeof document === "undefined" ||
      document.visibilityState === "visible"
  );

  const clearShowTimer = useCallback(() => {
    if (showTimerRef.current !== null) {
      window.clearTimeout(showTimerRef.current);
      showTimerRef.current = null;
    }
  }, []);

  const clearHideTimer = useCallback(() => {
    if (hideTimerRef.current !== null) {
      window.clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  }, []);

  const closeProduct = useCallback(() => {
    clearHideTimer();
    setVisible(false);
  }, [clearHideTimer]);

  const showNextProduct = useCallback(() => {
    if (!pageVisibleRef.current) return;

    const products = productsRef.current;

    if (!products.length) return;

    const nextProduct = products[indexRef.current];

    indexRef.current =
      (indexRef.current + 1) % products.length;

    if (!nextProduct) return;

    clearHideTimer();

    setProduct(nextProduct);
    setVisible(true);

    hideTimerRef.current = window.setTimeout(() => {
      setVisible(false);
      hideTimerRef.current = null;
    }, VISIBLE_DURATION);
  }, [clearHideTimer]);

  const scheduleNextProduct = useCallback(
    (delay = PRODUCT_INTERVAL) => {
      clearShowTimer();

      if (
        !pageVisibleRef.current ||
        !productsRef.current.length
      ) {
        return;
      }

      showTimerRef.current = window.setTimeout(() => {
        showTimerRef.current = null;

        if (!pageVisibleRef.current) return;

        showNextProduct();
        scheduleNextProduct(PRODUCT_INTERVAL);
      }, delay);
    },
    [clearShowTimer, showNextProduct]
  );

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
            data.message || "Failed to load products"
          );
        }

        const validProducts = (
          Array.isArray(data.products)
            ? data.products
            : []
        )
          .filter(
            (item) =>
              item?._id &&
              getProductImage(item)
          )
          .map((item) => ({
            id: item._id,
            name: item.name || item.title || "Premium Creation",
            price: item.price,
            category: item.category || "Collection",
            image: getProductImage(item),
          }));

        if (!validProducts.length) return;

        productsRef.current = validProducts;
        indexRef.current = 0;

        scheduleNextProduct(FIRST_DELAY);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(
            "Floating product error:",
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
      productsRef.current = [];
    };
  }, [
    scheduleNextProduct,
    clearShowTimer,
    clearHideTimer,
  ]);

  /* =====================================================
     PAGE VISIBILITY
  ===================================================== */

  useEffect(() => {
    const handleVisibilityChange = () => {
      const isVisible =
        document.visibilityState === "visible";

      pageVisibleRef.current = isVisible;

      if (!isVisible) {
        clearShowTimer();
        clearHideTimer();
        setVisible(false);
        return;
      }

      // Resume with a fresh delay.
      // Avoid showing a card immediately on tab return.
      if (productsRef.current.length) {
        scheduleNextProduct(FIRST_DELAY);
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
  }, [
    clearShowTimer,
    clearHideTimer,
    scheduleNextProduct,
  ]);

  return (
    <AnimatePresence mode="wait">
      {visible && product && (
        <FloatingCard
          key={product.id}
          product={product}
          onClose={closeProduct}
        />
      )}
    </AnimatePresence>
  );
}
