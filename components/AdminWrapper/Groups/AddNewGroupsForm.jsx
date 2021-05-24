import React, { useContext, useState } from "react";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import useTranslation from "next-translate/useTranslation";
import Example from "../../Multi/Multi";
import Button from "../../Button/Button";

import { renderInput } from "../../../utils/renderInputs";
import { addNewGroups } from "../../../redux/actions/groups";
import styles from "./AddNewGroupsForm.scss";
import { PopupContext } from "../../../context/PopupContext";
import { required } from "../../../utils/validation";
import { groupsDataSelector } from "../../../utils/selectors";

export const AddNewGroupsForm = () => {
  const dispatch = useDispatch();
  const { setIsOpen } = useContext(PopupContext);
  const { t } = useTranslation("admin-groups");
  const groups = useSelector(groupsDataSelector);
  const [selected, setSelected] = useState([]);

  const onSubmit = (values) => {
    const arrId = selected.map((item) => item.value);
    dispatch(
      addNewGroups(
        {},
        {
          ...values,
          clients: arrId.join(),
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
            <span className={styles.red}>{t("Add New Groups")}</span>
          </h2>
          <Field name="name" validate={required} type="text">
            {renderInput({
              label: t("Name"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Example
            options={groups.additional.clients}
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
              {t("Add New Groups")}
            </Button>
          </div>
        </form>
      )}
    />
  );
};
