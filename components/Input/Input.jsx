import React from 'react';
import PropTypes from 'prop-types';
import styles from './Input.scss';

const Input = ({
  placeholder,
  addInputProps,
  icon,
  classNameWrapperForIcon,
  onClickForIcon,
}) => (
  <div className={styles.inputBlock}>
    <input
      className={styles.input}
      placeholder={placeholder}
      {...addInputProps}
    />
    {icon && (
      <button type="button" className={classNameWrapperForIcon} onClick={onClickForIcon}>
        {icon}
      </button>
    )}
  </div>
);

Input.propTypes = {
  classNameWrapperForIcon: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  onClickForIcon: PropTypes.func,
  addInputProps: PropTypes.object,
};

export default Input;
