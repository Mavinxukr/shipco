import React, { useContext, useState } from "react";
import { Form } from "react-final-form";
import useTranslation from "next-translate/useTranslation";
import Button from "../../Button/Button";
import { printData, getIdsArr } from "../../../utils/helpers";
import Example from "../../Multi/Multi";
import { print } from "./data";
import styles from "./PrintForm.scss";
import { PopupContext } from "../../../context/PopupContext";

export const PrintForm = () => {
  const [selected, setSelected] = useState([]);
  const { setIsOpen } = useContext(PopupContext);

  const { t } = useTranslation("admin-groups");

  const onSubmitPrint = () => {
    const idsArr = getIdsArr(selected);

    printData({
      params: {
        fields: idsArr,
      },
      table: "groups",
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
            <Example
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
