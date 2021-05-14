import React, { useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { Field, Form } from "react-final-form";
import { useDispatch } from "react-redux";
import formatStringByPattern from "format-string-by-pattern";
import ActiveLink from "../ActiveLink/ActiveLink";
import Button from "../../Button/Button";
import IconSettings from "../../../assets/svg/Settings.svg";
import Search from "../../Search/Search";
import Popup from "../../Popup/Popup";
import {
  composeValidators,
  emailValidation,
  mustBeNumber,
  required,
  lengthCart,
  lengthPhone,
} from "../../../utils/validation";
import { renderInput, renderSelect } from "../../../utils/renderInputs";
import styles from "./SubHeader.scss";
import { state } from "./data";
import { updateCurrentClient } from "../../../redux/actions/currentClient";
import useTranslation from "next-translate/useTranslation";

const SubHeader = ({
  hidden,
  currentClientId,
  currentClient,
  onClick,
  client,
}) => {
  const router = useRouter();
  const { t } = useTranslation("admin-subheader");
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(
      updateCurrentClient(
        {},
        {
          ...values,
          country: values.country && values.country.label,
          city: values.city && values.city.label,
        },
        currentClient.data.id
      )
    );
  };

  return (
    <div className={styles.subHeader}>
      <div className={styles.container}>
        {currentClientId ? (
          <div className={styles.flex}>
            <h4 className={styles.title}>
              {currentClient.data.name}{" "}
              <span className={styles.titleColor}>
                ({t("ID")} {currentClient.data.id})
              </span>
            </h4>
            {hidden && (
              <Button
                type="button"
                customBtn={styles.customBtn}
                onClick={() => setIsPopupOpen(true)}
              >
                <IconSettings />
              </Button>
            )}
          </div>
        ) : (
          <>
            {currentClient && router.pathname !== "/auto-admin" && (
              <div className={styles.flex}>
                <h4 className={styles.title}>
                  {currentClient.name}{" "}
                  <span className={styles.titleColor}>
                    ({t("ID")}
                    {currentClient.id})
                  </span>
                </h4>
              </div>
            )}
          </>
        )}
        <nav>
          <ul className={styles.menuItems}>
            <li>
              <ActiveLink
                activeClassName={styles.active}
                href={{ pathname: "/auto-admin", query: { isClient: false } }}
              >
                <a className={styles.menuLink}>
                  {t("auto")}
                  <span className={styles.dotActive} />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                activeClassName={styles.active}
                href="/auto-admin/dismanting"
              >
                <a className={styles.menuLink}>
                  {t("dismanting")}
                  <span className={styles.dotActive} />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                activeClassName={styles.active}
                href="/auto-admin/parts"
              >
                <a className={styles.menuLink}>
                  {t("parts")}
                  <span className={styles.dotActive} />
                </a>
              </ActiveLink>
            </li>
            <li>
              <ActiveLink
                activeClassName={styles.active}
                href="/auto-admin/shipping"
              >
                <a className={styles.menuLink}>
                  {t("shipping")}

                  <span className={styles.dotActive} />
                </a>
              </ActiveLink>
            </li>
          </ul>
        </nav>
        <Search onClick={onClick} />
      </div>
      {hidden && isPopupOpen && (
        <Popup
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          title={currentClient.data.name}
          subTitle={currentClient.data.id}
        >
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, submitting, invalid }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="name"
                  validate={required}
                  type="text"
                  defaultValue={currentClient.data.name || ""}
                >
                  {renderInput({
                    label: t("Name"),
                    classNameWrapper: "InputFormWrapper-popupFieldRow",
                    classNameWrapperLabel: "InputFormWrapper-blackLabel",
                  })}
                </Field>
                <Field
                  name="email"
                  validate={composeValidators(required, emailValidation)}
                  type="email"
                  defaultValue={currentClient.data.email || ""}
                >
                  {renderInput({
                    label: t("Email Address"),
                    classNameWrapper: "InputFormWrapper-popupFieldRow",
                    classNameWrapperLabel: "InputFormWrapper-blackLabel",
                  })}
                </Field>
                <Field
                  name="phone"
                  validate={composeValidators(
                    required,
                    mustBeNumber,
                    lengthPhone
                  )}
                  type="text"
                  parse={formatStringByPattern("+9-9999-999-99-99")}
                  defaultValue={currentClient.data.phone || ""}
                >
                  {renderInput({
                    label: t("Phone number"),
                    classNameWrapper: "InputFormWrapper-popupFieldRow",
                    classNameWrapperLabel: "InputFormWrapper-blackLabel",
                  })}
                </Field>
                <Field
                  name="country"
                  component={renderSelect({
                    label: t("Country"),
                    classNameWrapper: "SelectCustom-popupFieldRow",
                    classNameLabel: "SelectCustom-blackLabel",
                    placeholder: currentClient.data.country || "",
                  })}
                  options={state}
                />
                <Field
                  name="city"
                  component={renderSelect({
                    label: t("City"),
                    classNameWrapper: "SelectCustom-popupFieldRow",
                    classNameLabel: "SelectCustom-blackLabel",
                    placeholder: currentClient.data.city || "",
                  })}
                  options={
                    (client &&
                      client.additional.cities.map((item) => ({
                        value: item.name,
                        label: item.name,
                      }))) ||
                    []
                  }
                />
                <Field
                  name="zip"
                  validate={composeValidators(required, mustBeNumber)}
                  type="text"
                  defaultValue={currentClient.data.zip || ""}
                >
                  {renderInput({
                    label: t("Zip"),
                    classNameWrapper: "InputFormWrapper-popupFieldRow",
                    classNameWrapperLabel: "InputFormWrapper-blackLabel",
                  })}
                </Field>
                <Field
                  name="address"
                  validate={required}
                  type="text"
                  defaultValue={currentClient.data.address || ""}
                >
                  {renderInput({
                    label: t("Adress"),
                    widthInputBlock: "InputFormWrapper-widthInputBlock",
                    classNameWrapper: "InputFormWrapper-popupFieldRow",
                    classNameWrapperLabel: "InputFormWrapper-blackLabel",
                  })}
                </Field>
                <Field
                  name="card_number"
                  validate={composeValidators(
                    required,
                    mustBeNumber,
                    lengthCart
                  )}
                  type="text"
                  parse={formatStringByPattern("9999-9999-9999-9999")}
                  defaultValue={currentClient.data.card_number || ""}
                >
                  {renderInput({
                    label: t("PAYMENT"),
                    classNameWrapper: "InputFormWrapper-popupFieldRow",
                    classNameWrapperLabel: "InputFormWrapper-blackLabel",
                  })}
                </Field>
                <div className={styles.submitPopup}>
                  <Button
                    customBtn={styles.btnSubmit}
                    type="submit"
                    disabled={invalid || submitting}
                  >
                    {t("save")}
                  </Button>
                </div>
              </form>
            )}
          />
        </Popup>
      )}
    </div>
  );
};

SubHeader.propTyps = {
  hidden: PropTypes.bool,
  currentClientId: PropTypes.number,
  currentClient: PropTypes.object,
  onClick: PropTypes.func,
};

export default SubHeader;
