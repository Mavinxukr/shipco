import React from 'react';
import cs from 'classnames';
import Button from '../../Button/Button';
import Input from '../../Input/Input';
import IconSettings from '../../../assets/svg/Settings.svg';
import IconSearch from '../../../assets/svg/search.svg';
import styles from './SubHeader.scss';
import Popup from '../../Popup/Popup';
import MainLayout from '../Global/Global';

const SubHeader = () => (
  <div className={styles.subHeader}>
    <div className={styles.container}>
      <div className={styles.flex}>
        <h4 className={styles.title}>
          Bob Hudson <span className={styles.titleColor}>(ID 000011)</span>
        </h4>
        <Popup customBtn={styles.customBtn} titleButton={<IconSettings />} title="Bob Hudson (ID 000011)">
          <div>adads</div>
        </Popup>
      </div>
      <nav>
        <ul className={styles.menuItems}>
          <li>
            <a className={cs(styles.menuLink, styles.active)} href="/">
              Auto
              <span className={styles.dotActive} />
            </a>
          </li>
          <li>
            <a className={styles.menuLink} href="/">
              Auto for dismanting
              <span className={styles.dotActive} />
            </a>
          </li>
          <li>
            <a className={styles.menuLink} href="/">
              Invoice
              <span className={styles.dotActive} />
            </a>
          </li>
          <li>
            <a className={styles.menuLink} href="/">
              Parts
              <span className={styles.dotActive} />
            </a>
          </li>
          <li>
            <a className={styles.menuLink} href="/">
              Shipping
              <span className={styles.dotActive} />
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.search}>
        <Input
          customInput={styles.inputHeight}
          classNameWrapperForIcon={styles.searchIcon}
          icon={<IconSearch />}
        />
        <Button type="button" customBtn={styles.customBtnSearch}>
          Search
        </Button>
      </div>
    </div>
  </div>
);

export default SubHeader;
