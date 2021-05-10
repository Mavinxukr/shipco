import React from 'react';
import cx from 'classnames';
import Link from 'next/link';
import classes from './ButtonLink.scss';

export const ButtonLink = ({ path, children, disabled, customClass }) => {
  return (
    <Link href={path}>
      <a className={cx(classes.link, customClass)} disabled={disabled}>
        {children}
      </a>
    </Link>
  );
};
