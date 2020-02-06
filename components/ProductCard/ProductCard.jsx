import React from 'react';
import PropTypes from 'prop-types';
import styles from './ProductCard.scss';
import Image from '../Image/Image';
import IconRoad from '../../assets/svg/road.svg';
import IconPetrol from '../../assets/svg/petrol.svg';
import IconYear from '../../assets/svg/year.svg';

const ProductCard = ({ item }) => (
  <article className={styles.carsItem}>
    <Image className={styles.carsImage} src={item.src} alt={item.title} />
    <h4 className={styles.carsName}>{item.title}</h4>
    <div className={styles.carsItemInfo}>
      <div className={styles.flex}>
        <IconRoad className={styles.carsIcon} />
        <span className={styles.textColor}>{item.road}</span>
      </div>
      <div className={styles.flex}>
        <IconPetrol className={styles.carsIcon} />
        <span className={styles.textColor}>{item.petrol}</span>
      </div>
      <div className={styles.flex}>
        <IconYear className={styles.carsIcon} />
        <span className={styles.textColor}>{item.year}</span>
      </div>
    </div>
  </article>
);

ProductCard.propTypes = {
  item: PropTypes.shape({
    src: PropTypes.string,
    title: PropTypes.string,
    road: PropTypes.string,
    petrol: PropTypes.string,
    year: PropTypes.string,
  }),
};

export default ProductCard;
