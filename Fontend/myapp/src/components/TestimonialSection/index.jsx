import React, { useState, useEffect } from 'react';
import { useTransition, animated, config } from 'react-spring';
import styles from './index.module.css';

const testimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'CEO, TechCorp',
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    text: 'This product has revolutionized our workflow. Highly recommended!',
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Designer, CreativeStudio',
    image: 'https://randomuser.me/api/portraits/women/2.jpg',
    text: 'The user interface is intuitive and the features are exactly what we needed.',
  },
  {
    id: 3,
    name: 'Mike Johnson',
    role: 'Developer, InnoSoft',
    image: 'https://randomuser.me/api/portraits/men/3.jpg',
    text: 'The support team is fantastic. They have been incredibly helpful throughout our integration.',
  },
];

const TestimonialSection = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((state) => (state + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const transitions = useTransition(testimonials[index], {
    from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
    enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
    leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    config: config.molasses,
  });

  return (
    <section className={styles.testimonialSection}>
      <h2>What Our Clients Say</h2>
      <div className={styles.testimonialContainer}>
        {transitions((style, item) => (
          <animated.div style={style} className={styles.testimonial}>
            <div className={styles.testimonialContent}>
              <img src={item.image} alt={item.name} className={styles.testimonialImage} />
              <blockquote>{item.text}</blockquote>
              <footer>
                <cite>{item.name}</cite>
                <span>{item.role}</span>
              </footer>
            </div>
          </animated.div>
        ))}
      </div>
      <div className={styles.indicators}>
        {testimonials.map((_, i) => (
          <button
            key={i}
            className={`${styles.indicator} ${i === index ? styles.active : ''}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  );
};

export default TestimonialSection;