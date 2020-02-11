import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './InputFormWrapper.scss';
import Input from '../Input/Input';

const InputFormWrapper = ({
  label,
  inputProps,
  icon,
  classNameWrapperForIcon,
  onClickForIcon,
  meta,
  placeholder,
  classNameWrapper,
  classNameWrapperForInput,
}) => (
  <div
    className={cx(styles.wrapper, classNameWrapper)}
  >
    <label className={styles.label}>{label}</label>
    <Input
      placeholder={placeholder}
      addInputProps={inputProps}
      classNameWrapper={cx(styles.inputWrapper, classNameWrapperForInput)}
      icon={icon}
      classNameWrapperForIcon={classNameWrapperForIcon}
      onClickForIcon={onClickForIcon}
    />
    {meta.touched && meta.error && <p className={styles.error}>{meta.error}</p>}
  </div>
);

InputFormWrapper.propTypes = {
  classNameWrapperForIcon: PropTypes.string,
  label: PropTypes.string,
  inputProps: PropTypes.object,
  onClickForIcon: PropTypes.func,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  classNameWrapperForInput: PropTypes.string,
  classNameWrapper: PropTypes.string,
};

export default InputFormWrapper;
