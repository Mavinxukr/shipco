import React from 'react';
import Input from '../Input/Input';
import IconSearch from '../../assets/svg/search.svg';
import Button from '../Button/Button';
import styles from './Search.scss';
import useTranslation from 'next-translate/useTranslation';

const Search = ({ onClick }) => {
  const { t } = useTranslation('dismanting');

  return (
  <div className={styles.search}>
    <Input
      customInput={styles.inputHeight}
      classNameWrapperForIcon={styles.searchIcon}
      icon={<IconSearch />}
      id="search"
    />
    <Button type="button" onClick={onClick} customBtn={styles.customBtnSearch}>
      {t('Search')}
    </Button>
  </div>
)};

export default Search;
