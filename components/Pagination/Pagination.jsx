import React from 'react';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import Button from '../Button/Button';
import SelectCustom from '../SelectCustom/SelectCustom';
import styles from './Pagination.scss';
import { pagination } from './data';
import useTranslation from 'next-translate/useTranslation';

const Pagination = ({
  params,
  router,
  pathname,
}) => {
  const { t } = useTranslation('pagination');

  return (
  <div className={styles.pagination}>
    <div className={styles.paginationFlex}>
      <span>{t('show')}</span>
      <SelectCustom
        classNameWrapper={styles.widthSelect}
        options={pagination}
        placeholder={router.query.countpage || '10'}
        custonOnChange={(value) => {
          router.push({
            pathname,
            query: {
              ...router.query,
              page: 1,
              countpage: value.value,
            },
          });
        }}
      />
      <span>{t('entries')}</span>
    </div>
    <div className={styles.paginationFlex}>
      <span className={styles.margitRight}>
      {t('showing')} {params.from}  {t('to')}  {params.to} {t('of')}  {params.total} {t('entries')} 
      </span>
      <div className={styles.paginationFlex}>
        <Button
          customBtn={styles.paginationBtn}
          onClick={() => {
            router.push({
              pathname,
              query: {
                ...router.query,
                page: 1,
                countpage: router.query.countpage || '10',
              },
            });
          }}
        >
            {t('first')}
        </Button>
        <ReactPaginate
          previousLabel={t('previous')}

          nextLabel={t('next')}
          breakLabel="..."
          breakClassName={styles.paginationBtn}
          pageCount={params.last_page}
          pageRangeDisplayed={5}
          forcePage={params.current_page - 1}
          onPageChange={(data) => {
            router.push({
              pathname,
              query: {
                ...router.query,
                page: data.selected + 1,
                countpage: router.query.countpage || '10',
              },
            });
          }}
          containerClassName={styles.paginationBtns}
          previousClassName={styles.paginationBtn}
          nextClassName={styles.paginationBtn}
          activeClassName={styles.active}
        />
        <Button
          customBtn={styles.paginationBtn}
          onClick={() => {
            router.push({
              pathname,
              query: {
                ...router.query,
                page: params.last_page,
                countpage: router.query.countpage || '10',
              },
            });
          }}
        >
           {t('last')}
        </Button>
      </div>
    </div>
  </div>
)};


Pagination.propTypes = {
  params: PropTypes.object,
  router: PropTypes.object,
  pathname: PropTypes.string,
};

export default Pagination;
