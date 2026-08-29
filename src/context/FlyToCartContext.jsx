import {
  createContext,
  useContext,
  useRef,
  useState,
} from "react";

const FlyToCartContext = createContext(null);

export function FlyToCartProvider({ children }) {
  const [animation, setAnimation] = useState(null);

  const cartRef = useRef(null);

  const flyToCart = ({ image, start }) => {
    const carts = document.querySelectorAll(
      '[data-cart-target="true"]'
    );

    let visibleCart = null;

    carts.forEach((cart) => {
      const rect = cart.getBoundingClientRect();

      if (
        rect.width > 0 &&
        rect.height > 0
      ) {
        visibleCart = cart;
      }
    });

    if (!visibleCart) {
      console.warn("❌ No visible cart found");
      return;
    }

    const cartRect =
      visibleCart.getBoundingClientRect();

    const end = {
      x: cartRect.left + cartRect.width / 2,
      y: cartRect.top + cartRect.height / 2,
    };

    console.log("🚀 FLY DEBUG");
    console.log("START:", start);
    console.log("CART:", cartRect);
    console.log("END:", end);

    setAnimation({
      id: Date.now(),
      image,
      start,
      end,
    });
  };

  const clearAnimation = () => {
    setAnimation(null);
  };

  return (
    <FlyToCartContext.Provider
      value={{
        animation,
        flyToCart,
        clearAnimation,
        cartRef,
      }}
    >
      {children}
    </FlyToCartContext.Provider>
  );
}

export function useFlyToCart() {
  const context = useContext(FlyToCartContext);

  if (!context) {
    throw new Error(
      "useFlyToCart must be used inside FlyToCartProvider"
    );
  }

  return context;
}