import React, { useState } from "react";
import { useSelector } from "react-redux";
import { autoIdDataSelector } from "../../../utils/selectors";
import ThumbSlider from "../../ThumbSlider/ThumbSlider";
import styles from "./ShippingDamageFrom.scss";
import Image from "../../Image/Image";

const getArr = (items, arr) =>
  items.map((item, index) => {
    const images = arr.filter((itemChild) => itemChild.type === item);
    return {
      id: index + 1,
      title: item,
      images,
    };
  });
const arrTypes = [
  "auction_picture",
  "warehouse_picture",
  "container_picture",
  "car_fax_report",
  "invoice",
  "checklist_report",
  "shipping_damage",
];

export const ShippingDamageFrom = ({ index = 0 }) => {
  const autoId = useSelector(autoIdDataSelector);

  const [openSlide, setOpenSlide] = useState(index);
  const autoData = getArr(arrTypes, autoId.document);

  const autoDamage = autoData[6].images;

  return (
    <ThumbSlider initialSlide={openSlide} customArrow={styles.displayNone}>
      {autoDamage.map((item) => (
        <div key={item.id}>
          <Image className={styles.image} src={item.link} />
        </div>
      ))}
    </ThumbSlider>
  );
};
