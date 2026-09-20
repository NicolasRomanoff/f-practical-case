import { useEffect, useState } from "react";
import { OrdersContext } from "./orders.context";

export const OrdersProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/orders");
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Could not load orders");
      }
      setOrders(Array.isArray(json) ? json : []);
    } catch (error) {
      setIsError(error);
    }
    setIsLoading(false);
  };

  return (
    <OrdersContext.Provider value={{ orders, isLoading, isError }}>
      {children}
    </OrdersContext.Provider>
  );
};
