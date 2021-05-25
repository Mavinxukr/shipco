import React, { useContext, useEffect, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import { Field, Form } from "react-final-form";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import formatStringByPattern from "format-string-by-pattern";
import {
  getPayments,
  addNewPayments,
  deletePayments,
  updatePayments,
} from "../../../redux/actions/payments";
import {
  paymentsDataSelector,
  paymentsDataReceivedSelector,
} from "../../../utils/selectors";
import { renderInput, renderSelect } from "../../../utils/renderInputs";
import Button from "../../Button/Button";
import Popup from "../../Popup/Popup";
import MainLayout from "../../Layout/Global/Global";
import IconPlus from "../../../assets/svg/Plus.svg";
import CustomTable from "../../CustomTable/CustomTable";
import {
  composeValidators,
  required,
  mustBeNumber,
  lengthDueDay,
} from "../../../utils/validation";
import Pagination from "../../Pagination/Pagination";
import Loader from "../../Loader/Loader";
import styles from "./Payments.scss";
import IconP from "../../../assets/svg/p.svg";
import IconTrash from "../../../assets/svg/Trash.svg";
import { columns, city, type } from "./data";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../../context/PopupContext";
import { AddNewPayments } from "./AddNewPayments";
import { EditPaymentsForm } from "./EditPaymentsForm";

const Table = ({ columns, data, dispatch }) => {
  const { setContent, setIsOpen } = useContext(PopupContext);

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
    useTable({
      columns,
      data,
      initialState: { pageIndex: 0 },
    });

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th
                  {...column.getHeaderProps()}
                  className={`Groups-${column.id}Header`}
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
                    className={`Groups-${cell.column.id}`}
                    {...cell.getCellProps()}
                  >
                    {cell.column.id === "actions" ? (
                      <div className={styles.buttonsBlock}>
                        <Button
                          type="button"
                          customBtn={styles.actionsButton}
                          onClick={() => {
                            setContent(EditPaymentsForm, {
                              data: cell.row.original,
                            });
                            setIsOpen(true);
                          }}
                        >
                          <IconP />
                        </Button>
                        <Button
                          type="button"
                          customBtn={styles.actionsButton}
                          onClick={() => {
                            dispatch(deletePayments({}, cell.row.original.id));
                          }}
                        >
                          <IconTrash />
                        </Button>
                      </div>
                    ) : (
                      <>
                        <>{cell.render("Cell")}</>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const Payments = () => {
  const [paymentsData, setPaymentsData] = useState(null);
  const { t } = useTranslation("admin-payments");
  const payments = useSelector(paymentsDataSelector);
  const isDataReceived = useSelector(paymentsDataReceivedSelector);
  const { setContent, setIsOpen } = useContext(PopupContext);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPayments({
        page: router.query.page || 1,
        countpage: router.query.countpage || "10",
        client: +router.query.idClient || "",
      })
    );
  }, [router.query]);

  useEffect(() => {
    const params = router.query.isClient
      ? {}
      : { client: +router.query.idClient };
    if (router.query.idClient) {
      dispatch(getPayments({}, +router.query.idClient));
    } else {
      dispatch(getPayments(params));
    }
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout admin>
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>{t("payments")}</h4>
        </div>
        <div className={styles.flex}>
          <div className={styles.groupBtn}>
            <Button
              type="button"
              customBtn={styles.btnIcon}
              onClick={() => {
                setContent(AddNewPayments);
                setIsOpen(true);
              }}
            >
              <IconPlus className={cx(styles.plus, styles.icon)} />
              {t("addNewPayments")}
            </Button>
          </div>
        </div>
        {payments && payments.data.length !== 0 ? (
          <CustomTable>
            {typeof payments.data === "object" && payments.links && (
              <Pagination
                params={payments.links}
                pathname="/payments"
                router={router}
              />
            )}
            <div className={styles.scrollTable}>
              <Table
                columns={columns(t)}
                data={
                  (Array.isArray(payments.data) && payments.data) || [
                    payments.data,
                  ]
                }
                dispatch={dispatch}
                groupsArr={payments.additional.clients}
                setPaymentsData={setPaymentsData}
                paymentsData={paymentsData}
                payments={payments}
              />
            </div>
            {typeof payments.data === "object" && payments.links && (
              <Pagination
                params={payments.links}
                pathname="/payments"
                router={router}
              />
            )}
          </CustomTable>
        ) : (
          <h1 className={styles.notFound}>nothing found</h1>
        )}
      </div>
    </MainLayout>
  );
};

export default Payments;
