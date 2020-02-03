import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.scss';

const Button = ({
  children,
  buttonType,
  classNameWrapper,
  viewType,
  buttonTitle,
}) => {
  const classNameForButton = cx(styles.button, {
    [styles.collapseButton]: viewType === 'sliderButton',
    [styles.openButton]: viewType === 'openButton',
  });

  return (
    <button
      type={buttonType}
      className={cx(classNameForButton, classNameWrapper)}
    >
      {children}
      {buttonTitle}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  buttonType: PropTypes.string,
  classNameWrapper: PropTypes.string,
  viewType: PropTypes.oneOf(['sliderButton', 'openButton']),
  buttonTitle: PropTypes.string,
};

export default Button;
