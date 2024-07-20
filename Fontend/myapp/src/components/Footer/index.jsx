import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub } from 'react-icons/fa';
import { MdEmail, MdPhone, MdLocationOn } from 'react-icons/md';
import styles from './index.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3>About Us</h3>
          <p>We are a forward-thinking company dedicated to innovation and excellence in web development and design.</p>
        </div>
        <div className={styles.footerSection}>
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/privacy-policy">Privacy Policy</Link></li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Contact Us</h3>
          <ul>
            <li><MdEmail /> info@example.com</li>
            <li><MdPhone /> +1 (123) 456-7890</li>
            <li><MdLocationOn /> 123 Web Dev Street, Internet City, 12345</li>
          </ul>
        </div>
        <div className={styles.footerSection}>
          <h3>Follow Us</h3>
          <div className={styles.socialIcons}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer"><FaGithub /></a>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; 2023 Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;