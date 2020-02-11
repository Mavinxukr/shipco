import React from 'react';
import Select from 'react-select';
import { stateOptions } from './data';
import styles from './SelectCustom.scss';
import SelectIcon from '../../assets/svg/selectIcon.svg';

const customStyles = {
  container: () => ({
    border: '1px solid #c4c4c4',
    width: '100%',
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
    '&:first-child': {
      borderTop: '1px solid #c4c4c4',
      margin: '0 ',
    },
  }),
  menu: () => ({
    backgroundColor: '#fafafa',
    position: 'absolute',
    width: '100%',
    border: '1px solid #c4c4c4',
    borderTop: 0,
    zIndex: 5,
    left: 0,
    margin: 0,
    top: '40px',
  }),

  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: () => ({
    width: 'auto',
  }),
};

const DropdownIndicator = () => (
  <SelectIcon className={styles.icon} />
);

const SelectCustom = () => (
  <div className={styles.select}>
    <Select
      placeholder=""
      components={{ DropdownIndicator }}
      styles={customStyles}
      options={stateOptions}
    />
  </div>
);

export default SelectCustom;
