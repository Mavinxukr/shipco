import React, { useContext, useState } from "react";
import useTranslation from "next-translate/useTranslation";
import { Form } from "react-final-form";
import MultiSelect from "../../Multi/Multi";
import Button from "../../Button/Button";
import { printData, getIdsArr } from "../../../utils/helpers";
import { print } from "./data";
import styles from "./PrintPartsForm.scss";
import { PopupContext } from "../../../context/PopupContext";

export const PrintPartsForm = () => {
  const { t } = useTranslation("admin-parts");
  const [selected, setSelected] = useState([]);
  const { setIsOpen } = useContext(PopupContext);

  const onSubmitPrint = () => {
    const idsArr = getIdsArr(selected);
    printData({
      params: {
        fields: idsArr,
      },
      table: "parts",
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
            <span className={styles.red}>{t("PRINT")}</span>
          </h2>
          <div className={styles.columnSelect}>
            <MultiSelect
              options={print(t)}
              setSelected={setSelected}
              value={selected}
              label={t("SelectPrint")}
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
