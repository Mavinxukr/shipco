import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import IconRemoveImage from '../../assets/svg/removeImg.svg';
import IconPlus from '../../assets/svg/Plus.svg';
import styles from './Previews.scss';

const Previews = () => {
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: 'image/*',
    onDrop: (acceptedFiles) => {
      setFiles(
        [...files, ...acceptedFiles.map(file => ({ ...file, preview: URL.createObjectURL(file) }))],
      );
    },
  });

  const handleRemoveItem = (preview) => {
    setFiles(files.filter(item => item.preview !== preview));
  };

  const thumbs = files.map(file => (
    <div className={styles.thumb} key={file.preview}>
      <div className={styles.thumbInner}>
        <img src={file.preview} className={styles.img} />
        <button
          type="button"
          className={styles.removeIcon}
          onClick={() => handleRemoveItem(file.preview)}
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

export default Previews;
