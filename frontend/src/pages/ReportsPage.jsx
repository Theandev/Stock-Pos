import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchOrderReports } from "../services/api";
import { useNavigate } from 'react-router-dom';

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadReports = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Admins only. Please sign in with an admin account.');
        setLoading(false);
        return;
      }

      try {
        const response = await fetchOrderReports(token);
        setReports(response.data);
      } catch (err) {
        console.error("Unable to load order reports:", err);
        if (err?.response?.status === 403) {
          setError('Access denied. Admins only.');
        } else if (err?.response?.status === 401) {
          setError('Unauthorized. Please sign in.');
        } else {
          setError("Unable to load order reports. Please try again later.");
        }
      } finally {
        setLoading(false);
      }
    };

    loadReports();
  }, [navigate]);

  return (
    <div
      style={{
        maxWidth: "1100px",
        margin: "3rem auto",
        padding: "0 1rem",
        fontFamily: "system-ui, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: "2rem",
              fontWeight: 700,
              color: "#111827",
            }}
          >
            Ordered Products Report
          </h1>
          <p style={{ margin: "8px 0 0", color: "#4b5563" }}>
            View sales performance for products that have been ordered.
          </p>
        </div>
        <Link
          to="/"
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "0.9rem 1.4rem",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: 600,
          }}
        >
          Back to Store
        </Link>
      </div>

      {loading ? (
        <div
          style={{ padding: "3rem 0", textAlign: "center", color: "#6b7280" }}
        >
          Loading report...
        </div>
      ) : error ? (
        <div
          style={{
            padding: "2rem",
            backgroundColor: "#fef2f2",
            border: "1px solid #fee2e2",
            borderRadius: "12px",
            color: "#dc2626",
          }}
        >
          {error}
        </div>
      ) : reports.length === 0 ? (
        <div
          style={{
            padding: "2rem",
            backgroundColor: "#f8fafc",
            border: "1px solid #e2e8f0",
            borderRadius: "12px",
            color: "#475569",
          }}
        >
          No ordered products found yet.
        </div>
      ) : (
        <div
          style={{
            overflowX: "auto",
            borderRadius: "14px",
            border: "1px solid #e5e7eb",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              minWidth: "760px",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f8fafc", color: "#111827" }}>
                <th
                  style={{
                    textAlign: "left",
                    padding: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Product
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Units Sold
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Revenue
                </th>
                <th
                  style={{
                    textAlign: "left",
                    padding: "1rem",
                    borderBottom: "1px solid #e5e7eb",
                  }}
                >
                  Orders
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr
                  key={report.id}
                  style={{ borderBottom: "1px solid #e5e7eb" }}
                >
                  <td
                    style={{
                      padding: "1rem",
                      display: "flex",
                      alignItems: "center",
                      gap: "1rem",
                    }}
                  >
                    <img
                      src={
                        report.imageUrl ||
                        "https://via.placeholder.com/80?text=No+Image"
                      }
                      alt={report.name}
                      style={{
                        width: "72px",
                        height: "72px",
                        objectFit: "cover",
                        borderRadius: "12px",
                        border: "1px solid #e5e7eb",
                      }}
                    />
                    <div>
                      <strong style={{ display: "block", color: "#111827" }}>
                        {report.name}
                      </strong>
                      <span style={{ fontSize: "0.9rem", color: "#64748b" }}>
                        Product ID: {report.id}
                      </span>
                    </div>
                  </td>
                  <td style={{ padding: "1rem", color: "#111827" }}>
                    {report.totalQuantity}
                  </td>
                  <td style={{ padding: "1rem", color: "#111827" }}>
                    ${Number(report.totalRevenue).toFixed(2)}
                  </td>
                  <td style={{ padding: "1rem", color: "#111827" }}>
                    {report.orderCount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
