import React, { useEffect, useState, forwardRef, useRef } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import { useRowSelect, useTable, useSortBy } from "react-table";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import formatStringByPattern from "format-string-by-pattern";
import _ from "lodash";
import ImageUpload from "../../ImageUpload/ImageUpload";
import {
  getBaseClient,
  deleteBaseClient,
  addNewBaseClient,
} from "../../../redux/actions/baseClient";
import {
  baseClientDataSelector,
  baseClientDataReceivedSelector,
} from "../../../utils/selectors";
import Button from "../../Button/Button";
import Search from "../../Search/Search";
import Popup from "../../Popup/Popup";
import MainLayout from "../../Layout/Global/Global";
import IconPlus from "../../../assets/svg/Plus.svg";
import IconMinus from "../../../assets/svg/min.svg";
import { columns, print } from "./data";
import CustomTable from "../../CustomTable/CustomTable";
import IconSortTable from "../../../assets/svg/SortTable.svg";
import {
  composeValidators,
  emailValidation,
  required,
  passwordValidation,
  lengthPhone,
  mustBeNumber,
  lengthCart,
  snpValidation,
} from "../../../utils/validation";
import Pagination from "../../Pagination/Pagination";
import { renderInput, renderSelect } from "../../../utils/renderInputs";
import styles from "./BaseClient.scss";
import Loader from "../../Loader/Loader";
import MultiSelect from "../../Multi/Multi";
import { printData, getIdsArr } from "../../../utils/helpers";
import { getSession, session } from "next-auth/client";
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

const todayDate = new Date();
const currYear = todayDate.getFullYear();
let currMonth = todayDate.getMonth() + 1;
let currDay = todayDate.getDate();

if (currMonth < 10) {
  currMonth = `0${todayDate.getMonth() + 1}`;
}

if (currDay < 10) {
  currDay = `0${todayDate.getDate()}`;
}

const finalDate = `${currDay}.${currMonth}.${currYear}`;

const BaseClient = () => {
  const baseClient = useSelector(baseClientDataSelector);
  const isDataReceived = useSelector(baseClientDataReceivedSelector);
  const error = useSelector((state) => state.baseClient.error);
  const router = useRouter();
  const { t } = useTranslation("admin-base-client");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [printPopup, setPrintPopup] = useState(false);
  const [selected, setSelected] = useState([]);
  const [clients, setClients] = useState([]);

  const [image, setImage] = useState("/images/no-preview-available.png");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBaseClient({}));
    // getSession().then((session) => console.log(session));
  }, []);

  useEffect(() => {
    dispatch(
      getBaseClient({
        page: router.query.page || 1,
        countpage: router.query.countpage || "10",
        search: router.query.search || "",
      })
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  const arrClientsId = [];
  console.log(clients);

  const onSubmit = (values) => {
    dispatch(
      addNewBaseClient(
        {},
        {
          ...values,
          country: values.country && values.country.label,
          city: values.city && values.city.label,
          image: _.isObject(image) ? image : null,
        }
      )
    );
    setIsPopupOpen(false);
  };

  const onSubmitPrint = () => {
    const idsArr = getIdsArr(selected);
    printData({
      params: {
        fields: idsArr,
      },
      table: "base_clients",
      selected: idsArr,
      setSelected,
      setPrintPopup,
    });
  };

  const stateObj = baseClient.additional.states;
  const stateArr = Object.values(stateObj).map((item, index) => ({
    id: index + 1,
    label: item.state,
    value: item.state,
  }));

  if (isPopupOpen === true || printPopup === true) {
    document.querySelector("#__next").classList.add("Global-overflow");
  } else {
    document.querySelector("#__next").classList.remove("Global-overflow");
  }

  return (
    <MainLayout admin>
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>{t("BASECLIENT")}</h4>
          <Search
            onClick={() => {
              router.push({
                pathname: "/base-client",
                query: {
                  ...router.query,
                  page: 1,
                  search: document.querySelector("#search").value,
                },
              });
              dispatch(
                getBaseClient({
                  search: document.querySelector("#search").value,
                })
              );
            }}
          />
        </div>
        <div className={styles.flex}>
          <div className={styles.groupBtn}>
            <Button
              type="button"
              onClick={() => setIsPopupOpen(true)}
              customBtn={styles.btnIcon}
            >
              <IconPlus className={cx(styles.plus, styles.icon)} />
              {t("AddNewclient")}
            </Button>
            <Button
              type="button"
              customBtn={styles.btnIcon}
              onClick={() => {
                dispatch(
                  deleteBaseClient(
                    {},
                    {
                      client_id: clients,
                    }
                  )
                );
              }}
            >
              <IconMinus className={styles.icon} />
              {t("Deleteclient")}
            </Button>
          </div>
          <div className={styles.groupBtn}>
            <Button
              customBtn={styles.rightBtn}
              onClick={() => setPrintPopup(true)}
            >
              {t("Print")}
            </Button>
            <Button customBtn={styles.rightBtn}> {t("Import")}</Button>
          </div>
        </div>
        {baseClient.data.length !== 0 ? (
          <CustomTable>
            <Pagination
              params={baseClient.links}
              pathname="/base-client"
              router={router}
            />
            <div className={styles.scrollTable}>
              <Table
                columns={columns(t)}
                data={baseClient.data}
                setClients={setClients}
              />
            </div>
            <Pagination
              params={baseClient.links}
              pathname="/base-client"
              router={router}
            />
          </CustomTable>
        ) : (
          <h1 className={styles.notFound}>nothing found</h1>
        )}
      </div>
      {isPopupOpen && (
        <Popup
          setIsPopupOpen={setIsPopupOpen}
          title={t("AddNewclient")}
          subTitle={finalDate}
        >
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="name"
                  validate={composeValidators(required, snpValidation)}
                  type="text"
                >
                  {renderInput({
                    label: t("Name"),
                    classNameWrapper: styles.popupFieldRow,
                    widthInputBlock: styles.widthInputBlock,
                    classNameWrapperLabel: styles.label,
                  })}
                </Field>
                <Field name="username" validate={required} type="text">
                  {renderInput({
                    label: t("Username"),
                    classNameWrapper: styles.popupFieldRow,
                    widthInputBlock: styles.widthInputBlock,
                    classNameWrapperLabel: styles.label,
                  })}
                </Field>
                <Field
                  name="email"
                  validate={composeValidators(required, emailValidation)}
                  type="email"
                >
                  {renderInput({
                    label: t("EmailAddress"),
                    classNameWrapper: styles.popupFieldRow,
                    widthInputBlock: styles.widthInputBlock,
                    classNameWrapperLabel: styles.label,
                  })}
                </Field>
                <Field
                  name="phone"
                  type="text"
                  validate={composeValidators(
                    required,
                    // lengthPhone,
                    mustBeNumber
                  )}
                  // parse={formatStringByPattern('+9-9999-999-99-99')}
                >
                  {renderInput({
                    label: t("Phonenumber"),
                    classNameWrapper: styles.popupFieldRow,
                    widthInputBlock: styles.widthInputBlock,
                    classNameWrapperLabel: styles.label,
                  })}
                </Field>
                <Field
                  name="password"
                  validate={composeValidators(required, passwordValidation)}
                  type="password"
                >
                  {renderInput({
                    label: t("Password"),
                    classNameWrapper: styles.popupFieldRow,
                    widthInputBlock: styles.widthInputBlock,
                    classNameWrapperLabel: styles.label,
                  })}
                </Field>
                <Field
                  name="country"
                  validate={required}
                  component={renderSelect({
                    placeholder: "",
                    label: t("Country"),
                    classNameWrapper: styles.popupFieldRow,
                  })}
                  options={stateArr}
                />
                <Field
                  name="city"
                  validate={required}
                  component={renderSelect({
                    placeholder: "",
                    classNameWrapper: styles.popupFieldRow,
                    label: t("City"),
                  })}
                  options={
                    (baseClient &&
                      baseClient.additional.cities.map((item) => ({
                        value: item.name,
                        label: item.name,
                      }))) ||
                    []
                  }
                />
                <ImageUpload baseClient image={image} setImage={setImage} />
                {error && (
                  <p className={styles.error}>customer data must be unique</p>
                )}
                <div className={styles.submitPopup}>
                  <Button
                    customBtn={styles.btnSubmit}
                    type="submit"
                    disabled={submitting || invalid}
                  >
                    {t("AddNewclient")}
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
          title={t("Print")}
        >
          <Form
            onSubmit={onSubmitPrint}
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
        </Popup>
      )}
    </MainLayout>
  );
};

export default BaseClient;

const Table = ({ columns, data, setClients }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    selectedFlatRows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useSortBy,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        {
          id: "selection",
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </>
          ),
          Cell: ({ row }) => (
            <>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </>
          ),
        },
        ...columns,
      ]);
    }
  );

  useEffect(() => {
    const clients = selectedFlatRows.map((item) => item.values.id);
    setClients((prev) =>
      JSON.stringify(prev) !== JSON.stringify(clients) ? clients : prev
    );
  }, [selectedFlatRows]);

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => {
            return (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th
                    className={styles.sortHeader}
                    {...column.getHeaderProps(column.getSortByToggleProps())}
                  >
                    <IconSortTable className={styles.sort} />
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            );
          })}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <td
                    className={`BaseClient-${cell.column.id}`}
                    {...cell.getCellProps()}
                  >
                    {cell.render("Cell")}
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
