import React, { useState } from 'react';
import StripeCheckout from '../StripeCheckout';

const ProductPage = () => {
  const [showPayment, setShowPayment] = useState(false);
  const product = {
    name: 'Example Product',
    description: 'This is a sample product description.',
    price: 19
  };

  return (
    <div className="product-page">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      {!showPayment ? (
        <button onClick={() => setShowPayment(true)}>Buy Now</button>
      ) : (
        <StripeCheckout amount={product.price} />
      )}
    </div>
  );
};

export default ProductPage;