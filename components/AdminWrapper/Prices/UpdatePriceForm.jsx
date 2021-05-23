import React, { useContext, useState, useEffect } from "react";
import { required } from "../../../utils/validation";
import { Field, Form } from "react-final-form";
import { useTable } from "react-table";
import { renderInput, renderSelect } from "../../../utils/renderInputs";
import { useDispatch, useSelector } from "react-redux";
import { PopupContext } from "../../../context/PopupContext";
import { updatePrices } from "../../../redux/actions/prices";
import styles from "./UpdatePriceForm.scss";
import useTranslation from "next-translate/useTranslation";
import { type, columnsPrice } from "./data";
import Button from "../../Button/Button";
import { pricesDataSelector } from "../../../utils/selectors";

const TableUpdate = ({ columns, data }) => {
  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
    });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className={`Parts-${column.id}Header`}
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <td
                  className={`Parts-${cell.column.id}`}
                  {...cell.getCellProps()}
                >
                  {cell.column.id === "price" ? (
                    <Field
                      name={`price_${cell.row.original.id}`}
                      type="number"
                      defaultValue={cell.row.original.pivot.price_value || "0"}
                    >
                      {renderInput({
                        classNameWrapper: styles.widthInput,
                      })}
                    </Field>
                  ) : (
                    <>{cell.render("Cell")}</>
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export const UpdatePriceForm = ({ itemGroup }) => {
  console.log(itemGroup);
  const prices = useSelector(pricesDataSelector);
  const { t } = useTranslation("admin-price");
  const [priceableData, setPriceableData] = useState([]);
  const [options, setOptions] = useState([]);

  const { setIsOpen } = useContext(PopupContext);
  const dispatch = useDispatch();

  useEffect(() => {
    const key = itemGroup.priceable_type + "s";
    if (prices) {
      setPriceableData(prices.additional[key]);
    }
  }, [prices]);

  useEffect(() => {
    setOptions(
      priceableData.map((item) => ({
        value: item.id,
        label: item.name,
      }))
    );
  }, [priceableData]);

  const onSubmit = (values) => {
    const arr = [];
    _.forIn(values, (value, key) => {
      if (key.indexOf("price_") !== -1) {
        arr.push(`c=${key.split("_")[1]},p=${value}`);
      }
    });
    dispatch(
      updatePrices(
        {},
        {
          name: values.name,
          priceable_type: values.priceable_type && values.priceable_type.value,
          priceable_id: values.priceable_id && values.priceable_id.value,
          dependency: arr.join(";"),
        },
        itemGroup.id
      )
    );
    setIsOpen(false);
  };

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, invalid, submitting }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="name"
            validate={required}
            type="text"
            defaultValue={itemGroup.name || ""}
          >
            {renderInput({
              label: t("name"),
              classNameWrapper: styles.popupFieldRow,
              widthInputBlock: styles.widthInputBlock,
              classNameWrapperLabel: styles.label,
            })}
          </Field>
          <Field
            name="priceable_type"
            component={renderSelect({
              placeholder: itemGroup.priceable_type || "",
              label: t("applicableType"),
              classNameWrapper: "SelectCustom-popupFieldRow",
              custonOnChange: (value) => {
                const key = value.label === "clients" ? "clients" : "groups";
                setPriceableData(prices.additional[key]);
              },
            })}
            options={type(t)}
          />
          <Field
            name="priceable_id"
            component={renderSelect({
              placeholder: itemGroup.priceable.name,
              label: t("applicableId"),
              id: "priceable_id",
              classNameWrapper: "SelectCustom-popupFieldRow",
            })}
            options={options}
          />
          <div className={styles.scrollTable}>
            <TableUpdate columns={columnsPrice(t)} data={itemGroup.cities} />
          </div>
          <div className={styles.submitPopup}>
            <Button
              customBtn={styles.btnSubmit}
              type="submit"
              disabled={submitting || invalid}
            >
              {t("updatePrice")}
            </Button>
          </div>
        </form>
      )}
    />
  );
};
