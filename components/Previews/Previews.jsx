import React from "react";
import { useDropzone } from "react-dropzone";
import cx from "classnames";
import { useDispatch } from "react-redux";
import PropTypes from "prop-types";
import IconRemoveImage from "../../assets/svg/removeImg.svg";
import styles from "./Previews.scss";
import { deleteAuto } from "../../redux/actions/auto";
import { deleteParts } from "../../redux/actions/parts";

const filterExistPics = (arrMain, arrPics) =>
  arrMain.filter((item) =>
    arrPics.every((itemChild) => itemChild.path !== item.path)
  );

const Previews = ({
  setArrPics,
  setNewArrPics,
  newArrPics,
  arrPics,
  customTumd,
  icon,
  title,
  custom,
  customText,
  customIconBlock,
  customThumbs,
  idAuto,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*",
    onDrop: (acceptedFiles) => {
      setNewArrPics([
        ...newArrPics,
        ...filterExistPics(acceptedFiles, newArrPics),
      ]);
      setArrPics([
        ...arrPics,
        ...filterExistPics(
          acceptedFiles.map((pic) => ({
            ...pic,
            link: URL.createObjectURL(pic),
          })),
          arrPics
        ),
      ]);
    },
  });

  const handleRemoveItem = (pic) => {
    setArrPics(
      arrPics.filter(
        (item) => item.link !== pic.link || item.image !== pic.image
      )
    );
    setNewArrPics(newArrPics.filter((item) => item.path !== pic.path));
  };

  const dispatch = useDispatch();

  const thumbs = [...arrPics].map((pic) => (
    <div className={styles.thumb} key={pic.link || pic.image}>
      <div className={styles.thumbInner}>
        <img
          id={pic.id}
          src={pic.link || pic.image}
          className={styles.img}
          alt={pic.link || pic.image}
        />
        <button
          type="button"
          className={styles.removeIcon}
          onClick={() => {
            handleRemoveItem(pic);
            if (pic.id && pic.link) {
              dispatch(
                deleteAuto(
                  {},
                  {
                    ids: pic.id,
                  },
                  idAuto
                )
              );
            }
            if (pic.id && pic.image) {
              dispatch(deleteParts({}, { ids: pic.id }, idAuto, true));
            }
          }}
        >
          <IconRemoveImage />
        </button>
      </div>
    </div>
  ));

  return (
    <section className={cx("container", customTumd)}>
      <div
        style={{ outline: "none" }}
        className={custom}
        {...getRootProps({ className: "dropzone" })}
      >
        <input {...getInputProps()} type="file" />
        <div className={cx(styles.color, customText)}>
          <p className={styles.title}>{title}</p>
          {icon && <div className={customIconBlock}>{icon}</div>}
        </div>
      </div>
      <aside className={cx(styles.thumbsContainer, customThumbs)}>
        {thumbs}
      </aside>
    </section>
  );
};

Previews.propTypes = {
  setArrPics: PropTypes.func,
  newArrPics: PropTypes.array,
  arrPics: PropTypes.arrayOf(PropTypes.object),
  setNewArrPics: PropTypes.func,
  newarrPics: PropTypes.arrayOf(PropTypes.object),
  customTumd: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  custom: PropTypes.string,
  customText: PropTypes.string,
  customIconBlock: PropTypes.string,
  customThumbs: PropTypes.string,
  type: PropTypes.string,
  idAuto: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Previews;
