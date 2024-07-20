import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import styles from './Map.module.css';

const Map = () => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const mapAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(-50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { duration: 1000 },
  });

  const formAnimation = useSpring({
    from: { opacity: 0, transform: 'translateX(50px)' },
    to: { opacity: 1, transform: 'translateX(0)' },
    config: { duration: 1000 },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the email to your server
    console.log('Subscribed with email:', email);
    setIsSubscribed(true);
  };

  return (
    <div className={styles.mapSection}>
      <animated.div style={mapAnimation} className={styles.mapContainer}>
        <div className={styles.mapOverlay}>
          <h2>Visit Us</h2>
          <p>Times Square, New York, NY 10036</p>
        </div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.222624711289!2d-73.98632368405977!3d40.75879597932666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1626710807929!5w600!5h450"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          title="Google Map"
        ></iframe>
      </animated.div>
      <animated.div style={formAnimation} className={styles.newsletterContainer}>
        <h2>Stay Updated</h2>
        <p>Subscribe to our newsletter for the latest news and offers.</p>
        {isSubscribed ? (
          <div className={styles.successMessage}>
            Thank you for subscribing!
          </div>
        ) : (
          <form onSubmit={handleSubmit} className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit">Subscribe</button>
          </form>
        )}
      </animated.div>
    </div>
  );
};

export default Map;