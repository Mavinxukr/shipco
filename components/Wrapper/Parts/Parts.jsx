import React, { useContext, useEffect, useState } from "react";
import { useTable } from "react-table";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import cx from "classnames";
import {
  getClientParts,
  deleteClientParts,
} from "../../../redux/actions/clientParts";
import {
  clientPartsDataSelector,
  clientPartsDataReceivedSelector,
} from "../../../utils/selectors";
import MainLayout from "../../Layout/Global/Global";
import Button from "../../Button/Button";
import IconP from "../../../assets/svg/p.svg";
import IconTrash from "../../../assets/svg/Trash.svg";
import IconFilter from "../../../assets/svg/Group (5).svg";
import CustomTable from "../../CustomTable/CustomTable";
import { columns, status } from "./data";
import styles from "./Parts.scss";
import Loader from "../../Loader/Loader";
import Pagination from "../../Pagination/Pagination";
import { getCurrentUser } from "../../../redux/actions/currentUser";
import HoverPopup from "../../HoverPopup/HoverPopup";
import { getParts } from "../../../redux/actions/parts";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../../context/PopupContext";
import { SliderPopup } from "./SliderPopup";

const Table = ({ columns, data, setIsPopupUpdateOpen, setUpdateData }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation("parts");
  const { setContent, setIsOpen } = useContext(PopupContext);

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
                  {cell.column.id === "actions" ? (
                    <div className={styles.tdFlex}>
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
                        onClick={() =>
                          dispatch(deleteClientParts({}, cell.row.original.id))
                        }
                      >
                        <IconTrash />
                      </Button>
                    </div>
                  ) : (
                    <>
                      {cell.column.id === "photo" ? (
                        <Button
                          type="button"
                          customBtn={cx(
                            styles.background,
                            styles.colorDec,
                            cell.row.original.images.length === 0 &&
                              styles.disabled
                          )}
                          onClick={() => {
                            if (cell.row.original.images.length > 0) {
                              setContent(SliderPopup, {
                                sliderImages: cell.row.original.images,
                              });
                              setIsOpen(true);
                            }
                          }}
                        >
                          {t("viewPics")}
                        </Button>
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
  );
};

const Parts = () => {
  const router = useRouter();
  const [stepIndex, setStepIndex] = useState(0);
  const clientParts = useSelector(clientPartsDataSelector);
  const isDataReceived = useSelector(clientPartsDataReceivedSelector);
  const { t } = useTranslation("parts");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser({}));
  }, []);

  useEffect(() => {
    dispatch(getClientParts({}));
  }, []);

  useEffect(() => {
    dispatch(
      getClientParts({
        page: router.query.page || 1,
        countpage: router.query.countpage || "10",
        part_status: router.query.part_status || "",
      })
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <h3 className={styles.title}>{t("parts")}</h3>
        <div className={styles.flex}>
          <div className={styles.rightBlock}>
            <Button customBtn={styles.filterText}>
              <IconFilter className={styles.filterIcon} />
              {t("status")}
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
                        pathname: "/parts",
                        query: {
                          ...router.query,
                          page: 1,
                          part_status: statusFilter.value,
                        },
                      });
                      dispatch(
                        getParts({
                          part_status: statusFilter.value,
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
        {clientParts.data.length !== 0 ? (
          <CustomTable>
            <Pagination
              params={clientParts.links}
              pathname="/parts"
              router={router}
            />
            <div className={styles.scrollTable}>
              <Table columns={columns(t)} data={clientParts.data} />
            </div>
            <Pagination
              params={clientParts.links}
              pathname="/parts"
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
