import { createContext, useContext } from "react";

export const CartContext = createContext(undefined);

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};
