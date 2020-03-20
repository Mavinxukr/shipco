import React from 'react';
import { useDispatch } from 'react-redux';
import ReactPaginate from 'react-paginate';
import Button from '../Button/Button';
import SelectCustom from '../SelectCustom/SelectCustom';
import styles from './Pagination.scss';
import { pagination } from './data';

const Pagination = ({
  params, action, countPagination, initialPage, setInitialPage,
}) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.pagination}>
      <div className={styles.paginationFlex}>
        <span>Show</span>
        <SelectCustom
          classNameWrapper={styles.widthSelect}
          defaultInputValue={countPagination === '10' ? '' : countPagination}
          options={pagination}
          placeholder={countPagination === '10' ? '10' : countPagination}
          custonOnChange={e => dispatch(action({ countpage: e.label }))}
        />
        <span>entries</span>
      </div>
      <div className={styles.paginationFlex}>
        <span className={styles.margitRight}>Showing {params.from} to {params.to} of {params.total} entries</span>
        <div className={styles.paginationFlex}>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => {
              setInitialPage(0);
              dispatch(action({ page: 1 }));
            }}
          >
            First
          </Button>
          <ReactPaginate
            previousLabel="Previous"
            nextLabel="Next"
            breakLabel="..."
            breakClassName={styles.paginationBtn}
            pageCount={params.last_page}
            pageRangeDisplayed={5}
            forcePage={initialPage}
            onPageChange={data => dispatch(action({ page: data.selected + 1 }))}
            containerClassName={styles.paginationBtns}
            previousClassName={styles.paginationBtn}
            nextClassName={styles.paginationBtn}
            activeClassName={styles.active}
          />
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => {
              setInitialPage(params.last_page - 1);
              dispatch(action({ page: params.last_page }));
            }}
          >
            Last
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
