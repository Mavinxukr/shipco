import React, { useState } from 'react';
import cx from 'classnames';
import MainLayout from '../../Layout/Global/Global';
import SliderTabs from '../../SliderTabs/SliderTabs';
import Button from '../../Button/Button';
import Popup from '../../Popup/Popup';
import ThumbSlider from '../../ThumbSlider/ThumbSlider';
import '../../../public/slick/slick.css';
import styles from './AutoNew.scss';
import Image from '../../Image/Image';
import InformationBlock from '../../InformationBlock/InformationBlock';
import {
  lot, shipping, data, damage, images,
} from './data';

const AutoNew = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [openSlide, setOpenSlide] = useState(0);

  return (
    <MainLayout>
      <div className={styles.container}>
        <h3 className={cx(styles.title, styles.uppercaseTitle)}>
          2013 VOLKSWAGEN JETTA HYBRID
        </h3>
        <div className={styles.flex}>
          <div>
            <SliderTabs />
            <div className={styles.links}>
              <a className={styles.link} href="/">CarFax report</a>
              <a className={styles.link} href="/">Invoice</a>
              <a className={styles.link} href="/">Adding notes</a>
              <a className={styles.link} href="/">Checklist report</a>
            </div>
          </div>
          <div className={cx(styles.fullWidth, styles.flex)}>
            <InformationBlock>
              {lot.map(item => (
                <div className={styles.items} key={`${item.id}${item.title}`}>
                  <span>{item.title}</span>
                  <span>{item.text}</span>
                </div>
              ))}
            </InformationBlock>
            <InformationBlock>
              {shipping.map(item => (
                <div className={styles.items} key={`${item.id}${item.title}`}>
                  <span>{item.title}</span>
                  <span className={styles.rightText}>
                    {item.text}
                    <br />
                    {item.date}
                  </span>
                </div>
              ))}
            </InformationBlock>
            <InformationBlock customInformationBlock={styles.widthBlock}>
              {damage.map(item => (
                <div className={styles.items} key={`${item.id}${item.title}`}>
                  <span>{item.title}</span>
                  <span className={styles.colorText}>{item.text}</span>
                </div>
              ))}
              <div className={styles.spaceBetween}>
                {images.map((image, index) => (
                  <Button
                    customBtn={styles.sizeBlock}
                    key={image.id}
                    type="button"
                    onClick={() => {
                      setIsPopupOpen(true);
                      setOpenSlide(index);
                    }}
                  >
                    <Image className={styles.image} src={image.src} />
                  </Button>
                ))}
              </div>
            </InformationBlock>
          </div>
          {isPopupOpen && (
            <Popup
              customPopup={styles.popupDamage}
              title="Shipping Damage"
              setIsPopupOpen={setIsPopupOpen}
            >
              <ThumbSlider
                initialSlide={openSlide}
                customArrow={styles.displayNone}
              >
                {images.map(item => (
                  <div key={item.id}>
                    <Image className={styles.image} src={item.src} />
                  </div>
                ))}
              </ThumbSlider>
            </Popup>
          )}
        </div>
        <h3 className={styles.title}>Popular Vehicles Right Now</h3>
        <div className={cx(styles.flex, styles.popularItems)}>
          {data.map(item => (
            <div className={styles.popular} key={item.id}>
              <div>
                <Image className={styles.image} src={item.src} />
              </div>
              <h6 className={styles.titlePopular}>{item.title}</h6>
              <div className={styles.flexPopular}>
                <span>{item.lot}</span>
                <span>
                  Current Bid:{' '}
                  <span className={styles.title}>{item.current}</span>
                </span>
              </div>
              <div className={styles.flexPopular}>
                <span>{item.location}</span>
                <span className={styles.circle}>e</span>
              </div>
              <div className={styles.bg}>{item.view}</div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AutoNew;
