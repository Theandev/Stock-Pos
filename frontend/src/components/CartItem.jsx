export default function CartItem({ item, updateQuantity, removeFromCart }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: "1.5rem",
        padding: "1rem 0",
        borderBottom: "1px solid #e5e7eb",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "1.5rem",
          flex: 1,
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          style={{
            width: "90px",
            height: "90px",
            objectFit: "cover",
            borderRadius: "8px",
            backgroundColor: "#f3f4f6",
            border: "1px solid #f3f4f6",
          }}
        />
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}
        >
          <h4
            style={{
              margin: 0,
              fontSize: "1rem",
              fontWeight: "600",
              color: "#111827",
            }}
          >
            {item.name}
          </h4>
          <p style={{ margin: 0, fontSize: "0.875rem", color: "#4b5563" }}>
            ${item.price.toFixed(2)}
          </p>
          <button
            onClick={() => removeFromCart(item.id)}
            style={{
              alignSelf: "start",
              background: "none",
              border: "none",
              padding: 0,
              marginTop: "0.5rem",
              fontSize: "0.8125rem",
              color: "#dc2626",
              cursor: "pointer",
              fontWeight: "500",
              textDecoration: "underline",
            }}
          >
            Remove
          </button>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "2rem" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
          }}
        >
          <button
            disabled={item.quantity <= 1}
            onClick={() => updateQuantity(item.id, item.quantity - 1)}
            style={{
              padding: "0.5rem 0.75rem",
              background: "none",
              border: "none",
              cursor: item.quantity <= 1 ? "not-allowed" : "pointer",
              opacity: item.quantity <= 1 ? 0.3 : 1,
              fontSize: "1rem",
            }}
          >
            −
          </button>
          <span
            style={{
              minWidth: "24px",
              textAlign: "center",
              fontSize: "0.875rem",
              fontWeight: "500",
            }}
          >
            {item.quantity}
          </span>
          <button
            disabled={item.quantity >= item.stock}
            onClick={() => updateQuantity(item.id, item.quantity + 1)}
            style={{
              padding: "0.5rem 0.75rem",
              background: "none",
              border: "none",
              cursor: item.quantity >= item.stock ? "not-allowed" : "pointer",
              opacity: item.quantity >= item.stock ? 0.3 : 1,
              fontSize: "1rem",
            }}
          >
            +
          </button>
        </div>

        <span
          style={{
            fontSize: "1rem",
            fontWeight: "600",
            color: "#111827",
            minWidth: "80px",
            textAlign: "right",
          }}
        >
          ${(item.price * item.quantity).toFixed(2)}
        </span>
      </div>
    </div>
  );
}
