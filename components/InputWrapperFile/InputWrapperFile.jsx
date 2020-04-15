import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Input from '../Input/Input';
import styles from './InputWrapperFile.scss';

const InputWrapperFile = ({
  id,
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
  widthInputBlock,
  customLabel,
  fileValue,
  onChange,
}) => (
  <div className={cx(styles.wrapper, classNameWrapper)}>
    <>
      <span className={cx(styles.labelFile, classNameWrapperLabel)}>
        {label}
      </span>
      <label className={cx(styles.fileLabel, customLabel)}>
        <Input
          id={id}
          onChange={onChange}
          fileValue={fileValue}
          addInputProps={inputProps}
          widthInputBlock={widthInputBlock}
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
  fileValue: PropTypes.string,
  classNameWrapperLabel: PropTypes.string,
  label: PropTypes.string,
  id: PropTypes.string,
  inputProps: PropTypes.object,
  onClickForIcon: PropTypes.func,
  meta: PropTypes.object,
  notForm: PropTypes.bool,
  customInput: PropTypes.string,
  icon: PropTypes.node,
  widthInputBlock: PropTypes.string,
  classNameWrapperForInput: PropTypes.string,
  classNameWrapper: PropTypes.string,
  accept: PropTypes.string,
  customLabel: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputWrapperFile;
