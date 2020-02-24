import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import Button from '../Button/Button';
import IconArrow from '../../assets/svg/Group (6).svg';
import styles from './InputNumber.scss';

const InputNumber = ({
  name,
  title,
  classNameWrapper,
  cassNameLabel,
  customInput,
  input,
}) => {

  const value = useRef(null);

  return (
    <div className={cx(styles.widthBlock, classNameWrapper)}>
      <label className={cx(styles.label, cassNameLabel)} htmlFor={name}>
        {title}
      </label>
      <input
        ref={value}
        className={cx(styles.number, customInput)}
        id={name}
        {...input}
        name={name}
      />
      <div className={styles.buttons}>
        <Button
          type="button"
          onClick={() => {
            value.current.value = +value.current.value + 1;
          }}
        >
          <IconArrow className={styles.topIcon} />
        </Button>
        <Button
          type="button"
          onClick={() => {
            value.current.value -= 1;
          }}
        >
          <IconArrow className={styles.bottomIcon} />
        </Button>
      </div>
    </div>
  );
};

InputNumber.propTypes = {
  name: PropTypes.string,
  input: PropTypes.object,
  title: PropTypes.string,
  classNameWrapper: PropTypes.string,
  cassNameLabel: PropTypes.string,
  customInput: PropTypes.string,
};

export default InputNumber;
