import React from 'react';
import PropTypes from 'prop-types';
import styles from './HoverPopup.scss';

const HoverPopup = ({ children }) => (
  <div className={styles.popup}>
    { children }
  </div>
);

HoverPopup.propTypes = {
  children: PropTypes.node,
};

export default HoverPopup;
