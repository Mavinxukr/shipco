import React from 'react';
import Select from 'react-select';
import { stateOptions } from './data';

const customStyles = {
  control: () => ({
    background: '#fafafa',
    border: '1px solid #c4c4c4',
    boxSizing: 'border-box',
    borderRadius: '2px',
    padding: '5px 20px',
    width: '100%',
    display: 'flex',
  }),
  option: () => ({
    backgroundColor: '#fafafa',
    color: '#000',
    padding: 20,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  indicatorsContainer: () => ({
    width: 'auto',
  }),
};

const CustomSelect = () => (
    <Select placeholder='' styles={customStyles} options={stateOptions} />
);

export default CustomSelect;
