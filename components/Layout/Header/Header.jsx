import React from 'react';
import cx from 'classnames';
import ActiveLink from '../ActiveLink/ActiveLink';
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
      <a href="/"><h1 className={styles.logo}>Shipco</h1></a>
      <nav className={styles.menu}>
        <ul className={styles.menuItems}>
          <li className={styles.menuItem}>
            <ActiveLink activeClassName={styles.active} href="/auto">
              <a className={styles.menuLink}>
                <IconAuto className={styles.menuIcon} />
                Auto
              </a>
            </ActiveLink>
          </li>
          <li className={styles.menuItem}>
            <ActiveLink activeClassName={styles.active} href="/dismanting">
              <a className={styles.menuLink}>
                <IconRepair className={styles.menuIcon} />
                Auto for dismanting
              </a>
            </ActiveLink>
          </li>
          <li className={styles.menuItem}>
            <ActiveLink activeClassName={styles.active} href="/parts">
              <a className={styles.menuLink}>
                <IconSetting className={styles.menuIcon} />
                parts
              </a>
            </ActiveLink>
          </li>
          <li className={styles.menuItem}>
            <ActiveLink activeClassName={styles.active} href="/shipping">
              <a className={styles.menuLink}>
                <IconShipping className={styles.menuIcon} />
                Shipping
              </a>
            </ActiveLink>
          </li>
          <li className={styles.menuItem}>
            <ActiveLink activeClassName={styles.active} href="/invoices">
              <a className={styles.menuLink} href="/invoices">
                <IconInvoices className={styles.menuIcon} />
                Invoices
              </a>
            </ActiveLink>
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
