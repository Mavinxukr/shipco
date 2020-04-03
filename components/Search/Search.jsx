import React from 'react';
import Input from '../Input/Input';
import IconSearch from '../../assets/svg/search.svg';
import Button from '../Button/Button';
import styles from './Search.scss';

const Search = ({ onClick }) => (
  <div className={styles.search}>
    <Input
      customInput={styles.inputHeight}
      classNameWrapperForIcon={styles.searchIcon}
      icon={<IconSearch />}
      id="search"
    />
    <Button type="button" onClick={onClick} customBtn={styles.customBtnSearch}>
      Search
    </Button>
  </div>
);

export default Search;
