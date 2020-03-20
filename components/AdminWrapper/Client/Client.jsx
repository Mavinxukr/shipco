import React, { useEffect, forwardRef } from 'react';
import { usePagination, useTable, useRowSelect } from 'react-table';
import cx from 'classnames';
import Button from '../../Button/Button';
import MainLayout from '../../Layout/Global/Global';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import CustomTable from '../../CustomTable/CustomTable';
import IconPlus from '../../../assets/svg/Plus.svg';
import IconMinus from '../../../assets/svg/min.svg';
import styles from './Client.scss';
import { columns, dataTable, stateStatus } from './data';
import SelectCustom from '../../SelectCustom/SelectCustom';

const IndeterminateCheckbox = forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  },
);

const Client = () => (
  <MainLayout admin>
    <SubHeader hidden />
    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.groupBtn}>
          <Button customBtn={styles.btnIcon}>
            <IconPlus className={cx(styles.plus, styles.icon)} />
            Add New offers
          </Button>
          <Button customBtn={styles.btnIcon}>
            <IconMinus className={styles.icon} />
            Delete
          </Button>
        </div>
        <div className={styles.groupBtn}>
          <Button customBtn={styles.rightBtn}>Print</Button>
          <Button customBtn={styles.rightBtn}>Import</Button>
        </div>
      </div>
      <div className={cx(styles.flex, styles.selectBlock)}>
         <SelectCustom placeholder="All Status" options={stateStatus} />
      </div>
      <CustomTable>
        <Table columns={columns} data={dataTable} />
      </CustomTable>
    </div>
  </MainLayout>
);

export default Client;

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageSize },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.flatColumns.push(columns => [
        {
          id: 'selection',
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    },
  );

  return (
    <>
      <div className={styles.pagination}>
        <div>
          <span>Show</span>
          <select
            className={styles.paginationSelect}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
        <div>
          <span>Showing 1 to 20 of 4,260 entries</span>{' '}
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            First
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <Button customBtn={styles.paginationBtn}>1</Button>
          <Button customBtn={styles.paginationBtn}>2</Button>
          <Button customBtn={styles.paginationBtn}>3</Button>
          <Button customBtn={styles.paginationBtn}>4</Button>
          <Button customBtn={styles.paginationBtn}>5</Button>
          <Button customBtn={styles.paginationBtn} disabled={!canPreviousPage}>
            ...
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            Last
          </Button>
        </div>
      </div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps()}>{column.render('Header')}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td className={cx(`Client-${cell.column.id}`, `Client-${cell.value}`)} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className={styles.pagination}>
        <div>
          <span>Show</span>
          <select
            className={styles.paginationSelect}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
        <div>
          <span>Showing 1 to 20 of 4,260 entries</span>{' '}
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            First
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <Button customBtn={styles.paginationBtn}>1</Button>
          <Button customBtn={styles.paginationBtn}>2</Button>
          <Button customBtn={styles.paginationBtn}>3</Button>
          <Button customBtn={styles.paginationBtn}>4</Button>
          <Button customBtn={styles.paginationBtn}>5</Button>
          <Button customBtn={styles.paginationBtn} disabled={!canPreviousPage}>
            ...
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            Last
          </Button>
        </div>
      </div>
    </>
  );
};
