import React from 'react';
import InputFormWrapper from '../components/InputWrapperForm/InputFormWrapper';
import SelectCustom from '../components/SelectCustom/SelectCustom';
import Checkbox from '../components/Checkbox/Checkbox';
import Radio from '../components/Radio/Radio';
import InputWrapperFile from '../components/InputWrapperFile/InputWrapperFile';

export const renderInput = props => ({ input, meta, accept }) => (
  <InputFormWrapper inputProps={input} meta={meta} accept={accept} {...props} />
);

export const renderInputFile = props => ({
  input, meta, accept, id,
}) => (
  <InputWrapperFile
    inputProps={input}
    id={id}
    meta={meta}
    accept={accept}
    {...props}
  />
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

export const renderCheckbox = props => ({ input }) => (
  <Checkbox {...props} {...input} />
);

export const renderRadio = props => ({ input, checked }) => (
  <Radio {...props} {...input} {...checked} />
);
