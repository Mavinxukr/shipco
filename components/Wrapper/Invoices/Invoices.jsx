import React from 'react';
import { useSortBy, useTable } from 'react-table';
import MainLayout from '../../Layout/Global/Global';
import Pagination from '../../Pagination/Pagination';
import CustomTable from '../../CustomTable/CustomTable';
import IconFilter from '../../../assets/svg/Group (5).svg';
import Search from '../../Search/Search';
import Button from '../../Button/Button';
import { columns, dataTable } from './data';
import IconSortTable from '../../../assets/svg/SortTable.svg';
import IconStar from '../../../assets/svg/viewStar.svg';
import styles from './Invoices.scss';

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

const Invoices = () => (
  <MainLayout>
    <div className={styles.container}>
      <div className={styles.flex}>
        <h3 className={styles.title}>Invoices</h3>
        <div className={styles.rightBlock}>
          <Button customBtn={styles.filterText}>
            <IconFilter className={styles.filterIcon} />
            Filter
          </Button>
          <Search />
        </div>
      </div>
      <CustomTable>
        <Pagination />
        <Table columns={columns} data={dataTable} />
        <Pagination />
      </CustomTable>
    </div>
  </MainLayout>
);

export default Invoices;
