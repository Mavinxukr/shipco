import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import formatStringByPattern from 'format-string-by-pattern';
import MainLayout from '../../Layout/Global/Global';
import styles from './ProfileSettings.scss';
import ImageUpload from '../../ImageUpload/ImageUpload';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import Button from '../../Button/Button';
import {
  required,
  snpValidation,
  mustBeNumber,
  emailValidation,
  composeValidators,
  passwordValidation,
} from '../../../utils/validation';
import IconEye from '../../../assets/svg/eye.svg';
import { stateOptions } from './data';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const ProfileSettings = () => {
  const [isChangeType, setIsChangeType] = useState(false);

  return (
    <MainLayout>
      <div className={styles.container}>
        <h4 className={styles.title}>Profile settings</h4>
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            if (!values.confirm) {
              errors.confirm = 'Required';
            } else if (values.confirm !== values.password) {
              errors.confirm = 'The password was entered incorrectly';
            }
            return errors;
          }}
          render={({
            handleSubmit, submitting, invalid,
          }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <ImageUpload />
              <div className={styles.flex}>
                <div>
                  <Field
                    name="Name"
                    validate={composeValidators(required, snpValidation)}
                    type="text"
                  >
                    {renderInput({ label: 'Name' })}
                  </Field>
                  <Field name="username" validate={required} type="text">
                    {renderInput({ label: 'Username' })}
                  </Field>
                  <Field
                    name="e-mail"
                    validate={composeValidators(required, emailValidation)}
                    type="email"
                  >
                    {renderInput({ label: 'E-mail adress' })}
                  </Field>
                  <div className={styles.password}>
                    <Field
                      name="Old password"
                      validate={composeValidators(required, passwordValidation)}
                      type={isChangeType ? 'text' : 'password'}
                    >
                      {renderInput({
                        label: 'Old password',
                        icon: <IconEye />,
                        classNameWrapperForIcon: styles.showPassword,
                        onClickForIcon: () => setIsChangeType(!isChangeType),
                      })}
                    </Field>
                    <Field
                      name="password"
                      validate={composeValidators(required, passwordValidation)}
                      type="password"
                    >
                      {renderInput({
                        label: 'New password',
                      })}
                    </Field>
                    <Field
                      name="confirm"
                      validate={composeValidators(required, passwordValidation)}
                      type="password"
                    >
                      {renderInput({
                        label: 'Confirm password',
                      })}
                    </Field>
                  </div>
                </div>
                <div>
                  <Field
                    name="phone number"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                    parse={formatStringByPattern('+9 9999 999 99 99')}
                  >
                    {renderInput({ label: 'Phone number' })}
                  </Field>
                  <Field
                    name="country"
                    validate={required}
                    isRequired
                    component={renderSelect({
                      placeholder: '',
                      label: 'Country',
                    })}
                    options={stateOptions}
                  />
                  <Field
                    name="city"
                    isRequired
                    validate={required}
                    component={renderSelect({
                      placeholder: '',
                      label: 'City',
                    })}
                    options={stateOptions}
                  />
                  <Field
                    name="zip"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({ label: 'Zip' })}
                  </Field>
                  <Field name="adress" validate={required} type="text">
                    {renderInput({ label: 'Adress' })}
                  </Field>
                  <Field
                    name="cart"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                    parse={formatStringByPattern('9999 9999 9999 9999')}
                  >
                    {renderInput({ label: 'Cart number' })}
                  </Field>
                </div>
                <div className={styles.submit}>
                  <Button
                    disabled={invalid || submitting}
                    customBtn={styles.btnSubmit}
                    type="submit"
                  >
                    Save changes
                  </Button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
    </MainLayout>
  );
};

export default ProfileSettings;
