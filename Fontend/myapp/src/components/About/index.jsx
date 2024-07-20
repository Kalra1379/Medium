import React from 'react';
import styles from './index.module.css';

const About = () => {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.heroSection}>
        <h1>About Our Company</h1>
        <p>Innovating for a brighter tomorrow</p>
      </div>
      
      <div className={styles.contentSection}>
        <div className={styles.imageSection}>
          <img src="/path/to/your/company-image.jpg" alt="Our Company" />
        </div>
        
        <div className={styles.textSection}>
          <h2>Our Story</h2>
          <p>
            Founded in 2010, our company has been at the forefront of technological innovation for over a decade. 
            We believe in harnessing the power of technology to solve real-world problems and improve people's lives.
          </p>
          
          <h3>Our Mission</h3>
          <p>
            To create cutting-edge solutions that empower businesses and individuals to reach their full potential in the digital age.
          </p>
          
          <h3>Our Values</h3>
          <ul>
            <li>Innovation</li>
            <li>Integrity</li>
            <li>Collaboration</li>
            <li>Excellence</li>
          </ul>
          
          <div className={styles.statSection}>
            <div className={styles.stat}>
              <span className={styles.statNumber}>10+</span>
              <span className={styles.statLabel}>Years of Excellence</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>500+</span>
              <span className={styles.statLabel}>Happy Clients</span>
            </div>
            <div className={styles.stat}>
              <span className={styles.statNumber}>50+</span>
              <span className={styles.statLabel}>Team Members</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;