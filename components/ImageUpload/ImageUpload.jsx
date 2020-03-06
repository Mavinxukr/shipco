import React, { useEffect, useState } from 'react';
import styles from './ImageUpload.scss';
import IconPlus from '../../assets/svg/Plus.svg';

const ImageUpload = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  useEffect(() => {
    if (!selectedFile) {
      setPreview(undefined);
      return;
    }

    const objectUrl = URL.createObjectURL(selectedFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [selectedFile]);

  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setSelectedFile(undefined);
      return;
    }

    setSelectedFile(e.target.files[0]);
  };

  return (
    <div className={styles.changeImage}>
      {selectedFile ? (
        <img className={styles.previewImg} src={preview} alt="face" />
      ) : (
        <img
          className={styles.previewImg}
          src="/images/no-preview-available.png"
          alt="face"
        />
      )}
      <div className={styles.file}>
        <label className={styles.labelFileInput} htmlFor="upload-photo">
          <IconPlus className={styles.iconPlus} /> Add new photo
        </label>
        <input
          className={styles.fileInput}
          type="file"
          multiple
          accept="image/*"
          onChange={onSelectFile}
          id="upload-photo"
        />
      </div>
    </div>
  );
};

export default ImageUpload;
