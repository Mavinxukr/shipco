import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './InputFormWrapper.scss';
import Input from '../Input/Input';

const InputFormWrapper = ({
  label,
  inputProps,
  meta,
  placeholder,
  classNameWrapper,
  classNameWrapperForInput,
}) => (
  <div className={cx(styles.wrapper, classNameWrapper)}>
    <label className={styles.label}>{ label }</label>
    <Input
      placeholder={placeholder}
      addInputProps={inputProps}
      classNameWrapper={cx(styles.inputWrapper, classNameWrapperForInput)}
    />
    {meta.touched && meta.error && <p className={styles.error}>{meta.error}</p>}
  </div>
);

InputFormWrapper.propTypes = {
  label: PropTypes.string,
  inputProps: PropTypes.object,
  meta: PropTypes.object,
  placeholder: PropTypes.string,
  classNameWrapperForInput: PropTypes.string,
  classNameWrapper: PropTypes.string,
};

export default InputFormWrapper;
