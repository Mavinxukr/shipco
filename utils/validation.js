export const required = (value) => {
  if (!value || value.length === 0) {
    return 'Required';
  }
  return undefined;
};

export const emailValidation = (value) => {
  if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value)) {
    return 'Enter valid e-mail';
  }
  return undefined;
};

export const snpValidation = (value) => {
  if (/\d+$/g.test(value)) {
    return 'Only letters';
  }
  return undefined;
};

export const passwordValidation = (value) => {
  if (value.length < 6) {
    return 'Password must be at least 6 characters';
  }
  return undefined;
};

export const vinNum = (value) => {
  if (value && value.length === 17 && /^[0-9a-zA-Z]+$/.test(value)) {
    return null;
  }
  return 'VIN must be 17 characters';
};

export const mustBeNumber = (value) =>
  /[^0-9\(\)\-\+\s]/i.test(value) ? 'Must be a number' : '';

export const lengthPhone = (value) =>
  value.length < 17 ? 'Not enough numbers' : '';

export const lengthCart = (value) =>
  value.length < 19 ? 'Not enough numbers' : '';

export const lengthDueDay = (value) =>
  value.length < 10 ? 'Not enough numbers' : '';

export const composeValidators = (...validators) => (value) =>
  validators.reduce((acc, current) => acc || current(value), undefined);

export const validateForm = (values) => {
  const errors = {};
  if (!values.password_confirmation) {
    errors.password_confirmation = 'Required';
  } else if (values.password_confirmation !== values.password) {
    errors.password_confirmation = 'The password was entered incorrectly';
  }
  return errors;
};
