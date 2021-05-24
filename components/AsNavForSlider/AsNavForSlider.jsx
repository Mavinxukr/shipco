import React, { useState } from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import cx from "classnames";
import Button from "../Button/Button";
import "../../public/slick/slick.css";
import IconArrow from "../../assets/svg/Group (6).svg";
import styles from "./AsNavForSlider.scss";

const SampleNextArrow = ({ onClick }) => (
  <Button type="button" onClick={onClick} className={styles.ArrowR}>
    <IconArrow />
  </Button>
);

const SamplePrevArrow = ({ onClick }) => (
  <Button type="button" onClick={onClick} className={styles.ArrowL}>
    <IconArrow />
  </Button>
);

const AsNavForSlider = ({ sliderImages }) => {
  const [parentSliderRef, setParentSliderRef] = useState(null);
  const [childSliderRef, setChildSliderRef] = useState(null);
  const [index, setIndex] = useState(0);

  const settings = {
    // dots: true,
    infinite: false,
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

  const classNameForButton = cx(styles.widthSlider, {
    [styles.imageWidth]: sliderImages.length < 4,
  });

  return (
    <>
      <h2 className={styles.title}>View Picture</h2>
      <Slider
        className={styles.widthSlider}
        asNavFor={childSliderRef}
        arrows={false}
        ref={(slider) => setParentSliderRef(slider)}
      >
        {sliderImages.map((item) => (
          <div className={styles.parentSlider} key={item.id}>
            <img src={item.image} alt="" />
          </div>
        ))}
      </Slider>
      <Slider
        asNavFor={parentSliderRef}
        ref={(slider) => setChildSliderRef(slider)}
        slidesToShow={4}
        swipeToSlide
        focusOnSelect
        {...settings}
        className={classNameForButton}
      >
        {sliderImages.map((item) => (
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
