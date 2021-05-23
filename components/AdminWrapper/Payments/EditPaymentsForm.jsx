import React, { useContext, useState, useEffect } from "react";
import { Field, Form } from "react-final-form";
import useTranslation from "next-translate/useTranslation";
import { type } from "./data";
import Button from "../../Button/Button";
import { renderInput, renderSelect } from "../../../utils/renderInputs";
import styles from "./EditPaymentsForm.scss";
import { useDispatch, useSelector } from "react-redux";
import { updatePayments } from "../../../redux/actions/payments";
import { PopupContext } from "../../../context/PopupContext";
import {
  composeValidators,
  required,
  mustBeNumber,
} from "../../../utils/validation";
import { paymentsDataSelector } from "../../../utils/selectors";

export const EditPaymentsForm = ({ data }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("admin-payments");
  const { setIsOpen } = useContext(PopupContext);
  const payments = useSelector(paymentsDataSelector);
  const [applicableType, setApplicableType] = useState(data.applicable_type);
  const [applicableID, setApplicableID] = useState(data.applicable_id);

  const [options, setOptions] = useState([]);

  useEffect(() => {
    const key = data.applicable_type + "s";
    setOptions(
      payments.additional[key].map((item) => ({
        value: item.id,
        label: item.name,
      })) || []
    );
  }, [payments]);

  const onSubmit = (values) => {
    dispatch(
      updatePayments(
        {},
        {
          ...values,
          applicable_type: applicableType.toString(),
          applicable_id: applicableID.toString(),
        },
        data.id
      )
    );
    setIsOpen(false);
  };
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, invalid, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            validate={required}
            type="text"
            defaultValue={data.name || ""}
          >
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
              placeholder: data.applicable_type || "",
              value: data.applicable_type || "",
              label: t("applicableType"),
              classNameWrapper: "SelectCustom-popupFieldRow",
              custonOnChange: (value) => {
                const key = value.label === "clients" ? "clients" : "groups";
                setOptions(
                  payments.additional[key].map((item) => ({
                    value: item.id,
                    label: item.name,
                  })) || []
                );
                setApplicableType(value.value);
              },
            })}
            options={type}
          />
          <Field
            name="applicable_id"
            component={renderSelect({
              placeholder: data.applicable?.name || "",
              label: t("applicableId"),
              id: "priceable_id",
              classNameWrapper: "SelectCustom-popupFieldRow",
              custonOnChange: (value) => {
                setApplicableID(value.value);
              },
            })}
            options={options}
          />
          <Field
            name="due_day"
            validate={composeValidators(required, mustBeNumber)}
            type="text"
            defaultValue={data.due_day || ""}
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
              {t("UPDATE PRICE")}
            </Button>
          </div>
        </form>
      )}
    />
  );
};
