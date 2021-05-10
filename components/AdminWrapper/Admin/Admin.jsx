import React, { useState, useEffect } from 'react';
import { Field, Form } from 'react-final-form';
import { useRouter } from 'next/router';
import { signIn } from 'next-auth/client';

import {
  composeValidators,
  emailValidation,
  required,
} from '../../../utils/validation';

import { renderInput } from '../../../utils/renderInputs';
import { useSession } from 'next-auth/client';
import Button from '../../Button/Button';
import styles from './Admin.scss';
import Loader from '../../Loader/Loader';

const Admin = () => {
  const [errorMessage, setErrorMessage] = useState('');
  const [session, loading] = useSession();

  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.replace('/');
    }
  }, [router]);

  if (loading) {
    return <Loader />;
  }

  const submitHandle = async (values) => {
    const result = await signIn('admin', {
      redirect: false,
      ...values,
    });
    console.log(result);
    if (!result.error) {
      router.replace('/base-client');
    } else {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className={styles.form}>
      <h5>Sign In</h5>
      <Form
        onSubmit={(values) => submitHandle(values)}
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
              <p className={styles.error}>The given data was invalid.</p>
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
