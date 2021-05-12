import React from 'react';
import styles from './Footer.scss';
import useTranslation from 'next-translate/useTranslation';

const Footer = () => {
  const { t } = useTranslation('footer');

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div>
          <h4 className={styles.footerLogo}>Shipco</h4>
          <p className={styles.footerDesc}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat.
          </p>
        </div>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('ourLocation')}
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('europe')}
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('america')}
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('middleEast')}
            </a>
          </li>
        </ul>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('services')}
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('auto')}
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('autoForDismanting')}
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('parts')}
            </a>
          </li>
        </ul>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('getToKnowUs')}
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('about')}
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('generalInfo')}
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('contact')}
            </a>
          </li>
        </ul>
        <ul className={styles.menuList}>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              {t('connectWithUs')}
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              Facebook
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              Instagram
            </a>
          </li>
          <li className={styles.menuItem}>
            <a className={styles.menuLink} href="/">
              Youtube
            </a>
          </li>
        </ul>
      </div>
      <div className={styles.footerLinks}>
        <a className={styles.footerLink} href="/">
          {t('siteMap')}
        </a>
        <a className={styles.footerLink} href="/">
          {t('contactUs')}
        </a>
        <a className={styles.footerLink} href="/">
          {t('sellVehicle')}
        </a>
        <a className={styles.footerLink} href="/">
          {t('termsOfService')}
        </a>
        <a className={styles.footerLink} href="/">
          {t('privacyPolicy')}
        </a>
        <a className={styles.footerLink} href="/">
          {t('copyrightTermsСonditions')}
        </a>
        <a className={styles.footerLink} href="/">
          {t('cookiePolicy')}
        </a>
        <a className={styles.footerLink} href="/faq">
          {t('faq')}
        </a>
      </div>
      <p className={styles.license}>© 2019 - Shipco. {t('allRightReserved')}</p>
    </footer>
  );
};

export default Footer;
