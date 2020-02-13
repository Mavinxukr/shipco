import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './Popup.scss';
import IconClose from '../../assets/svg/close.svg';
import Button from '../Button/Button';

const Popup = ({
  titleButton, title, children, customBtn, subTitle,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <Button
        customBtn={customBtn}
        type="button"
        onClick={() => setIsModalOpen(true)}
      >
        {titleButton}
      </Button>
      {isModalOpen && (
        <div className={styles.popup}>
          <div className={styles.popupHeader}>
            <h4 className={styles.popupTitle}>
              {title} <span className={styles.popupSubTitle}>{subTitle}</span>
            </h4>
            <button type="button" onClick={() => setIsModalOpen(false)}>
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
  titleButton: PropTypes.node,
  subTitle: PropTypes.string,
  customBtn: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.node,
};
