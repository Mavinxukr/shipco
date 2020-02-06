import React from 'react';
import GlobalSlider from '../../Slider/Slider';
import styles from './Overview.scss';
import MainLayout from '../../Layout/Global/Global';
import Image from '../../Image/Image';

import { data } from './data';

const Overview = () => (
  <MainLayout>
    <div className={styles.container}>
      <GlobalSlider
        className={styles.containerSlider}
        titleSlider="Popular Vehicles Right Now"
        count={4}
        countXl={2}
        countMd={1}
        amountArrProduct={data.length}
      >
        {data.map(item => (
          <div className={styles.slider} key={item.id}>
            <div>
              <Image className={styles.image} src={item.src} />
            </div>
            <h6 className={styles.titleSlider}>{item.title}</h6>
            <div className={styles.flex}>
              <span>{item.lot}</span>
              <span>
                Current Bid:{' '}
                <span className={styles.title}>{item.current}</span>
              </span>
            </div>
            <div className={styles.flex}>
              <span>{item.location}</span>
              <span className={styles.circle}>e</span>
            </div>
            <div className={styles.bg}>{item.view}</div>
          </div>
        ))}
      </GlobalSlider>
      <GlobalSlider
        className={styles.containerSlider}
        titleSlider="Shipping "
        count={3}
        countXl={2}
        countMd={1}
        amountArrProduct={data.length}
      >
        {data.map(item => (
          <div className={styles.slider} key={item.id}>
            <div>
              <Image className={styles.image} src={item.src} />
            </div>
            <h6 className={styles.titleSlider}>{item.title}</h6>
            <div className={styles.flex}>
              <span>{item.lot}</span>
              <span>
                Current Bid:{' '}
                <span className={styles.title}>{item.current}</span>
              </span>
            </div>
            <div className={styles.flex}>
              <span>{item.location}</span>
              <span className={styles.circle}>e</span>
            </div>
            <div className={styles.bg}>{item.view}</div>
          </div>
        ))}
      </GlobalSlider>
    </div>
  </MainLayout>
);

export default Overview;
