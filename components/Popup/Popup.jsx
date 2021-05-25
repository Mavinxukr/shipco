import React, { useEffect, useCallback, useContext } from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import styles from "./Popup.scss";
import IconClose from "../../assets/svg/close.svg";
import { PopupContext } from "../../context/PopupContext";

const Popup = () => {
  const { isOpen, setIsOpen, content } = useContext(PopupContext);
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);
    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <div className={styles.popup}>
      <div
        className={styles.popup_overlay}
        onClick={() => setIsOpen(false)}
      ></div>
      <div className={cx(styles.popup_body)}>
        <button
          className={styles.close}
          type="button"
          onClick={() => setIsOpen(false)}
        >
          <IconClose />
        </button>
        <div>{content}</div>
      </div>
    </div>
  );
};
Popup.propTypes = {
  subTitle: PropTypes.string,
  customPopup: PropTypes.string,
  setIsPopupOpen: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Popup;
