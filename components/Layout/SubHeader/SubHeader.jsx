import React from 'react';
import cs from 'classnames';
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
import { renderInput } from '../../../utils/renderInputs';
import SelectCustom from '../../SelectCustom/SelectCustom';
import styles from './SubHeader.scss';
import { stateOptions } from './data';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const SubHeader = () => (
  <div className={styles.subHeader}>
    <div className={styles.container}>
      <div className={styles.flex}>
        <h4 className={styles.title}>
          Bob Hudson <span className={styles.titleColor}>(ID 000011)</span>
        </h4>
        <Popup
          customBtn={styles.customBtn}
          titleButton={<IconSettings />}
          title="Bob Hudson "
          subTitle="(ID 000011)"
        >
          <Form
            onSubmit={onSubmit}
            render={({
              handleSubmit, form, submitting, pristine, values,
            }) => (
              <form>
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
                <Field name="country" validate={required}>
                  {({ input, meta }) => (
                    <div className={styles.flexSelect}>
                      <label className={styles.label}>Country</label>
                      <SelectCustom {...input} options={stateOptions} />
                      {meta.error && meta.touched && (
                      <span className={styles.error}>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
                <Field name="city" validate={required}>
                  {({ input, meta }) => (
                    <div className={styles.flexSelect}>
                      <label className={styles.label}>City</label>
                      <SelectCustom {...input} options={stateOptions} />
                      {meta.error && meta.touched && (
                      <span className={styles.error}>{meta.error}</span>
                      )}
                    </div>
                  )}
                </Field>
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
                <Field
                  name="Address"
                  validate={required}
                  type="text"
                >
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
                    onClick={handleSubmit}
                    customBtn={styles.btnSubmit}
                    type="submit"
                  >
                    Save
                  </Button>
                </div>
              </form>
            )}
          />
        </Popup>
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
  </div>
);

export default SubHeader;
