import React, { useEffect, useMemo, useState } from "react";

const DEFAULT_CATEGORIES = ["t-shirt", "zoe"];

function ProductCreateModal({ onClose, onCreated, token }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState(DEFAULT_CATEGORIES[0]);
  const [imageUrl, setImageUrl] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = useMemo(() => DEFAULT_CATEGORIES, []);

  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") onClose && onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        name: name.trim(),
        description: description.trim() || null,
        price: price === "" ? undefined : Number(price),
        stock: stock === "" ? undefined : Number(stock),
        category,
        imageUrl: imageUrl.trim() || null,
      };

      if (!payload.name) throw new Error("Product name is required");
      if (payload.price === undefined || Number.isNaN(payload.price)) {
        throw new Error("Valid price is required");
      }
      if (payload.stock === undefined || Number.isNaN(payload.stock)) {
        throw new Error("Valid stock is required");
      }
      if (!payload.category) throw new Error("Category is required");

      const res = await fetch(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data?.error || "Failed to create product");
      }

      const created = await res.json();
      onCreated && onCreated(created);
      onClose && onClose();
    } catch (e2) {
      setError(e2?.message || "Failed to create product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose && onClose();
      }}
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0,0,0,0.4)",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          width: 420,
          maxWidth: "calc(100vw - 24px)",
          background: "#fff",
          borderRadius: 10,
          padding: 20,
          boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
        }}
      >
        <h3 style={{ marginTop: 0 }}>Add Product (Admin)</h3>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            Name
            <input value={name} onChange={(e) => setName(e.target.value)} required />
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            Description
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} />
          </label>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              Price
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputMode="decimal"
                placeholder="0.00"
                required
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              Stock
              <input
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                inputMode="numeric"
                placeholder="0"
                required
              />
            </label>
          </div>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            Category
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>

          <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            Image URL (optional)
            <input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://..." />
          </label>

          {error && <div style={{ color: "#dc2626", fontWeight: 600 }}>{error}</div>}

          <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 6 }}>
            <button type="button" onClick={onClose} style={{ padding: "8px 12px" }} disabled={loading}>
              Cancel
            </button>
            <button type="submit" style={{ padding: "8px 12px", fontWeight: 700 }} disabled={loading}>
              {loading ? "Saving…" : "Create Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ProductCreateModal;

