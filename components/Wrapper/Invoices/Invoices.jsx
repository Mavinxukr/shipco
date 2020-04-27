import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useSortBy, useTable } from 'react-table';
import {
  clientInvoicesDataSelector,
  clientInvoicesDataReceivedSelector,
} from '../../../utils/selectors';
import MainLayout from '../../Layout/Global/Global';
import { getClientInvoices } from '../../../redux/actions/clientInvoices';
import Pagination from '../../Pagination/Pagination';
import CustomTable from '../../CustomTable/CustomTable';
import IconFilter from '../../../assets/svg/Group (5).svg';
import Search from '../../Search/Search';
import Button from '../../Button/Button';
import { columns } from './data';
import IconSortTable from '../../../assets/svg/SortTable.svg';
import styles from './Invoices.scss';
import Loader from '../../Loader/Loader';

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  className={`Invoices-${column.id}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  <IconSortTable className={styles.sort} />
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    className={`Invoices-${cell.column.id}`}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

const Invoices = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const clientInvoices = useSelector(clientInvoicesDataSelector);
  const isDataReceived = useSelector(clientInvoicesDataReceivedSelector);

  useEffect(() => {
    dispatch(
      getClientInvoices({
        page: router.query.page || 1,
        countpage: router.query.countpage || '10',
        search: router.query.search || '',
      }),
    );
  }, [router.query]);

  useEffect(() => {
    dispatch(getClientInvoices({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.flex}>
          <h3 className={styles.title}>Invoices</h3>
          <div className={styles.rightBlock}>
            {/*<Button customBtn={styles.filterText}>*/}
            {/*  <IconFilter className={styles.filterIcon} />*/}
            {/*  Filter*/}
            {/*</Button>*/}
            <Search
              onClick={() => {
                router.push({
                  pathname: '/invoices',
                  query: {
                    ...router.query,
                    page: 1,
                    search: document.querySelector('#search').value,
                  },
                });
                dispatch(
                  getClientInvoices({
                    search: document.querySelector('#search').value,
                  }),
                );
              }}
            />
          </div>
        </div>
        {clientInvoices.data.length !== 0 ? (
          <CustomTable>
            <Pagination
              params={clientInvoices.links}
              pathname="/invoices"
              router={router}
            />
            <div className={styles.scrollTable}>
              <Table columns={columns} data={clientInvoices.data} />
            </div>
            <Pagination
              params={clientInvoices.links}
              pathname="/invoices"
              router={router}
            />
          </CustomTable>
        ) : (
          <h1 className={styles.notFound}>nothing found</h1>
        )}
      </div>
    </MainLayout>
  );
};

export default Invoices;
