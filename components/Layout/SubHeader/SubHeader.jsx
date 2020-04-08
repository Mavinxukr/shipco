import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import formatStringByPattern from 'format-string-by-pattern';
import ActiveLink from '../ActiveLink/ActiveLink';
import Button from '../../Button/Button';
import IconSettings from '../../../assets/svg/Settings.svg';
import Search from '../../Search/Search';
import Popup from '../../Popup/Popup';
import {
  composeValidators,
  emailValidation,
  mustBeNumber,
  required,
  lengthCart,
  lengthPhone,
} from '../../../utils/validation';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import styles from './SubHeader.scss';
import { stateOptions } from './data';
import { updateCurrentClient } from '../../../redux/actions/currentClient';

const SubHeader = ({
  hidden, currentClientId, currentClient, onClick,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(
      updateCurrentClient(
        {},
        {
          ...values,
          country: values.country && values.country.label,
          city: values.city && values.city.label,
        },
        currentClient.data.id,
      ),
    );
  };

  return (
    <div className={styles.subHeader}>
      <div className={styles.container}>
        {currentClientId && (
          <div className={styles.flex}>
            <h4 className={styles.title}>
              {currentClient.data.name}{' '}
              <span className={styles.titleColor}>
                (ID {currentClient.data.id})
              </span>
            </h4>
            {hidden && (
              <Button
                type="button"
                customBtn={styles.customBtn}
                onClick={() => setIsPopupOpen(true)}
              >
                <IconSettings />
              </Button>
            )}
          </div>
        )}
        <nav>
          <ul className={styles.menuItems}>
            <li>
              <ActiveLink
                activeClassName={styles.active}
                href={{ pathname: '/client', query: { isClient: false } }}
              >
                <a className={styles.menuLink}>
                  Auto
                  <span className={styles.dotActive} />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                activeClassName={styles.active}
                href="/admin-dismanting"
              >
                <a className={styles.menuLink}>
                  Auto for dismanting
                  <span className={styles.dotActive} />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                activeClassName={styles.active}
                href="/admin-invoices"
              >
                <a className={styles.menuLink} href="/">
                  Invoice
                  <span className={styles.dotActive} />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink activeClassName={styles.active} href="/admin-parts">
                <a className={styles.menuLink}>
                  Parts
                  <span className={styles.dotActive} />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                activeClassName={styles.active}
                href="/admin-shipping"
              >
                <a className={styles.menuLink}>
                  Shipping
                  <span className={styles.dotActive} />
                </a>
              </ActiveLink>
            </li>
          </ul>
        </nav>
        <Search onClick={onClick} />
      </div>
      {hidden && isPopupOpen && (
        <Popup
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          title={currentClient.data.name}
          subTitle={currentClient.data.id}
        >
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, invalid }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="name"
                  validate={required}
                  type="text"
                  defaultValue={currentClient.data.name || ''}
                >
                  {renderInput({
                    label: 'Name',
                    classNameWrapper: 'InputFormWrapper-popupFieldRow',
                    classNameWrapperLabel: 'InputFormWrapper-blackLabel',
                  })}
                </Field>
                <Field
                  name="email"
                  validate={composeValidators(required, emailValidation)}
                  type="email"
                  defaultValue={currentClient.data.email || ''}
                >
                  {renderInput({
                    label: 'Email Address',
                    classNameWrapper: 'InputFormWrapper-popupFieldRow',
                    classNameWrapperLabel: 'InputFormWrapper-blackLabel',
                  })}
                </Field>
                <Field
                  name="phone"
                  validate={composeValidators(required, mustBeNumber, lengthPhone)}
                  type="text"
                  parse={formatStringByPattern('+9-9999-999-99-99')}
                  defaultValue={currentClient.data.phone || ''}
                >
                  {renderInput({
                    label: 'Phone number',
                    classNameWrapper: 'InputFormWrapper-popupFieldRow',
                    classNameWrapperLabel: 'InputFormWrapper-blackLabel',
                  })}
                </Field>
                <Field
                  name="country"
                  component={renderSelect({
                    label: 'Country',
                    classNameWrapper: 'SelectCustom-popupFieldRow',
                    classNameLabel: 'SelectCustom-blackLabel',
                    placeholder: currentClient.data.country || '',
                  })}
                  options={stateOptions}
                />
                <Field
                  name="city"
                  component={renderSelect({
                    label: 'City',
                    classNameWrapper: 'SelectCustom-popupFieldRow',
                    classNameLabel: 'SelectCustom-blackLabel',
                    placeholder: currentClient.data.city || '',
                  })}
                  options={stateOptions}
                />
                <Field
                  name="zip"
                  validate={composeValidators(required, mustBeNumber)}
                  type="text"
                  defaultValue={currentClient.data.zip || ''}
                >
                  {renderInput({
                    label: 'ZIP',
                    classNameWrapper: 'InputFormWrapper-popupFieldRow',
                    classNameWrapperLabel: 'InputFormWrapper-blackLabel',
                  })}
                </Field>
                <Field
                  name="address"
                  validate={required}
                  type="text"
                  defaultValue={currentClient.data.address || ''}
                >
                  {renderInput({
                    label: 'Address',
                    widthInputBlock: 'InputFormWrapper-widthInputBlock',
                    classNameWrapper: 'InputFormWrapper-popupFieldRow',
                    classNameWrapperLabel: 'InputFormWrapper-blackLabel',
                  })}
                </Field>
                <Field
                  name="card_number"
                  validate={composeValidators(required, mustBeNumber, lengthCart)}
                  type="text"
                  parse={formatStringByPattern('9999-9999-9999-9999')}
                  defaultValue={currentClient.data.card_number || ''}
                >
                  {renderInput({
                    label: 'Payment Information',
                    classNameWrapper: 'InputFormWrapper-popupFieldRow',
                    classNameWrapperLabel: 'InputFormWrapper-blackLabel',
                  })}
                </Field>
                <div className={styles.submitPopup}>
                  <Button
                    customBtn={styles.btnSubmit}
                    type="submit"
                    disabled={invalid || submitting}
                  >
                    Save
                  </Button>
                </div>
              </form>
            )}
          />
        </Popup>
      )}
    </div>
  );
};

SubHeader.propTyps = {
  hidden: PropTypes.bool,
  currentClientId: PropTypes.number,
  currentClient: PropTypes.object,
  onClick: PropTypes.func,
};

export default SubHeader;
