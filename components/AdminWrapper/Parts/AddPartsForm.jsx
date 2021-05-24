import React, { useContext, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import useTranslation from "next-translate/useTranslation";
import styles from "./AddPartsForm.scss";
import { PopupContext } from "../../../context/PopupContext";
import { addNewParts } from "../../../redux/actions/parts";
import { useDispatch } from "react-redux";
import { renderInput } from "../../../utils/renderInputs";
import Previews from "../../Previews/Previews";
import IconUpload from "../../../assets/svg/uploadfile.svg";
import Button from "../../Button/Button";

import {
  required,
  mustBeNumber,
  composeValidators,
} from "../../../utils/validation";

export const AddPartsForm = () => {
  const { setIsOpen } = useContext(PopupContext);
  const { t } = useTranslation("admin-parts");
  const dispatch = useDispatch();
  const [arrPicsContainer, setArrPicsContainer] = useState([]);
  const [newArrPicsContainer, setNewArrPicsContainer] = useState([]);

  useEffect(() => {
    return () => {
      setArrPicsContainer([]);
      setNewArrPicsContainer([]);
    };
  }, []);

  const onSubmit = async (values) => {
    dispatch(
      addNewParts(
        {},
        {
          ...values,
          catalog_number:
            values.catalog_numberInput ||
            (values.catalog_number && values.catalog_number.label),
          image: newArrPicsContainer,
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
            <span className={styles.red}>{t("add new part")}</span>
          </h2>
          <Field name="client_id" validate={required} type="text">
            {renderInput({
              label: t("ClientID"),
              classNameWrapper: styles.popupFieldRow,
              classNameWrapperLabel: styles.label,
              widthInputBlock: styles.widthInput,
            })}
          </Field>
          <Field name="catalog_numberInput" type="text">
            {renderInput({
              label: t("Catalog number"),
              classNameWrapper: styles.popupFieldRow,
              classNameWrapperLabel: styles.label,
              widthInputBlock: styles.widthInput,
            })}
          </Field>
          <Field name="name" validate={required} type="text">
            {renderInput({
              label: t("Name"),
              classNameWrapper: styles.popupFieldRow,
              classNameWrapperLabel: styles.label,
              widthInputBlock: styles.widthInput,
            })}
          </Field>
          <Field name="auto" validate={required} type="text">
            {renderInput({
              label: t("Auto"),
              classNameWrapper: styles.popupFieldRow,
              classNameWrapperLabel: styles.label,
              widthInputBlock: styles.widthInput,
            })}
          </Field>

          <Field
            name="quality"
            validate={composeValidators(required, mustBeNumber)}
            type="text"
          >
            {renderInput({
              label: t("Quantity"),
              classNameWrapper: styles.popupFieldRow,
              classNameWrapperLabel: styles.label,
              widthInputBlock: styles.widthInput,
            })}
          </Field>
          <Field
            name="container"
            validate={composeValidators(required, mustBeNumber)}
            type="text"
          >
            {renderInput({
              label: "Add container #",
              classNameWrapper: styles.popupFieldRow,
              classNameWrapperLabel: styles.label,
              widthInputBlock: styles.widthInput,
            })}
          </Field>
          <Previews
            icon={<IconUpload className={styles.icon} />}
            setArrPics={setArrPicsContainer}
            arrPics={arrPicsContainer}
            title={t("Addphoto")}
            customText={styles.customText}
            customIconBlock={styles.customIconBlock}
            customThumbs={styles.thumbs}
            setNewArrPics={setNewArrPicsContainer}
            newArrPics={newArrPicsContainer}
          />
          <Button
            customBtn={styles.btnSubmit}
            type="submit"
            disabled={submitting}
          >
            {t("add new part")}
          </Button>
        </form>
      )}
    />
  );
};
