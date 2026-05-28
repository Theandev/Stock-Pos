import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchProduct } from "../services/api";
import { useCart } from "../contexts/CartContext";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetchProduct(id)
      .then((res) => setProduct(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{ fontSize: "1.125rem", color: "#6b7280", fontWeight: "500" }}
        >
          Loading product details...
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{
          maxWidth: "1200px",
          margin: "4rem auto",
          padding: "0 1.5rem",
          textAlign: "center",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <h2 style={{ fontSize: "1.5rem", fontWeight: "600", color: "#111827" }}>
          Product not found
        </h2>
        <Link
          to="/"
          style={{
            display: "inline-block",
            marginTop: "1rem",
            color: "#2563eb",
            textDecoration: "none",
            fontWeight: "500",
          }}
        >
          Back to marketplace
        </Link>
      </div>
    );
  }

  const isOutOfStock = product.stock === 0;

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "2rem auto",
        padding: "0 1.5rem",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <Link
        to="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          color: "#4b5563",
          textDecoration: "none",
          fontSize: "0.875rem",
          fontWeight: "500",
          marginBottom: "2rem",
        }}
      >
        ← Back to products
      </Link>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))",
          gap: "3.5rem",
          alignItems: "start",
        }}
      >
        <div
          style={{
            backgroundColor: "#f9fafb",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid #f3f4f6",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            aspectRatio: "1/1",
          }}
        >
          <img
            src={product.imageUrl || "https://unsplash.com"}
            alt={product.name}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <h1
            style={{
              fontSize: "2.25rem",
              fontWeight: "700",
              color: "#111827",
              margin: "0 0 1rem 0",
              lineHeight: "1.2",
            }}
          >
            {product.name}
          </h1>

          <div
            style={{
              fontSize: "2rem",
              fontWeight: "700",
              color: "#111827",
              marginBottom: "1.5rem",
            }}
          >
            ${Number(product.price).toFixed(2)}
          </div>

          <div
            style={{
              borderTop: "1px solid #e5e7eb",
              borderBottom: "1px solid #e5e7eb",
              padding: "1.5rem 0",
              marginBottom: "2rem",
            }}
          >
            <h3
              style={{
                fontSize: "0.875rem",
                fontWeight: "600",
                color: "#374151",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                margin: "0 0 0.5rem 0",
              }}
            >
              Description
            </h3>
            <p
              style={{
                fontSize: "1rem",
                color: "#4b5563",
                lineHeight: "1.6",
                margin: 0,
              }}
            >
              {product.description || "No description available for this item."}
            </p>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              marginBottom: "2rem",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "50%",
                backgroundColor: isOutOfStock ? "#ef4444" : "#10b981",
              }}
            ></span>
            <span
              style={{
                fontSize: "0.9375rem",
                fontWeight: "500",
                color: isOutOfStock ? "#dc2626" : "#059669",
              }}
            >
              {isOutOfStock
                ? "Out of stock"
                : `In stock and ready to ship (${product.stock} available)`}
            </span>
          </div>

          <button
            onClick={() => addToCart(product)}
            disabled={isOutOfStock}
            style={{
              width: "100%",
              maxWidth: "360px",
              backgroundColor: isOutOfStock ? "#e5e7eb" : "#2563eb",
              color: isOutOfStock ? "#9ca3af" : "#ffffff",
              border: "none",
              padding: "1rem 2rem",
              borderRadius: "8px",
              fontSize: "1rem",
              fontWeight: "600",
              cursor: isOutOfStock ? "not-allowed" : "pointer",
              transition: "background-color 0.2s",
              boxShadow: isOutOfStock
                ? "none"
                : "0 4px 6px -1px rgba(37, 99, 235, 0.2)",
            }}
          >
            {isOutOfStock ? "Out of Stock" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
