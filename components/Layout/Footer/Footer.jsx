import React from 'react';
import styles from './Footer.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <div className={styles.container}>
      <div>
        <h4 className={styles.footerLogo}>Shipco</h4>
        <p className={styles.footerDesc}>
          Lorem ipsum dolor sit amet, consectetuer
          adipiscing elit, sed diam nonummy nibh
          euismod tincidunt ut laoreet dolore magna
          aliquam erat volutpat.
        </p>
      </div>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Our location</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Europe</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">America</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Middle East</a>
        </li>
      </ul>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Services</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Auto</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Auto For Dismanting</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Perts</a>
        </li>
      </ul>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Get to Know Us</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">About </a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">General Info</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Contact</a>
        </li>
      </ul>
      <ul className={styles.menuList}>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Connect  with us</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Facebook</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Instagram</a>
        </li>
        <li className={styles.menuItem}>
          <a className={styles.menuLink} href="/">Youtube</a>
        </li>
      </ul>
    </div>
    <div className={styles.footerLinks}>
      <a className={styles.footerLink} href="/">Site Map</a>
      <a className={styles.footerLink} href="/">Contact Us</a>
      <a className={styles.footerLink} href="/">Sell a Vehicle</a>
      <a className={styles.footerLink} href="/">Terms of Service</a>
      <a className={styles.footerLink} href="/">Privacy Policy</a>
      <a className={styles.footerLink} href="/">Copyright Terms & Conditions</a>
      <a className={styles.footerLink} href="/">Cookie Policy</a>
      <a className={styles.footerLink} href="/faq">FAQ</a>
    </div>
    <p className={styles.license}>© 2019 - Shipco. All right reserved</p>
  </footer>
);

export default Footer;
