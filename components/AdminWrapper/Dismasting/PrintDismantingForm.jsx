import React, { useState, useContext } from "react";
import styles from "./PrintDismantingForm.scss";
import { Form } from "react-final-form";
import MultiSelect from "../../Multi/Multi";
import Button from "../../Button/Button";
import { printData, getIdsArr } from "../../../utils/helpers";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../../context/PopupContext";
import { print } from "./data";

export const PrintDismantingForm = () => {
  const [selected, setSelected] = useState([]);
  const { t } = useTranslation("admin-dismantings");
  const { setIsOpen } = useContext(PopupContext);

  const onSubmitPrint = () => {
    const idsArr = getIdsArr(selected);
    printData({
      params: {
        fields: idsArr,
      },
      table: "dismantings",
      selected: idsArr,
      setSelected,
      setPrintPopup: setIsOpen,
    });
  };

  return (
    <Form
      onSubmit={onSubmitPrint}
      render={({ handleSubmit, invalid, submitting }) => (
        <form onSubmit={handleSubmit}>
          <h2 className={styles.title}>
            <span className={styles.red}>Print</span>
          </h2>
          <div className={styles.columnSelect}>
            <MultiSelect
              options={print(t)}
              setSelected={setSelected}
              value={selected}
              label={t("Select the fields Print")}
            />
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={submitting || invalid}
            >
              {t("SUBMIT")}
            </Button>
          </div>
        </form>
      )}
    />
  );
};
