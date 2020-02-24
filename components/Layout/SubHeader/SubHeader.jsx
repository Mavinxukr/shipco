import React, { useState } from 'react';
import cs from 'classnames';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import formatStringByPattern from 'format-string-by-pattern';
import Button from '../../Button/Button';
import IconSettings from '../../../assets/svg/Settings.svg';
import Search from '../../Search/Search';
import Popup from '../../Popup/Popup';
import {
  composeValidators,
  emailValidation,
  mustBeNumber,
  required,
} from '../../../utils/validation';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import styles from './SubHeader.scss';
import { stateOptions } from './data';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const SubHeader = ({ hidden }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div className={styles.subHeader}>
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>
            Bob Hudson <span className={styles.titleColor}>(ID 000011)</span>
          </h4>
          <Button
            type="button"
            customBtn={styles.customBtn}
            onClick={() => setIsPopupOpen(true)}
          >
            <IconSettings />
          </Button>
        </div>
        <nav>
          <ul className={styles.menuItems}>
            <li>
              <a className={cs(styles.menuLink, styles.active)} href="/">
                Auto
                <span className={styles.dotActive} />
              </a>
            </li>
            <li>
              <a className={styles.menuLink} href="/">
                Auto for dismanting
                <span className={styles.dotActive} />
              </a>
            </li>
            <li>
              <a className={styles.menuLink} href="/">
                Invoice
                <span className={styles.dotActive} />
              </a>
            </li>
            <li>
              <a className={styles.menuLink} href="/">
                Parts
                <span className={styles.dotActive} />
              </a>
            </li>
            <li>
              <a className={styles.menuLink} href="/">
                Shipping
                <span className={styles.dotActive} />
              </a>
            </li>
          </ul>
        </nav>
        <Search />
      </div>
      {hidden && isPopupOpen && (
        <Popup
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          title="Bob Hudson "
          subTitle="(ID 000011)"
        >
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, invalid }) => (
              <form onSubmit={handleSubmit}>
                <Field name="Name" validate={required} type="text">
                  {renderInput({
                    label: 'Name',
                    classNameWrapper: 'InputFormWrapper-popupFieldRow',
                    classNameWrapperLabel: 'InputFormWrapper-blackLabel',
                  })}
                </Field>
                <Field
                  name="Email Address"
                  validate={composeValidators(required, emailValidation)}
                  type="email"
                >
                  {renderInput({
                    label: 'Email Address',
                    classNameWrapper: 'InputFormWrapper-popupFieldRow',
                    classNameWrapperLabel: 'InputFormWrapper-blackLabel',
                  })}
                </Field>
                <Field
                  name="Phone number"
                  validate={composeValidators(required, mustBeNumber)}
                  type="text"
                  parse={formatStringByPattern('+9 9999 999 99 99')}
                >
                  {renderInput({
                    label: 'Phone number',
                    classNameWrapper: 'InputFormWrapper-popupFieldRow',
                    classNameWrapperLabel: 'InputFormWrapper-blackLabel',
                  })}
                </Field>
                <Field
                  name="country"
                  validate={required}
                  isRequired
                  component={renderSelect({
                    placeholder: '',
                    label: 'Country',
                    classNameWrapper: 'SelectCustom-popupFieldRow',
                    classNameLabel: 'SelectCustom-blackLabel',
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
                    classNameWrapper: 'SelectCustom-popupFieldRow',
                    classNameLabel: 'SelectCustom-blackLabel',
                  })}
                  options={stateOptions}
                />
                <Field
                  name="ZIP"
                  validate={composeValidators(required, mustBeNumber)}
                  type="text"
                >
                  {renderInput({
                    label: 'ZIP',
                    classNameWrapper: 'InputFormWrapper-popupFieldRow',
                    classNameWrapperLabel: 'InputFormWrapper-blackLabel',
                  })}
                </Field>
                <Field name="Address" validate={required} type="text">
                  {renderInput({
                    label: 'Address',
                    widthInputBlock: 'InputFormWrapper-widthInputBlock',
                    classNameWrapper: 'InputFormWrapper-popupFieldRow',
                    classNameWrapperLabel: 'InputFormWrapper-blackLabel',
                  })}
                </Field>
                <Field
                  name="Payment Information"
                  validate={composeValidators(required, mustBeNumber)}
                  type="text"
                  parse={formatStringByPattern('9999 9999 9999 9999')}
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
};

export default SubHeader;
