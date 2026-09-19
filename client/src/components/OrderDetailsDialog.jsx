import Dialog from "./Dialog";

const ORDER_DETAILS_DIALOG_ID = "order-details-modal";

export const OrderDetailsButton = ({ onClick, children }) => {
  return (
    <button
      command="show-modal"
      commandfor={ORDER_DETAILS_DIALOG_ID}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export const OrderDetailsDialog = ({ orderDetails, setOrderDetails }) => {
  return (
    <Dialog id={ORDER_DETAILS_DIALOG_ID} onClose={() => setOrderDetails(null)}>
      {orderDetails && (
        <section className="panel">
          <h3>Order Details</h3>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Configuration</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {orderDetails.items.map((item) => {
                return (
                  <tr key={item.product_variant_id}>
                    <td>{item.product_name}</td>
                    <td>{item.configuration}</td>
                    <td>{item.unit_price} €</td>
                    <td>{item.quantity}</td>
                    <td>{item.line_total} €</td>
                  </tr>
                );
              })}
              {orderDetails.items.length === 0 ? (
                <tr>
                  <td colSpan="5">No product found</td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </section>
      )}
    </Dialog>
  );
};
