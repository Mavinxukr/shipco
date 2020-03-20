import React from 'react';
import styles from './Loader.scss';

const Loader = () => (
  <div className={styles.loader}>
    <div className={styles.ldsEllipsis}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
