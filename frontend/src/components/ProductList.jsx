import React, { useState, useEffect } from "react";

const ProductList = (props) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [cartCount, setCartCount] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPayment, setShowPayment] = useState(false);

  const [paymentForm, setPaymentForm] = useState({
    fullName: "",
    email: "",
    idCardNumber: "",
    bankName: "",
    accountNumber: "",
    routingNumber: "",
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/products");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        console.error("Fetch process broke:", err);
        setError(
          "Could not connect to the backend server. Please verify it is running on port 5000.",
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleOrderClick = (product) => {
    setCartCount((prev) => prev + 1);
    setSelectedProduct(product);
    setShowPayment(true);
  };

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    alert(
      `Payment verification submitted successfully for ${selectedProduct.name}!`,
    );
    setShowPayment(false);
    setSelectedProduct(null);
    setPaymentForm({
      fullName: "",
      email: "",
      idCardNumber: "",
      bankName: "",
      accountNumber: "",
      routingNumber: "",
    });
  };

  const inputStyle = {
    width: "100%",
    padding: "0.625rem 0.75rem",
    border: "1px solid #d1d5db",
    borderRadius: "6px",
    fontSize: "0.9375rem",
    boxSizing: "border-box",
  };
  const labelStyle = {
    display: "block",
    fontSize: "0.875rem",
    fontWeight: "500",
    color: "#374151",
    marginBottom: "0.375rem",
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
                  onClick={() => handleOrderClick(product)}
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
                  Order Now
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {showPayment && selectedProduct && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            backdropFilter: "blur(4px)",
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "2rem",
              borderRadius: "12px",
              width: "100%",
              maxWidth: "480px",
              maxHeight: "90vh",
              overflowY: "auto",
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "1.25rem",
              }}
            >
              <h3
                style={{
                  margin: 0,
                  fontSize: "1.25rem",
                  fontWeight: "700",
                  color: "#111827",
                }}
              >
                Secure Bank Checkout
              </h3>
              <button
                onClick={() => setShowPayment(false)}
                style={{
                  background: "none",
                  border: "none",
                  fontSize: "1.5rem",
                  cursor: "pointer",
                  color: "#9ca3af",
                }}
              >
                &times;
              </button>
            </div>

            <p
              style={{
                margin: "0 0 1.5rem 0",
                fontSize: "0.9375rem",
                color: "#4b5563",
              }}
            >
              Purchasing:{" "}
              <strong style={{ color: "#111827" }}>
                {selectedProduct.name}
              </strong>{" "}
              for{" "}
              <strong>${parseFloat(selectedProduct.price).toFixed(2)}</strong>
            </p>

            <form
              onSubmit={handlePaymentSubmit}
              style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
            >
              <div>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="Enter your name..."
                  value={paymentForm.fullName}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, fullName: e.target.value })
                  }
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email..."
                  value={paymentForm.email}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, email: e.target.value })
                  }
                  style={inputStyle}
                />
              </div>

              <div>
                <label style={labelStyle}>ID Card / Passport Number</label>
                <input
                  type="text"
                  required
                  placeholder="A12345678"
                  value={paymentForm.idCardNumber}
                  onChange={(e) =>
                    setPaymentForm({
                      ...paymentForm,
                      idCardNumber: e.target.value,
                    })
                  }
                  style={inputStyle}
                />
              </div>

              <div
                style={{ borderTop: "1px solid #e5e7eb", margin: "0.5rem 0" }}
              ></div>

              <div>
                <label style={labelStyle}>Bank Name</label>
                <input
                  type="text"
                  required
                  placeholder="Global Trust Bank"
                  value={paymentForm.bankName}
                  onChange={(e) =>
                    setPaymentForm({ ...paymentForm, bankName: e.target.value })
                  }
                  style={inputStyle}
                />
              </div>

              <div style={{ display: "flex", gap: "1rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Account Number</label>
                  <input
                    type="text"
                    required
                    placeholder="1234567890"
                    value={paymentForm.accountNumber}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        accountNumber: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={labelStyle}>Routing Number</label>
                  <input
                    type="text"
                    required
                    placeholder="987654321"
                    value={paymentForm.routingNumber}
                    onChange={(e) =>
                      setPaymentForm({
                        ...paymentForm,
                        routingNumber: e.target.value,
                      })
                    }
                    style={inputStyle}
                  />
                </div>
              </div>

              <div
                style={{ display: "flex", gap: "1rem", marginTop: "1.25rem" }}
              >
                <button
                  type="button"
                  onClick={() => setShowPayment(false)}
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    backgroundColor: "#f3f4f6",
                    border: "1px solid #d1d5db",
                    borderRadius: "6px",
                    fontWeight: "500",
                    cursor: "pointer",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{
                    flex: 1,
                    padding: "0.75rem",
                    backgroundColor: "#2563eb",
                    color: "white",
                    border: "none",
                    borderRadius: "6px",
                    fontWeight: "600",
                    cursor: "pointer",
                  }}
                >
                  Verify Payment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductList;
