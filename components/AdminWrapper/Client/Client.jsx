import React, {
  useEffect,
  forwardRef,
  useState,
  useRef,
  useContext,
} from "react";
import { usePagination, useTable, useRowSelect } from "react-table";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import { useRouter } from "next/router";
import Link from "next/link";
import Pickers from "../../Pickers/Pickers";
import { getClient, deleteClient } from "../../../redux/actions/client";
import {
  clientDataSelector,
  clientDataReceivedSelector,
  currentClientDataSelector,
  currentClientDataReceivedSelector,
} from "../../../utils/selectors";
import { getCurrentClient } from "../../../redux/actions/currentClient";
import Button from "../../Button/Button";
import MainLayout from "../../Layout/Global/Global";
import SubHeader from "../../Layout/SubHeader/SubHeader";
import CustomTable from "../../CustomTable/CustomTable";
import IconPlus from "../../../assets/svg/Plus.svg";
import IconMinus from "../../../assets/svg/min.svg";
import { columns, stateStatus, cityselect, damageStatus } from "./data";
import Loader from "../../Loader/Loader";
import { renderSelect } from "../../../utils/renderInputs";
import Pagination from "../../Pagination/Pagination";
import styles from "./Client.scss";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../../context/PopupContext";
import { AddOffersForm } from "./AddOffersForm";
import { PrintClientForm } from "./PrintClientForm";

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

const arrYear = [];
const yearNow = new Date().getFullYear();

for (let i = 2000; i <= yearNow; i++) {
  arrYear.push({ label: i, value: i });
}

const Client = () => {
  const client = useSelector(clientDataSelector);
  const currentClient = useSelector(currentClientDataSelector);
  const isDataReceived = useSelector(clientDataReceivedSelector);
  const isDataReceivedClient = useSelector(currentClientDataReceivedSelector);
  const { t } = useTranslation("admin-auto");
  const { setIsOpen, setContent } = useContext(PopupContext);

  const selectYear = [];

  for (let i = 2000; i <= yearNow; i++) {
    selectYear.push({ label: i, value: i });
  }

  selectYear.unshift({
    label: t("All years"),
    value: "",
  });

  const dispatch = useDispatch();

  const arrAutoId = [];

  const router = useRouter();

  useEffect(() => {
    const params = router.query.isClient
      ? {}
      : { client: +router.query.idUser };
    if (router.query.idUser) {
      dispatch(getCurrentClient({}, +router.query.idUser));
    }
    dispatch(getClient(params));
  }, []);

  useEffect(() => {
    if (router.query.isClient) {
      dispatch(getClient({}));
    }
  }, [router.query.isClient]);

  useEffect(() => {
    dispatch(
      getClient({
        page: router.query.page || 1,
        countpage: router.query.countpage || "10",
        client: router.query.idUser || "",
        auto_status: router.query.auto_status || "",
        search: router.query.search || "",
        port: router.query.port || "",
        client_name: router.query.client_name || "",
        year: router.query.year || "",
        damage_status: router.query.damage_status || "",
        date_from: router.query.date_from || "",
        date_to: router.query.date_to || "",
      })
    );
  }, [router.query]);

  if (router.query.idUser) {
    if (!isDataReceived || !isDataReceivedClient) {
      return <Loader />;
    }
  }

  if (!isDataReceived) {
    return <Loader />;
  }

  const onSubmitFilter = async (values) => {
    router.push({
      pathname: "/auto-admin",
      query: {
        ...router.query,
        auto_status: values.auto_status && values.auto_status.value,
        port: values.port && values.port.value,
        client_name: values.client_name && values.client_name.value,
        year: values.year && values.year.value,
        damage_status: values.damage_status && values.damage_status.value,
        date_from: document.querySelector("#from").value || "",
        date_to: document.querySelector("#to").value || "",
      },
    });
  };

  const arrClientName = client.additional.clients.map((item) => ({
    label: item.name,
    value: item.name,
  }));

  arrClientName.unshift({
    label: t("All clients"),
    value: "",
  });

  return (
    <MainLayout admin>
      <SubHeader
        client={client}
        hidden
        currentClient={currentClient}
        currentClientId={router.query.idUser}
        onClick={() => {
          router.push({
            pathname: "/auto-admin",
            query: {
              ...router.query,
              page: 1,
              search: document.querySelector("#search").value,
            },
          });
          dispatch(
            getClient({
              search: document.querySelector("#search").value,
            })
          );
        }}
      />
      <div className={styles.container}>
        <div className={styles.flex}>
          <div className={styles.groupBtn}>
            <Button
              type="button"
              customBtn={styles.btnIcon}
              onClick={() => {
                setContent(AddOffersForm);
                setIsOpen(true);
              }}
            >
              <IconPlus className={cx(styles.plus, styles.icon)} />
              {t("Add New offers")}
            </Button>
            <Button
              customBtn={styles.btnIcon}
              onClick={() => {
                dispatch(
                  deleteClient(
                    {
                      client: +router.query.idUser || "",
                    },
                    {
                      auto_id: arrAutoId,
                    }
                  )
                );
              }}
            >
              <IconMinus className={styles.icon} />
              {t("delete")}
            </Button>
          </div>
          <div className={styles.groupBtn}>
            <Button
              customBtn={styles.rightBtn}
              onClick={() => {
                setContent(PrintClientForm);
                setIsOpen(true);
              }}
            >
              {t("print")}
            </Button>
            <Button customBtn={styles.rightBtn}> {t("import")}</Button>
          </div>
        </div>
        <Form
          onSubmit={onSubmitFilter}
          render={({ handleSubmit, invalid, submitting }) => (
            <form
              className={cx(styles.flex, styles.filter)}
              onSubmit={handleSubmit}
            >
              <div className={cx(styles.flex, styles.selectBlock)}>
                <Field
                  name="auto_status"
                  component={renderSelect({
                    placeholder: router.query.auto_status || t("All status"),
                  })}
                  options={stateStatus}
                />
              </div>
              <div className={cx(styles.flex, styles.selectBlock)}>
                <Field
                  name="port"
                  component={renderSelect({
                    placeholder: router.query.port || t("Point of loading"),
                  })}
                  options={cityselect}
                />
              </div>
              <div className={cx(styles.flex, styles.selectBlock)}>
                <Field
                  name="client_name"
                  component={renderSelect({
                    placeholder: router.query.client_name || t("All clients"),
                  })}
                  options={arrClientName}
                />
              </div>
              <div className={cx(styles.flex, styles.selectBlock)}>
                <Field
                  name="year"
                  component={renderSelect({
                    placeholder: router.query.year || t("All years"),
                  })}
                  options={selectYear}
                />
              </div>
              <div className={cx(styles.flex, styles.selectBlock)}>
                <Field
                  name="damage_status"
                  component={renderSelect({
                    placeholder: router.query.damage_status || t("All years"),
                  })}
                  options={damageStatus}
                />
              </div>
              <div className={cx(styles.flex, styles.pickers)}>
                <p>{t("Date from")}</p>
                <Pickers
                  time={router.query.date_from || ""}
                  defaultValue=""
                  id="from"
                />
              </div>
              <div className={cx(styles.flex, styles.pickers)}>
                <p>{t("Date to")}</p>
                <Pickers
                  time={router.query.date_to || ""}
                  defaultValue=""
                  id="to"
                />
              </div>
              <div className={cx(styles.flex, styles.selectBlock)}>
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  {t("Ok")}
                </Button>
              </div>
            </form>
          )}
        />
        <>
          {client && client.data.length !== 0 ? (
            <CustomTable>
              <Pagination
                params={client.links}
                pathname="/auto-admin"
                router={router}
              />
              <div className={styles.scrollTable}>
                <Table
                  columns={columns(t)}
                  data={client.data}
                  arrAutoId={arrAutoId}
                />
              </div>
              <Pagination
                params={client.links}
                pathname="/auto-admin"
                router={router}
              />
            </CustomTable>
          ) : (
            <h1 className={styles.notFound}>nothing found</h1>
          )}
        </>
      </div>
    </MainLayout>
  );
};

export default Client;

const Table = ({ columns, data, arrAutoId }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data,
        initialState: { pageIndex: 0 },
      },
      usePagination,
      useRowSelect,
      (hooks) => {
        hooks.allColumns.push((columns) => [
          {
            id: "selection",
            Header: ({ getToggleAllRowsSelectedProps }) => (
              <div>
                <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
              </div>
            ),
            Cell: ({ row }) => (
              <div>
                <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
              </div>
            ),
          },
          ...columns,
        ]);
      }
    );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    className={cx(
                      `Client-${cell.column.id}`,
                      `Client-${cell.value}`
                    )}
                    {...cell.getCellProps()}
                    onClick={() => {
                      if (!cell.row.isSelected) {
                        arrAutoId.push(cell.row.original.id);
                      } else {
                        const index = arrAutoId.indexOf(cell.row.original.id);
                        if (index > -1) {
                          arrAutoId.splice(index, 1);
                        }
                      }
                    }}
                  >
                    {cell.column.id === "paiment" ? (
                      <>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            cell.row.original.document.length === 0
                              ? "/"
                              : cell.row.original.document[0].link
                          }
                          onClick={(e) => {
                            if (cell.row.original.document.length === 0) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Auction invoice
                        </a>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            cell.row.original.document.length === 2
                              ? cell.row.original.document[1].link
                              : "/"
                          }
                          onClick={(e) => {
                            if (cell.row.original.document.length !== 2) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Shipping charge invoice
                        </a>
                      </>
                    ) : (
                      <>
                        {cell.column.id === "client.due_day" ? (
                          <Link
                            href={{
                              pathname: "/payments",
                              query: {
                                idClient: cell.row.original.client.price_id,
                              },
                            }}
                          >
                            <a
                              className={
                                cell.row.original.client.is_finish
                                  ? styles.red
                                  : undefined
                              }
                            >
                              {cell.render("Cell")}
                            </a>
                          </Link>
                        ) : (
                          <>{cell.render("Cell")}</>
                        )}
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
