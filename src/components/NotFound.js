import React from 'react';
import NoResults from '../assets/no-results.png';
import styles from '../styles/NotFound.module.css';

const Asset = ({ src, message }) => {
  return (
    <div className={styles.assetContainer}>
      <img src={src} alt="No Results" />
      <p>{message}</p>
    </div>
  );
};

const NotFound = () => {
  return (
    <div className={styles.container}>
      <Asset src={NoResults} message="Sorry, the page you reached does not exist" />
    </div>
  );
};

export default NotFound;