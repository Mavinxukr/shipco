import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Popup.scss';
import IconClose from '../../assets/svg/close.svg';

const Popup = ({
  title, children, subTitle, setIsPopupOpen, customPopup,
}) => (
  <>
    <div className={styles.popupBackground} />
    <div className={cx(styles.popup, customPopup)}>
      <div className={styles.popupHeader}>
        <h4 className={styles.popupTitle}>
          {title}{' '}
          {subTitle && <span className={styles.popupSubTitle}>{subTitle}</span>}
        </h4>
        <button type="button" onClick={() => setIsPopupOpen(false)}>
          <IconClose />
        </button>
      </div>
      <div>{children}</div>
    </div>
  </>
);
export default Popup;

Popup.propTypes = {
  subTitle: PropTypes.string,
  customPopup: PropTypes.string,
  setIsPopupOpen: PropTypes.func,
  title: PropTypes.string,
  children: PropTypes.node,
};
