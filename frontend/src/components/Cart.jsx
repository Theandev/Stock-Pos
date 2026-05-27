import { useCart } from "../contexts/CartContext";
import CartItem from "./CartItem";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div
        style={{
          maxWidth: "800px",
          margin: "4rem auto",
          padding: "0 1rem",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: "600",
            color: "#111827",
            marginBottom: "0.5rem",
          }}
        >
          Your cart is empty
        </h2>
        <p style={{ color: "#4b5563", marginBottom: "1.5rem" }}>
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/"
          style={{
            display: "inline-block",
            backgroundColor: "#2563eb",
            color: "#ffffff",
            padding: "0.75rem 1.5rem",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "500",
            fontSize: "0.875rem",
          }}
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "2rem auto",
        padding: "0 1rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.75rem",
          fontWeight: "700",
          color: "#111827",
          marginBottom: "2rem",
          borderBottom: "2px solid #f3f4f6",
          paddingBottom: "1rem",
        }}
      >
        Shopping Cart
      </h2>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeFromCart={removeFromCart}
          />
        ))}
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
          gap: "1.25rem",
          marginTop: "2rem",
          paddingTop: "1.5rem",
          borderTop: "1px solid #e5e7eb",
        }}
      >
        <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem" }}>
          <span
            style={{ fontSize: "1rem", color: "#4b5563", fontWeight: "500" }}
          >
            Subtotal
          </span>
          <span
            style={{ fontSize: "1.5rem", fontWeight: "700", color: "#111827" }}
          >
            ${total.toFixed(2)}
          </span>
        </div>

        <p style={{ margin: 0, fontSize: "0.875rem", color: "#6b7280" }}>
          Shipping and taxes calculated at checkout.
        </p>

        <Link
          to="/checkout"
          style={{ textDecoration: "none", width: "100%", maxWidth: "240px" }}
        >
          <button
            style={{
              width: "100%",
              backgroundColor: "#2563eb",
              color: "#ffffff",
              border: "none",
              padding: "0.875rem 1.5rem",
              borderRadius: "6px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: "pointer",
              transition: "background-color 0.2s",
            }}
          >
            Proceed to Checkout
          </button>
        </Link>
      </div>
    </div>
  );
}
