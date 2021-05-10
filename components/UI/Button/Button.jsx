import React from 'react';
import classes from './Button.scss';

export const Button = ({ disabled, event, children }) => {
  return (
    <button className={classes.button} disabled={disabled} onClick={event}>
      {children}
    </button>
  );
};
