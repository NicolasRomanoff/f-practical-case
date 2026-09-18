import { useCart } from "./contexts/cart/cart.context";

const CartSidebar = () => {
  const {
    cart,
    addToCart,
    deleteOneFromCart,
    deleteLineFromCart,
    deleteCart,
    totalPrice,
  } = useCart();

  const handleOrder = (cart) => {};

  return (
    <div className="sidebar">
      <h2>Your Cart</h2>
      <div className="cart">
        {cart.map(({ product, quantity }) => {
          return (
            <div key={product.product_variants_id} className="cart-element">
              <h3>{product.name}</h3>
              <p>{product.configuration}</p>
              <div className="cart-actions">
                <button onClick={() => deleteOneFromCart(product)}>-</button>
                <p>{quantity}</p>
                <button onClick={() => addToCart(product)}>+</button>
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
        <button onClick={() => handleOrder(cart)}>Order</button>
        <button onClick={deleteCart}>Delete</button>
      </div>
    </div>
  );
};

export default CartSidebar;
