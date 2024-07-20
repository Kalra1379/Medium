import React from 'react';
import { useSpring, animated, config } from 'react-spring';
import styles from './index.module.css';

const ServiceCard = ({ icon, title, description, delay }) => {
  const cardAnimation = useSpring({
    from: { opacity: 0, transform: 'translateY(50px)' },
    to: { opacity: 1, transform: 'translateY(0)' },
    config: config.wobbly,
    delay,
  });

  return (
    <animated.div style={cardAnimation} className={styles.serviceCard}>
      <div className={styles.iconWrapper}>
        <i className={`fas ${icon}`}></i>
      </div>
      <h3>{title}</h3>
      <p>{description}</p>
    </animated.div>
  );
};

const ServicesSection = () => {
  const services = [
    {
      icon: 'fa-code',
      title: 'Web Development',
      description: 'Create stunning, responsive websites tailored to your needs.',
    },
    {
      icon: 'fa-mobile-alt',
      title: 'Mobile Apps',
      description: 'Develop powerful mobile applications for iOS and Android.',
    },
    {
      icon: 'fa-chart-line',
      title: 'Data Analytics',
      description: 'Gain valuable insights from your data with advanced analytics.',
    },
    {
      icon: 'fa-cloud',
      title: 'Cloud Solutions',
      description: 'Scalable and secure cloud infrastructure for your business.',
    },
  ];

  const sectionAnimation = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: config.molasses,
  });

  return (
    <animated.section style={sectionAnimation} className={styles.servicesSection}>
      <h2>Our Services</h2>
      <div className={styles.serviceGrid}>
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            icon={service.icon}
            title={service.title}
            description={service.description}
            delay={index * 100}
          />
        ))}
      </div>
    </animated.section>
  );
};

export default ServicesSection;