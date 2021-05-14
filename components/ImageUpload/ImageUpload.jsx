import React from "react";
import _ from "lodash";
import cx from "classnames";
import styles from "./ImageUpload.scss";
import IconPlus from "../../assets/svg/Plus.svg";
import IconSuccess from "../../assets/svg/Dec.svg";
import useTranslation from "next-translate/useTranslation";

const ImageUpload = ({ image, setImage, baseClient, customImageUpload }) => {
  const { t } = useTranslation("profile");

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    setImage(e.target.files[0]);
  };

  return (
    <>
      {baseClient ? (
        <div className={styles.flex}>
          <p className={styles.label}>{t("AddIDphoto")}</p>
          <label
            className={styles.labelFileInputNoPreview}
            htmlFor="upload-photo"
          >
            {document.querySelector("#upload-photo") &&
            document.querySelector("#upload-photo").value === "" ? (
              <IconPlus className={styles.iconPlus} />
            ) : (
              <IconSuccess className={styles.iconPlus} />
            )}
          </label>
          <input
            className={styles.fileInput}
            type="file"
            accept="image/*"
            onChange={onSelectFile}
            id="upload-photo"
          />
        </div>
      ) : (
        <div className={cx(styles.changeImage, customImageUpload)}>
          <img
            className={styles.previewImg}
            src={(_.isObject(image) && URL.createObjectURL(image)) || image}
            alt="face"
          />
          <div className={styles.file}>
            <label className={styles.labelFileInput} htmlFor="upload-photo">
              <IconPlus className={styles.iconPlus} /> {t("addNewPhoto")}
            </label>
            <input
              className={styles.fileInput}
              type="file"
              accept="image/*"
              onChange={onSelectFile}
              id="upload-photo"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ImageUpload;
