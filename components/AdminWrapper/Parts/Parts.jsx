import React, { forwardRef, useRef, useEffect, useState } from "react";
import { usePagination, useRowSelect, useTable } from "react-table";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";
import cx from "classnames";
import {
  getParts,
  deleteParts,
  addNewParts,
  updateParts,
} from "../../../redux/actions/parts";
import {
  partsDataSelector,
  partsDataReceivedSelector,
} from "../../../utils/selectors";
import Loader from "../../Loader/Loader";
import MainLayout from "../../Layout/Global/Global";
import Popup from "../../Popup/Popup";
import SubHeader from "../../Layout/SubHeader/SubHeader";
import Button from "../../Button/Button";
import Previews from "../../Previews/Previews";
import IconP from "../../../assets/svg/p.svg";
import IconTrash from "../../../assets/svg/Trash.svg";
import IconPlus from "../../../assets/svg/Plus.svg";
import IconUpload from "../../../assets/svg/uploadfile.svg";
import IconFilter from "../../../assets/svg/Group (5).svg";
import CustomTable from "../../CustomTable/CustomTable";
import { printData, getIdsArr } from "../../../utils/helpers";
import { columns, status, statusSelect, print } from "./data";
import styles from "./Admin-parts.scss";
import {
  required,
  mustBeNumber,
  composeValidators,
  vinNum,
} from "../../../utils/validation";
import { renderInput, renderSelect } from "../../../utils/renderInputs";
import Pagination from "../../Pagination/Pagination";
import HoverPopup from "../../HoverPopup/HoverPopup";
import MultiSelect from "../../Multi/Multi";
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

const Table = ({ columns, data, setIsPopupUpdateOpen, setUpdateData }) => {
  const dispatch = useDispatch();

  const { getTableProps, getTableBodyProps, headerGroups, prepareRow, rows } =
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
                  {cell.column.id === "actions" ? (
                    <>
                      <Button
                        type="button"
                        customBtn={styles.actionsButton}
                        onClick={() => {
                          setUpdateData(cell.row.original);
                          setIsPopupUpdateOpen(true);
                        }}
                      >
                        <IconP />
                      </Button>
                      <Button
                        type="button"
                        customBtn={styles.actionsButton}
                        onClick={() => {
                          dispatch(deleteParts({}, {}, cell.row.original.id));
                        }}
                      >
                        <IconTrash />
                      </Button>
                    </>
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

const Parts = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [arrPicsContainer, setArrPicsContainer] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [newArrPicsContainer, setNewArrPicsContainer] = useState([]);
  const [isPopupUpdateOpen, setIsPopupUpdateOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [printPopup, setPrintPopup] = useState(false);
  const [selected, setSelected] = useState([]);

  const parts = useSelector(partsDataSelector);
  const isDataReceived = useSelector(partsDataReceivedSelector);
  const { t } = useTranslation("admin-parts");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParts({}));
  }, []);

  useEffect(() => {
    dispatch(
      getParts({
        page: router.query.page || 1,
        countpage: router.query.countpage || "10",
        part_status: router.query.part_status || "",
        search: router.query.search || "",
      })
    );
  }, [router.query]);

  useEffect(() => {
    if (updateData && updateData.images) {
      setArrPicsContainer(updateData.images);
    }
  }, [updateData]);

  useEffect(() => {
    if (updateData) {
      setArrPicsContainer(
        parts.data.find((item) => item.id === updateData.id).images
      );
    }
  }, [parts]);

  if (!isDataReceived) {
    return <Loader />;
  }

  // const vinNumbers = parts.additional.vin_numbers;
  // const vinArr = Object.keys(vinNumbers).map((item, index) => ({
  //   id: index + 1,
  //   label: vinNumbers[index].vin_code,
  //   value: vinNumbers[index].vin_code,
  // }));

  // const catalogNumbers = parts.additional.catalog_numbers;
  // const catalogArr = Object.keys(catalogNumbers).map((item, index) => ({
  //   id: index + 1,
  //   label: catalogNumbers[index].catalog_number,
  //   value: catalogNumbers[index].catalog_number,
  // }));

  const onSubmit = async (values) => {
    dispatch(
      addNewParts(
        {},
        {
          ...values,
          // vin: values.vin && values.vin.label,
          // status: values.status && values.status.value,
          catalog_number:
            values.catalog_numberInput ||
            (values.catalog_number && values.catalog_number.label),
          image: newArrPicsContainer,
        }
      )
    );
    setIsPopupOpen(false);
  };

  const onSubmitUpdate = async (values) => {
    dispatch(
      updateParts(
        {},
        {
          ...values,
          status: values.status && values.status.value,
          catalog_number: values.catalog_number && values.catalog_number.label,
          image: newArrPicsContainer,
        },
        updateData.id
      )
    );
    setArrPicsContainer([]);
    setNewArrPicsContainer([]);
    setIsPopupUpdateOpen(false);
  };

  const onSubmitPrint = () => {
    const idsArr = getIdsArr(selected);
    printData({
      params: {
        fields: idsArr,
      },
      table: "parts",
      selected: idsArr,
      setSelected,
      setPrintPopup,
    });
  };

  if (
    isPopupOpen === true ||
    printPopup === true ||
    isPopupUpdateOpen === true
  ) {
    document.querySelector("#__next").classList.add("Global-overflow");
  } else {
    document.querySelector("#__next").classList.remove("Global-overflow");
  }

  return (
    <MainLayout admin>
      <SubHeader
        onClick={() => {
          router.push({
            pathname: "/auto-admin/parts",
            query: {
              ...router.query,
              page: 1,
              search: document.querySelector("#search").value,
            },
          });
          dispatch(
            getParts({
              search: document.querySelector("#search").value,
            })
          );
        }}
      />
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>{t("Parts")}</h4>
          <Button
            customBtn={styles.rightBtn}
            onClick={() => setPrintPopup(true)}
          >
            {t("PRINT")}
          </Button>
        </div>
        <div className={styles.flex}>
          <Button
            customBtn={styles.btnIcon}
            onClick={() => {
              setArrPicsContainer([]);
              setIsPopupOpen(true);
            }}
          >
            <IconPlus className={styles.plus} />
            {t("add new part")}
          </Button>
          <div className={styles.rightBlock}>
            <Button customBtn={styles.filterText}>
              <IconFilter className={styles.filterIcon} />
              {t("Status")}
            </Button>
            <HoverPopup>
              {status(t).map((statusFilter, index) => {
                const classNameForButton = cx(styles.btnStatus, {
                  [styles.activeStatus]: stepIndex === index,
                });

                return (
                  <Button
                    onClick={() => {
                      setStepIndex(index);
                      router.push({
                        pathname: "/auto-admin/parts",
                        query: {
                          ...router.query,
                          page: 1,
                          part_status: statusFilter.value,
                        },
                      });
                      dispatch(
                        getParts({
                          search: statusFilter.value,
                        })
                      );
                    }}
                    customBtn={classNameForButton}
                    key={statusFilter.id}
                  >
                    {statusFilter.label}
                  </Button>
                );
              })}
            </HoverPopup>
          </div>
        </div>
        {parts && parts.data.length !== 0 ? (
          <CustomTable>
            <Pagination
              params={parts.links}
              pathname="/auto-admin/parts"
              router={router}
            />
            <div className={styles.scrollTable}>
              <Table
                columns={columns(t)}
                data={parts.data}
                setIsPopupUpdateOpen={setIsPopupUpdateOpen}
                setUpdateData={setUpdateData}
              />
            </div>
            <Pagination
              params={parts.links}
              pathname="/auto-admin/parts"
              router={router}
            />
          </CustomTable>
        ) : (
          <h1 className={styles.notFound}>nothing found</h1>
        )}
      </div>
      {isPopupUpdateOpen && (
        <Popup setIsPopupOpen={setIsPopupUpdateOpen} title={t("UPDATEPART")}>
          <Form
            onSubmit={onSubmitUpdate}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="client_id"
                  type="text"
                  defaultValue={updateData.client_id || ""}
                >
                  {renderInput({
                    label: t("ClientID"),
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                {/* <Field */}
                {/*  name="catalog_number" */}
                {/*  component={renderSelect({ */}
                {/*    placeholder: updateData.catalog_number, */}
                {/*    label: 'Catalog number', */}
                {/*    classNameWrapper: styles.popupFieldRow, */}
                {/*    classNameLabel: styles.label, */}
                {/*    widthInputBlock: styles.widthInput, */}
                {/*  })} */}
                {/*  options={catalogArr} */}
                {/* /> */}
                <Field
                  name="name"
                  type="text"
                  defaultValue={updateData.name || ""}
                >
                  {renderInput({
                    label: t("Name"),
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="auto"
                  type="text"
                  defaultValue={updateData.auto || ""}
                >
                  {renderInput({
                    label: t("Auto"),
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="vin"
                  type="text"
                  validate={vinNum}
                  defaultValue={updateData.vin || ""}
                >
                  {renderInput({
                    label: t("VINNumber"),
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="status"
                  component={renderSelect({
                    placeholder: t(
                      updateData.status.split("_").join(" ").toUpperCase()
                    ),
                    label: t("Status"),
                    classNameWrapper: styles.popupFieldRow,
                    classNameLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                  options={statusSelect(t)}
                />
                <Field
                  name="quality"
                  type="text"
                  defaultValue={updateData.quality || ""}
                  validate={mustBeNumber}
                >
                  {renderInput({
                    label: t("Quality"),
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="container"
                  validate={composeValidators(mustBeNumber)}
                  type="text"
                  defaultValue={updateData.container || ""}
                >
                  {renderInput({
                    label: "Add container #",
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Previews
                  idAuto={updateData.id}
                  icon={<IconUpload className={styles.icon} />}
                  setArrPics={setArrPicsContainer}
                  arrPics={arrPicsContainer}
                  title={t("Addphoto")}
                  customText={styles.customText}
                  customIconBlock={styles.customIconBlock}
                  customThumbs={styles.thumbs}
                  setNewArrPics={setNewArrPicsContainer}
                  newArrPics={newArrPicsContainer}
                />
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  {t("UPDATEPART")}
                </Button>
              </form>
            )}
          />
        </Popup>
      )}
      {isPopupOpen && (
        <Popup setIsPopupOpen={setIsPopupOpen} title={t("add new part")}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Field name="client_id" validate={required} type="text">
                  {renderInput({
                    label: t("ClientID"),
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field name="catalog_numberInput" type="text">
                  {renderInput({
                    label: t("Catalog number"),
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                {/* <Field */}
                {/*  name="catalog_number" */}
                {/*  component={renderSelect({ */}
                {/*    placeholder: '', */}
                {/*    label: 'or', */}
                {/*    classNameWrapper: styles.popupFieldRow, */}
                {/*    classNameLabel: styles.label, */}
                {/*    widthInputBlock: styles.widthInput, */}
                {/*  })} */}
                {/*  options={catalogArr} */}
                {/* /> */}
                <Field name="name" validate={required} type="text">
                  {renderInput({
                    label: t("Name"),
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field name="auto" validate={required} type="text">
                  {renderInput({
                    label: t("Auto"),
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                {/* <Field */}
                {/*  name="vin" */}
                {/*  component={renderSelect({ */}
                {/*    placeholder: '', */}
                {/*    label: 'VIN Number', */}
                {/*    classNameWrapper: styles.popupFieldRow, */}
                {/*    classNameLabel: styles.label, */}
                {/*    widthInputBlock: styles.widthInput, */}
                {/*  })} */}
                {/*  options={vinArr} */}
                {/* /> */}
                {/* <Field */}
                {/*  name="status" */}
                {/*  validate={required} */}
                {/*  component={renderSelect({ */}
                {/*    placeholder: '', */}
                {/*    label: 'Status', */}
                {/*    classNameWrapper: styles.popupFieldRow, */}
                {/*    classNameLabel: styles.label, */}
                {/*    widthInputBlock: styles.widthInput, */}
                {/*  })} */}
                {/*  options={statusSelect} */}
                {/* /> */}
                <Field
                  name="quality"
                  validate={composeValidators(required, mustBeNumber)}
                  type="text"
                >
                  {renderInput({
                    label: t("Quality"),
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="container"
                  validate={composeValidators(required, mustBeNumber)}
                  type="text"
                >
                  {renderInput({
                    label: "Add container #",
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Previews
                  icon={<IconUpload className={styles.icon} />}
                  setArrPics={setArrPicsContainer}
                  arrPics={arrPicsContainer}
                  title={t("Addphoto")}
                  customText={styles.customText}
                  customIconBlock={styles.customIconBlock}
                  customThumbs={styles.thumbs}
                  setNewArrPics={setNewArrPicsContainer}
                  newArrPics={newArrPicsContainer}
                />
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  {t("add new part")}
                </Button>
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
        </Popup>
      )}
    </MainLayout>
  );
};

export default Parts;
