import React, { useContext, useEffect, useState } from "react";
import cx from "classnames";
import Link from "next/link";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useTable } from "react-table";
import { getGroups } from "../../../redux/actions/groups";
import {
  groupsDataSelector,
  groupsDataReceivedSelector,
} from "../../../utils/selectors";
import Button from "../../Button/Button";
import MainLayout from "../../Layout/Global/Global";
import IconPlus from "../../../assets/svg/Plus.svg";
import CustomTable from "../../CustomTable/CustomTable";
import Pagination from "../../Pagination/Pagination";
import { columns, print } from "./data";
import Loader from "../../Loader/Loader";
import IconTrash from "../../../assets/svg/Trash.svg";
import styles from "./Groups.scss";
import IconP from "../../../assets/svg/p.svg";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../../context/PopupContext";
import { AddNewGroupsForm } from "./AddNewGroupsForm";
import { EditGroupForm } from "./EditGroupForm";
import { DeleteGroupForm } from "./DeleteGroupForm";
import { PrintForm } from "./PrintForm";

const Table = ({ columns, data, groupsArr }) => {
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
                  <td
                    className={`Groups-${cell.column.id}`}
                    {...cell.getCellProps()}
                  >
                    {cell.column.id === "actions" ? (
                      <>
                        <Button
                          type="button"
                          customBtn={styles.actionsButton}
                          onClick={() => {
                            setContent(EditGroupForm, {
                              itemGroup: cell.row.original,
                              select: cell.row.original.clients
                                ? cell.row.original.clients.map((item) => ({
                                    value: item.clients.id,
                                    label: item.clients.name,
                                  }))
                                : [],
                              allUsers: groupsArr,
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
                            setContent(DeleteGroupForm, {
                              deleteId: cell.row.original.id,
                            });

                            setIsOpen(true);
                          }}
                        >
                          <IconTrash />
                        </Button>
                      </>
                    ) : (
                      <>
                        {cell.column.id === "client" ? (
                          <>
                            {(cell.row.original.clients &&
                              cell.row.original.clients.length) ||
                              "0"}
                          </>
                        ) : (
                          <>
                            {cell.column.id === "due_day" ? (
                              <Link
                                href={{
                                  pathname: "/payments",
                                  query: {
                                    idClient: cell.row.original.price_id,
                                  },
                                }}
                              >
                                <a
                                  className={
                                    cell.row.original.is_finish
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

const Groups = () => {
  const { setIsOpen, setContent } = useContext(PopupContext);

  const { t } = useTranslation("admin-groups");
  const groups = useSelector(groupsDataSelector);
  const isDataReceived = useSelector(groupsDataReceivedSelector);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups({}));
  }, []);

  useEffect(() => {
    dispatch(
      getGroups({
        page: router.query.page || 1,
        countpage: router.query.countpage || "10",
      })
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout admin>
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>{t("GROUPS")}</h4>
        </div>
        <div className={styles.flex}>
          <div className={styles.groupBtn}>
            <Button
              type="button"
              customBtn={styles.btnIcon}
              onClick={() => {
                setSelected([]);
                setContent(AddNewGroupsForm);
                setIsOpen(true);
              }}
            >
              <IconPlus className={cx(styles.plus, styles.icon)} />
              {t("Add New Groups")}
            </Button>
          </div>
          <div className={styles.groupBtn}>
            <Button
              customBtn={styles.rightBtn}
              onClick={() => {
                setContent(PrintForm);
                setIsOpen(true);
              }}
            >
              {t("print")}
            </Button>
            <Button customBtn={styles.rightBtn}> {t("import")}</Button>
          </div>
        </div>
        {groups.data.length !== 0 ? (
          <CustomTable>
            <Pagination
              params={groups.links}
              pathname="/groups"
              router={router}
            />
            <div className={styles.scrollTable}>
              <Table
                columns={columns(t)}
                data={groups.data}
                dispatch={dispatch}
                groupsArr={groups.additional.clients}
              />
            </div>
            <Pagination
              params={groups.links}
              pathname="/groups"
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

export default Groups;
