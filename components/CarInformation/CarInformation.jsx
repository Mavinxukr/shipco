import React, { useState } from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import cx from "classnames";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import Button from "../Button/Button";
import { updateDismanting } from "../../redux/actions/dismanting";
import CustomStepper from "../CustomStepper/CustomStepper";
import ButtonGroup from "../ButtonGroup/ButtonGroup";
import IconEdit from "../../assets/svg/edit.svg";
import Popup from "../Popup/Popup";
import styles from "./CarInformation.scss";
import { required } from "../../utils/validation";
import useTranslation from "next-translate/useTranslation";

const arrTypes = [
  "auction_picture",
  "warehouse_picture",
  "container_picture",
  "car_fax_report",
  "invoice",
  "checklist_report",
  "shipping_damage",
];

const getArr = (items, arr) =>
  items.map((item, index) => {
    const images = arr.filter((itemChild) => itemChild.type === item);
    return {
      id: index + 1,
      title: item,
      images,
    };
  });

const CarInformation = ({
  item,
  disassembled,
  status,
  admin,
  updateStatus,
  updateShipping,
  router,
}) => {
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const [isHistoryPopupOpen, setIsHistoryPopupOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(item.ship_info.disassembly);
  const fileCarfac = getArr(arrTypes, item.document)[3].images;
  const fileInvoice = getArr(arrTypes, item.document)[4].images;
  const dispatch = useDispatch();
  const { t } = useTranslation("dismanting");

  const onSubmit = async (values) => {
    dispatch(
      updateShipping(
        {},
        {
          auto_id: item.id,
          ...values,
        },
        "",
        true
      )
    );
    setIsCommentPopupOpen(false);
  };

  return (
    <div className={styles.flexItems}>
      <div className={styles.image}>
        <img
          src={
            (item.image && item.image.link) ||
            "/images/no-preview-available.png"
          }
          alt={item.model_name || "No Information"}
        />
      </div>
      <div className={styles.column}>
        <p className={styles.colorText}>{item.auto || t("NoInformation")}</p>
        <p>
          {t("Lot")}{" "}
          {(item.lot_info && item.lot_info.lot_number) || t("NoInformation")}
        </p>
        <p>
          {t("VIN")}{" "}
          {(item.lot_info && item.lot_info.vin_code) || t("NoInformation")}
        </p>
        {admin && (
          <Link
            href={{
              pathname: "/auto-admin/auto-open",
              query: {
                idAuto: item.id,
              },
            }}
          >
            <a className={styles.link}>
              <IconEdit className={styles.svg} /> {t("Edit")}
            </a>
          </Link>
        )}
      </div>
      <div className={cx(styles.column, styles.stepperContainer)}>
        <CustomStepper
          status={status}
          item={item}
          disassembled={disassembled}
          customBlock={styles.paddingBlock}
          paddingBottom={styles.paddingBottom}
          updateStatus={updateStatus}
        />
      </div>
      <div className={styles.column}>
        <>
          <p>
            {t("trackingId")}{" "}
            <span className={styles.colorText}>
              {(item.ship_info && item.ship_info.tracking_id) ||
                t("NoInformation")}
            </span>
          </p>
          <p>
            {t("pointOfLoading")}{" "}
            {(item.ship_info && item.ship_info.point_delivery[0]) ||
              t("NoInformation")}
          </p>
        </>

        <p>
          {t("ContainerId")}{" "}
          <span className={styles.colorText}>
            {(item.ship_info && item.ship_info.container_id) ||
              t("NoInformation")}
          </span>
        </p>
        {disassembled && (
          <div className={styles.flex}>
            <span>{t("Disassembled")}</span>
            {admin ? (
              <ButtonGroup>
                <Button
                  customBtn={styles.btnYes}
                  active={switchOn}
                  onClick={() => {
                    dispatch(
                      updateDismanting(
                        {},
                        {
                          disassembly: 1,
                          port: router.query.port || "",
                          search: router.query.search || "",
                          shipping_status: router.query.shipping_status || "",
                          auto_name: router.query.auto_name || "",
                          auto_year: router.query.auto_year || "",
                          auto_make: router.query.auto_make || "",
                        },
                        item.id
                      )
                    );
                    setSwitchOn(true);
                  }}
                >
                  {t("Yes")}
                </Button>
                <Button
                  customBtn={styles.btnNo}
                  active={!switchOn}
                  onClick={() => {
                    dispatch(
                      updateDismanting(
                        {},
                        {
                          disassembly: 0,
                          port: router.query.port || "",
                          search: router.query.search || "",
                          shipping_status: router.query.shipping_status || "",
                          auto_name: router.query.auto_name || "",
                          auto_year: router.query.auto_year || "",
                          auto_make: router.query.auto_make || "",
                        },
                        item.id
                      )
                    );
                    setSwitchOn(false);
                  }}
                >
                  {t("No")}
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                {switchOn ? (
                  <Button customBtn={styles.btnYes} active={switchOn}>
                    {t("Yes")}
                  </Button>
                ) : (
                  <Button customBtn={styles.btnNo} active={!switchOn}>
                    {t("No")}
                  </Button>
                )}
              </ButtonGroup>
            )}
          </div>
        )}
      </div>
      <div className={styles.column}>
        <a
          href={
            (fileCarfac.length !== 0 && fileCarfac[0].link_for_download) || ""
          }
          download
          className={cx(
            styles.colorText,
            fileCarfac.length === 0 && styles.disabled
          )}
        >
          {t("CarFaxReport")}
        </a>
        <a
          href={
            (fileInvoice.length !== 0 && fileInvoice[0].link_for_download) || ""
          }
          download
          className={cx(
            styles.colorText,
            fileInvoice.length === 0 && styles.disabled
          )}
        >
          {t("Invoices")}
        </a>
        <Button
          customBtn={styles.colorText}
          onClick={() => setIsCommentPopupOpen(true)}
        >
          {t("AddingNotes")}
        </Button>
      </div>
      {isCommentPopupOpen && (
        <Popup
          customPopup={styles.popupDamage}
          title={t("AddingNotes")}
          setIsPopupOpen={setIsCommentPopupOpen}
        >
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, form, values, invalid }) => (
              <form onSubmit={handleSubmit} className={styles.fullWidth}>
                <div className={styles.flex}>
                  <label className={styles.label}>{t("Comment")}</label>
                  <Field
                    className={styles.customTextarea}
                    name="comment"
                    validate={required}
                    component="textarea"
                    placeholder=""
                  />
                </div>
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  {t("AddingNotes")}
                </Button>
              </form>
            )}
          />
          <Button
            customBtn={styles.btnSubmit}
            type="button"
            onClick={() => {
              setIsCommentPopupOpen(false);
              setIsHistoryPopupOpen(true);
            }}
          >
            History
          </Button>
        </Popup>
      )}
      {isHistoryPopupOpen && (
        <Popup
          customPopup={styles.popupDamage}
          title="History notes"
          setIsPopupOpen={setIsHistoryPopupOpen}
        >
          {item.notes.length === 0 ? (
            <p className={styles.noComment}>Not Comments</p>
          ) : (
            <>
              {item.notes.map((itemNotes, index) => (
                <div className={styles.blockComment} key={index}>
                  <b className={styles.name}>{itemNotes.client.name}:</b>
                  <p className={styles.comment}>{itemNotes.comment}</p>
                </div>
              ))}
            </>
          )}
        </Popup>
      )}
    </div>
  );
};

CarInformation.propTypes = {
  disassembled: PropTypes.bool,
  updateStatus: PropTypes.func,
  status: PropTypes.bool,
  admin: PropTypes.bool,
  item: PropTypes.object,
  router: PropTypes.object,
  updateShipping: PropTypes.func,
};

export default CarInformation;
