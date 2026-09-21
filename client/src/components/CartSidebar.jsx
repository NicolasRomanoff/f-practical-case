import { useCart } from "./contexts/cart/cart.context";
import { useCatalog } from "./contexts/catalog/catalog.context";

const CartSidebar = () => {
  const { refetch } = useCatalog();
  const {
    cart,
    addToCart,
    deleteOneFromCart,
    deleteLineFromCart,
    deleteCart,
    totalPrice,
  } = useCart();

  const handleOrder = async (cart) => {
    if (!cart.length) return;

    try {
      const products = cart.map(({ product, quantity }) => {
        return {
          product_id: product.product_id,
          product_variant_id: product.product_variant_id,
          quantity,
        };
      });
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart: products }),
      });
      const json = await response.json();
      if (!response.ok) {
        throw new Error(json.message || "Could not order");
      }
      deleteCart();
      refetch();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="sidebar">
      <h2>Your Cart</h2>
      <div className="cart">
        {cart.map(({ product, quantity }) => {
          return (
            <div key={product.product_variant_id} className="cart-element">
              <h3>{product.name}</h3>
              <p>{product.configuration}</p>
              <div className="cart-actions">
                <button onClick={() => deleteOneFromCart(product)}>-</button>
                <p>{quantity}</p>
                <button
                  disabled={product.stock <= quantity}
                  onClick={() => addToCart(product)}
                >
                  +
                </button>
                <button onClick={() => deleteLineFromCart(product)}>
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="sidebar-actions">
        <p>Total : {totalPrice} €</p>
        <button disabled={!cart.length} onClick={() => handleOrder(cart)}>
          Order
        </button>
        <button disabled={!cart.length} onClick={deleteCart}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default CartSidebar;
