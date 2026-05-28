import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { fetchProducts } from "../services/api";

const ProductList = () => {
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        setProducts(response.data);
      } catch (err) {
        console.error("Unable to load products:", err);
        setError(
          "Could not connect to the backend server. Please verify it is running.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
  };
  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "50vh",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p style={{ fontSize: "1.125rem", color: "#6b7280" }}>
          Loading products from database...
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "4rem auto",
          padding: "1.5rem",
          backgroundColor: "#fef2f2",
          border: "1px solid #fee2e2",
          borderRadius: "8px",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <p style={{ color: "#dc2626", margin: 0, fontWeight: "600" }}>
          Error: {error}
        </p>
      </div>
    );
  }
  return (
    <div
      style={{
        padding: "2rem max(20px, calc((100% - 1200px) / 2))",
        fontFamily: "system-ui, sans-serif",
        backgroundColor: "#f9fafb",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "2.5rem",
          borderBottom: "1px solid #e5e7eb",
          paddingBottom: "1rem",
        }}
      >
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: "700",
            color: "#111827",
            margin: 0,
          }}
        >
          Available Products
        </h2>
        <div
          style={{ position: "relative", cursor: "pointer", padding: "8px" }}
        >
        </div>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
          gap: "2rem",
        }}
      >
        {products.map((product) => {
          const isOutOfStock = product.stock === 0;
          return (
            <div
              key={product.id}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                background: "#ffffff",
                border: "1px solid #e5e7eb",
                boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                overflow: "hidden",
              }}
            >
             
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "220px",
                  backgroundColor: "#f3f4f6",
                }}
              >
                <img
                  src={
                    product.imageUrl ||
                    "https://via.placeholder.com/300?text=No+Image"
                  }
                  alt={product.name}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/300?text=Image+Error";
                  }}
                />
                {isOutOfStock && (
                  <span
                    style={{
                      position: "absolute",
                      top: "12px",
                      right: "12px",
                      backgroundColor: "rgba(0,0,0,0.75)",
                      color: "white",
                      fontSize: "0.7rem",
                      fontWeight: "bold",
                      padding: "4px 8px",
                      borderRadius: "20px",
                      textTransform: "uppercase",
                      backdropFilter: "blur(4px)",
                    }}
                  >
                    Out of Stock
                  </span>
                )}
              </div>

              <div
                style={{
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  flexGrow: 1,
                }}
              >
                <h3
                  style={{
                    margin: "0 0 0.5rem 0",
                    fontSize: "1.125rem",
                    fontWeight: "600",
                    color: "#111827",
                  }}
                >
                  {product.name}
                </h3>
                <p
                  style={{
                    margin: "0 0 1.25rem 0",
                    fontSize: "0.875rem",
                    color: "#4b5563",
                    lineHeight: "1.5",
                    flexGrow: 1,
                  }}
                >
                  {product.description}
                </p>

                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    justifyContent: "space-between",
                    marginBottom: "1rem",
                  }}
                >
                  <span
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: "700",
                      color: "#111827",
                    }}
                  >
                    ${parseFloat(product.price).toFixed(2)}
                  </span>
                  <span
                    style={{
                      fontSize: "0.8125rem",
                      color: isOutOfStock ? "#ef4444" : "#6b7280",
                      fontWeight: "500",
                    }}
                  >
                    {isOutOfStock ? "Out of stock" : `${product.stock} left`}
                  </span>
                </div>

                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={isOutOfStock}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    backgroundColor: isOutOfStock ? "#e5e7eb" : "#2563eb",
                    color: isOutOfStock ? "#9ca3af" : "#ffffff",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    fontSize: "0.9375rem",
                    cursor: isOutOfStock ? "not-allowed" : "pointer",
                    transition: "background-color 0.2s",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default ProductList;
