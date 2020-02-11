import React from 'react';
import InputFormWrapper from '../components/InputWrapperForm/InputFormWrapper';
// import Checkbox from '../components/Checkbox/Checkbox';
import SelectCustom from '../components/SelectCustom/SelectCustom';

export const renderInput = props => ({ input, meta }) => (
  <InputFormWrapper inputProps={input} meta={meta} {...props} />
);

// export const renderCheckbox = props => ({ input }) => (
//   <Checkbox {...props} {...input} />
// );
//
export const renderSelect = props => ({ input, ...rest }) => (
  <SelectCustom {...props} {...input} {...rest} />
);
