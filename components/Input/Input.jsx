import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Input.scss';

const Input = ({
  placeholder,
  addInputProps,
  icon,
  customInput,
  classNameWrapperForIcon,
  onClickForIcon,
}) => (
  <div className={styles.inputBlock}>
    <input
      className={cx(styles.input, customInput)}
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
  customInput: PropTypes.string,
  classNameWrapperForIcon: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  onClickForIcon: PropTypes.func,
  addInputProps: PropTypes.object,
};

export default Input;
