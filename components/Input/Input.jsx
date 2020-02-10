import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.scss';

const Input = ({
  placeholder,
  addInputProps,
}) => {

  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      {...addInputProps}
    />
  );
};

Input.propTypes = {
  placeholder: PropTypes.string,
  addInputProps: PropTypes.object,
};

export default Input;
