import React, { useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useRouter } from 'next/router';
import { loginAdmin } from '../../../services/admin';
import {
  composeValidators,
  emailValidation,
  required,
} from '../../../utils/validation';
import { renderInput } from '../../../utils/renderInputs';
import Button from '../../Button/Button';
import styles from './Admin.scss';
import { cookies } from '../../../utils/getCookies';

const Admin = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const onSubmit = async (values, isUserAdmin) => {
    const response = await loginAdmin({}, values, isUserAdmin);
    if (response.status) {
      cookies.set('token', response.data.data.auth.token);
      router.push('/base-client');
    } else {
      setErrorMessage(response.message);
    }
  };

  return (
    <div className={styles.form}>
      <h5>Sign In</h5>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, invalid }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="email"
              validate={composeValidators(required, emailValidation)}
              type="email"
            >
              {renderInput({
                label: '',
                placeholder: 'Email Address',
              })}
            </Field>
            <Field
              name="password"
              validate={composeValidators(required)}
              type="password"
            >
              {renderInput({
                label: '',
                placeholder: 'Password',
              })}
            </Field>
            {errorMessage && (
              <p className={styles.error}>
                The given data was invalid.
              </p>
            )}
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={invalid || submitting}
            >
              Sign in
            </Button>
          </form>
        )}
      />
    </div>
  );
};

export default Admin;
