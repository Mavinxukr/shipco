import React, { useEffect, useState } from 'react';
import { Form, Field } from 'react-final-form';
import formatStringByPattern from 'format-string-by-pattern';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import MainLayout from '../../Layout/Global/Global';
import ImageUpload from '../../ImageUpload/ImageUpload';
import Loader from '../../Loader/Loader';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import Button from '../../Button/Button';
import {
  snpValidation,
  mustBeNumber,
  emailValidation,
  composeValidators,
  lengthPhone,
  lengthCart,
} from '../../../utils/validation';
import IconEye from '../../../assets/svg/eye.svg';
import { stateOptions, state } from './data';
import styles from './ProfileSettings.scss';
import {
  currentUserDataSelector,
  isAuthSelector,
} from '../../../utils/selectors';
import { editCurrentUser } from '../../../redux/actions/currentUser';
import useTranslation from 'next-translate/useTranslation';

const ProfileSettings = () => {
  const [isChangeType, setIsChangeType] = useState(false);
  const [image, setImage] = useState('/images/no-preview-available.png');
  const dispatch = useDispatch();
  const userData = useSelector(currentUserDataSelector);
  const isAuth = useSelector(isAuthSelector);
  const { t } = useTranslation('profile');

  useEffect(() => {
    if (userData && userData.image) {
      setImage(userData.image);
    }
  }, [userData]);

  if (!isAuth) {
    return <Loader />;
  }

  const onSubmit = (values) => {
    dispatch(
      editCurrentUser(
        {},
        {
          ...values,
          country: values.country && values.country.label,
          city: values.city && values.city.label,
          image: _.isObject(image) ? image : null,
        },
      ),
    );
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <h4 className={styles.title}>{t('profileSettings')}</h4>
        <Form
          onSubmit={onSubmit}
          validate={(values) => {
            const errors = {};
            if (values.password_confirmation !== values.password) {
              errors.password_confirmation =
                'The password was entered incorrectly';
            }
            return errors;
          }}
          render={({ handleSubmit, submitting, invalid }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <ImageUpload
                customImageUpload={styles.heightBlock}
                image={image}
                setImage={setImage}
              />
              <div className={styles.flex}>
                <div>
                  <Field
                    name="name"
                    validate={composeValidators(snpValidation)}
                    type="text"
                    defaultValue={userData.name || ''}
                  >
                    {renderInput({
                      label: t('name'),
                      classNameWrapper: styles.mediaFullWidth,
                    })}
                  </Field>
                  <Field
                    name="username"
                    type="text"
                    defaultValue={userData.username || ''}
                  >
                    {renderInput({
                      label: t('username'),
                      classNameWrapper: styles.mediaFullWidth,
                    })}
                  </Field>
                  <Field
                    name="email"
                    validate={composeValidators(emailValidation)}
                    type="email"
                    defaultValue={userData.email || ''}
                  >
                    {renderInput({
                      label: t('emailAdress'),
                      classNameWrapper: styles.mediaFullWidth,
                    })}
                  </Field>
                  <div className={styles.password}>
                    <Field
                      name="old_password"
                      type={isChangeType ? 'text' : 'password'}
                    >
                      {renderInput({
                        label: t('oldPassword'),
                        icon: <IconEye />,
                        classNameWrapperForIcon: styles.showPassword,
                        classNameWrapper: styles.mediaFullWidth,
                        onClickForIcon: () => setIsChangeType(!isChangeType),
                      })}
                    </Field>
                    <Field name="password" type="password">
                      {renderInput({
                        label: t('newPassword'),
                        classNameWrapper: styles.mediaFullWidth,
                      })}
                    </Field>
                    <Field name="password_confirmation" type="password">
                      {renderInput({
                        label: t('confirmPassword'),
                        classNameWrapper: styles.mediaFullWidth,
                      })}
                    </Field>
                  </div>
                </div>
                <div>
                  <Field
                    name="phone"
                    validate={composeValidators(mustBeNumber, lengthPhone)}
                    type="text"
                    parse={formatStringByPattern('+9-9999-999-99-99')}
                    defaultValue={userData.phone || ''}
                  >
                    {renderInput({
                      label: t('phoneNumber'),
                      classNameWrapper: styles.mediaFullWidth,
                    })}
                  </Field>
                  <Field
                    name="country"
                    component={renderSelect({
                      label: t('country'),
                      placeholder: userData.country || '',
                    })}
                    options={state}
                  />
                  <Field
                    name="city"
                    component={renderSelect({
                      label: t('city'),
                      placeholder: userData.city || '',
                    })}
                    options={stateOptions}
                  />
                  <Field
                    name="zip"
                    type="text"
                    defaultValue={userData.zip || ''}
                  >
                    {renderInput({
                      label: t('zip'),
                      classNameWrapper: styles.mediaFullWidth,
                    })}
                  </Field>
                  <Field
                    name="address"
                    type="text"
                    defaultValue={userData.address || ''}
                  >
                    {renderInput({
                      label: t('adress'),
                      classNameWrapper: styles.mediaFullWidth,
                    })}
                  </Field>
                  <Field
                    name="card_number"
                    validate={composeValidators(mustBeNumber, lengthCart)}
                    type="text"
                    parse={formatStringByPattern('9999-9999-9999-9999')}
                    defaultValue={userData.card_number || ''}
                  >
                    {renderInput({
                      label: t('cardNumber'),
                      classNameWrapper: styles.mediaFullWidth,
                    })}
                  </Field>
                </div>
                <div className={styles.submit}>
                  <Button
                    disabled={invalid || submitting}
                    customBtn={styles.btnSubmit}
                    type="submit"
                  >
                    {t('saveChanges')}
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
