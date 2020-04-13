import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import styles from './Button.scss';

const Button = ({
  children,
  type,
  onClick,
  customBtn,
  disabled,
  active,
  id,
  ...attrs
}) => {
  const onClickAction = (e) => {
    if (disabled) {
      e.preventDefault();
    } else {
      return onClick(e);
    }
  };

  const Tag = attrs.href ? 'a' : 'button';

  return (
    <>
      {active ? (
        <Tag
          className={cx(styles.btn, customBtn, styles.active)}
          type={type}
          id={id}
          disabled={disabled}
          onClick={onClickAction}
          {...attrs}
        >
          {children}
        </Tag>
      ) : (
        <Tag
          className={cx(styles.btn, customBtn)}
          type={type}
          id={id}
          disabled={disabled}
          onClick={onClickAction}
          {...attrs}
        >
          {children}
        </Tag>
      )}
    </>
  );
};

Button.propTypes = {
  customBtn: PropTypes.string,
  children: PropTypes.node,
  type: PropTypes.string,
  id: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  active: PropTypes.bool,
  attrs: PropTypes.node,
};

Button.defaultProps = {
  onClick: () => {},
};

export default Button;
