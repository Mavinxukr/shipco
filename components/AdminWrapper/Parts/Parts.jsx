import React, {
  forwardRef,
  useRef,
  useEffect,
  useState,
  useContext,
} from "react";
import { usePagination, useRowSelect, useTable } from "react-table";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import { getParts, deleteParts } from "../../../redux/actions/parts";
import {
  partsDataSelector,
  partsDataReceivedSelector,
} from "../../../utils/selectors";
import Loader from "../../Loader/Loader";
import MainLayout from "../../Layout/Global/Global";
import SubHeader from "../../Layout/SubHeader/SubHeader";
import Button from "../../Button/Button";
import IconP from "../../../assets/svg/p.svg";
import IconTrash from "../../../assets/svg/Trash.svg";
import IconPlus from "../../../assets/svg/Plus.svg";
import IconFilter from "../../../assets/svg/Group (5).svg";
import CustomTable from "../../CustomTable/CustomTable";
import { columns, status } from "./data";
import styles from "./Admin-parts.scss";

import Pagination from "../../Pagination/Pagination";
import HoverPopup from "../../HoverPopup/HoverPopup";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../../context/PopupContext";
import { PrintPartsForm } from "./PrintPartsForm";
import { AddPartsForm } from "./AddPartsForm";
import { EditPartsForm } from "./EditPartsForm";

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

const Table = ({ columns, data }) => {
  const { setIsOpen, setContent } = useContext(PopupContext);
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
                    <div className={styles.buttonsBlock}>
                      <Button
                        type="button"
                        customBtn={styles.actionsButton}
                        onClick={() => {
                          setContent(EditPartsForm, {
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
                          dispatch(deleteParts({}, {}, cell.row.original.id));
                        }}
                      >
                        <IconTrash />
                      </Button>
                    </div>
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
  const [stepIndex, setStepIndex] = useState(0);

  const isDataReceived = useSelector(partsDataReceivedSelector);
  const parts = useSelector(partsDataSelector);
  const { setIsOpen, setContent } = useContext(PopupContext);
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

  if (!isDataReceived) {
    return <Loader />;
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
            onClick={() => {
              setContent(PrintPartsForm);
              setIsOpen(true);
            }}
          >
            {t("PRINT")}
          </Button>
        </div>
        <div className={styles.flex}>
          <Button
            customBtn={styles.btnIcon}
            onClick={() => {
              setContent(AddPartsForm);
              setIsOpen(true);
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
              <Table columns={columns(t)} data={parts.data} />
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
    </MainLayout>
  );
};

export default Parts;
