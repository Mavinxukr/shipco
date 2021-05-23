import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../context/PopupContext";
import { updateShipping } from "../../redux/actions/shipping";
import styles from "./AddNotesForm.scss";
import { required } from "../../utils/validation";
import Button from "../Button/Button";
import { HistoryNotes } from "./HistoryNotes";

export const AddNotesForm = ({ item }) => {
  const dispatch = useDispatch();
  const { setIsOpen, setContent } = useContext(PopupContext);
  const { t } = useTranslation("dismanting");

  const onSubmit = async (values) => {
    dispatch(
      updateShipping(
        {},
        {
          auto_id: item.id,
          ...values,
        },
        "",
        true
      )
    );
    setIsOpen(false);
  };

  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, form, values, invalid }) => (
          <form onSubmit={handleSubmit} className={styles.fullWidth}>
            <div className={styles.flex}>
              <label className={styles.label}>{t("Comment")}</label>
              <Field
                className={styles.customTextarea}
                name="comment"
                validate={required}
                component="textarea"
                placeholder=""
              />
            </div>
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={submitting || invalid}
            >
              {t("AddingNotes")}
            </Button>
          </form>
        )}
      />
      <Button
        customBtn={styles.btnSubmit}
        type="button"
        onClick={() => {
          setContent(HistoryNotes, { item });
        }}
      >
        History
      </Button>
    </>
  );
};
