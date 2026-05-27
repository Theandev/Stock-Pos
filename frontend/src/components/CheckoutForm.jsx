import { useState } from "react";
import { useCart } from "../contexts/CartContext";
import { createOrder } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    customerName: "",
    email: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const orderItems = cart.map((item) => ({
      productId: item.id,
      quantity: item.quantity,
    }));

    try {
      await createOrder({ ...form, items: orderItems });
      clearCart();
      navigate("/success");
    } catch (err) {
      setError(err.response?.data?.error || "Order failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: "100%",
    padding: "0.75rem 1rem",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "0.95rem",
    fontFamily: "inherit",
    boxSizing: "border-box",
    outline: "none",
    transition: "border-color 0.2s",
  };

  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "0.5rem",
  };

  return (
    <div
      style={{
        maxWidth: "480px",
        margin: "3rem auto",
        padding: "2rem",
        border: "1px solid #e5e7eb",
        borderRadius: "12px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h2
        style={{
          fontSize: "1.5rem",
          fontWeight: "700",
          color: "#111827",
          margin: "0 0 1.5rem 0",
        }}
      >
        Shipping Information
      </h2>

      {error && (
        <div
          style={{
            padding: "0.75rem 1rem",
            backgroundColor: "#fef2f2",
            border: "1px solid #fee2e2",
            borderRadius: "6px",
            color: "#dc2626",
            fontSize: "0.875rem",
            marginBottom: "1.5rem",
            fontWeight: "500",
          }}
        >
          {error}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
      >
        <div>
          <label style={labelStyle}>Full Name</label>
          <input
            type="text"
            placeholder="Enter name..."
            required
            onChange={(e) => setForm({ ...form, customerName: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>

        <div>
          <label style={labelStyle}>Email Address</label>
          <input
            type="email"
            placeholder="Enter email..."
            required
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            style={inputStyle}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>

        <div>
          <label style={labelStyle}>Shipping Address</label>
          <textarea
            placeholder="Street address, city, state, zip code"
            rows="3"
            required
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            style={{ ...inputStyle, resize: "vertical" }}
            onFocus={(e) => (e.target.style.borderColor = "#2563eb")}
            onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            width: "100%",
            backgroundColor: loading ? "#93c5fd" : "#2563eb",
            color: "#ffffff",
            border: "none",
            padding: "0.875rem",
            borderRadius: "6px",
            fontSize: "1rem",
            fontWeight: "600",
            cursor: loading ? "not-allowed" : "pointer",
            marginTop: "0.5rem",
            transition: "background-color 0.2s",
          }}
        >
          {loading ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}
