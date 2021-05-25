import React, { useEffect, useContext, useState } from "react";
import cx from "classnames";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  getBaseClient,
  deleteBaseClient,
} from "../../../redux/actions/baseClient";
import {
  baseClientDataSelector,
  baseClientDataReceivedSelector,
} from "../../../utils/selectors";
import Button from "../../Button/Button";
import Search from "../../Search/Search";
import MainLayout from "../../Layout/Global/Global";
import IconPlus from "../../../assets/svg/Plus.svg";
import IconMinus from "../../../assets/svg/min.svg";
import { columns } from "./data";
import CustomTable from "../../CustomTable/CustomTable";
import Pagination from "../../Pagination/Pagination";
import styles from "./BaseClient.scss";
import Loader from "../../Loader/Loader";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../../context/PopupContext";
import { NewClientForm } from "./NewClientForm";
import { PrintClientForm } from "./PrintClientForm";
import { TableClient } from "./TableClient";

const BaseClient = () => {
  const baseClient = useSelector(baseClientDataSelector);
  const isDataReceived = useSelector(baseClientDataReceivedSelector);
  const router = useRouter();
  const { t } = useTranslation("admin-base-client");
  const [clients, setClients] = useState([]);
  const { setContent, setIsOpen } = useContext(PopupContext);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBaseClient({}));
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
              onClick={() => {
                setContent(NewClientForm);
                setIsOpen(true);
              }}
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
              onClick={() => {
                setContent(PrintClientForm);
                setIsOpen(true);
              }}
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
              <TableClient
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
    </MainLayout>
  );
};

export default BaseClient;
