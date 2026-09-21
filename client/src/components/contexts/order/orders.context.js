import { createContext, useContext } from "react";

export const OrdersContext = createContext(undefined);

export const useOrders = () => {
  const ctx = useContext(OrdersContext);
  if (!ctx) {
    throw new Error("useOrders must be used within a OrdersProvider");
  }
  return ctx;
};
