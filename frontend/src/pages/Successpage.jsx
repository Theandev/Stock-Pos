import { useEffect, useState } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';

export default function SuccessPage(e) {
  const { orderId } = useParams<{ orderId: string }>(e);
  const navigate = useNavigate();
  const location = useLocation();
  const [isValidSession, setIsValidSession] = useState(false);

  useEffect(() => {
    
    if (!location.state?.fromCheckout) {
      navigate('/', { replace: true });
      return;
    }

  
    setIsValidSession(true);

  
    localStorage.removeItem('cart'); 
    
 
  }, [location, navigate]);

  if (!isValidSession) return null;

  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <h2>✅ Order Successful!</h2>
      <p>Thank you for your purchase. Your order ID is: {orderId}</p>
      <Link to="/" replace>Continue Shopping</Link>
    </div>
  );
}
