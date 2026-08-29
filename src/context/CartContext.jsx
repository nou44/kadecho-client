import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "kadecho_cart";

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  // مهم:
  // كنستناو حتى نقراو localStorage قبل ما نبداو نحفظو items
  const [hydrated, setHydrated] = useState(false);

  // =====================================================
  // LOAD CART FROM LOCAL STORAGE
  // =====================================================

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);

      if (savedCart) {
        const parsedCart = JSON.parse(savedCart);

        if (Array.isArray(parsedCart)) {
          setItems(parsedCart);
        }
      }
    } catch (error) {
      console.error("❌ Load cart error:", error);
      localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  // =====================================================
  // SAVE CART
  // =====================================================

  useEffect(() => {
    // ما نحفظوش حتى نكونو سالينا load
    if (!hydrated) return;

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(items)
      );
    } catch (error) {
      console.error("❌ Save cart error:", error);
    }
  }, [items, hydrated]);

  // =====================================================
  // ADD TO CART
  // =====================================================

  const addToCart = (product, quantity = 1) => {
    if (!product?._id) {
      throw new Error("Invalid product");
    }

    const productId = product._id.toString();
    const qty = Number(quantity) || 1;

    setItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          item.productId?.toString() === productId
      );

      // Product already exists
      if (existingItem) {
        return currentItems.map((item) =>
          item.productId?.toString() === productId
            ? {
                ...item,
                quantity:
                  Number(item.quantity || 0) + qty,
              }
            : item
        );
      }

      // New product
      return [
        ...currentItems,
        {
          _id: `cart_${Date.now()}_${productId}`,

          productId,

          name: product.name || "",
          title: product.name || "",

          image: product.image || "",

          price: Number(product.price) || 0,

          category: product.category || "",

          description: product.description || "",

          material: product.material || "",

          finish: product.finish || "",

          quantity: qty,
        },
      ];
    });
  };

  // =====================================================
  // INCREASE
  // =====================================================

  const increaseQuantity = (item) => {
    setItems((currentItems) =>
      currentItems.map((cartItem) =>
        cartItem._id === item._id
          ? {
              ...cartItem,
              quantity:
                Number(cartItem.quantity || 0) + 1,
            }
          : cartItem
      )
    );
  };

  // =====================================================
  // DECREASE
  // =====================================================

  const decreaseQuantity = (item) => {
    setItems((currentItems) =>
      currentItems
        .map((cartItem) => {
          if (cartItem._id !== item._id) {
            return cartItem;
          }

          const newQuantity =
            Number(cartItem.quantity || 0) - 1;

          if (newQuantity <= 0) {
            return null;
          }

          return {
            ...cartItem,
            quantity: newQuantity,
          };
        })
        .filter(Boolean)
    );
  };

  // =====================================================
  // UPDATE QUANTITY
  // =====================================================

  const updateCartItem = (itemId, quantity) => {
    const newQuantity = Number(quantity);

    setItems((currentItems) => {
      if (newQuantity <= 0) {
        return currentItems.filter(
          (item) => item._id !== itemId
        );
      }

      return currentItems.map((item) =>
        item._id === itemId
          ? {
              ...item,
              quantity: newQuantity,
            }
          : item
      );
    });
  };

  // =====================================================
  // REMOVE
  // =====================================================

  const removeFromCart = (item) => {
    setItems((currentItems) =>
      currentItems.filter(
        (cartItem) => cartItem._id !== item._id
      )
    );
  };

  // =====================================================
  // REMOVE BY ID
  // =====================================================

  const removeCartItem = (itemId) => {
    setItems((currentItems) =>
      currentItems.filter(
        (item) => item._id !== itemId
      )
    );
  };

  // =====================================================
  // CLEAR
  // =====================================================

  const clearCart = () => {
    setItems([]);
  };

  // =====================================================
  // TOTAL ITEMS
  // =====================================================

  const totalItems = items.reduce(
    (total, item) =>
      total + Number(item.quantity || 0),
    0
  );

  // =====================================================
  // SUBTOTAL
  // =====================================================

  const subtotal = items.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) *
        Number(item.quantity || 0),
    0
  );

  // =====================================================
  // CONTEXT
  // =====================================================

  return (
    <CartContext.Provider
      value={{
        items,
        loading,

        totalItems,
        subtotal,

        addToCart,

        increaseQuantity,
        decreaseQuantity,

        updateCartItem,

        removeFromCart,
        removeCartItem,

        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// =====================================================
// HOOK
// =====================================================

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}