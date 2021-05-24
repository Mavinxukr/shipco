import React, { useContext, useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import { updateGroups } from "../../../redux/actions/groups";
import { PopupContext } from "../../../context/PopupContext";
import { required } from "../../../utils/validation";
import styles from "./EditGroupForm.scss";
import { renderInput } from "../../../utils/renderInputs";
import Example from "../../Multi/Multi";
import Button from "../../Button/Button";

export const EditGroupForm = ({ itemGroup, select, allUsers }) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(select);
  const { setIsOpen } = useContext(PopupContext);
  const { t } = useTranslation("admin-groups");

  const onSubmit = (values) => {
    const id = selected;
    const arrId = Object.keys(id).map((item, index) => ({
      value: Object.values(id)[index].value,
    }));
    const submitId = [];
    arrId.forEach((item) => {
      submitId.push(Object.values(item));
    });
    dispatch(
      updateGroups(
        {},
        {
          ...values,
          clients: submitId.join(),
        },
        itemGroup.id
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
            <span className={styles.red}>{t("UPDATEGROUP")}</span>
          </h2>
          <Field
            name="name"
            validate={required}
            type="text"
            defaultValue={itemGroup.name}
          >
            {renderInput({
              label: t("Name"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Example
            options={allUsers}
            setSelected={setSelected}
            value={selected}
            label={t("Clientsid")}
          />
          <div className={styles.submitPopup}>
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={submitting || invalid}
            >
              {t("UPDATEGROUP")}{" "}
            </Button>
          </div>
        </form>
      )}
    />
  );
};
