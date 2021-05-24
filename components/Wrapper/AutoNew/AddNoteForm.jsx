import React, { useContext } from "react";
import { Field, Form } from "react-final-form";
import { updateAutoId } from "../../../redux/actions/autoId";
import { useDispatch } from "react-redux";
import { PopupContext } from "../../../context/PopupContext";
import Button from "../../Button/Button";
import styles from "./AddNoteForm.scss";
import { HistoryNotes } from "./HistoryNotes";

export const AddNoteForm = () => {
  const { setContent, setIsOpen } = useContext(PopupContext);
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(
      updateAutoId(
        {},
        {
          auto_id: autoId.id,
          ...values,
        }
      )
    );
    setIsOpen(false);
  };
  return (
    <>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, form, values }) => (
          <form onSubmit={handleSubmit} className={styles.fullWidth}>
            <div className={styles.flex}>
              <label className={styles.label}>Comment:</label>
              <Field
                className={styles.customTextarea}
                name="comment"
                component="textarea"
                placeholder=""
              />
            </div>
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={submitting}
            >
              Adding notes
            </Button>
          </form>
        )}
      />
      <Button
        customBtn={styles.btnSubmit}
        type="button"
        onClick={() => {
          setContent(HistoryNotes);
        }}
      >
        History
      </Button>
    </>
  );
};
