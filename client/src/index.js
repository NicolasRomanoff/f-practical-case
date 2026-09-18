import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import CartSidebar from "./components/CartSidebar";
import { CartProvider } from "./components/contexts/cart/cart.provider";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <CartProvider>
      <App />
      <CartSidebar />
    </CartProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
