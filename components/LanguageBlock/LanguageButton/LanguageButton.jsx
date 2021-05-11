import React from 'react';
import cx from 'classnames';
import setLanguage from 'next-translate/setLanguage';
import classes from './LanguageButton.scss';
export const LanguageButton = ({ l, active }) => {
  return (
    <button
      className={cx(classes.button, {
        [classes.active]: active,
      })}
      onClick={async () => await setLanguage(l)}
    >
      {l
        .split('')
        .map((char, index) => (index === 0 ? char.toUpperCase() : char))
        .join('')}
    </button>
  );
};
