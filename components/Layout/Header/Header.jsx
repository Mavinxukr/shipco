import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import PropsType from 'prop-types';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { currentUserDataSelector } from '../../../utils/selectors';
import ActiveLink from '../ActiveLink/ActiveLink';
import Button from '../../Button/Button';
import HoverPopup from '../../HoverPopup/HoverPopup';
import InputFormWrapper from '../../InputWrapperForm/InputFormWrapper';
import IconAuto from '../../../assets/svg/Vector (2).svg';
import IconRepair from '../../../assets/svg/Group (1).svg';
import IconSetting from '../../../assets/svg/Group (2).svg';
import IconShipping from '../../../assets/svg/Group (3).svg';
import IconInvoices from '../../../assets/svg/Vector (3).svg';
import IconArrow from '../../../assets/svg/Vector 2.svg';
import IconContainer from '../../../assets/svg/AddContainerIcon.svg';
import IconClients from '../../../assets/svg/Clients.svg';
import IconBell from '../../../assets/svg/Group (4).svg';
import IconUser from '../../../assets/svg/Vector (1).svg';
import styles from './Header.scss';
import { getCurrentUser } from '../../../redux/actions/currentUser';

const Header = ({ newLink, admin }) => {
  const [isOpenContainerPanel, setIsOpenContainerPanel] = useState(false);
  const classNameForOpenContainer = cx(styles.menuItem, {
    [styles.activePopup]: isOpenContainerPanel,
  });

  const router = useRouter();

  const user = useSelector(currentUserDataSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser({}));
  }, []);

  const classNameForLink = cx(styles.menuLink, {
    [styles.active]: router.pathname.split('/')[1] === 'auto-admin',
  });

  const classNameForLinkAuto = cx(styles.menuLink, {
    [styles.active]: router.pathname.split('/')[1] === 'auto',
  });

  return (
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
        <a href={admin ? '/base-client' : '/overview'}>
          <h1 className={styles.logo}>Shipco</h1>
        </a>
        <nav className={styles.menu}>
          {admin ? (
            <ul className={cx(styles.menuItems, styles.adminMenu)}>
              <li className={styles.menuItem}>
                <Link
                  href={{ pathname: '/auto-admin', query: { isClient: false } }}
                >
                  <a className={classNameForLink}>
                    <IconAuto className={styles.menuIcon} />
                    Auto
                    <p className={styles.menuDot} />
                  </a>
                </Link>
              </li>
              <li className={styles.menuItem}>
                <ActiveLink activeClassName={styles.active} href="/admin-parts">
                  <a className={styles.menuLink}>
                    <IconSetting className={styles.menuIcon} />
                    parts
                    <p className={styles.menuDot} />
                  </a>
                </ActiveLink>
              </li>
              <li className={styles.menuItem}>
                <ActiveLink activeClassName={styles.active} href="/base-client">
                  <a className={styles.menuLink}>
                    <IconClients className={styles.menuIcon} />
                    Clients
                    <p className={styles.menuDot} />
                  </a>
                </ActiveLink>
              </li>
              {newLink ? (
                <div className={classNameForOpenContainer}>
                  <Button
                    onClick={() => setIsOpenContainerPanel(!isOpenContainerPanel)
                    }
                    customBtn={cx(styles.menuLink, styles.btnOpenPopup)}
                  >
                    <IconContainer className={styles.menuIcon} />
                    Add Shipping container
                  </Button>
                  <HoverPopup customClass={styles.containerPopup}>
                    <div className={styles.trackingId}>
                      <InputFormWrapper
                        notForm
                        label="Tracking ID"
                        classNameWrapper={styles.flexInput}
                        classNameWrapperLabel={styles.customLabel}
                        customInput={styles.customInput}
                      />
                    </div>
                    <div className={styles.containerCar}>
                      <div className={styles.flexCar}>
                        <p className={styles.carId}>Car 1 ID </p>
                        <p className={styles.id}>20 4001 3813 4902</p>
                      </div>
                      <div className={styles.flexCar}>
                        <p className={styles.carId}>Car 2 ID </p>
                        <p className={styles.id}>20 4001 3813 4902</p>
                      </div>
                      <div className={styles.flexCar}>
                        <p className={styles.carId}>Car 3 ID </p>
                        <p className={styles.id}>20 4001 3813 4902</p>
                      </div>
                      <div className={styles.flexCar}>
                        <p className={styles.carId}>From</p>
                        <p className={styles.id}>CA - Los Angeles</p>
                      </div>
                      <div className={styles.flexCar}>
                        <p className={styles.carId}>To</p>
                        <p className={styles.id}>CA - Los Angeles</p>
                      </div>
                      <Button
                        onClick={() => window.location.reload()}
                        customBtn={styles.addContainer}
                      >
                        Add Shipping container
                      </Button>
                    </div>
                  </HoverPopup>
                </div>
              ) : null}
            </ul>
          ) : (
            <ul className={styles.menuItems}>
              <li className={styles.menuItem}>
                <Link href={{ pathname: '/auto' }}>
                  <a className={classNameForLinkAuto}>
                    <IconAuto className={styles.menuIcon} />
                    Auto
                    <p className={styles.menuDot} />
                  </a>
                </Link>
              </li>
              <li className={styles.menuItem}>
                <ActiveLink activeClassName={styles.active} href="/dismanting">
                  <a className={styles.menuLink}>
                    <IconRepair className={styles.menuIcon} />
                    Auto for dismanting
                    <p className={styles.menuDot} />
                  </a>
                </ActiveLink>
              </li>
              <li className={styles.menuItem}>
                <ActiveLink activeClassName={styles.active} href="/parts">
                  <a className={styles.menuLink}>
                    <IconSetting className={styles.menuIcon} />
                    parts
                    <p className={styles.menuDot} />
                  </a>
                </ActiveLink>
              </li>
              <li className={styles.menuItem}>
                <ActiveLink activeClassName={styles.active} href="/shipping">
                  <a className={styles.menuLink}>
                    <IconShipping className={styles.menuIcon} />
                    Shipping
                    <p className={styles.menuDot} />
                  </a>
                </ActiveLink>
              </li>
              <li className={styles.menuItem}>
                <ActiveLink activeClassName={styles.active} href="/invoices">
                  <a className={styles.menuLink}>
                    <IconInvoices className={styles.menuIcon} />
                    Invoices
                    <p className={styles.menuDot} />
                  </a>
                </ActiveLink>
              </li>
            </ul>
          )}
        </nav>
        {admin ? null : (
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
        )}

        <div className={styles.bottomIconsItems}>
          {!admin && (
            <Link href="/notification">
              <a className={styles.bottomIconsLink}>
                <IconBell />
                {user && user.new_notification > 0 && (
                  <span className={styles.count}>{user.new_notification}</span>
                )}
              </a>
            </Link>
          )}
          <Link href={admin ? '/' : '/profile-settings'}>
            <a className={styles.bottomIconsLink}>
              <IconUser />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};

Header.propsTypes = {
  newLink: PropsType.bool,
  admin: PropsType.bool,
};

export default Header;
