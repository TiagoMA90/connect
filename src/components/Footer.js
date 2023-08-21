import React from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';

import styles from '../styles/Footer.module.css';

const Footer = () => {
  return (
    <Container className={`${styles.container} p-4 mt-2`}>
      <div className={styles.contactContainer}>
        <div className={styles.contactAndIconsContainer}>
          <span>Contact us: </span>
          <div className={styles.iconContainer}>
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
              <i className="fa-brands fa-x-twitter"></i>
            </a>
          </div>
        </div>
        <div className={styles.copyright}>
          <span>© 2023 Copyright • Connect</span>
        </div>
      </div>
    </Container>
  );
};

export default Footer;
