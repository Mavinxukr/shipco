import React from 'react';
import useTranslation from 'next-translate/useTranslation';
import { LanguageButton } from './LanguageButton/LanguageButton';
import i18nConfig from '../../i18n.json';
import classes from './LanguageBlock.scss';

const { locales } = i18nConfig;

export const LanguageBlock = () => {
  const { lang } = useTranslation();

  return (
    <div className={classes.language}>
      <div className={classes.language_wrapper}>
        {locales.map((lng) => {
          const active = lng === lang;

          return <LanguageButton l={lng} active={active} />;
        })}
      </div>
    </div>
  );
};
