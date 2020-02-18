import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../Button/Button';
import styles from './Input.scss';

const Input = ({
  placeholder,
  addInputProps,
  icon,
  customInput,
  classNameWrapperForIcon,
  onClickForIcon,
  widthInputBlock,
  accept,
}) => (
  <div className={cx(styles.inputBlock, widthInputBlock)}>
    <input
      className={cx(styles.input, customInput)}
      placeholder={placeholder}
      {...addInputProps}
      accept={accept}
    />
    {icon && (
      <Button
        type="button"
        className={classNameWrapperForIcon}
        onClick={onClickForIcon}
      >
        {icon}
      </Button>
    )}
  </div>
);

Input.propTypes = {
  customInput: PropTypes.string,
  widthInputBlock: PropTypes.string,
  classNameWrapperForIcon: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  onClickForIcon: PropTypes.func,
  addInputProps: PropTypes.object,
  accept: PropTypes.string,
};

export default Input;
