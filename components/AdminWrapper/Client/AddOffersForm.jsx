import React, { useContext, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import formatStringByPattern from "format-string-by-pattern";
import cx from "classnames";
import { Field, Form } from "react-final-form";
import styles from "./AddOffersForm.scss";
import {
  required,
  mustBeNumber,
  composeValidators,
  lengthDueDay,
  vinNum,
} from "../../../utils/validation";
import { PopupContext } from "../../../context/PopupContext";
import { addNewClient } from "../../../redux/actions/client";
import { status, city, popularCars, auctions, statusRadio } from "./data";
import {
  renderInput,
  renderSelect,
  renderInputFile,
} from "../../../utils/renderInputs";
import { clientDataSelector } from "../../../utils/selectors";
import Button from "../../Button/Button";

export const AddOffersForm = () => {
  const client = useSelector(clientDataSelector);
  const error = useSelector((state) => state.client.error);
  const { setIsOpen } = useContext(PopupContext);
  const [stepIndex, setStepIndex] = useState(0);
  const { t } = useTranslation("admin-auto");
  const dispatch = useDispatch();

  const onSubmit = (values) => {
    dispatch(
      addNewClient(
        {
          client: +router.query.idUser || "",
        },
        {
          ...values,
          status: values.status && values.status.value,
          make_name: values.make_name && values.make_name.value,
          auction: values.auction && values.auction.value,
          year: values.year && values.year.value,
          client_id: values.client_id && values.client_id.value,
          point_load_city:
            values.point_load_city && values.point_load_city.label,
          point_delivery_city:
            values.point_delivery_city && values.point_delivery_city.label,
          ship: 1,
          lot: 1,
          sale: 1,
          feature: 1,
          disassembly: 0,
          invoice: 1,
          damage_status: "case_closed",
          offsite: stepIndex || "0",
          invoice_document: [
            {
              type: "invoice",
              file: document.querySelector("#car_fax_report").files,
            },
            {
              type: "invoices",
              file: document.querySelector("#invoice").files,
            },
          ],
        }
      )
    );
    setIsOpen(false);
  };

  const arrYear = [];
  const yearNow = new Date().getFullYear();

  for (let i = 2000; i <= yearNow; i++) {
    arrYear.push({ label: i, value: i });
  }
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, invalid, submitting }) => (
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>
            <span className={styles.red}> {t("Add New offers")}</span>
          </h2>
          <Field
            name="make_name"
            validate={required}
            component={renderSelect({
              placeholder: "",
              label: t("Make"),
              classNameWrapper: styles.popupFieldRow,
            })}
            options={popularCars}
          />
          <Field
            name="auction"
            validate={required}
            component={renderSelect({
              placeholder: "",
              label: t("Auction"),
              classNameWrapper: styles.popupFieldRow,
            })}
            options={auctions}
          />
          <Field
            name="year"
            validate={required}
            component={renderSelect({
              placeholder: "",
              label: t("Year"),
              classNameWrapper: styles.popupFieldRow,
            })}
            options={arrYear}
          />
          <Field name="model_name" validate={required} type="text">
            {renderInput({
              label: t("Model"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field
            name="client_id"
            component={renderSelect({
              placeholder: "",
              label: t("Client id"),
              classNameWrapper: styles.popupFieldRow,
            })}
            options={client.additional.clients.map((item) => ({
              label: `${item.id} ${item.name}`,
              value: item.id,
            }))}
          />
          <Field
            name="vin_code"
            validate={composeValidators(required, vinNum)}
            type="text"
          >
            {renderInput({
              label: t("Vin code"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field
            name="status"
            validate={required}
            component={renderSelect({
              placeholder: "",
              label: t("Status"),
              classNameWrapper: styles.popupFieldRow,
            })}
            options={status}
          />
          <Field
            name="point_load_city"
            validate={required}
            component={renderSelect({
              placeholder: "",
              label: t("Point of loading"),
              classNameWrapper: styles.popupFieldRow,
            })}
            options={city}
          />
          <Field
            name="point_delivery_city"
            validate={required}
            component={renderSelect({
              placeholder: "",
              label: t("Delivery City"),
              classNameWrapper: styles.popupFieldRow,
            })}
            options={city}
          />
          <Field
            name="point_delivery_date"
            validate={composeValidators(required, mustBeNumber, lengthDueDay)}
            type="text"
            parse={formatStringByPattern("9999-99-99")}
          >
            {renderInput({
              label: t("Delivery date"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field
            name="lot_number"
            validate={composeValidators(required, mustBeNumber)}
            type="text"
          >
            {renderInput({
              label: t("Lot number"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field name="odometer" validate={required} type="text">
            {renderInput({
              label: t("Odometer"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field name="location" validate={required} type="text">
            {renderInput({
              label: t("Location"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field
            name="purchased_date"
            validate={composeValidators(required, mustBeNumber, lengthDueDay)}
            type="text"
            parse={formatStringByPattern("9999-99-99")}
          >
            {renderInput({
              label: t("Purchased date"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field name="color" validate={required} type="text">
            {renderInput({
              label: t("Color"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field name="key" validate={required} type="text">
            {renderInput({
              label: t("Key"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field name="note" type="text">
            {renderInput({
              label: t("Note"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field
            name="invoice_total_price"
            validate={composeValidators(required, mustBeNumber)}
            type="text"
          >
            {renderInput({
              label: t("Total Price"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field name="car_fax_report" type="file" validate={required}>
            {renderInputFile({
              label: t("CarFax report"),
              classNameWrapper: styles.popupFieldRow,
              customInput: styles.customInputFile,
              widthInputBlock: styles.noFiles,
              file: true,
              id: "car_fax_report",
              accept: ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf",
            })}
          </Field>
          <Field name="invoice" type="file" validate={required}>
            {renderInputFile({
              label: t("Invoice"),
              classNameWrapper: styles.popupFieldRow,
              customInput: styles.customInputFile,
              widthInputBlock: styles.noFiles,
              id: "invoice",
              file: true,
              accept: ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf",
            })}
          </Field>
          <div className={styles.flexRadio}>
            <p>{t("Offsite")}</p>
            {statusRadio.map((statusFilter) => {
              const classNameForButton = cx(styles.btnStatus, {
                [styles.activeStatus]: stepIndex === statusFilter.id,
              });

              return (
                <Button
                  type="button"
                  onClick={() => setStepIndex(statusFilter.id)}
                  customBtn={classNameForButton}
                  key={statusFilter.id}
                >
                  {statusFilter.text}
                </Button>
              );
            })}
          </div>
          {stepIndex === 1 && (
            <Field
              name="offsite_price"
              validate={composeValidators(required, mustBeNumber)}
              type="text"
              defaultValue={client.data.offsite_price || ""}
            >
              {renderInput({
                label: "Offsite price:",
                classNameWrapper: styles.popupFieldRow,
                customInput: styles.color,
                classNameWrapperLabel: styles.blackLabel,
              })}
            </Field>
          )}
          {error && <p className={styles.error}>Client not found</p>}
          <div className={styles.submitPopup}>
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={submitting || invalid}
            >
              {t("ADD NEW OFFERS")}
            </Button>
          </div>
        </form>
      )}
    />
  );
};
