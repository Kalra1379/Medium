import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useInView } from 'react-intersection-observer';
import styles from './index.module.css';

const AnimatedCounter = ({ end, duration }) => {
  const [inViewRef, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { number } = useSpring({
    from: { number: 0 },
    number: inView ? end : 0,
    delay: 200,
    config: { duration: duration },
  });

  return (
    <div ref={inViewRef}>
      <animated.span>{number.to((n) => Math.floor(n))}</animated.span>
    </div>
  );
};

const CounterSection = () => {
  const counters = [
    { end: 1000, duration: 2000, label: 'Happy Clients' },
    { end: 500, duration: 2500, label: 'Projects Completed' },
    { end: 50, duration: 3000, label: 'Team Members' },
    { end: 100, duration: 2800, label: 'Awards Won' },
  ];

  return (
    <section className={styles.counterSection}>
      <div className={styles.counterGrid}>
        {counters.map((counter, index) => (
          <div key={index} className={styles.counterItem}>
            <AnimatedCounter end={counter.end} duration={counter.duration} />
            <p>{counter.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CounterSection;