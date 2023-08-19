import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <Container className={`${styles.container} p-4 mt-2`} style={{ border: '1px solid #ccc', backgroundColor: 'white' }}>
      <div className={styles.contactContainer}>
        <div className={styles.contactAndIconsContainer} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <span style={{ display: 'inline-block', marginRight: '10px' }}>Contact us:</span>
          <div className={styles.iconContainer} style={{ display: 'inline-block' }}>
            <NavLink
              className={styles.NavLink}
              activeClassName={styles.Active}
              to="/contact"
            >
              <i className="fas fa-envelope"></i>
            </NavLink>
            <a
              className={styles.NavLink}
              href="https://github.com/TiagoMA90/connect"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-github"></i>
            </a>
            <a
              className={styles.NavLink}
              href="https://twitter.com/home"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fab fa-twitter"></i>
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
