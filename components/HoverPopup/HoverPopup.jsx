import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './HoverPopup.scss';

const HoverPopup = ({ children, customClass }) => (
  <div className={cx(styles.popup, customClass)}>{children}</div>
);

HoverPopup.propTypes = {
  children: PropTypes.node,
  customClass: PropTypes.string,
};

export default HoverPopup;
