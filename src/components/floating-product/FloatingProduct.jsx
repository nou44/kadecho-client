import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import FloatingCard from "./FloatingCard";

const API_URL =
  `${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/products`;

export default function FloatingProduct() {
  const [visible, setVisible] = useState(false);
  const [product, setProduct] = useState(null);

  const productsRef = useRef([]);
  const indexRef = useRef(0);

  const showTimerRef = useRef(null);
  const hideTimerRef = useRef(null);
  const intervalRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const clearHideTimer = () => {
      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }
    };

    const showNextProduct = () => {
      if (!mounted) return;

      const products = productsRef.current;

      if (!products.length) return;

      let attempts = 0;
      let nextProduct = null;

      while (attempts < products.length) {
        const currentProduct =
          products[indexRef.current];

        indexRef.current =
          (indexRef.current + 1) %
          products.length;

        attempts++;

        if (
          currentProduct?.images &&
          currentProduct.images.length > 0
        ) {
          nextProduct = currentProduct;
          break;
        }
      }

      if (!nextProduct || !mounted) return;

      /*
       * Cancel previous hide timer
       * before showing the new product.
       */
      clearHideTimer();

      setProduct(nextProduct);
      setVisible(true);

      /*
       * Keep THIS product visible
       * for 6 seconds.
       */
      hideTimerRef.current = setTimeout(() => {
        if (!mounted) return;

        setVisible(false);
        hideTimerRef.current = null;
      }, 6000);
    };

    const loadProducts = async () => {
      try {
        const response = await fetch(API_URL);

        const data = await response.json();

        if (!response.ok || !data.success) {
          throw new Error(
            data.message ||
              "Failed to fetch products"
          );
        }

        const products =
          data.products || [];

        if (!products.length || !mounted) {
          return;
        }

        /*
         * Keep backend order.
         */
        productsRef.current = products;

        /*
         * Start from Product 1.
         */
        indexRef.current = 0;

        /*
         * First product after 5 seconds.
         */
        showTimerRef.current = setTimeout(() => {
          showNextProduct();
        }, 5000);

        /*
         * Every 30 seconds:
         *
         * Product 1
         * ↓
         * wait 30s
         * Product 2
         * ↓
         * wait 30s
         * Product 3
         */
        intervalRef.current = setInterval(() => {
          showNextProduct();
        }, 30000);
      } catch (error) {
        console.error(
          "❌ Floating product error:",
          error
        );
      }
    };

    loadProducts();

    return () => {
      mounted = false;

      if (showTimerRef.current) {
        clearTimeout(showTimerRef.current);
        showTimerRef.current = null;
      }

      if (hideTimerRef.current) {
        clearTimeout(hideTimerRef.current);
        hideTimerRef.current = null;
      }

      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      };
    };
  }, []);

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
          onClose={() => {
            setVisible(false);
          }}
        />
      )}
    </AnimatePresence>
  );
}