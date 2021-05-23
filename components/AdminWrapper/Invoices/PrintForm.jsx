import React, { useContext, useState } from "react";
import styles from "./PrintForm.scss";
import { printData, getIdsArr } from "../../../utils/helpers";
import MultiSelect from "../../Multi/Multi";
import { print } from "./data";
import Button from "../../Button/Button";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../../context/PopupContext";
import { Form } from "react-final-form";

export const PrintForm = () => {
  const [selected, setSelected] = useState([]);
  const { t } = useTranslation("admin-invoices");
  const { setIsOpen } = useContext(PopupContext);

  const onSubmitPrint = () => {
    const idsArr = getIdsArr(selected);
    printData({
      params: {
        fields: idsArr,
      },
      table: "invoices",
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
          <div className={styles.columnSelect}>
            <MultiSelect
              options={print(t)}
              setSelected={setSelected}
              value={selected}
              label={t("selectPrint")}
            />
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={submitting || invalid}
            >
              {t("submit")}
            </Button>
          </div>
        </form>
      )}
    />
  );
};
