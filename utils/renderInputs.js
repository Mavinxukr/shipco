import React from 'react';
import InputFormWrapper from '../components/InputWrapperForm/InputFormWrapper';
import SelectCustom from '../components/SelectCustom/SelectCustom';

export const renderInput = props => ({ input, meta, accept }) => (
  <InputFormWrapper inputProps={input} meta={meta} accept={accept} {...props} />
);

export const renderSelect = props => ({
  input, meta, validation, ...rest
}) => (
  <SelectCustom
    {...props}
    {...input}
    meta={meta}
    {...rest}
    validation={validation}
  />
);
