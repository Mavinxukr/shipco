import React from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';
import IconRemoveImage from '../../assets/svg/removeImg.svg';
import IconPlus from '../../assets/svg/Plus.svg';
import styles from './Previews.scss';

const Previews = ({ setArrPics, arrPics }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setArrPics(
        [...arrPics, ...acceptedFiles.map(pic => ({ ...pic, preview: URL.createObjectURL(pic) }))],
      );
    },
  });

  const handleRemoveItem = (preview) => {
    setArrPics(arrPics.filter(item => item.preview !== preview));
  };

  const thumbs = arrPics.map(pic => (
    <div className={styles.thumb} key={pic.preview}>
      <div className={styles.thumbInner}>
        <img src={pic.preview} className={styles.img} />
        <button
          type="button"
          className={styles.removeIcon}
          onClick={() => handleRemoveItem(pic.preview)}
        >
          <IconRemoveImage />
        </button>
      </div>
    </div>
  ));

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} type="file" />
        <p className={styles.color}><IconPlus className={styles.icon} />Add Picture</p>
      </div>
      <aside className={styles.thumbsContainer}>{thumbs}</aside>
    </section>
  );
};

Previews.propTypes = {
  setArrPics: PropTypes.func,
  arrPics: PropTypes.arrayOf(PropTypes.object),
};

export default Previews;
