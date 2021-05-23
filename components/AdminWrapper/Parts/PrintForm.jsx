import React, { useContext, useState } from "react";
import styles from "./PrintForm.scss";
import MultiSelect from "../../Multi/Multi";
import useTranslation from "next-translate/useTranslation";
import { printData, getIdsArr } from "../../../utils/helpers";
import { PopupContext } from "../../../context/PopupContext";
import { Form } from "react-final-form";
import Button from "../../Button/Button";
import { print } from "./data";

export const PrintForm = () => {
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
