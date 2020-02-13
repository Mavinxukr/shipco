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
  if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
  return undefined;
};

export const mustBeNumber = (value) => (/[^0-9\(\)\-\+\s]/i.test(value) ? 'Must be a number' : '');

export const composeValidators = (...validators) => value => (
  validators.reduce((acc, current) => acc || current(value), undefined)
);
