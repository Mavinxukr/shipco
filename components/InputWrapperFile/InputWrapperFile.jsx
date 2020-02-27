import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Input from '../Input/Input';
import styles from './InputWrapperFile.scss';

const InputWrapperFile = ({
  label,
  inputProps,
  icon,
  classNameWrapperForIcon,
  onClickForIcon,
  meta,
  classNameWrapper,
  classNameWrapperLabel,
  classNameWrapperForInput,
  notForm,
  accept,
  customInput,
}) => (
  <div className={cx(styles.wrapper, classNameWrapper)}>
    <>
      <span className={cx(styles.labelFile, classNameWrapperLabel)}>
        {label}
      </span>
      <label className={styles.fileLabel}>
        <Input
          addInputProps={inputProps}
          file
          classNameWrapper={classNameWrapperForInput}
          icon={icon}
          customInput={customInput}
          accept={accept}
          classNameWrapperForIcon={classNameWrapperForIcon}
          onClickForIcon={onClickForIcon}
        />
      </label>
    </>
    <>
      {notForm ? null : (
        <>
          {meta.touched && meta.error && (
            <p className={styles.error}>{meta.error}</p>
          )}
        </>
      )}
    </>
  </div>
);

InputWrapperFile.propTypes = {
  classNameWrapperForIcon: PropTypes.string,
  classNameWrapperLabel: PropTypes.string,
  label: PropTypes.string,
  inputProps: PropTypes.object,
  onClickForIcon: PropTypes.func,
  meta: PropTypes.object,
  notForm: PropTypes.bool,
  customInput: PropTypes.string,
  icon: PropTypes.node,
  classNameWrapperForInput: PropTypes.string,
  classNameWrapper: PropTypes.string,
  accept: PropTypes.string,
};

export default InputWrapperFile;
