import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import IconArrow from '../../assets/svg/Group (6).svg';
import '../../public/slick/slick.css';
import styles from './Slider.scss';

const GlobalSlider = ({
  className,
  count,
  countXl,
  countMd,
  children,
  amountArrProduct,
  titleSlider,
}) => {
  const [index, setIndex] = useState(0);

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: count,
    slidesToScroll: 1,
    beforeChange: (param, param2) => setIndex(param2),
    nextArrow: (
      <SampleNextArrow
        className={styles.ArrowR}
        index={index}
        amountArrProduct={amountArrProduct}
        counts={{ count, countXl, countMd }}
      />
    ),
    prevArrow: <SamplePrevArrow className={styles.ArrowL} index={index} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: countXl,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: countMd,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      <h4 className={styles.sliderTitle}>{titleSlider}</h4>
      <Slider {...settings}>{children}</Slider>
    </div>
  );
};

const SampleNextArrow = ({
  onClick, index, amountArrProduct, counts,
}) => {
  const [endCount, setEndCount] = useState(0);

  useEffect(() => {
    if (window.innerWidth > 1024) {
      setEndCount(amountArrProduct - counts.count);
    }
    if (window.innerWidth > 600 && window.innerWidth <= 1024) {
      setEndCount(amountArrProduct - counts.countXl);
    }
    if (window.innerWidth <= 600) {
      setEndCount(amountArrProduct - counts.countMd);
    }
  }, []);

  return (
    <button
      type="button"
      disabled={index === endCount}
      className={styles.ArrowR}
      onClick={onClick}
    >
      <IconArrow />
    </button>
  );
};

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

GlobalSlider.propTypes = {
  className: PropTypes.string,
  count: PropTypes.number,
  countXl: PropTypes.number,
  countMd: PropTypes.number,
  children: PropTypes.node,
  amountArrProduct: PropTypes.number,
  titleSlider: PropTypes.string,
};

SampleNextArrow.propTypes = {
  onClick: PropTypes.func,
  index: PropTypes.number,
  amountArrProduct: PropTypes.number,
  counts: PropTypes.object,
};

SamplePrevArrow.propTypes = {
  onClick: PropTypes.func,
  index: PropTypes.number,
};

export default GlobalSlider;
