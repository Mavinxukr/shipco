import React from 'react';
import MainLayout from '../../Layout/Global/Global';
import cx from 'classnames';
import styles from './AutoNew.scss';
import { data } from './data';
import Image from '../../Image/Image';

const AutoNew = () => (
  <MainLayout>
    <div className={styles.container}>
      <h3 className={styles.title}>Popular Vehicles Right Now</h3>
      <div className={cx(styles.flex, styles.popularItems)}>
        <>
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
        </>
      </div>
    </div>
  </MainLayout>
);

export default AutoNew;
