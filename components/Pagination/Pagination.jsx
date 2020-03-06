import React from 'react';
import cx from 'classnames';
import Button from '../Button/Button';
import SelectCustom from '../SelectCustom/SelectCustom';
import styles from './Pagination.scss';
import { pagination } from './data';

const Pagination = () => (
  <div className={styles.pagination}>
    <div className={styles.paginationFlex}>
      <span>Show</span>
      <SelectCustom
        classNameWrapper={styles.widthSelect}
        placeholder="10"
        options={pagination}
      />
      <span>entries</span>
    </div>
    <div>
      <span>Showing 1 to 20 of 4,260 entries</span>{' '}
      <Button customBtn={styles.paginationBtn}>First</Button>
      <Button customBtn={styles.paginationBtn}>Previous</Button>
      <Button customBtn={cx(styles.paginationBtn, styles.active)}>1</Button>
      <Button customBtn={styles.paginationBtn}>2</Button>
      <Button customBtn={styles.paginationBtn}>3</Button>
      <Button customBtn={styles.paginationBtn}>4</Button>
      <Button customBtn={styles.paginationBtn}>5</Button>
      <Button customBtn={styles.paginationBtn}>...</Button>
      <Button customBtn={styles.paginationBtn}>Next</Button>
      <Button customBtn={styles.paginationBtn}>Last</Button>
    </div>
  </div>
);

export default Pagination;
