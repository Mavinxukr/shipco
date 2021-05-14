import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import formatStringByPattern from "format-string-by-pattern";
import { useRouter } from "next/router";
import { Field, Form } from "react-final-form";
import {
  getDismanting,
  updateDismanting,
} from "../../../redux/actions/dismanting";
import {
  dismantingDataSelector,
  dismantingDataReceivedSelector,
} from "../../../utils/selectors";
import MainLayout from "../../Layout/Global/Global";
import SubHeader from "../../Layout/SubHeader/SubHeader";
import CustomTable from "../../CustomTable/CustomTable";
import Button from "../../Button/Button";
import Pagination from "../../Pagination/Pagination";
import CarInformation from "../../CarInformation/CarInformation";
import { stateStatus, status, print } from "./data";
import styles from "./Dismasting.scss";
import Loader from "../../Loader/Loader";
import { updateShipping } from "../../../redux/actions/shipping";
import { renderSelect, renderInput } from "../../../utils/renderInputs";
import { printData, getIdsArr } from "../../../utils/helpers";
import Popup from "../../Popup/Popup";
import MultiSelect from "../../Multi/Multi";
import cx from "classnames";
import Pickers from "../../Pickers/Pickers";
import useTranslation from "next-translate/useTranslation";

const Dismasting = () => {
  const router = useRouter();

  const [printPopup, setPrintPopup] = useState(false);
  const [selected, setSelected] = useState([]);
  const { t } = useTranslation("admin-dismantings");
  const dismanting = useSelector(dismantingDataSelector);
  const isDataReceived = useSelector(dismantingDataReceivedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDismanting({}));
  }, []);

  useEffect(() => {
    dispatch(
      getDismanting({
        page: router.query.page || 1,
        countpage: router.query.countpage || "10",
        port: router.query.port || "",
        search: router.query.search || "",
        shipping_status: router.query.shipping_status || "",
        auto_year: router.query.auto_year || "",
        auto_make: router.query.auto_make || "",
        date: router.query.date || "",
        date_from: router.query.date_from || "",
        date_to: router.query.date_to || "",
      })
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  const onSubmit = async (values) => {
    router.push({
      pathname: "/auto-admin/dismanting",
      query: {
        ...router.query,
        date: values.date,
        port: values.port && values.port.value,
        shipping_status: values.status && values.status.value,
        auto_year: values.years && values.years.value,
        auto_make: values.makes && values.makes.value,
        date_from: document.querySelector("#from").value || "",
        date_to: document.querySelector("#to").value || "",
      },
    });
  };

  const allYear = { id: 0, value: "", label: t("All Years") };
  const years = dismanting.additional.years;
  const yearArr = Object.keys(years).map((item, index = "1") => ({
    id: index + 1,
    label: years[index].year,
    value: years[index].year,
  }));
  const newYear = [allYear, ...yearArr];

  const allMakes = { id: 0, value: "", label: t("All Makes") };
  const makes = dismanting.additional.makes;
  const makeArr = Object.keys(makes).map((item, index = "1") => ({
    id: index + 1,
    label: makes[index].make_name,
    value: makes[index].make_name,
  }));
  const newMakes = [allMakes, ...makeArr];

  const onSubmitPrint = () => {
    const idsArr = getIdsArr(selected);
    printData({
      params: {
        fields: idsArr,
      },
      table: "dismantings",
      selected: idsArr,
      setSelected,
      setPrintPopup,
    });
  };

  return (
    <MainLayout newLink admin>
      <SubHeader
        onClick={() => {
          router.push({
            pathname: "/auto-admin/dismanting",
            query: {
              ...router.query,
              page: 1,
              search: document.querySelector("#search").value,
            },
          });
          dispatch(
            getDismanting({
              search: document.querySelector("#search").value,
            })
          );
        }}
      />
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>{t("Dismantings")}</h4>
          <Button
            customBtn={styles.rightBtn}
            onClick={() => setPrintPopup(true)}
          >
            {t("Print")}
          </Button>
        </div>
        <div className={styles.flex}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form className={styles.fullWidth} onSubmit={handleSubmit}>
                <Field
                  name="port"
                  component={renderSelect({
                    placeholder: router.query.port || t("All Ports"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={stateStatus}
                />
                <Field
                  name="status"
                  component={renderSelect({
                    placeholder: router.query.status || t("All status"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={status}
                />
                <Field
                  name="date"
                  type="text"
                  defaultValue={router.query.date || ""}
                  parse={formatStringByPattern("99-99-9999")}
                >
                  {renderInput({
                    placeholder: router.query.date || t("All Date"),
                    classNameWrapper: styles.widthSelect,
                  })}
                </Field>
                <Field
                  name="years"
                  component={renderSelect({
                    placeholder: router.query.year || t("All Years"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newYear}
                />
                <Field
                  name="makes"
                  component={renderSelect({
                    placeholder: router.query.year || t("All Makes"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newMakes}
                />
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
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  {t("Ok")}
                </Button>
              </form>
            )}
          />
        </div>
        {dismanting.data.length === 0 ? (
          <h1 className={styles.notFound}>nothing found</h1>
        ) : (
          <CustomTable>
            <Pagination
              params={dismanting.links}
              pathname="/auto-admin/dismanting"
              router={router}
            />
            {dismanting.data.map((item) => (
              <CarInformation
                key={item.id}
                item={item}
                disassembled
                status
                admin
                router={router}
                updateShipping={updateDismanting}
                updateStatus={(el) =>
                  dispatch(
                    updateShipping(
                      {},
                      {
                        status: el.target.id,
                      },
                      item.id
                    )
                  )
                }
              />
            ))}
            <Pagination
              params={dismanting.links}
              pathname="/auto-admin/dismanting"
              router={router}
            />
          </CustomTable>
        )}
      </div>
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
                    label={t("Select the fields Print")}
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

export default Dismasting;
