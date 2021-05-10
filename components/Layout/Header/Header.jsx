import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import PropsType from 'prop-types';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useSession, signOut } from 'next-auth/client';
import {
  currentUserDataSelector,
  autoByContainerDataSelector,
} from '../../../utils/selectors';
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
import IconLogOut from '../../../assets/svg/signs.svg';
import styles from './Header.scss';
import {
  getCurrentUser,
  logoutCurrentUser,
} from '../../../redux/actions/currentUser';
import { getAutoByContainer } from '../../../redux/actions/autosByContainer';
import { storeShipping } from '../../../redux/actions/shipping';
import IconMenu from '../../../assets/svg/menuWhite.svg';

const Header = ({ newLink, admin }) => {
  const [isOpenContainerPanel, setIsOpenContainerPanel] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const user = useSelector(currentUserDataSelector);
  const autoBycontainer = useSelector(autoByContainerDataSelector);

  useEffect(() => {
    dispatch(getCurrentUser({}));
    dispatch(getAutoByContainer());
  }, []);

  function logoutHandler() {
    signOut();
  }

  const classNameForOpenContainer = cx(styles.menuItem, {
    [styles.activePopup]: isOpenContainerPanel,
  });
  const classNameForLink = cx(styles.menuLink, {
    [styles.active]: router.pathname.split('/')[1] === 'auto-admin',
  });
  const classNameForLinkAuto = cx(styles.menuLink, {
    [styles.active]: router.pathname.split('/')[1] === 'auto',
  });
  const classNameForLinkPrices = cx(styles.menuLink, {
    [styles.active]: router.pathname.split('/')[1] === 'prices',
  });
  const navClass = cx(styles.menu, {
    [styles.openMenu]: isMenuOpen,
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
        <div className={styles.flexBtn}>
          <Button
            type="button"
            customBtn={styles.menuBtn}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <IconMenu className={styles.burger} />
          </Button>
          <a href={admin ? '/base-client' : '/overview'}>
            <h1 className={styles.logo}>Shipco</h1>
          </a>
        </div>
        <nav className={navClass}>
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
                <Link href={{ pathname: '/auto-admin/parts' }}>
                  <a className={styles.menuLink}>
                    <IconSetting className={styles.menuIcon} />
                    parts
                    <p className={styles.menuDot} />
                  </a>
                </Link>
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
              <li className={styles.menuItem}>
                <ActiveLink activeClassName={styles.active} href="/groups">
                  <a className={styles.menuLink}>
                    <IconClients className={styles.menuIcon} />
                    Groups
                    <p className={styles.menuDot} />
                  </a>
                </ActiveLink>
              </li>
              <li className={styles.menuItem}>
                <ActiveLink
                  activeClassName={styles.active}
                  href={{ pathname: '/prices', query: { isClient: false } }}
                >
                  <a className={classNameForLinkPrices}>
                    <IconSetting className={styles.menuIcon} />
                    Prices
                    <p className={styles.menuDot} />
                  </a>
                </ActiveLink>
              </li>
              <li className={styles.menuItem}>
                <ActiveLink
                  activeClassName={styles.active}
                  href={{ pathname: '/payments', query: { isClient: false } }}
                >
                  <a className={styles.menuLink}>
                    <IconSetting className={styles.menuIcon} />
                    Payments
                    <p className={styles.menuDot} />
                  </a>
                </ActiveLink>
              </li>
              <li className={styles.menuItem}>
                <ActiveLink
                  activeClassName={styles.active}
                  href="/invoices-admin"
                >
                  <a className={styles.menuLink}>
                    <IconInvoices className={styles.menuIcon} />
                    Invoices
                    <p className={styles.menuDot} />
                  </a>
                </ActiveLink>
              </li>
              {newLink ? (
                <div className={classNameForOpenContainer}>
                  <Button
                    onClick={() =>
                      setIsOpenContainerPanel(!isOpenContainerPanel)
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
                        id="tracking_id"
                        classNameWrapper={styles.flexInput}
                        classNameWrapperLabel={styles.customLabel}
                        customInput={styles.customInput}
                        onKeyUp={() =>
                          dispatch(
                            getAutoByContainer({
                              tracking_id: document.querySelector(
                                '#tracking_id',
                              ).value,
                            }),
                          )
                        }
                      />
                    </div>
                    {autoBycontainer && autoBycontainer.data && (
                      <div className={styles.containerCar}>
                        {autoBycontainer.data.auto_id.map((item, index) => (
                          <div key={index} className={styles.flexCar}>
                            <p className={styles.carId}>Car {index + 1} ID </p>
                            <p className={styles.id}>{item}</p>
                          </div>
                        ))}
                        <div className={styles.flexCar}>
                          <p className={styles.carId}>From</p>
                          <p className={styles.id}>
                            {autoBycontainer.data.from}
                          </p>
                        </div>
                        <div className={styles.flexCar}>
                          <p className={styles.carId}>To</p>
                          <p className={styles.id}>{autoBycontainer.data.to}</p>
                        </div>
                        <Button
                          onClick={() => {
                            dispatch(
                              storeShipping(
                                {},
                                {
                                  auto_id: JSON.stringify(
                                    autoBycontainer.data.auto_id,
                                  ),
                                },
                              ),
                            );
                          }}
                          customBtn={styles.addContainer}
                        >
                          Add Shipping container
                        </Button>
                      </div>
                    )}
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
        <div className={styles.rigthItemsHeader}>
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
                    <span className={styles.count}>
                      {user.new_notification}
                    </span>
                  )}
                </a>
              </Link>
            )}
            {!admin && (
              <Link href={admin ? '/' : '/profile-settings'}>
                <a className={styles.bottomIconsLink}>
                  <IconUser />
                </a>
              </Link>
            )}
            <Button onClick={logoutHandler}>
              <IconLogOut className={styles.logOut} />
            </Button>
          </div>
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
