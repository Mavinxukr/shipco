import React, { useContext } from "react";
import { Field, Form } from "react-final-form";
import formatStringByPattern from "format-string-by-pattern";
import { useDispatch } from "react-redux";
import styles from "./UpdateClientForm.scss";
import {
  composeValidators,
  emailValidation,
  mustBeNumber,
  required,
  lengthCart,
  lengthPhone,
} from "../../../utils/validation";
import { state } from "./data";
import { renderInput, renderSelect } from "../../../utils/renderInputs";
import { updateCurrentClient } from "../../../redux/actions/currentClient";
import useTranslation from "next-translate/useTranslation";
import Button from "../../Button/Button";
import { PopupContext } from "../../../context/PopupContext";

export const UpdateClientForm = ({ currentClient, client }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("admin-subheader");
  const { setIsOpen } = useContext(PopupContext);

  const onSubmit = async (values) => {
    dispatch(
      updateCurrentClient(
        {},
        {
          ...values,
          country: values.country && values.country.label,
          city: values.city && values.city.label,
        },
        currentClient.data.id
      )
    );
    setIsOpen(false);
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, invalid }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            validate={required}
            type="text"
            defaultValue={currentClient.data.name || ""}
          >
            {renderInput({
              label: t("Name"),
              classNameWrapper: "InputFormWrapper-popupFieldRow",
              classNameWrapperLabel: "InputFormWrapper-blackLabel",
            })}
          </Field>
          <Field
            name="email"
            validate={composeValidators(required, emailValidation)}
            type="email"
            defaultValue={currentClient.data.email || ""}
          >
            {renderInput({
              label: t("Email Address"),
              classNameWrapper: "InputFormWrapper-popupFieldRow",
              classNameWrapperLabel: "InputFormWrapper-blackLabel",
            })}
          </Field>
          <Field
            name="phone"
            validate={composeValidators(required, mustBeNumber, lengthPhone)}
            type="text"
            parse={formatStringByPattern("+9-9999-999-99-99")}
            defaultValue={currentClient.data.phone || ""}
          >
            {renderInput({
              label: t("Phone number"),
              classNameWrapper: "InputFormWrapper-popupFieldRow",
              classNameWrapperLabel: "InputFormWrapper-blackLabel",
            })}
          </Field>
          <Field
            name="country"
            component={renderSelect({
              label: t("Country"),
              classNameWrapper: "SelectCustom-popupFieldRow",
              classNameLabel: "SelectCustom-blackLabel",
              placeholder: currentClient.data.country || "",
            })}
            options={state}
          />
          <Field
            name="city"
            component={renderSelect({
              label: t("City"),
              classNameWrapper: "SelectCustom-popupFieldRow",
              classNameLabel: "SelectCustom-blackLabel",
              placeholder: currentClient.data.city || "",
            })}
            options={
              (client &&
                client.additional.cities.map((item) => ({
                  value: item.name,
                  label: item.name,
                }))) ||
              []
            }
          />
          <Field
            name="zip"
            validate={composeValidators(required, mustBeNumber)}
            type="text"
            defaultValue={currentClient.data.zip || ""}
          >
            {renderInput({
              label: t("Zip"),
              classNameWrapper: "InputFormWrapper-popupFieldRow",
              classNameWrapperLabel: "InputFormWrapper-blackLabel",
            })}
          </Field>
          <Field
            name="address"
            validate={required}
            type="text"
            defaultValue={currentClient.data.address || ""}
          >
            {renderInput({
              label: t("Adress"),
              widthInputBlock: "InputFormWrapper-widthInputBlock",
              classNameWrapper: "InputFormWrapper-popupFieldRow",
              classNameWrapperLabel: "InputFormWrapper-blackLabel",
            })}
          </Field>
          <Field
            name="card_number"
            validate={composeValidators(required, mustBeNumber, lengthCart)}
            type="text"
            parse={formatStringByPattern("9999-9999-9999-9999")}
            defaultValue={currentClient.data.card_number || ""}
          >
            {renderInput({
              label: t("PAYMENT"),
              classNameWrapper: "InputFormWrapper-popupFieldRow",
              classNameWrapperLabel: "InputFormWrapper-blackLabel",
            })}
          </Field>
          <div className={styles.submitPopup}>
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={invalid || submitting}
            >
              {t("save")}
            </Button>
          </div>
        </form>
      )}
    />
  );
};
