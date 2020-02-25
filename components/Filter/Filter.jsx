import React from 'react';
import PropTypes from 'prop-types';
import styles from './Filter.scss';

const Filter = ({ children, title }) => (
  <div className={styles.filter}>
    <p className={styles.titleFilter}>{title}</p>
    { children }
  </div>
);

Filter.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
};

export default Filter;
