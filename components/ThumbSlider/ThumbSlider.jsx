import React, { useState } from 'react';
import Slider from 'react-slick';
import cx from 'classnames';
import PropTypes from 'prop-types';
import IconArrow from '../../assets/svg/Group (6).svg';
import styles from '../SliderTabs/SliderTabs.scss';

const SampleNextArrow = ({ onClick, index, lastIndex }) => (
  <button
    type="button"
    className={styles.ArrowR}
    disabled={index === lastIndex}
    onClick={onClick}
  >
    <IconArrow />
  </button>
);

const SamplePrevArrow = ({ onClick, index }) => (
  <button
    type="button"
    className={styles.ArrowL}
    disabled={index === 0}
    onClick={onClick}
  >
    <IconArrow />
  </button>
);

const ThumbSlider = ({ children, customArrow, initialSlide }) => {
  const [index, setIndex] = useState(0);

  const settings = {
    customPaging(i) {
      return (
        <a>
          <img src={children[i].props.children.props.src} alt="alt" />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: false,
    initialSlide: `${initialSlide}`,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (param, param2) => setIndex(param2),
    nextArrow: (
      <SampleNextArrow
        lastIndex={children.length - 1}
        className={styles.ArrowR}
        index={index}
      />
    ),
    prevArrow: <SamplePrevArrow className={styles.ArrowL} index={index} />,
  };

  return (
    <Slider className={cx(styles.customSlider, customArrow)} {...settings}>
      {children}
    </Slider>
  );
};

ThumbSlider.propTypes = {
  children: PropTypes.node,
  customArrow: PropTypes.string,
  initialSlide: PropTypes.number,
};

SampleNextArrow.propTypes = {
  onClick: PropTypes.func,
  lastIndex: PropTypes.number,
  index: PropTypes.number,
};

SamplePrevArrow.propTypes = {
  onClick: PropTypes.func,
  index: PropTypes.number,
};

export default ThumbSlider;
