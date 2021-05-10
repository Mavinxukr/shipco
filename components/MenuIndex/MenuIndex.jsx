import React from 'react';
import classes from './MenuIndex.scss';
import { ButtonLink } from '../UI/ButtonLink/ButtonLink';
import { data } from './data';
export const MenuIndex = () => {
  return (
    <nav className={classes.menu}>
      <div className={classes.menu_wrapper}>
        {data.map((item, index) => (
          <ButtonLink key={index} path={item.path}>
            {item.name}
          </ButtonLink>
        ))}
      </div>
    </nav>
  );
};
