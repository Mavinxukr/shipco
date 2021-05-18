import React, { useState, useEffect } from "react";
import cx from "classnames";
import PropTypes from "prop-types";
import "../../../public/slick/slick.css";
import Slider from "react-slick";
import GoogleMapReact from "google-map-react";
import Image from "../../Image/Image";
// import ProductCard from '../../ProductCard/ProductCard';
import { sliderData } from "./data";
import { useSession } from "next-auth/client";

import IconQuotes from "../../../assets/svg/quotes.svg";
import IconFb from "../../../assets/svg/Vector(1).svg";
import IconIn from "../../../assets/svg/Group.svg";
import IckonTw from "../../../assets/svg/Vector.svg";
import IconYoutube from "../../../assets/svg/Vector(2).svg";
import IconArrow from "../../../assets/svg/Group (6).svg";
import styles from "./Home.scss";
import { IndexHeader } from "../../IndexHeader/IndexHeader";
import Loader from "../../Loader/Loader";
import useTranslation from "next-translate/useTranslation";
import ProductCard from "../../ProductCard/ProductCard";

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
  const [session, loading] = useSession();
  const [email, setEmail] = useState("");
  const { t, lang } = useTranslation("home");

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

  const subscribeHandle = (e) => {
    console.log(e);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <IndexHeader></IndexHeader>
      <main>
        <div className={styles.container}>
          <h2 className={styles.infoTitle}>{t("ourFeatures")}</h2>
          <p className={styles.infoText}>
            Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
            nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat
            volutpat. Ut wisi enim ad minim veniam, quis nostrud exerci tation.
          </p>
          <div className={styles.infoBlock}>
            <div className={styles.infoBlockItem}>
              <Image src="/images/icon_1.png" alt="" />
              <p className={styles.infoBlockItemTitle}>
                {t("bestDealsAndPrices")}
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
                {t("efficiencyAndQuality")}
              </p>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </p>
            </div>
            <div className={styles.infoBlockItem}>
              <Image src="/images/icon_3.png" alt="" />
              <p className={styles.infoBlockItemTitle}>{t("security")}</p>
              <p>
                Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
                diam nonummy nibh euismod tincidunt ut laoreet dolore magna
                aliquam erat volutpat.
              </p>
            </div>
          </div>
        </div>
        <div className={styles.cars}>
          <div className={styles.container}>
            <h2 className={styles.carsTitle}>Cars</h2>
            <div className={styles.carsItems}>
              {/* {data.map((item) => ( */}
              <ProductCard
                item={{
                  src: "https://front-shipko.mavinx.com/images/bmw.png",
                  title: "ads",
                  road: "qqq",
                  petrol: "sda",
                  year: "1111",
                }}
              />
              <ProductCard
                item={{
                  src: "https://front-shipko.mavinx.com/images/bmw.png",
                  title: "ads",
                  road: "qqq",
                  petrol: "sda",
                  year: "1111",
                }}
              />
              <ProductCard
                item={{
                  src: "https://front-shipko.mavinx.com/images/bmw.png",
                  title: "ads",
                  road: "qqq",
                  petrol: "sda",
                  year: "1111",
                }}
              />
              <ProductCard
                item={{
                  src: "https://front-shipko.mavinx.com/images/bmw.png",
                  title: "ads",
                  road: "qqq",
                  petrol: "sda",
                  year: "1111",
                }}
              />
              {/* ))} */}
            </div>
          </div>
        </div>
        <div className={cx(styles.container, styles.mediaWidth)}>
          <h2 className={styles.testimonialsTitle}>
            <IconQuotes className={styles.testimonialsIcon} />
            {t("testimonials")}
          </h2>
          <Slider className={styles.sliderContainer} {...settings}>
            {sliderData.map((item) => (
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
          <h2 className={styles.contactTitle}> {t("contactUs")}</h2>
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
                key: "AIzaSyDb8D7DDVkbXbN03KeDk0TFmBpK24NcQjg",
              }}
              defaultCenter={{
                lat: 59.955413,
                lng: 30.337844,
              }}
              defaultZoom={13}
            />
          </div>
        </div>
      </main>

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
                {t("carsForSale")}
              </a>
            </li>
            <li className={styles.footerItem}>
              <a className={styles.footerLink} href="/">
                {t("autoExport")}
              </a>
            </li>
            <li className={styles.footerItem}>
              <a className={styles.footerLink} href="/">
                {t("cargoTracking")}
              </a>
            </li>
          </ul>
          <ul className={styles.footerNav}>
            <li className={styles.footerItem}>
              <a className={styles.footerLink} href="/">
                {t("genetalInfo")}
              </a>
            </li>
            <li className={styles.footerItem}>
              <a className={styles.footerLink} href="/">
                {t("aboutUs")}
              </a>
            </li>
            <li className={styles.footerItem}>
              <a className={styles.footerLink} href="/">
                {t("contacts")}
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
          <div className={styles.footer_subscribe}>
            <h4 className={styles.footer_subscribe__title}>
              Subscribe to our newsletter
            </h4>
            <form
              onSubmit={(ev) => {
                ev.preventDefault();
                subscribeHandle(email);
              }}
              className={styles.footer_subscribe__form}
            >
              <input
                className={styles.footer_subscribe__input}
                type="email"
                placeholder="Your Email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
              />
              <button type="submit" className={styles.footer_subscribe__button}>
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 47 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 40L47 20L0 0V15.5556L33.5714 20L0 24.4444V40Z"
                    fill="#fff"
                  />
                </svg>
              </button>
            </form>
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
