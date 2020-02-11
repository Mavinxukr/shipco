import React, { useState } from 'react';
import { Form, Field } from 'react-final-form';
import MainLayout from '../../Layout/Global/Global';
import styles from './ProfileSettings.scss';
import ImageUpload from '../../ImageUpload/ImageUpload';
import { renderInput } from '../../../utils/renderInputs';
import Button from '../../Button/Button';
import {
  required,
  snpValidation,
  mustBeNumber,
  emailValidation,
  composeValidators,
  passwordValidation,
} from '../../../utils/validation';
import Popup from '../../Popup/Popup';
import IconEye from '../../../assets/svg/eye.svg';

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
          render={({
            handleSubmit, form, submitting, pristine, values,
          }) => (
            <form className={styles.form}>
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
                  <Field
                    name="phone number"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({ label: 'Phone number' })}
                  </Field>
                  <div className={styles.password}>
                    <Field
                      name="password"
                      validate={composeValidators(required, passwordValidation)}
                      type={isChangeType ? 'text' : 'password'}
                    >
                      {renderInput({
                        label: 'Password',
                        icon: <IconEye />,
                        classNameWrapperForIcon: styles.showPassword,
                        onClickForIcon: () => setIsChangeType(!isChangeType),
                      })}
                    </Field>
                  </div>
                </div>
                <div>
                  <Field name="country" validate={required}>
                    {({ input, meta }) => (
                      <div className={styles.column}>
                        <label className={styles.label}>Country</label>
                        <select className={styles.field} {...input}>
                          <option className={styles.displayNone} value="" />
                          <option className={styles.option} value="Ukraine">
                  Ukraine
                          </option>
                          <option className={styles.option} value="Ukraine">
                  Ukraine2
                          </option>
                          <option className={styles.option} value="Ukraine">
                  Ukraine3
                          </option>
                          <option className={styles.option} value="Ukraine">
                  Ukraine4
                          </option>
                          <option className={styles.option} value="Ukraine">
                  Ukraine5
                          </option>
                        </select>
                        {meta.error && meta.touched && (
                        <span className={styles.error}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
                  <Field name="city" validate={required}>
                    {({ input, meta }) => (
                      <div className={styles.column}>
                        <label className={styles.label}>City</label>
                        <select className={styles.field} {...input}>
                          <option className={styles.displayNone} value="" />
                          <option className={styles.option} value="Ukraine">
                  Kyiv
                          </option>
                          <option className={styles.option} value="Ukraine">
                  Kyiv2
                          </option>
                          <option className={styles.option} value="Ukraine">
                  Kyiv3
                          </option>
                          <option className={styles.option} value="Ukraine">
                  Kyiv4
                          </option>
                          <option className={styles.option} value="Ukraine">
                  Kyiv5
                          </option>
                          <option className={styles.option} value="Ukraine">
                  Kyiv6
                          </option>
                        </select>
                        {meta.error && meta.touched && (
                        <span className={styles.error}>{meta.error}</span>
                        )}
                      </div>
                    )}
                  </Field>
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
                  >
                    {renderInput({ label: 'Cart number' })}
                  </Field>
                </div>
                <div className={styles.submit}>
                  <Button
                    onClick={handleSubmit}
                    className={styles.btnSubmit}
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
      <Popup titleButton="open" title="Change password">
        <Form
          onSubmit={onSubmit}
          render={({
            handleSubmit, form, submitting, pristine, values,
          }) => (
            <form>
              <Field
                name="Old password"
                validate={composeValidators(required, passwordValidation)}
                type="password"
              >
                {renderInput({
                  label: 'Old password',
                  classNameWrapper: 'InputFormWrapper-popupFieldRow',
                })}
              </Field>
              <Field
                name="New password"
                validate={composeValidators(required, passwordValidation)}
                type="password"
              >
                {renderInput({
                  label: 'New password',
                  classNameWrapper: 'InputFormWrapper-popupFieldRow',
                })}
              </Field>
              <Field
                name="Confirm password"
                validate={composeValidators(required, passwordValidation)}
                type="password"
              >
                {renderInput({
                  label: 'Confirm password',
                  classNameWrapper: 'InputFormWrapper-popupFieldRow',
                })}
              </Field>
              <div className={styles.submitPoup}>
                <Button
                  onClick={handleSubmit}
                  className={styles.btnSubmit}
                  type="submit"
                >
                  Save new password
                </Button>
              </div>
            </form>
          )}
        />
      </Popup>
    </MainLayout>
  );
};

export default ProfileSettings;
