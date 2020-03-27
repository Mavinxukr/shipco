import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Radio.scss';

const Radio = ({
  name,
  title,
  customRadio,
  id,
  value,
  checked,
  onChange,
  defaultChecked,
}) => (
  <div>
    <input
      type="radio"
      name={name}
      id={id}
      value={value}
      checked={checked}
      onChange={onChange}
      className={cx(styles.field, customRadio)}
      defaultChecked={defaultChecked}
    />
    <label htmlFor={id}>{title}</label>
  </div>
);

Radio.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
  customRadio: PropTypes.string,
  id: PropTypes.string,
  value: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  defaultChecked: PropTypes.bool,
};

export default Radio;
