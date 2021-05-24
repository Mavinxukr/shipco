import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import ActiveLink from "../ActiveLink/ActiveLink";
import Button from "../../Button/Button";
import IconSettings from "../../../assets/svg/Settings.svg";
import Search from "../../Search/Search";
import Popup from "../../Popup/Popup";

import styles from "./SubHeader.scss";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../../context/PopupContext";
import { UpdateClientForm } from "./UpdateClientForm";

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
  const { setContent, setIsOpen } = useContext(PopupContext);
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
                onClick={() => {
                  setContent(UpdateClientForm, { currentClient, client });
                  setIsOpen(true);
                }}
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
        ></Popup>
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
