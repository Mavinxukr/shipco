import React, { useContext, useEffect, useState } from "react";
import { Field, Form } from "react-final-form";
import useTranslation from "next-translate/useTranslation";
import styles from "./AddPartsForm.scss";
import { PopupContext } from "../../../context/PopupContext";
import { useSelector, useDispatch } from "react-redux";
import { renderInput, renderSelect } from "../../../utils/renderInputs";
import { statusSelect } from "./data";
import { updatePartsRequest } from "../../../services/parts";

import Previews from "../../Previews/Previews";
import IconUpload from "../../../assets/svg/uploadfile.svg";
import Button from "../../Button/Button";
import {
  mustBeNumber,
  composeValidators,
  vinNum,
} from "../../../utils/validation";
import { partsDataSelector } from "../../../utils/selectors";

export const EditPartsForm = ({ data }) => {
  const { setIsOpen } = useContext(PopupContext);
  const parts = useSelector(partsDataSelector);
  const [arrPicsContainer, setArrPicsContainer] = useState([]);
  const [newArrPicsContainer, setNewArrPicsContainer] = useState([]);
  const [updateData, setUpdateData] = useState(data);

  const { t } = useTranslation("admin-parts");
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmitUpdate = async (values) => {
    setLoading(true);
    setError("");

    const response = await updatePartsRequest(
      {},
      {
        ...values,
        status: values.status && values.status.value,
        catalog_number: values.catalog_number && values.catalog_number.label,
        image: newArrPicsContainer,
      },
      updateData.id
    );

    if (response.status) {
      setLoading(false);
      setIsOpen(false);
      const clientPartsData = await useSelector(clientPartsDataSelector);
      const idx = clientPartsData.data.findIndex((item) => item.id === id);
      const newArr = [
        ...clientPartsData.data.slice(0, idx),
        response.data.data,
        ...clientPartsData.data.slice(idx + 1),
      ];
      dispatch(
        getClientPartsSuccess({
          data: newArr,
          links: clientPartsData.links,
          additional: response.data.additional,
        })
      );
      setArrPicsContainer([]);
      setNewArrPicsContainer([]);
    } else {
      setLoading(false);
      setError(response.message);
    }
  };

  useEffect(() => {
    console.log(updateData);
    if (updateData && updateData.images) {
      setArrPicsContainer(updateData.images);
    }
  }, [updateData]);

  useEffect(() => {
    if (updateData) {
      setArrPicsContainer(
        parts.data.find((item) => item.id === updateData.id).images
      );
    }
  }, [parts]);
  return (
    <Form
      onSubmit={onSubmitUpdate}
      render={({ handleSubmit, submitting }) => {
        return (
          <form onSubmit={handleSubmit}>
            <Field
              name="client_id"
              type="text"
              defaultValue={updateData.client_id || ""}
            >
              {renderInput({
                label: t("ClientID"),
                classNameWrapper: styles.popupFieldRow,
                classNameWrapperLabel: styles.label,
                widthInputBlock: styles.widthInput,
              })}
            </Field>
            <Field name="name" type="text" defaultValue={updateData.name || ""}>
              {renderInput({
                label: t("Name"),
                classNameWrapper: styles.popupFieldRow,
                classNameWrapperLabel: styles.label,
                widthInputBlock: styles.widthInput,
              })}
            </Field>
            <Field name="auto" type="text" defaultValue={updateData.auto || ""}>
              {renderInput({
                label: t("Auto"),
                classNameWrapper: styles.popupFieldRow,
                classNameWrapperLabel: styles.label,
                widthInputBlock: styles.widthInput,
              })}
            </Field>
            <Field
              name="vin"
              type="text"
              validate={vinNum}
              defaultValue={updateData.vin || ""}
            >
              {renderInput({
                label: t("VINNumber"),
                classNameWrapper: styles.popupFieldRow,
                classNameWrapperLabel: styles.label,
                widthInputBlock: styles.widthInput,
              })}
            </Field>
            <Field
              name="status"
              component={renderSelect({
                placeholder: t(
                  updateData.status.split("_").join(" ").toUpperCase()
                ),
                label: t("Status"),
                classNameWrapper: styles.popupFieldRow,
                classNameLabel: styles.label,
                widthInputBlock: styles.widthInput,
              })}
              options={statusSelect(t)}
            />
            <Field
              name="quality"
              type="text"
              defaultValue={updateData.quality || ""}
              validate={mustBeNumber}
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
              validate={composeValidators(mustBeNumber)}
              type="text"
              defaultValue={updateData.container || ""}
            >
              {renderInput({
                label: "Add container #",
                classNameWrapper: styles.popupFieldRow,
                classNameWrapperLabel: styles.label,
                widthInputBlock: styles.widthInput,
              })}
            </Field>
            <Previews
              idAuto={updateData.id}
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
            {error ? <p className={styles.error}>{error}</p> : null}
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={loading || submitting}
            >
              {t("UPDATEPART")}
            </Button>
          </form>
        );
      }}
    />
  );
};
