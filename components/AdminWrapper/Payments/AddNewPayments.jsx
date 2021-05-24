import React, { useContext, useState, useEffect } from "react";
import { Field, Form } from "react-final-form";
import useTranslation from "next-translate/useTranslation";
import { type } from "./data";
import Button from "../../Button/Button";
import { renderInput, renderSelect } from "../../../utils/renderInputs";
import styles from "./AddNewPayments.scss";
import { useDispatch, useSelector } from "react-redux";
import { addNewPayments } from "../../../redux/actions/payments";
import { PopupContext } from "../../../context/PopupContext";
import {
  composeValidators,
  required,
  mustBeNumber,
} from "../../../utils/validation";
import { paymentsDataSelector } from "../../../utils/selectors";

export const AddNewPayments = () => {
  const dispatch = useDispatch();
  const { t } = useTranslation("admin-payments");
  const { setIsOpen } = useContext(PopupContext);
  const [paymentsData, setPaymentsData] = useState(null);
  const payments = useSelector(paymentsDataSelector);

  const onSubmit = (values) => {
    dispatch(
      addNewPayments(
        {},
        {
          ...values,
          cities: values.cities && values.cities.value,
          applicable_type:
            values.applicable_type && values.applicable_type.value,
          applicable_id: values.applicable_id && values.applicable_id.value,
        }
      )
    );
    setIsOpen(false);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, invalid, submitting }) => (
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>
            <span className={styles.red}>{t("addNewPayments")}</span>
          </h2>
          <Field name="name" validate={required} type="text">
            {renderInput({
              label: t("name"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field
            name="applicable_type"
            component={renderSelect({
              placeholder: "",
              label: t("applicableType"),
              classNameWrapper: styles.popupFieldRow,
              custonOnChange: (value) => {
                const key = value.label === "clients" ? "clients" : "groups";
                setPaymentsData(payments.additional[key]);
              },
            })}
            options={type}
          />
          <Field
            name="applicable_id"
            component={renderSelect({
              placeholder: "",
              label: t("applicableId"),
              classNameWrapper: styles.popupFieldRow,
            })}
            options={
              (paymentsData &&
                paymentsData.map((item) => ({
                  value: item.id,
                  label: item.name,
                }))) ||
              []
            }
          />
          <Field
            name="due_day"
            validate={composeValidators(required, mustBeNumber)}
            type="text"
          >
            {renderInput({
              label: t("daysToPay"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <div className={styles.submitPopup}>
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={submitting || invalid}
            >
              {t("addNewPayments")}
            </Button>
          </div>
        </form>
      )}
    />
  );
};
