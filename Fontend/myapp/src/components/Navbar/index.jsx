import React, { useState, useEffect } from 'react';
import { FaReact, FaBars, FaTimes, FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Add this state to manage login status

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.navbarContainer}>
        <div className={styles.navbarLogo}>
          <FaReact className={styles.logoIcon} />
          <span>React App</span>
        </div>
        <div className={`${styles.navbarMenu} ${isOpen ? styles.active : ''}`}>
          <Link to="/" onClick={toggleMenu}>Home</Link>
          <Link to="/about" onClick={toggleMenu}>About</Link>
          <Link to="/services" onClick={toggleMenu}>Services</Link>
          <Link to="/contact" onClick={toggleMenu}>Contact</Link>
        </div>
        <div className={styles.navbarAuth}>
          {isLoggedIn ? (
            <button className={styles.authButton} onClick={() => setIsLoggedIn(false)}>
              <FaUser /> Logout
            </button>
          ) : (
            <>
              <Link to="/login" className={styles.authButton}>Login</Link>
              <Link to="/signup" className={styles.authButton}>Sign Up</Link>
            </>
          )}
        </div>
        <div className={styles.navbarToggle} onClick={toggleMenu}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;