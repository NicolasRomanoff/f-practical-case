import { useEffect, useState } from "react";
import { OrderDetailsButton, OrderDetailsDialog } from "./OrderDetailsDialog";
import { useOrders } from "./contexts/order/orders.context";

const OrdersTable = ({ filteredOrders, setOrderDetails }) => {
  const { isLoading, isError } = useOrders();

  if (isLoading || isError) {
    return (
      <tr>
        <td colSpan="4">{isLoading ? "Loading..." : "Error"}</td>
      </tr>
    );
  }

  return (
    <tbody>
      {filteredOrders.map((order) => {
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
      {!filteredOrders.length && (
        <tr>
          <td colSpan="4">No order found</td>
        </tr>
      )}
    </tbody>
  );
};

const Orders = () => {
  const { orders, isLoading } = useOrders();
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [orderDetails, setOrderDetails] = useState(null);
  const [ordersSearch, setOrdersSearch] = useState("");

  useEffect(() => {
    let nextOrders = [...orders];

    if (ordersSearch.trim()) {
      const normalized = ordersSearch.toLowerCase();
      nextOrders = nextOrders.filter((order) => {
        return String(order.create_at || "")
          .toLowerCase()
          .includes(normalized);
      });
    }
    setFilteredOrders(nextOrders);
  }, [orders, ordersSearch]);

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
              value={ordersSearch}
              onChange={(event) => setOrdersSearch(event.target.value)}
              placeholder="Search date"
            />
          </label>
        </div>
        <h3>Order History {isLoading ? "(loading...)" : ""}</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Item Count</th>
              <th>Total Price</th>
              <th>Actions</th>
            </tr>
          </thead>
          <OrdersTable
            filteredOrders={filteredOrders}
            setOrderDetails={setOrderDetails}
          />
        </table>
      </section>
    </>
  );
};

export default Orders;
