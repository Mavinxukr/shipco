import React, { useContext, useEffect, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import _ from "lodash";
import { useTable } from "react-table";
import { getPrices, deletePrices } from "../../../redux/actions/prices";
import {
  pricesDataSelector,
  pricesDataReceivedSelector,
} from "../../../utils/selectors";
import Button from "../../Button/Button";
import MainLayout from "../../Layout/Global/Global";
import IconPlus from "../../../assets/svg/Plus.svg";
import CustomTable from "../../CustomTable/CustomTable";
import Pagination from "../../Pagination/Pagination";
import Loader from "../../Loader/Loader";
import styles from "./Prices.scss";
import IconP from "../../../assets/svg/p.svg";
import IconTrash from "../../../assets/svg/Trash.svg";
import { columns, type, columnsPrice } from "./data";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../../context/PopupContext";
import { UpdatePriceForm } from "./UpdatePriceForm";

const Table = ({ columns, data, dispatch }) => {
  const { t } = useTranslation("admin-price");
  const { setIsOpen, setContent } = useContext(PopupContext);

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
                  <td {...cell.getCellProps()}>
                    {cell.column.id === "actions" ? (
                      <>
                        <Button
                          type="button"
                          customBtn={styles.actionsButton}
                          onClick={() => {
                            setContent(UpdatePriceForm, {
                              itemGroup: cell.row.original,
                              p: cell.row.original.priceable,
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
                            dispatch(deletePrices({}, cell.row.original.id));
                          }}
                        >
                          <IconTrash />
                        </Button>
                      </>
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

const Prices = () => {
  const [priceableData, setPriceableData] = useState(null);
  const { t } = useTranslation("admin-price");

  const prices = useSelector(pricesDataSelector);
  const isDataReceived = useSelector(pricesDataReceivedSelector);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPrices({
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
      dispatch(getPrices({}, +router.query.idClient));
    } else {
      dispatch(getPrices(params));
    }
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout admin>
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>{t("Prices")}</h4>
        </div>
        <div className={styles.flex}>
          <div className={styles.groupBtn}>
            <Button
              type="button"
              customBtn={styles.btnIcon}
              onClick={() => router.push("/prices/new-price")}
            >
              <IconPlus className={cx(styles.plus, styles.icon)} />
              {t("addNewPrices")}
            </Button>
          </div>
        </div>
        {prices.data.length !== 0 ? (
          <CustomTable>
            {typeof prices.data === "object" && prices.links && (
              <Pagination
                params={prices.links}
                pathname="/prices"
                router={router}
              />
            )}
            <div className={styles.scrollTable}>
              <Table
                columns={columns(t)}
                data={
                  (Array.isArray(prices.data) && prices.data) || [prices.data]
                }
                dispatch={dispatch}
                groupsArr={prices.additional.clients}
                setPriceableData={setPriceableData}
                priceableData={priceableData}
                prices={prices}
              />
            </div>
            {typeof prices.data === "object" && prices.links && (
              <Pagination
                params={prices.links}
                pathname="/prices"
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

export default Prices;
