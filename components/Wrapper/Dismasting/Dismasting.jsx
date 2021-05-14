import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import formatStringByPattern from "format-string-by-pattern";
import { useRouter } from "next/router";
import { Field, Form } from "react-final-form";
import {
  getClientDismanting,
  updateClientDismanting,
} from "../../../redux/actions/clientDismanting";
import {
  clientDismantingDataReceivedSelector,
  clientDismantingDataSelector,
} from "../../../utils/selectors";
import MainLayout from "../../Layout/Global/Global";
import CustomTable from "../../CustomTable/CustomTable";
import Button from "../../Button/Button";
import Pagination from "../../Pagination/Pagination";
import CarInformation from "../../CarInformation/CarInformation";
import Search from "../../Search/Search";
import { stateStatus, status } from "./data";
import styles from "./Dismasting.scss";
import Loader from "../../Loader/Loader";
import { renderInput, renderSelect } from "../../../utils/renderInputs";
import useTranslation from "next-translate/useTranslation";

const Dismasting = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useTranslation("dismanting");

  const clientDismanting = useSelector(clientDismantingDataSelector);
  const isDataReceived = useSelector(clientDismantingDataReceivedSelector);

  useEffect(() => {
    dispatch(getClientDismanting({}));
  }, []);

  useEffect(() => {
    dispatch(
      getClientDismanting({
        page: router.query.page || 1,
        countpage: router.query.countpage || "10",
        port: router.query.port || "",
        search: router.query.search || "",
        shipping_status: router.query.shipping_status || "",
        auto_name: router.query.auto_name || "",
        auto_year: router.query.auto_year || "",
        auto_make: router.query.auto_make || "",
        date: router.query.date || "",
      })
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  const onSubmit = async (values) => {
    router.push({
      pathname: "/shipping",
      query: {
        ...router.query,
        date: values.date,
        port: values.port && values.port.value,
        shipping_status: values.status && values.status.value,
        auto_name: values.model && values.model.value,
        auto_year: values.years && values.years.value,
        auto_make: values.makes && values.makes.value,
      },
    });
  };

  const allModel = { id: 0, value: "", label: t("AllModels") };
  const model = clientDismanting.additional.models;
  const modelArr = Object.keys(model).map((item, index = "1") => ({
    id: index + 1,
    label: model[index].model_name,
    value: model[index].model_name,
  }));
  const newModel = [allModel, ...modelArr];

  const allYear = { id: 0, value: "", label: t("AllYears") };
  const years = clientDismanting.additional.years;
  const yearArr = Object.keys(years).map((item, index = "1") => ({
    id: index + 1,
    label: years[index].year,
    value: years[index].year,
  }));
  const newYear = [allYear, ...yearArr];

  const allMakes = { id: 0, value: "", label: t("AllMakes") };
  const makes = clientDismanting.additional.makes;
  const makeArr = Object.keys(makes).map((item, index = "1") => ({
    id: index + 1,
    label: makes[index].make_name,
    value: makes[index].make_name,
  }));
  const newMakes = [allMakes, ...makeArr];

  return (
    <MainLayout>
      <div className={styles.container}>
        <h3 className={styles.title}>{t("Autofordismanting")}</h3>
        <div className={styles.flex}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form className={styles.fullWidth} onSubmit={handleSubmit}>
                <Field
                  name="port"
                  component={renderSelect({
                    placeholder: router.query.port || t("AllPorts"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={stateStatus}
                />
                <Field
                  name="status"
                  component={renderSelect({
                    placeholder: router.query.status || t("AllStatus"),
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
                    placeholder: router.query.date || t("AllDate"),
                    classNameWrapper: styles.widthSelect,
                  })}
                </Field>
                <Field
                  name="years"
                  component={renderSelect({
                    placeholder: router.query.year || t("AllYears"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newYear}
                />
                <Field
                  name="makes"
                  component={renderSelect({
                    placeholder: router.query.year || t("AllMakes"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newMakes}
                />
                <Field
                  name="model"
                  component={renderSelect({
                    placeholder: router.query.model || t("AllModels"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newModel}
                />
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
          <div className={styles.rightBlock}>
            <Search
              onClick={() => {
                router.push({
                  pathname: "/dismanting",
                  query: {
                    ...router.query,
                    page: 1,
                    search: document.querySelector("#search").value,
                  },
                });
                dispatch(
                  getClientDismanting({
                    search: document.querySelector("#search").value,
                  })
                );
              }}
            />
          </div>
        </div>
        {clientDismanting.data.length === 0 ? (
          <h1 className={styles.notFound}>nothing found</h1>
        ) : (
          <CustomTable>
            <Pagination
              params={clientDismanting.links}
              pathname="/dismanting"
              router={router}
            />
            {clientDismanting.data.map((item) => (
              <CarInformation
                key={item.id}
                item={item}
                disassembled
                updateShipping={updateClientDismanting}
              />
            ))}
            <Pagination
              params={clientDismanting.links}
              pathname="/dismanting"
              router={router}
            />
          </CustomTable>
        )}
      </div>
    </MainLayout>
  );
};

export default Dismasting;
