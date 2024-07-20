import React, { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Swal from 'sweetalert2';
import  './index.module.css';

const stripePromise = loadStripe('pk_test_51PZcwlRpFhNUXZTvCzaR5Js0Uvh20H3HWalXba6BfULYctWMIwcIpd5A4s7BVIgIZHgUrTMzGrSr6rYqUWeB4iNL00ywcjXrZU');

const CARD_ELEMENT_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
  }
};

const CheckoutForm = ({ amount }) => {
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [name, setName] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      billing_details: { name }
    });

    if (error) {
      setError(error.message);
      setProcessing(false);
      return;
    }

    try {
      const { data } = await axios.post('http://localhost:3000/api/payment', {
        amount,
        paymentMethodId: paymentMethod.id,
        return_url: `${window.location.origin}/payment-result`, // Add this line

      });

      if (data.success) {
        if (data.requiresAction) {
          // If 3D Secure is required, handle the extra action
          const { error: confirmError } = await stripe.confirmCardPayment(data.clientSecret);
          if (confirmError) {
            throw new Error(confirmError.message);
          }
        }
        Swal.fire({
          title: 'Success!',
          text: 'Payment was successful.',
          icon: 'success',
          confirmButtonText: 'OK'
        });
        // Handle successful payment (e.g., update UI, clear cart, etc.)
      } else {
        throw new Error('Payment failed');
      }
    } catch (error) {
      setError('Payment failed. Please try again.');
      Swal.fire({
        title: 'Error!',
        text: 'Payment failed. Please try again.',
        icon: 'error',
        confirmButtonText: 'OK'
      });
    }

    setProcessing(false);
  };

  return (
    <form onSubmit={handleSubmit} className="stripe-form">
      <div className="form-row">
        <label htmlFor="name">Name on Card</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div className="form-row">
        <label htmlFor="card-element">Credit or debit card</label>
        <CardElement id="card-element" options={CARD_ELEMENT_OPTIONS} />
      </div>
      {error && <div className="card-error">{error}</div>}
      <button type="submit" disabled={!stripe || processing}>
        Pay ${amount}
      </button>
    </form>
  );
};

const StripeCheckout = ({ amount }) => (
  <Elements stripe={stripePromise}>
    <CheckoutForm amount={amount} />
  </Elements>
);

export default StripeCheckout;