import React from 'react';
import Input from '../Input/Input';
import IconSearch from '../../assets/svg/search.svg';
import Button from '../Button/Button';
import styles from './Search.scss';

const Search = () => (
  <div className={styles.search}>
    <Input
      customInput={styles.inputHeight}
      classNameWrapperForIcon={styles.searchIcon}
      icon={<IconSearch />}
    />
    <Button type="button" customBtn={styles.customBtnSearch}>
      Search
    </Button>
  </div>
);

export default Search;
