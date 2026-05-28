import { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function SuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isValidSession, setIsValidSession] = useState(false);
  const orderId = location.state?.orderId;

  useEffect(() => {
    if (!location.state?.fromCheckout || !orderId) {
      navigate('/', { replace: true });
      return;
    }

    setIsValidSession(true);
    localStorage.removeItem('cart');
  }, [location, navigate, orderId]);

  if (!isValidSession) return null;

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>✅ Order Successful!</h2>
      <p>Thank you for your purchase. Your order ID is: {orderId}</p>
      <Link to="/" replace>Continue Shopping</Link>
    </div>
  );
}
