import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div
        style={{
          padding: "2rem",
          color: "#9ca3af",
          textAlign: "center",
          fontSize: "0.875rem",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        Product data unavailable
      </div>
    );
  }

  const name = product.name || "Unnamed Product";
  const price = product.price || 0;
  const stock = product.stock !== undefined ? product.stock : 0;
  const imageUrl = product.imageUrl || "https://unsplash.com";
  const id = product.id || "#";
  const isOutOfStock = stock === 0;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        borderRadius: "12px",
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        boxShadow:
          "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
        fontFamily: "system-ui, -apple-system, sans-serif",
        transition: "transform 0.2s, box-shadow 0.2s",
      }}
    >
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "240px",
          backgroundColor: "#f3f4f6",
        }}
      >
        <img
          src={imageUrl}
          alt={name}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {isOutOfStock && (
          <div
            style={{
              position: "absolute",
              top: "12px",
              left: "12px",
              backgroundColor: "#ef4444",
              color: "#ffffff",
              padding: "0.25rem 0.5rem",
              borderRadius: "4px",
              fontSize: "0.75rem",
              fontWeight: "600",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            Sold Out
          </div>
        )}
      </div>

      <div
        style={{
          padding: "1.25rem",
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          gap: "0.5rem",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "1.125rem",
            fontWeight: "600",
            color: "#111827",
            lineHeight: "1.4",
          }}
        >
          {name}
        </h3>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginTop: "auto",
            paddingTop: "0.5rem",
          }}
        >
          <span
            style={{ fontSize: "1.25rem", fontWeight: "700", color: "#111827" }}
          >
            ${Number(price).toFixed(2)}
          </span>
          <span
            style={{
              fontSize: "0.8125rem",
              fontWeight: "500",
              color: isOutOfStock ? "#ef4444" : "#10b981",
              display: "flex",
              alignItems: "center",
              gap: "0.25rem",
            }}
          >
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: isOutOfStock ? "#ef4444" : "#10b981",
              }}
            ></span>
            {isOutOfStock ? "Out of Stock" : `In Stock (${stock})`}
          </span>
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            marginTop: "1rem",
          }}
        >
          <button
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
            style={{
              width: "100%",
              padding: "0.75rem 1rem",
              background: isOutOfStock ? "#e5e7eb" : "#2563eb",
              color: isOutOfStock ? "#9ca3af" : "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontWeight: "600",
              fontSize: "0.9375rem",
              cursor: isOutOfStock ? "not-allowed" : "pointer",
              transition: "background-color 0.2s",
            }}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>

          <Link
            to={`/product/${id}`}
            style={{
              display: "block",
              textAlign: "center",
              textDecoration: "none",
              color: "#4b5563",
              fontSize: "0.875rem",
              fontWeight: "500",
              padding: "0.5rem",
              borderRadius: "6px",
              border: "1px solid #d1d5db",
              transition: "background-color 0.2s, color 0.2s",
            }}
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
