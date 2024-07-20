import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import styles from './index.module.css';

const HomePage = () => {
  const fadeIn = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.molasses,
  });

  const popIn = useSpring({
    from: { transform: 'scale(0.8)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 },
    config: config.wobbly,
    delay: 300,
  });

  const slideIn = useSpring({
    from: { transform: 'translateX(-100%)' },
    to: { transform: 'translateX(0)' },
    config: config.slow,
    delay: 600,
  });

  return (
    <div className={styles.homePage}>
      <animated.div style={fadeIn} className={styles.heroSection}>
        <h1>Welcome to the Future</h1>
        <p>Innovate. Create. Inspire.</p>
      </animated.div>

      <animated.div style={popIn} className={styles.featuresSection}>
        <div className={styles.feature}>
          <i className="fas fa-rocket"></i>
          <h2>Fast</h2>
          <p>Lightning-quick performance</p>
        </div>
        <div className={styles.feature}>
          <i className="fas fa-lock"></i>
          <h2>Secure</h2>
          <p>Your data, protected</p>
        </div>
        <div className={styles.feature}>
          <i className="fas fa-magic"></i>
          <h2>Intuitive</h2>
          <p>User-friendly interface</p>
        </div>
      </animated.div>

      <animated.div style={slideIn} className={styles.ctaSection}>
        <h2>Ready to Get Started?</h2>
        <button className={styles.ctaButton}>Join Now</button>
      </animated.div>

      <div className={styles.backgroundAnimation}>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
        <div className={styles.circle}></div>
      </div>
    </div>
  );
};

export default HomePage;