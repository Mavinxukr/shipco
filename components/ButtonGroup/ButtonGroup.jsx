import React from 'react';
import PropTypes from 'prop-types';
import styles from './ButtonGroup.scss';

const ButtonGroup = ({
  children, className, vertical, ...attrs
}) => (
  <div className={styles.btnGroup} {...attrs}>
    {children}
  </div>
);

ButtonGroup.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  vertical: PropTypes.bool,
};

ButtonGroup.defaultProps = {
  children: null,
  className: '',
  vertical: false,
};

export default ButtonGroup;
