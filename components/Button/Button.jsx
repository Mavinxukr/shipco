import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Button.scss';

const Button = ({
  children,
  type,
  onClick,
  className,
  disabled,
  active,
  ...attrs
}) => {
  const onClickAction = (e) => {
    if (disabled) {
      e.preventDefault();
    } else {
      return onClick(e);
    }
  };

  const classes = classNames(styles.btn, className, { active });

  const Tag = attrs.href ? 'a' : 'button';

  return (
    <Tag
      className={classes}
      type={type}
      disabled={disabled}
      onClick={onClickAction}
      {...attrs}
    >
      {children}
    </Tag>
  );
};

Button.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  onClick: PropTypes.func,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
};

export default Button;
