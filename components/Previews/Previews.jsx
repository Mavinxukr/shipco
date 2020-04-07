import React from 'react';
import { useDropzone } from 'react-dropzone';
import cx from 'classnames';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import IconRemoveImage from '../../assets/svg/removeImg.svg';
import styles from './Previews.scss';
import { deleteAuto } from '../../redux/actions/auto';
import { deleteParts } from '../../redux/actions/parts';

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
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setNewArrPics([...newArrPics, ...acceptedFiles]);
      setArrPics([
        ...arrPics,
        ...acceptedFiles.map(pic => ({
          ...pic,
          link: URL.createObjectURL(pic),
        })),
      ]);
    },
  });

  const handleRemoveItem = (link) => {
    setArrPics(arrPics.filter(item => item.link || item.image !== link));
  };

  const dispatch = useDispatch();

  const thumbs = [...arrPics].map(pic => (
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
            if (pic.id && pic.link) {
              dispatch(
                deleteAuto(
                  {},
                  {
                    ids: pic.id,
                  },
                  idAuto,
                ),
              );
            }
            if (pic.id && pic.image) {
              dispatch(deleteParts({}, { ids: pic.id }, idAuto, true));
            }
            handleRemoveItem(pic.link || pic.image);
          }}
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
