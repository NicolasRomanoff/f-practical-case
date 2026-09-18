import { useMemo, useState } from "react";
import { CartContext } from "./cart.context";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (newProduct) => {
    if (!newProduct.stock) return;

    setCart((prev) => {
      if (!prev.length) return [{ product: newProduct, quantity: 1 }];

      const productFind = prev.find(({ product }) => {
        return product.product_variants_id === newProduct.product_variants_id;
      });
      if (!productFind) return [...prev, { product: newProduct, quantity: 1 }];
      if (productFind.product.stock <= productFind.quantity) return prev;

      return prev.map(({ product, quantity }) => {
        if (product.product_variants_id !== newProduct.product_variants_id) {
          return { product, quantity };
        }
        return { product, quantity: quantity + 1 };
      });
    });
  };

  const deleteOneFromCart = (newProduct) => {
    setCart((prev) => {
      return prev
        .map(({ product, quantity }) => {
          if (product.product_variants_id !== newProduct.product_variants_id) {
            return { product, quantity };
          }
          if (!(quantity - 1)) return null;

          return { product, quantity: quantity - 1 };
        })
        .filter(Boolean);
    });
  };

  const deleteLineFromCart = (newProduct) => {
    setCart((prev) => {
      return prev
        .map(({ product, quantity }) => {
          if (product.product_variants_id !== newProduct.product_variants_id) {
            return { product, quantity };
          }
          return null;
        })
        .filter(Boolean);
    });
  };

  const deleteCart = () => setCart([]);

  const totalPrice = useMemo(() => {
    const initialValue = 0;
    return cart.reduce(
      (price, { product, quantity }) => price + product.price * quantity,
      initialValue,
    );
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        deleteOneFromCart,
        deleteLineFromCart,
        deleteCart,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
