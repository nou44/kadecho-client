import { useEffect, useState } from "react";

import AppRoutes from "./routes/AppRoutes";
import LoadingScreen from "./components/loading/LoadingScreen";

import FlyToCart from "./components/Cart/FlyToCart";
import { useFlyToCart } from "./context/FlyToCartContext";
import ScrollToTop from "./components/layout/ScrollToTop";

export default function App() {
  const [loading, setLoading] = useState(true);

  const {
    animation,
    clearAnimation,
  } = useFlyToCart();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <AppRoutes />

        <ScrollToTop />

      <FlyToCart
        animation={animation}
        onComplete={clearAnimation}
      />
    </>
  );
}