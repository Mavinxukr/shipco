import React, { useContext, useEffect, useState } from "react";
import cx from "classnames";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { getAutoId, updateAutoId } from "../../../redux/actions/autoId";
import MainLayout from "../../Layout/Global/Global";
import {
  autoIdDataSelector,
  autoIdDataReceivedSelector,
  currentUserDataSelector,
} from "../../../utils/selectors";
import SliderTabs from "../../SliderTabs/SliderTabs";
import Button from "../../Button/Button";
import Loader from "../../Loader/Loader";
import Popup from "../../Popup/Popup";
import "../../../public/slick/slick.css";
import styles from "./AutoNew.scss";
import Image from "../../Image/Image";
import InformationBlock from "../../InformationBlock/InformationBlock";
import { damage } from "./data";
import { PopupContext } from "../../../context/PopupContext";
import { AddNoteForm } from "./AddNoteForm";
import { ShippingDamageFrom } from "./ShippingDamageFrom";

const arrTypes = [
  "auction_picture",
  "warehouse_picture",
  "container_picture",
  "car_fax_report",
  "invoice",
  "checklist_report",
  "shipping_damage",
];

const getArr = (items, arr) =>
  items.map((item, index) => {
    const images = arr.filter((itemChild) => itemChild.type === item);
    return {
      id: index + 1,
      title: item,
      images,
    };
  });

const AutoNew = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { setContent, setIsOpen } = useContext(PopupContext);

  const autoId = useSelector(autoIdDataSelector);
  const isDataReceived = useSelector(autoIdDataReceivedSelector);
  const user = useSelector(currentUserDataSelector);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const idAuto = router.query.idAuto;
    dispatch(getAutoId({}, +idAuto));
  }, []);

  useEffect(() => {
    const idAuto = router.query.idAuto;
    dispatch(getAutoId({}, +idAuto));
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  const lotObj = autoId.lot_info;
  const lotArr = Object.keys(lotObj).map((item, index) => ({
    id: index + 1,
    title: item.split("_").join(" "),
    value: lotObj[item],
  }));

  lotArr[0].title = "Lot #  ";
  lotArr[3].title = "Highlights";
  lotArr[4].title = "Primary Damage";
  lotArr[5].title = "Secondary Damage";
  lotArr[6].title = "Est. Retail Value";
  lotArr[7].title = "VIN";

  const shipOgj = autoId.ship_info;
  const shipArr = Object.keys(shipOgj).map((item, index) => ({
    id: index + 1,
    title: item.split("_").join(" "),
    value: shipOgj[item],
  }));

  shipArr[1].title = "Point of loading";
  shipArr[3].title = "Point of delivery";

  shipArr.splice(4, 4);
  shipArr.splice(5, 1);

  if (shipArr[4].value) {
    shipArr[4].value = "Yes";
  } else {
    shipArr[4].value = "No";
  }

  const autoData = getArr(arrTypes, autoId.document);

  const autoAuction = autoData[0].images;
  const autoWerhouse = autoData[1].images;
  const autoContainer = autoData[2].images;
  const autoDamage = autoData[6].images;

  return (
    <MainLayout>
      <div className={styles.container}>
        <h3 className={cx(styles.title, styles.uppercaseTitle)}>
          {autoId.model_name}
        </h3>
        <div className={styles.flex}>
          <div className={styles.sliderWrapper}>
            <SliderTabs
              autoAuction={autoAuction}
              autoWerhouse={autoWerhouse}
              autoContainer={autoContainer}
            />
            <div className={styles.links}>
              <a
                className={cx(
                  styles.link,
                  autoData[3].images.length === 0 && styles.disabled
                )}
                rel="noopener noreferrer"
                href={
                  autoData[3].images.length !== 0
                    ? autoData[3].images[0].link_for_download
                    : "/"
                }
                download
              >
                CarFax report
              </a>
              <a
                className={cx(
                  styles.link,
                  autoData[4].images.length === 0 && styles.disabled
                )}
                rel="noopener noreferrer"
                href={
                  autoData[4].images.length !== 0
                    ? autoData[4].images[0].link_for_download
                    : "/"
                }
                download
              >
                Invoice
              </a>
              <Button
                customBtn={styles.link}
                onClick={() => {
                  if (autoId.client.id === user.id) {
                    setContent(AddNoteForm);
                    setIsOpen(true);
                  }
                }}
              >
                Adding notes
              </Button>
              <a
                className={cx(
                  styles.link,
                  autoData[5].images.length === 0 && styles.disabled
                )}
                rel="noopener noreferrer"
                href={
                  autoData[5].images.length !== 0
                    ? autoData[5].images[0].link_for_download
                    : "/"
                }
                download
              >
                Checklist report
              </a>
            </div>
          </div>
          <div className={cx(styles.fullWidth, styles.flex)}>
            <InformationBlock>
              {lotArr.map((item) => (
                <div className={styles.items} key={`${item.id}${item.value}`}>
                  <span>{item.title}:</span>
                  <span>{item.value}</span>
                </div>
              ))}
            </InformationBlock>
            <InformationBlock>
              <div className={styles.items}>
                <span>Shipping Information</span>
              </div>
              {shipArr.map((item) => (
                <div className={styles.items} key={`${item.id}${item.title}`}>
                  <span>{item.title}:</span>
                  <span className={styles.rightText}>
                    {Array.isArray(item.value) ? (
                      <>
                        {item.value[0]}
                        <br />
                        {item.value[1]}
                      </>
                    ) : (
                      <>{item.value ? item.value : ""}</>
                    )}
                  </span>
                </div>
              ))}
            </InformationBlock>
            <InformationBlock customInformationBlock={styles.widthBlock}>
              {damage.map((item) => (
                <div className={styles.items} key={`${item.id}${item.title}`}>
                  <span>{item.title}</span>
                  <span className={styles.colorText}>
                    {autoId.ship_info.damage_status.replace("_", " ")}
                  </span>
                </div>
              ))}
              <div className={styles.spaceBetween}>
                {autoDamage.map((image, index) => (
                  <Button
                    customBtn={styles.sizeBlock}
                    key={image.id}
                    type="button"
                    onClick={() => {
                      setContent(ShippingDamageFrom, { index });
                      setIsOpen(true);
                    }}
                  >
                    <Image className={styles.image} src={image.link} />
                  </Button>
                ))}
              </div>
            </InformationBlock>
          </div>
        </div>
        <h3 className={styles.title}>Popular Vehicles Right Now</h3>
        <div
          className={cx(styles.flex, styles.popularItems, {
            [styles.index]: isPopupOpen,
          })}
        >
          {autoId.vehicles.map((item) => (
            <div className={styles.popular} key={item.id}>
              <div>
                {item.document ? (
                  <Image className={styles.image} src={item.document.link} />
                ) : (
                  <Image
                    className={styles.image}
                    src="/images/no-preview-available.png"
                  />
                )}
              </div>
              <h6 className={styles.titlePopular}>{item.model_name}</h6>
              <div className={styles.flexPopular}>
                <span>Lot# {item.lot_info.lot_number}</span>
              </div>
              <div className={styles.flexPopular}>
                <span>Location: {item.sale_info.location}</span>
                <span className={styles.circle}>e</span>
              </div>
              <div className={styles.bg}>
                <Link
                  href={{
                    pathname: "/auto/auto-new",
                    query: {
                      idAuto: item.id,
                    },
                  }}
                >
                  <a className={styles.link}>view</a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AutoNew;
