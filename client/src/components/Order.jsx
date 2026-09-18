import { useEffect, useState } from "react";
import { OrderDetailsButton, OrderDetailsDialog } from "./OrderDetailsDialog";

const Order = () => {
  const [ordersHistory, setOrdersHistory] = useState([]);
  const [filteredOrdersHistory, setFilteredOrdersHistory] = useState([]);
  const [loadingOrdersHistory, setLoadingOrdersHistory] = useState(false);
  const [orderDetails, setOrderDetails] = useState(null);
  const [orderSearch, setOrderSearch] = useState("");

  useEffect(() => {
    fetchOrdersHistory();
  }, []);

  useEffect(() => {
    let nextOrders = [...ordersHistory];

    if (orderSearch.trim()) {
      const normalized = orderSearch.toLowerCase();
      nextOrders = nextOrders.filter((order) => {
        return String(order.create_at || "")
          .toLowerCase()
          .includes(normalized);
      });
    }
    setFilteredOrdersHistory(nextOrders);
  }, [ordersHistory, orderSearch]);

  const fetchOrdersHistory = async () => {
    setLoadingOrdersHistory(true);
    try {
      const response = await fetch("/api/orders");
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Could not load orders history");
      }
      setOrdersHistory(Array.isArray(json) ? json : []);
    } catch (error) {
      console.error(error);
    }
    setLoadingOrdersHistory(false);
  };

  return (
    <>
      <OrderDetailsDialog
        orderDetails={orderDetails}
        setOrderDetails={setOrderDetails}
      />
      <section className="panel">
        <h3>Filters</h3>
        <div className="filters">
          <label>
            Search
            <input
              value={orderSearch}
              onChange={(event) => setOrderSearch(event.target.value)}
              placeholder="Search date"
            />
          </label>
        </div>
        <h3>Order History {loadingOrdersHistory ? "(loading...)" : ""}</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Item Count</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrdersHistory.map((order) => {
              return (
                <tr key={order.id}>
                  <td>{order.create_at}</td>
                  <td>{order.item_count}</td>
                  <td>{order.total_amount} €</td>
                  <td>
                    <OrderDetailsButton onClick={() => setOrderDetails(order)}>
                      Show Details
                    </OrderDetailsButton>
                  </td>
                </tr>
              );
            })}
            {filteredOrdersHistory.length === 0 ? (
              <tr>
                <td colSpan="4">No order found</td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default Order;
