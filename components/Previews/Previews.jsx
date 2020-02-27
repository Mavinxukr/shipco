import React from 'react';
import { useDropzone } from 'react-dropzone';
import cx from 'classnames';
import PropTypes from 'prop-types';
import IconRemoveImage from '../../assets/svg/removeImg.svg';
import styles from './Previews.scss';

const Previews = ({
  setArrPics,
  arrPics,
  customTumd,
  icon,
  title,
  custom,
  customText,
  customIconBlock,
  customThumbs,
}) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setArrPics([
        ...arrPics,
        ...acceptedFiles.map(pic => ({
          ...pic,
          preview: URL.createObjectURL(pic),
        })),
      ]);
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
    <section className={cx('container', customTumd)}>
      <div
        style={{ outline: 'none' }}
        className={custom}
        {...getRootProps({ className: 'dropzone' })}
      >
        <input {...getInputProps()} type="file" />
        <div className={cx(styles.color, customText)}>
          {icon && <div className={customIconBlock}>{icon}</div>}
          <>{title}</>
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
  arrPics: PropTypes.arrayOf(PropTypes.object),
  customTumd: PropTypes.string,
  icon: PropTypes.node,
  title: PropTypes.string,
  custom: PropTypes.string,
  customText: PropTypes.string,
  customIconBlock: PropTypes.string,
  customThumbs: PropTypes.string,
};

export default Previews;
