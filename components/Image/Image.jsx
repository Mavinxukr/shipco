import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Image.scss';

const Image = ({
  src, alt, classNameWrapper, circle, ...attrs
}) => {
  const classes = cx(classNameWrapper, {
    [styles.circle]: circle,
  });

  return <img src={src} alt={alt} className={classes} {...attrs} />;
};

Image.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  classNameWrapper: PropTypes.string,
  circle: PropTypes.bool,
};

export default Image;
