import React from 'react';
import classes from './MenuIndex.scss';
import { ButtonLink } from '../UI/ButtonLink/ButtonLink';
import { data } from './data';
import useTranslation from 'next-translate/useTranslation';

export const MenuIndex = () => {
  const { t } = useTranslation('home');

  return (
    <nav className={classes.menu}>
      <div className={classes.menu_wrapper}>
        {data.map((item, index) => (
          <ButtonLink key={index} path={item.path}>
            {t(item.name).toUpperCase()}
          </ButtonLink>
        ))}
      </div>
    </nav>
  );
};
