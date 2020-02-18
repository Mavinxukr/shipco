import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Popup.scss';
import IconClose from '../../assets/svg/close.svg';
import Button from '../Button/Button';

const Popup = ({
  titleButton, title, children, customBtn, subTitle, iconButton,
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <>
      <Button
        customBtn={customBtn}
        type="button"
        onClick={() => setIsPopupOpen(true)}
      >
        {iconButton}{titleButton}
      </Button>
      {isPopupOpen && (
        <div className={styles.popup}>
          <div className={styles.popupHeader}>
            <h4 className={styles.popupTitle}>
              {title} <span className={styles.popupSubTitle}>{subTitle}</span>
            </h4>
            <button type="button" onClick={() => setIsPopupOpen(false)}>
              <IconClose />
            </button>
          </div>
          <div>{children}</div>
        </div>
      )}
    </>
  );
};
export default Popup;

Popup.propTypes = {
  titleButton: PropTypes.string,
  subTitle: PropTypes.string,
  customBtn: PropTypes.string,
  title: PropTypes.string,
  iconButton: PropTypes.node,
  children: PropTypes.node,
};
