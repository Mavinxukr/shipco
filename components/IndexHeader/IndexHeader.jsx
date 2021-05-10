import React, { useState } from 'react';
import styles from './IndexHeader.scss';
import cx from 'classnames';
import Image from '../Image/Image';
import Popup from '../Popup/Popup';
import { FormAuth } from '../FormAuth/FormAuth';
import { FormRegistration } from '../FormRegistration/FormRegistration';
import { Button } from '../UI/Button/Button';
import { MenuIndex } from '../MenuIndex/MenuIndex';
import { useSession, signOut } from 'next-auth/client';
import Profile from '../../public/icons/Profile.svg';
import Notification from '../../public/icons/Notification.svg';
import Exit from '../../public/icons/signs.svg';
import Link from 'next/link';

export const IndexHeader = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [variant, setVariant] = useState('signIn');

  const [session, loading] = useSession();

  function logoutHandler() {
    signOut({ redirect: false, callbackUrl: '/' });
  }

  return (
    <header className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_logo}>
          {/* <Button
            type="button"
            customBtn={styles.menu}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <IconMenu className={styles.burger} />
          </Button> */}
          <a href="/">
            <Image src="/images/Shipco.png" alt="logo" />
          </a>
        </div>
        <MenuIndex></MenuIndex>
        <div className={styles.header_login__wrapper}>
          {!session ? (
            <Button
              event={() => {
                setVariant('signIn');
                setIsOpen(true);
              }}
            >
              LOGIN
            </Button>
          ) : (
            <>
              {/* <div className={styles.header_icons__notification}>
                <Notification />
              </div> */}
              <div className={styles.header_icons__profile}>
                <Link
                  href={
                    session.user.role === 'user' ? '/overview' : '/base-client'
                  }
                >
                  <a>
                    <Profile />
                  </a>
                </Link>
              </div>
              <div
                onClick={logoutHandler}
                className={styles.header_icons__exit}
              >
                <Exit />
              </div>
            </>
          )}
        </div>
      </div>

      <h1 className={styles.headerTitle}>
        The{' '}
        <span className={cx(styles.headerTitleBg, styles.headerTitle)}>
          Shipco
        </span>{' '}
        CAR FROM USA
      </h1>
      <p className={styles.headerText}>
        A car sales site from America. Used cars, whole and beaten cars from US
        auto auctions - Copart, Manheim, IAAI, CARS.COM SAVING when buying a car
        on order in the USA up to -50%
      </p>
      {isOpen && (
        <Popup
          isPopupOpen={isOpen}
          setIsPopupOpen={setIsOpen}
          title="Shipco"
          customPopup={styles.customTitle}
        >
          {variant === 'signIn' ? (
            <FormAuth setVariant={setVariant}></FormAuth>
          ) : null}
          {variant === 'signUp' ? (
            <FormRegistration setVariant={setVariant}></FormRegistration>
          ) : null}
        </Popup>
      )}
    </header>
  );
};
