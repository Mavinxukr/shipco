import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import Button from '../Button/Button';
import '../../public/slick/slick.css';
import IconArrow from '../../assets/svg/Group (6).svg';
import styles from './AsNavForSlider.scss';

const SampleNextArrow = ({ onClick, index, sliderImages }) => (
  <Button
    type="button"
    onClick={onClick}
    className={styles.ArrowR}
    disabled={index === sliderImages - 1}
  >
    <IconArrow />
  </Button>
);

const SamplePrevArrow = ({ onClick, index }) => (
  <Button
    type="button"
    disabled={index === 0}
    onClick={onClick}
    className={styles.ArrowL}
  >
    <IconArrow />
  </Button>
);

const AsNavForSlider = ({ sliderImages }) => {
  const [parentSliderRef, setParentSliderRef] = useState(null);
  const [childSliderRef, setChildSliderRef] = useState(null);
  const [index, setIndex] = useState(0);

  const settings = {
    // dots: true,
    beforeChange: (param, param2) => setIndex(param2),
    nextArrow: (
      <SampleNextArrow
        sliderImages={sliderImages.length}
        index={index}
        className={styles.ArrowR}
      />
    ),
    prevArrow: <SamplePrevArrow index={index} className={styles.ArrowL} />,
  };

  return (
    <>
      <Slider
        className={styles.widthSlider}
        asNavFor={childSliderRef}
        arrows={false}
        ref={slider => setParentSliderRef(slider)}
      >
        {sliderImages.map(item => (
          <div className={styles.parentSlider} key={item.id}>
            <img src={item.image} alt="" />
          </div>
        ))}
      </Slider>
      <Slider
        asNavFor={parentSliderRef}
        ref={slider => setChildSliderRef(slider)}
        slidesToShow={4}
        swipeToSlide
        focusOnSelect
        {...settings}
        className={styles.widthSlider}
      >
        {sliderImages.map(item => (
          <div className={styles.asNavFOr} key={item.id}>
            <img src={item.image} alt="" />
          </div>
        ))}
      </Slider>
    </>
  );
};

AsNavForSlider.propTypes = {
  sliderImages: PropTypes.array,
};

export default AsNavForSlider;
