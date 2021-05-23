import React, { useState, useContext } from "react";
import styles from "./IndexHeader.scss";
import cx from "classnames";
import Image from "../Image/Image";
import Popup from "../Popup/Popup";
import { FormAuth } from "../FormAuth/FormAuth";
import { FormRegistration } from "../FormRegistration/FormRegistration";
import { Button } from "../UI/Button/Button";
import { MenuIndex } from "../MenuIndex/MenuIndex";
import { useSession, signOut } from "next-auth/client";
import Profile from "../../public/icons/Profile.svg";
import Notification from "../../public/icons/Notification.svg";
import Exit from "../../public/icons/signs.svg";
import Link from "next/link";
import { LanguageBlock } from "../LanguageBlock/LanguageBlock";
import useTranslation from "next-translate/useTranslation";
import { PopupContext } from "../../context/PopupContext";

export const IndexHeader = () => {
  const { setIsOpen, setContent } = useContext(PopupContext);
  const { t } = useTranslation("home");
  const [session, loading] = useSession();

  function logoutHandler() {
    signOut({
      redirect: false,
      callbackUrl: "https://front-shipko.mavinx.com/",
    });
  }

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_top}>
          <LanguageBlock></LanguageBlock>
        </div>
        <div className={styles.header_bottom}>
          <div className={styles.header_logo}>
            <a href="/">
              <Image src="/images/Shipco.png" alt="logo" />
            </a>
          </div>
          <MenuIndex></MenuIndex>
          <div className={styles.header_login__wrapper}>
            {!session ? (
              <Button
                event={() => {
                  setContent(FormAuth);
                  setIsOpen(true);
                }}
              >
                {t("login")}
              </Button>
            ) : (
              <>
                {/* <div className={styles.header_icons__notification}>
                <Notification />
              </div> */}
                <div className={styles.header_icons__profile}>
                  <Link
                    href={
                      session.user.role === "user"
                        ? "/overview"
                        : "/base-client"
                    }
                  >
                    <a>
                      <Profile />
                    </a>
                  </Link>
                </div>
                <div
                  onClick={logoutHandler}
                  className={styles.header_icons__exit}
                >
                  <Exit />
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <h1 className={styles.headerTitle}>
        The{" "}
        <span className={cx(styles.headerTitleBg, styles.headerTitle)}>
          Shipco
        </span>{" "}
        CAR FROM USA
      </h1>
      <p className={styles.headerText}>{t("title")}</p>
    </header>
  );
};
