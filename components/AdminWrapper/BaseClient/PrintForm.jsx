import React, { useState, useContext } from "react";
import useTranslation from "next-translate/useTranslation";
import { Form } from "react-final-form";

import MultiSelect from "../../Multi/Multi";
import Button from "../../Button/Button";
import { printData, getIdsArr } from "../../../utils/helpers";
import { print } from "./data";
import styles from "./PrintForm.scss";
import { PopupContext } from "../../../context/PopupContext";

export const PrintForm = () => {
  const [selected, setSelected] = useState([]);
  const { setIsOpen } = useContext(PopupContext);

  const { t } = useTranslation("admin-base-client");

  const onSubmit = () => {
    const idsArr = getIdsArr(selected);
    printData({
      params: {
        fields: idsArr,
      },
      table: "base_clients",
      selected: idsArr,
      setSelected,
      setPrintPopup: setIsOpen,
    });
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, invalid, submitting }) => (
        <form onSubmit={handleSubmit}>
          <div className={styles.columnSelect}>
            <MultiSelect
              options={print(t)}
              setSelected={setSelected}
              value={selected}
              label={t("SelectthefieldsPrint")}
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
