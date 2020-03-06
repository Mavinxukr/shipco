import React, { useState } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import '../../../public/slick/slick.css';
import Slider from 'react-slick';
import GoogleMapReact from 'google-map-react';
import { Field, Form } from 'react-final-form';
import Button from '../../Button/Button';
import Image from '../../Image/Image';
import Popup from '../../Popup/Popup';
// import ProductCard from '../../ProductCard/ProductCard';
import { data, sliderData } from './data';
import {
  composeValidators,
  emailValidation,
  required,
  passwordValidation,
  snpValidation,
} from '../../../utils/validation';
import { renderInput } from '../../../utils/renderInputs';
import IconQuotes from '../../../assets/svg/quotes.svg';
import IconFb from '../../../assets/svg/Vector(1).svg';
import IconIn from '../../../assets/svg/Group.svg';
import IckonTw from '../../../assets/svg/Vector.svg';
import IconYoutube from '../../../assets/svg/Vector(2).svg';
import IconArrow from '../../../assets/svg/Group (6).svg';
import styles from './Home.scss';

const SampleNextArrow = ({ onClick, index }) => (
  <button
    type="button"
    disabled={index === sliderData.length - 1}
    className={styles.ArrowR}
    onClick={onClick}
  >
    <IconArrow />
  </button>
);

const SamplePrevArrow = ({ onClick, index }) => (
  <button
    type="button"
    disabled={index === 0}
    className={styles.ArrowL}
    onClick={onClick}
  >
    <IconArrow />
  </button>
);

const Home = () => {
  const [index, setIndex] = useState(0);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (param, param2) => setIndex(param2),
    nextArrow: <SampleNextArrow index={index} />,
    prevArrow: <SamplePrevArrow index={index} />,
  };

  return (
    <>
      <header className={styles.header}>
        <div className={cx(styles.container, styles.containerHeader)}>
          <a href="/">
            <Image src="/images/Shipco.png" alt="logo" />
          </a>
          <nav>
            <ul className={styles.headerMenuItems}>
              <li className={styles.headerMenuItem}>
                <a className={styles.headerMenuLink} href="/">
                  Cars for Sale
                </a>
              </li>
              <li className={styles.headerMenuItem}>
                <a className={styles.headerMenuLink} href="/">
                  Auto Export
                </a>
              </li>
              <li className={styles.headerMenuItem}>
                <a className={styles.headerMenuLink} href="/">
                  General info
                </a>
              </li>
              <li className={styles.headerMenuItem}>
                <a className={styles.headerMenuLink} href="/">
                  About Us
                </a>
              </li>
              <li className={styles.headerMenuItem}>
                <a className={styles.headerMenuLink} href="/">
                  Contacts
                </a>
              </li>
            </ul>
          </nav>
          <Button
            onClick={() => setIsLoginPopupOpen(true)}
            customBtn={styles.btnLogin}
            type="button"
          >
            Login
          </Button>
        </div>
        <h1 className={styles.headerTitle}>
          The{' '}
          <span className={cx(styles.headerTitleBg, styles.headerTitle)}>
            Shipco
          </span>{' '}
          CAR FROM USA
        </h1>
        <p className={styles.headerText}>
          A car sales site from America. Used cars, whole and beaten cars from
          US auto auctions - Copart, Manheim, IAAI, CARS.COM SAVING when buying
          a car on order in the USA up to -50%
        </p>
      </header>
      <main>
        <div className={styles.container}>
          <h2 className={styles.infoTitle}>OUR FEATURES</h2>
          <p className={styles.infoText}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.
          </p>
          <div className={styles.infoBlock}>
            <div className={styles.infoBlockItem}>
              <Image src="/images/icon_1.png" alt="" />
              <p className={styles.infoBlockItemTitle}>
                Best Deals &amp; Prices
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </p>
            </div>
            <div className={styles.infoBlockItem}>
              <Image src="/images/icon_2.png" alt="" />
              <p className={styles.infoBlockItemTitle}>
                Efficiency and quality
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </p>
            </div>
            <div className={styles.infoBlockItem}>
              <Image src="/images/icon_3.png" alt="" />
              <p className={styles.infoBlockItemTitle}>Security</p>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </p>
            </div>
          </div>
        </div>
        {/* <div className={styles.cars}> */}
        {/*  <div className={styles.container}> */}
        {/*    <h2 className={styles.carsTitle}>Cars</h2> */}
        {/*    <div className={styles.carsItems}> */}
        {/*      {data.map(item => ( */}
        {/*        <ProductCard key={item.id} item={item} /> */}
        {/*      ))} */}
        {/*    </div> */}
        {/*  </div> */}
        {/* </div> */}
        <div className={styles.container}>
          <h2 className={styles.testimonialsTitle}>
            <IconQuotes className={styles.testimonialsIcon} />
            Testimonials
          </h2>
          <Slider className={styles.sliderContainer} {...settings}>
            {sliderData.map(item => (
              <div key={item.id} className={styles.slider}>
                <Image className={styles.sliderImg} src={item.src} />
                <div className={styles.sliderRight}>
                  <div className={styles.sliderFlex}>
                    <Image circle src={item.srcUser} />
                    <div className={styles.sliderUser}>
                      <h4>{item.name}</h4>
                      <p>{item.position}</p>
                    </div>
                  </div>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div className={styles.container}>
          <h2 className={styles.contactTitle}>Contact US</h2>
          <div className={styles.contactBlock}>
            <div className={styles.contactBlockText}>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
                nostrud exerci tation ullamcorper suscipit lobortis nisl ut
                aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
                in hendrerit in vulputate velit esse molestie consequat,.
              </p>
            </div>
            <div className={styles.contactBlock}>
              <div className={styles.contactColumn}>
                <p>Lorem ipsum dolor sit amet,</p>
                <a className={styles.contactLink} href="tel:+49 17634657262">
                  T: +49 17634657262
                </a>
                <a
                  className={styles.contactLink}
                  href="mailto:qz16@designare.biz"
                >
                  E: qz16@designare.biz
                </a>
              </div>
              <div className={styles.contactColumn}>
                <p>Lorem ipsum dolor sit amet,</p>
                <a className={styles.contactLink} href="tel:+49 17634657262">
                  T: +49 17634657262
                </a>
                <a
                  className={styles.contactLink}
                  href="mailto:qz16@designare.biz"
                >
                  E: qz16@designare.biz
                </a>
              </div>
            </div>
          </div>
          <div className={styles.social}>
            <a className={styles.socialLink} href="/">
              <IconFb className={styles.fillRed} />
            </a>
            <a className={styles.socialLink} href="/">
              <IconIn className={styles.fillRed} />
            </a>
            <a className={styles.socialLink} href="/">
              <IckonTw className={styles.fillRed} />
            </a>
            <a className={styles.socialLink} href="/">
              <IconYoutube className={styles.fillRed} />
            </a>
          </div>
        </div>
        <div>
          <div className={styles.map}>
            <GoogleMapReact
              bootstrapURLKeys={{
                key: 'AIzaSyDb8D7DDVkbXbN03KeDk0TFmBpK24NcQjg',
              }}
              defaultCenter={{
                lat: 59.955413,
                lng: 30.337844,
              }}
              defaultZoom={13}
            />
          </div>
        </div>
        {isLoginPopupOpen && (
          <Popup
            isPopupOpen={isLoginPopupOpen}
            setIsPopupOpen={setIsLoginPopupOpen}
            title="Shipco"
            customPopup={styles.customTitle}
          >
            <div>
              <h5>Sign In</h5>
              <Form
                onSubmit={onSubmit}
                render={({ handleSubmit, submitting, invalid }) => (
                  <form className={styles.widthForm} onSubmit={handleSubmit}>
                    <Field
                      name="Email Address"
                      validate={composeValidators(required, emailValidation)}
                      type="email"
                    >
                      {renderInput({
                        label: '',
                        placeholder: 'Email Address',
                      })}
                    </Field>
                    <Field
                      name="Password"
                      validate={composeValidators(required, passwordValidation)}
                      type="password"
                    >
                      {renderInput({
                        label: '',
                        placeholder: 'Password',
                      })}
                    </Field>
                    <Button
                      customBtn={styles.btnSubmit}
                      type="submit"
                      disabled={invalid || submitting}
                    >
                      Sign in
                    </Button>
                  </form>
                )}
              />
              <p className={styles.text}>
                Not on Shipco yet?{' '}
                <Button
                  customBtn={styles.btnRegister}
                  onClick={() => {
                    setIsLoginPopupOpen(!isLoginPopupOpen);
                    setIsRegisterPopupOpen(!isRegisterPopupOpen);
                  }}
                >
                  Register
                </Button>
              </p>
            </div>
          </Popup>
        )}
      </main>
      {isRegisterPopupOpen && (
        <Popup
          isPopupOpen={isRegisterPopupOpen}
          setIsPopupOpen={setIsRegisterPopupOpen}
          title="Shipco"
          customPopup={styles.customTitle}
        >
          <div>
            <h5>Sign In</h5>
            <Form
              onSubmit={onSubmit}
              validate={(values) => {
                const errors = {};
                if (!values.confirm) {
                  errors.confirm = 'Required';
                } else if (values.confirm !== values.password) {
                  errors.confirm = 'The password was entered incorrectly';
                }
                return errors;
              }}
              render={({
                handleSubmit, submitting, invalid, values,
              }) => (
                <form className={styles.widthForm} onSubmit={handleSubmit}>
                  <Field name="Name" validate={snpValidation} type="text">
                    {renderInput({
                      label: '',
                      placeholder: 'Name',
                    })}
                  </Field>
                  <Field
                    name="Email Address"
                    validate={composeValidators(required, emailValidation)}
                    type="email"
                  >
                    {renderInput({
                      label: '',
                      placeholder: 'Email Address',
                    })}
                  </Field>
                  <Field
                    name="password"
                    validate={composeValidators(required, passwordValidation)}
                    type="password"
                  >
                    {renderInput({
                      label: '',
                      placeholder: 'Password',
                    })}
                  </Field>
                  <Field
                    name="confirm"
                    type="password"
                  >
                    {renderInput({
                      label: '',
                      placeholder: 'Confirm password',
                    })}
                  </Field>
                  <Button
                    customBtn={styles.btnSubmit}
                    type="submit"
                    disabled={invalid || submitting}
                  >
                    send request
                  </Button>
                </form>
              )}
            />
            <p className={styles.text}>
              Already Registered?{' '}
              <Button
                customBtn={styles.btnRegister}
                onClick={() => {
                  setIsRegisterPopupOpen(!isRegisterPopupOpen);
                  setIsLoginPopupOpen(!isLoginPopupOpen);
                }}
              >
                Log In
              </Button>
            </p>
          </div>
        </Popup>
      )}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <div className={styles.footerLogo}>
            <a href="/">
              <Image src="/images/Shipco.png" alt="logo" />
            </a>
          </div>
        </div>
        <div className={cx(styles.container, styles.footerContainer)}>
          <div>
            <p className={styles.footerText}>
              Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
              nonummy nibh
            </p>
            <div className={styles.social}>
              <a className={styles.socialLink} href="/">
                <IconFb className={styles.fillWhite} />
              </a>
              <a className={styles.socialLink} href="/">
                <IconIn className={styles.fillWhite} />
              </a>
              <a className={styles.socialLink} href="/">
                <IckonTw className={styles.fillWhite} />
              </a>
              <a className={styles.socialLink} href="/">
                <IconYoutube className={styles.fillWhite} />
              </a>
            </div>
          </div>
          <ul className={styles.footerNav}>
            <li className={styles.footerItem}>
              <a className={styles.footerLink} href="/">
                Cars for Sale
              </a>
            </li>
            <li className={styles.footerItem}>
              <a className={styles.footerLink} href="/">
                Auto Export
              </a>
            </li>
            <li className={styles.footerItem}>
              <a className={styles.footerLink} href="/">
                Cargo tracking
              </a>
            </li>
          </ul>
          <ul className={styles.footerNav}>
            <li className={styles.footerItem}>
              <a className={styles.footerLink} href="/">
                General info
              </a>
            </li>
            <li className={styles.footerItem}>
              <a className={styles.footerLink} href="/">
                About Us
              </a>
            </li>
            <li className={styles.footerItem}>
              <a className={styles.footerLink} href="/">
                Contacts
              </a>
            </li>
          </ul>
          <div className={styles.column}>
            <a className={styles.footerItem} href="tel:+49 17634657262">
              +49 17634657262
            </a>
            <a className={styles.footerItem} href="mailto:qz16@designare.biz">
              qz16@designare.biz
            </a>
            <p>Lorem ipsum dolor sit amet,</p>
          </div>
        </div>
      </footer>
    </>
  );
};

SampleNextArrow.propTypes = {
  onClick: PropTypes.func,
  index: PropTypes.number,
};

SamplePrevArrow.propTypes = {
  onClick: PropTypes.func,
  index: PropTypes.number,
};

export default Home;
