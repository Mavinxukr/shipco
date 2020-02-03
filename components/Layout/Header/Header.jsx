import React from 'react';
import cx from 'classnames';
import IconAuto from '../../../assets/svg/Vector (2).svg';
import IconRepair from '../../../assets/svg/Group (1).svg';
import IconSetting from '../../../assets/svg/Group (2).svg';
import IconShipping from '../../../assets/svg/Group (3).svg';
import IconInvoices from '../../../assets/svg/Vector (3).svg';
import IconArrow from '../../../assets/svg/Vector 2.svg';
import IconBell from '../../../assets/svg/Group (4).svg';
import IconUser from '../../../assets/svg/Vector (1).svg';
import styles from './Header.scss';

const Header = () => (
  <header className={styles.header}>
    <div className={styles.top}>
      <div className={styles.topLanguages}>
        <button
          type="button"
          className={cx(styles.topLanguagesItem, styles.topLanguagesActive)}
        >
          En
        </button>
        <button type="button" className={styles.topLanguagesItem}>
          Ru
        </button>
        <button type="button" className={styles.topLanguagesItem}>
          Uk
        </button>
      </div>
    </div>
    <div className={styles.bottom}>
      <h1 className={styles.logo}>Shipco</h1>
      <nav className={styles.menu}>
        <ul className={styles.menuItems}>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              <IconAuto className={styles.menuIcon} />
              Auto
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              <IconRepair className={styles.menuIcon} />
              Auto for dismanting
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              <IconSetting className={styles.menuIcon} />
              parts
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              <IconShipping className={styles.menuIcon} />
              Shipping
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              <IconInvoices className={styles.menuIcon} />
              Invoices
            </a>
          </li>
        </ul>
      </nav>
      <div className={styles.bottomLanguages}>
        <button type="button" className={styles.bottomLanguagesItem}>
          Ru
        </button>{' '}
        /
        <button type="button" className={styles.bottomLanguagesItem}>
          Uk
        </button>
        <IconArrow className={styles.bottomLanguagesIcon} />
      </div>
      <div className={styles.bottomIconsItems}>
        <a href="/" className={styles.bottomIconsLink}>
          <IconBell />
          <span className={styles.count}>1</span>
        </a>
        <a href="/" className={styles.bottomIconsLink}>
          <IconUser />
        </a>
      </div>
    </div>
  </header>
);

export default Header;
