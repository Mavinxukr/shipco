import React, { useEffect, forwardRef, useState, useRef } from "react";
import { usePagination, useTable, useRowSelect } from "react-table";
import formatStringByPattern from "format-string-by-pattern";
import cx from "classnames";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import { useRouter } from "next/router";
import Link from "next/link";
import Pickers from "../../Pickers/Pickers";
import {
  getClient,
  deleteClient,
  addNewClient,
} from "../../../redux/actions/client";
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
import { printData, getIdsArr } from "../../../utils/helpers";
import {
  columns,
  stateStatus,
  status,
  city,
  print,
  cityselect,
  popularCars,
  auctions,
  damageStatus,
  statusRadio,
} from "./data";
import Loader from "../../Loader/Loader";
import Popup from "../../Popup/Popup";
import {
  required,
  mustBeNumber,
  composeValidators,
  lengthDueDay,
  vinNum,
} from "../../../utils/validation";
import {
  renderInput,
  renderSelect,
  renderInputFile,
} from "../../../utils/renderInputs";
import Pagination from "../../Pagination/Pagination";
import MultiSelect from "../../Multi/Multi";
import styles from "./Client.scss";
import useTranslation from "next-translate/useTranslation";

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
  const error = useSelector((state) => state.client.error);
  const currentClient = useSelector(currentClientDataSelector);
  const isDataReceived = useSelector(clientDataReceivedSelector);
  const isDataReceivedClient = useSelector(currentClientDataReceivedSelector);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [printPopup, setPrintPopup] = useState(false);
  const [selected, setSelected] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const { t } = useTranslation("admin-auto");

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

  const onSubmit = (values) => {
    dispatch(
      addNewClient(
        {
          client: +router.query.idUser || "",
        },
        {
          ...values,
          status: values.status && values.status.value,
          make_name: values.make_name && values.make_name.value,
          auction: values.auction && values.auction.value,
          year: values.year && values.year.value,
          client_id: values.client_id && values.client_id.value,
          point_load_city:
            values.point_load_city && values.point_load_city.label,
          point_delivery_city:
            values.point_delivery_city && values.point_delivery_city.label,
          ship: 1,
          lot: 1,
          sale: 1,
          feature: 1,
          disassembly: 0,
          invoice: 1,
          damage_status: "case_closed",
          offsite: stepIndex || "0",
          invoice_document: [
            {
              type: "invoice",
              file: document.querySelector("#car_fax_report").files,
            },
            {
              type: "invoices",
              file: document.querySelector("#invoice").files,
            },
          ],
        }
      )
    );
    setIsPopupOpen(false);
  };

  useEffect(() => {
    if (!error) {
      setIsPopupOpen(false);
    }
  }, [error]);

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

  if (isPopupOpen === true || printPopup === true) {
    document.querySelector("#__next").classList.add("Global-overflow");
  } else {
    document.querySelector("#__next").classList.remove("Global-overflow");
  }

  const clientId = client.additional.clients;

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
      setPrintPopup,
    });
  };

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
              onClick={() => setIsPopupOpen(true)}
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
              {t("Add New offers")}
            </Button>
          </div>
          <div className={styles.groupBtn}>
            <Button
              customBtn={styles.rightBtn}
              onClick={() => setPrintPopup(true)}
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
        {isPopupOpen && (
          <Popup setIsPopupOpen={setIsPopupOpen} title={t("Add New offers")}>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, invalid, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Field
                    name="make_name"
                    validate={required}
                    component={renderSelect({
                      placeholder: "",
                      label: t("Make"),
                      classNameWrapper: styles.popupFieldRow,
                    })}
                    options={popularCars}
                  />
                  <Field
                    name="auction"
                    validate={required}
                    component={renderSelect({
                      placeholder: "",
                      label: t("Auction"),
                      classNameWrapper: styles.popupFieldRow,
                    })}
                    options={auctions}
                  />
                  <Field
                    name="year"
                    validate={required}
                    component={renderSelect({
                      placeholder: "",
                      label: t("Year"),
                      classNameWrapper: styles.popupFieldRow,
                    })}
                    options={arrYear}
                  />
                  <Field name="model_name" validate={required} type="text">
                    {renderInput({
                      label: t("Model"),
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="client_id"
                    component={renderSelect({
                      placeholder: "",
                      label: t("Client id"),
                      classNameWrapper: styles.popupFieldRow,
                    })}
                    options={clientId.map((item) => ({
                      label: `${item.id} ${item.name}`,
                      value: item.id,
                    }))}
                  />
                  <Field
                    name="vin_code"
                    validate={composeValidators(required, vinNum)}
                    type="text"
                  >
                    {renderInput({
                      label: t("Vin code"),
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="status"
                    validate={required}
                    component={renderSelect({
                      placeholder: "",
                      label: t("Status"),
                      classNameWrapper: styles.popupFieldRow,
                    })}
                    options={status}
                  />
                  <Field
                    name="point_load_city"
                    validate={required}
                    component={renderSelect({
                      placeholder: "",
                      label: t("Point of loading"),
                      classNameWrapper: styles.popupFieldRow,
                    })}
                    options={city}
                  />
                  <Field
                    name="point_delivery_city"
                    validate={required}
                    component={renderSelect({
                      placeholder: "",
                      label: t("Delivery City"),
                      classNameWrapper: styles.popupFieldRow,
                    })}
                    options={city}
                  />
                  <Field
                    name="point_delivery_date"
                    validate={composeValidators(
                      required,
                      mustBeNumber,
                      lengthDueDay
                    )}
                    type="text"
                    parse={formatStringByPattern("9999-99-99")}
                  >
                    {renderInput({
                      label: t("Delivery date"),
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="lot_number"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({
                      label: t("Lot number"),
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="odometer" validate={required} type="text">
                    {renderInput({
                      label: t("Odometer"),
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="location" validate={required} type="text">
                    {renderInput({
                      label: t("Location"),
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="purchased_date"
                    validate={composeValidators(
                      required,
                      mustBeNumber,
                      lengthDueDay
                    )}
                    type="text"
                    parse={formatStringByPattern("9999-99-99")}
                  >
                    {renderInput({
                      label: t("Purchased date"),
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="color" validate={required} type="text">
                    {renderInput({
                      label: t("Color"),
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="key" validate={required} type="text">
                    {renderInput({
                      label: t("Key"),
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="note" type="text">
                    {renderInput({
                      label: t("Note"),
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="invoice_total_price"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({
                      label: t("Total Price"),
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="car_fax_report" type="file" validate={required}>
                    {renderInputFile({
                      label: t("CarFax report"),
                      classNameWrapper: styles.popupFieldRow,
                      customInput: styles.customInputFile,
                      widthInputBlock: styles.noFiles,
                      file: true,
                      id: "car_fax_report",
                      accept: ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf",
                    })}
                  </Field>
                  <Field name="invoice" type="file" validate={required}>
                    {renderInputFile({
                      label: t("Invoice"),
                      classNameWrapper: styles.popupFieldRow,
                      customInput: styles.customInputFile,
                      widthInputBlock: styles.noFiles,
                      id: "invoice",
                      file: true,
                      accept: ".xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf",
                    })}
                  </Field>
                  <div className={styles.flexRadio}>
                    <p>{t("Offsite")}</p>
                    {statusRadio.map((statusFilter) => {
                      const classNameForButton = cx(styles.btnStatus, {
                        [styles.activeStatus]: stepIndex === statusFilter.id,
                      });

                      return (
                        <Button
                          type="button"
                          onClick={() => setStepIndex(statusFilter.id)}
                          customBtn={classNameForButton}
                          key={statusFilter.id}
                        >
                          {statusFilter.text}
                        </Button>
                      );
                    })}
                  </div>
                  {stepIndex === 1 && (
                    <Field
                      name="offsite_price"
                      validate={composeValidators(required, mustBeNumber)}
                      type="text"
                      defaultValue={client.data.offsite_price || ""}
                    >
                      {renderInput({
                        label: "Offsite price:",
                        classNameWrapper: styles.popupFieldRow,
                        customInput: styles.color,
                        classNameWrapperLabel: styles.blackLabel,
                      })}
                    </Field>
                  )}
                  {error && <p className={styles.error}>Client not found</p>}
                  <div className={styles.submitPopup}>
                    <Button
                      customBtn={styles.btnSubmit}
                      type="submit"
                      disabled={submitting || invalid}
                    >
                      {t("ADD NEW OFFERS")}
                    </Button>
                  </div>
                </form>
              )}
            />
          </Popup>
        )}
        {printPopup && (
          <Popup
            customPopup={styles.heightPopup}
            setIsPopupOpen={setPrintPopup}
            title="Print"
          >
            <Form
              onSubmit={onSubmitPrint}
              render={({ handleSubmit, invalid, submitting }) => (
                <form onSubmit={handleSubmit}>
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
          </Popup>
        )}
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
