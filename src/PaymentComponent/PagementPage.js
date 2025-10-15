import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
  const navigate = useNavigate();
  const [paymentLoading, setPaymentLoading] = useState(false);

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handlePayment = async () => {
    setPaymentLoading(true);
    
    try {
      // Load Razorpay script dynamically
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        throw new Error('Razorpay SDK failed to load');
      }

      // Create order through backend API
      const orderResponse = await fetch('http://localhost:5000/api/create-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: 1999, // Send amount in rupees (backend converts to paise)
          currency: 'INR'
        }),
      });

      if (!orderResponse.ok) {
        throw new Error('Failed to create order');
      }

      const orderData = await orderResponse.json();

      // Razorpay options
      const options = {
        key: process.env.REACT_APP_RAZORPAY_KEY_ID, // From .env file
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Stoream',
        description: 'Enterprise Plan Subscription',
        order_id: orderData.id,
        handler: async (response) => {
          // Verify payment through backend
          const verificationResponse = await fetch('http://localhost:5000/api/verify-payment', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(response),
          });

          if (!verificationResponse.ok) {
            throw new Error('Payment verification failed');
          }

          navigate('/payment-success');
        },
        prefill: {
          name: 'User Name',
          email: 'user@example.com',
          contact: '9999999999'
        },
        theme: {
          color: '#6a11cb'
        },
        notes: {
          plan: 'enterprise'
        },
        modal: {
          ondismiss: () => {
            setPaymentLoading(false);
          }
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      console.error('Payment error:', error);
      alert('Payment failed: ' + error.message);
      setPaymentLoading(false);
    }
  };

  return (
    <div className="payment-page">
      <div className="payment-container">
        <h2 className="text-center mb-4">Complete Payment</h2>
        <div className="payment-card">
          <div className="payment-details">
            <h4>Plan: Enterprise (₹1999/year)</h4>
            <p>Includes unlimited access to all movies</p>
          </div>
          <button
            className="btn btn-primary w-100 payment-btn"
            onClick={handlePayment}
            disabled={paymentLoading}
          >
            {paymentLoading ? (
              <div className="spinner-border text-light" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            ) : (
              <>
                Pay with Razorpay <i className="bi bi-wallet2"></i>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;