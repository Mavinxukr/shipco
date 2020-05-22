import React, { useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Popup.scss';
import IconClose from '../../assets/svg/close.svg';

const Popup = ({
  title, children, subTitle, setIsPopupOpen, customPopup,
}) => {
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setIsPopupOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', escFunction, false);

    return () => {
      document.removeEventListener('keydown', escFunction, false);
    };
  }, []);

  return (
    <>
      <div className={styles.popupBackground} />
      <div className={cx(styles.popup, customPopup)}>
        <div className={styles.popupHeader}>
          <h4 className={styles.popupTitle}>
            {title}{' '}
            {subTitle && (
              <span className={styles.popupSubTitle}>{subTitle}</span>
            )}
          </h4>
          <button type="button" onClick={() => setIsPopupOpen(false)}>
            <IconClose />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </>
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
