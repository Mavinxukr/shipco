import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import formatStringByPattern from "format-string-by-pattern";
import { Field, Form } from "react-final-form";
import { getShipping, updateShipping } from "../../../redux/actions/shipping";
import {
  shippingDataSelector,
  shippingDataReceivedSelector,
} from "../../../utils/selectors";
import MainLayout from "../../Layout/Global/Global";
import SubHeader from "../../Layout/SubHeader/SubHeader";
import CustomTable from "../../CustomTable/CustomTable";
import Pagination from "../../Pagination/Pagination";
import CarInformation from "../../CarInformation/CarInformation";
import { stateStatus, status, print } from "./data";
import { printData, getIdsArr } from "../../../utils/helpers";
import Button from "../../Button/Button";
import styles from "./Shipping.scss";
import Loader from "../../Loader/Loader";
import { renderSelect, renderInput } from "../../../utils/renderInputs";
import Popup from "../../Popup/Popup";
import MultiSelect from "../../Multi/Multi";
import useTranslation from "next-translate/useTranslation";

const Shipping = () => {
  const router = useRouter();
  const { t } = useTranslation("shipping");
  const [printPopup, setPrintPopup] = useState(false);
  const [selected, setSelected] = useState([]);

  const shipping = useSelector(shippingDataSelector);
  const isDataReceived = useSelector(shippingDataReceivedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShipping({}));
  }, []);

  useEffect(() => {
    dispatch(
      getShipping({
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
      pathname: "/auto-admin/shipping",
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

  const allModel = { id: 0, value: "", label: "All Model" };
  const model = shipping.additional.models;
  const modelArr = Object.keys(model).map((item, index = "1") => ({
    id: index + 1,
    label: model[index].model_name,
    value: model[index].model_name,
  }));
  const newModel = [allModel, ...modelArr];

  const allYear = { id: 0, value: "", label: "All Years" };
  const years = shipping.additional.years;
  const yearArr = Object.keys(years).map((item, index = "1") => ({
    id: index + 1,
    label: years[index].year,
    value: years[index].year,
  }));
  const newYear = [allYear, ...yearArr];

  const allMakes = { id: 0, value: "", label: "All Makes" };
  const makes = shipping.additional.makes;
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
      table: "shippings",
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
            pathname: "/auto-admin/shipping",
            query: {
              ...router.query,
              page: 1,
              search: document.querySelector("#search").value,
            },
          });
          dispatch(
            getShipping({
              search: document.querySelector("#search").value,
            })
          );
        }}
      />
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}> {t("shipping")}</h4>
          <Button
            customBtn={styles.rightBtn}
            onClick={() => setPrintPopup(true)}
          >
            {t("print")}
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
                    placeholder: router.query.port || t("allPorts"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={stateStatus}
                />
                <Field
                  name="status"
                  component={renderSelect({
                    placeholder: router.query.status || t("allStatus"),
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
                    placeholder: router.query.date || t("allDate"),
                    classNameWrapper: styles.widthSelect,
                  })}
                </Field>
                <Field
                  name="years"
                  component={renderSelect({
                    placeholder: router.query.year || t("allYears"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newYear}
                />
                <Field
                  name="makes"
                  component={renderSelect({
                    placeholder: router.query.year || t("allMakes"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newMakes}
                />
                <Field
                  name="model"
                  component={renderSelect({
                    placeholder: router.query.model || t("allModel"),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newModel}
                />
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  {t("ok")}
                </Button>
              </form>
            )}
          />
        </div>
        {shipping.data.length === 0 ? (
          <h1 className={styles.notFound}>nothing found</h1>
        ) : (
          <CustomTable>
            <Pagination
              params={shipping.links}
              pathname="/auto-admin/shipping"
              router={router}
            />
            {shipping.data.map((item) => (
              <CarInformation
                key={item.id}
                item={item}
                status
                admin
                updateShipping={updateShipping}
                updateStatus={(el) =>
                  dispatch(
                    updateShipping(
                      {},
                      {
                        status: el.target.id,
                        port: router.query.port || "",
                        search: router.query.search || "",
                        shipping_status: router.query.shipping_status || "",
                        auto_name: router.query.auto_name || "",
                        auto_year: router.query.auto_year || "",
                        auto_make: router.query.auto_make || "",
                      },
                      item.id
                    )
                  )
                }
              />
            ))}
            <Pagination
              params={shipping.links}
              pathname="/auto-admin/shipping"
              router={router}
            />
          </CustomTable>
        )}
      </div>
      {printPopup && (
        <Popup
          customPopup={styles.heightPopup}
          setIsPopupOpen={setPrintPopup}
          title={t("print")}
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
                    label={t("SelectPrint")}
                  />
                  <Button
                    customBtn={styles.btnSubmit}
                    type="submit"
                    disabled={submitting || invalid}
                  >
                    {t("submit")}
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

export default Shipping;
