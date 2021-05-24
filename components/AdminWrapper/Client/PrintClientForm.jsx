import React, { useContext, useState } from "react";
import MultiSelect from "../../Multi/Multi";
import Button from "../../Button/Button";
import { Form } from "react-final-form";
import styles from "./PrintClientForm.scss";
import { useRouter } from "next/router";
import { print } from "./data";
import { printData, getIdsArr } from "../../../utils/helpers";
import { PopupContext } from "../../../context/PopupContext";

export const PrintClientForm = () => {
  const [selected, setSelected] = useState([]);
  const router = useRouter();
  const { setIsOpen } = useContext(PopupContext);

  const onSubmitPrint = () => {
    const idsArr = getIdsArr(selected);
    const paramsClient = router.query.isClient
      ? {
          fields: idsArr,
        }
      : {
          client_id: +router.query.idUser || "",
          fields: idsArr,
        };
    const tableClient = router.query.isClient ? "autos" : "client";
    printData({
      params: paramsClient,
      table: tableClient,
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
              options={print}
              setSelected={setSelected}
              value={selected}
              label="Select the fields Print"
            />
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={submitting || invalid}
            >
              Submit
            </Button>
          </div>
        </form>
      )}
    />
  );
};
