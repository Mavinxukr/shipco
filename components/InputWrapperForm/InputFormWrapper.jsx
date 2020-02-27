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
  classNameWrapperLabel,
  classNameWrapperForInput,
  widthInputBlock,
  notForm,
  accept,
  customInput,
  file,
}) => (
  <div className={cx(styles.wrapper, classNameWrapper)}>
    {file ? (
      <>
        <span className={styles.labelFile}>{label}</span>
        <label className={styles.fileLabel}>
          <Input
            placeholder={placeholder}
            addInputProps={inputProps}
            widthInputBlock={widthInputBlock}
            classNameWrapper={cx(styles.inputFile, classNameWrapperForInput)}
            icon={icon}
            file={file}
            customInput={customInput}
            accept={accept}
            classNameWrapperForIcon={classNameWrapperForIcon}
            onClickForIcon={onClickForIcon}
          />
        </label>
      </>
    ) : (
      <>
        <label className={cx(styles.label, classNameWrapperLabel)}>
          {label}
        </label>
        <Input
          placeholder={placeholder}
          addInputProps={inputProps}
          widthInputBlock={widthInputBlock}
          classNameWrapper={cx(styles.inputWrapper, classNameWrapperForInput)}
          icon={icon}
          file={file}
          customInput={customInput}
          accept={accept}
          classNameWrapperForIcon={classNameWrapperForIcon}
          onClickForIcon={onClickForIcon}
        />
      </>
    )}

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

InputFormWrapper.propTypes = {
  classNameWrapperForIcon: PropTypes.string,
  classNameWrapperLabel: PropTypes.string,
  label: PropTypes.string,
  widthInputBlock: PropTypes.string,
  inputProps: PropTypes.object,
  onClickForIcon: PropTypes.func,
  meta: PropTypes.object,
  notForm: PropTypes.bool,
  placeholder: PropTypes.string,
  customInput: PropTypes.string,
  icon: PropTypes.node,
  classNameWrapperForInput: PropTypes.string,
  classNameWrapper: PropTypes.string,
  accept: PropTypes.string,
  file: PropTypes.bool,
};

export default InputFormWrapper;
