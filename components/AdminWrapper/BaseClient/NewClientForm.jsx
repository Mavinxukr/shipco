import React, { useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form } from "react-final-form";
import _ from "lodash";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../../context/PopupContext";
import { addNewBaseClient } from "../../../redux/actions/baseClient";
import { renderInput, renderSelect } from "../../../utils/renderInputs";
import {
  composeValidators,
  emailValidation,
  mustBeNumber,
  passwordValidation,
  required,
  snpValidation,
} from "../../../utils/validation";
import ImageUpload from "../../ImageUpload/ImageUpload";
import Button from "../../Button/Button";
import styles from "./NewClientForm.scss";
import { baseClientDataSelector } from "../../../utils/selectors";

export const NewClientForm = () => {
  const dispatch = useDispatch();
  const baseClient = useSelector(baseClientDataSelector);
  const error = useSelector((state) => state.baseClient.error);
  const { t } = useTranslation("admin-base-client");
  const { setIsOpen } = useContext(PopupContext);
  const [image, setImage] = useState("/images/no-preview-available.png");

  const onSubmit = (values) => {
    dispatch(
      addNewBaseClient(
        {},
        {
          ...values,
          country: values.country && values.country.label,
          city: values.city && values.city.label,
          image: _.isObject(image) ? image : null,
        }
      )
    );
    setIsOpen(false);
  };

  const stateObj = baseClient.additional.states;

  const stateArr = Object.values(stateObj).map((item, index) => ({
    id: index + 1,
    label: item.state,
    value: item.state,
  }));

  const todayDate = new Date();
  const currYear = todayDate.getFullYear();
  let currMonth = todayDate.getMonth() + 1;
  let currDay = todayDate.getDate();
  if (currMonth < 10) {
    currMonth = `0${todayDate.getMonth() + 1}`;
  }
  if (currDay < 10) {
    currDay = `0${todayDate.getDate()}`;
  }

  const finalDate = `${currDay}.${currMonth}.${currYear}`;

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, invalid, submitting }) => (
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>
            <span className={styles.red}>{t("AddNewclient")} </span>
            {finalDate}
          </h2>
          <Field
            name="name"
            validate={composeValidators(required, snpValidation)}
            type="text"
          >
            {renderInput({
              label: t("Name"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field name="username" validate={required} type="text">
            {renderInput({
              label: t("Username"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field
            name="email"
            validate={composeValidators(required, emailValidation)}
            type="email"
          >
            {renderInput({
              label: t("EmailAddress"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field
            name="phone"
            type="text"
            validate={composeValidators(required, mustBeNumber)}
          >
            {renderInput({
              label: t("Phonenumber"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field
            name="password"
            validate={composeValidators(required, passwordValidation)}
            type="password"
          >
            {renderInput({
              label: t("Password"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field
            name="country"
            validate={required}
            component={renderSelect({
              placeholder: "",
              label: t("Country"),
              classNameWrapper: styles.popupFieldRow,
            })}
            options={stateArr}
          />
          <Field
            name="city"
            validate={required}
            component={renderSelect({
              placeholder: "",
              classNameWrapper: styles.popupFieldRow,
              label: t("City"),
            })}
            options={
              (baseClient &&
                baseClient.additional.cities.map((item) => ({
                  value: item.name,
                  label: item.name,
                }))) ||
              []
            }
          />
          <ImageUpload baseClient image={image} setImage={setImage} />
          {error && (
            <p className={styles.error}>customer data must be unique</p>
          )}
          <div className={styles.submitPopup}>
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={submitting || invalid}
            >
              {t("AddNewclient")}
            </Button>
          </div>
        </form>
      )}
    />
  );
};
