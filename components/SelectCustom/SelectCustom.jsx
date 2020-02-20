import React from 'react';
import Select from 'react-select';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './SelectCustom.scss';
import SelectIcon from '../../assets/svg/selectIcon.svg';

const customStyles = {
  container: () => ({
    border: '1px solid #c4c4c4',
    width: '100%',
    background: '#fafafa',
  }),
  control: () => ({
    background: '#fafafa',
    boxSizing: 'border-box',
    borderRadius: '2px',
    padding: '5px 0',
    zIndex: 20,
    width: 'auto',
    display: 'flex',
    margin: '0 10px',
  }),
  option: () => ({
    backgroundColor: '#fafafa',
    color: '#000',
    padding: 20,
    margin: 0,
  }),
  menu: provided => ({
    ...provided,
    backgroundColor: '#fafafa',
    width: 'auto',
    border: '1px solid #c4c4c4',
    borderTop: 0,
    zIndex: 5,
    right: 0,
    margin: 0,
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: () => ({
    width: 'auto',
  }),
};

const DropdownIndicator = () => <SelectIcon className={styles.icon} />;

const SelectCustom = ({
  value,
  onChange,
  options,
  placeholder,
  onFocusCustom,
  classNameWrapper,
  label,
  meta,
  classNameLabel,
  isRequired,
}) => (
  <div className={cx(styles.select, classNameWrapper)}>
    <div className={cx(styles.select, classNameWrapper)}>
      <label className={cx(styles.label, classNameLabel)}>{label}</label>
      <Select
        value={value}
        onChange={onChange}
        onFocus={() => {
          if (onFocusCustom) {
            onFocusCustom();
          }
        }}
        options={options}
        components={{ DropdownIndicator }}
        styles={customStyles}
        placeholder={placeholder}
      />
    </div>
    {isRequired && meta.error && meta.touched && (
      <span className={styles.error}>{meta.error}</span>
    )}
  </div>
);

SelectCustom.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
  label: PropTypes.string,
  classNameLabel: PropTypes.string,
  classNameWrapper: PropTypes.string,
  meta: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object),
  placeholder: PropTypes.string,
  onFocusCustom: PropTypes.func,
  isRequired: PropTypes.bool,
};

SelectCustom.defaultProps = {
  placeholder: '',
};

export default SelectCustom;
