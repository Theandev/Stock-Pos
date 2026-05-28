import { Link } from 'react-router-dom';
import { FaChartBar } from 'react-icons/fa';
import ProductList from "../components/ProductList";

export default function HomePage() {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}>
        <Link
          to="/reports"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 1.5rem',
            backgroundColor: '#111827',
            color: '#fff',
            borderRadius: '999px',
            textDecoration: 'none',
            boxShadow: '0 16px 50px rgba(37, 99, 235, 0.15)',
            fontWeight: 600,
          }}
        >
          <FaChartBar />
          View Ordered Products Report
        </Link>
      </div>
      <ProductList />
    </div>
  );
}
