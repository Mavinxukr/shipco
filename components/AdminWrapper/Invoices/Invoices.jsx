import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useSortBy, useTable } from 'react-table';
import { Field, Form } from 'react-final-form';
import { getInvoices } from '../../../redux/actions/invoices';
import {
  invoicesDataSelector,
  invoicesDataReceivedSelector,
} from '../../../utils/selectors';
import MainLayout from '../../Layout/Global/Global';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import Pagination from '../../Pagination/Pagination';
import CustomTable from '../../CustomTable/CustomTable';
import { columns } from './data';
import IconSortTable from '../../../assets/svg/SortTable.svg';
import { renderInputFile } from '../../../utils/renderInputs';
import IconPlus from '../../../assets/svg/Plus.svg';
import styles from './Invoices.scss';
import { getParts } from '../../../redux/actions/parts';
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

  const onSubmit = async (values) => {
    console.log(values);
  };

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
                    {/*{cell.column.id === 'paiment' ? (*/}
                    {/*  <>*/}
                    {/*    {cell.row.original.paiment[1] === '' ? (*/}
                    {/*      <>*/}
                    {/*        <p>{cell.row.original.paiment[0]}</p>*/}
                    {/*        <Form*/}
                    {/*          onSubmit={onSubmit}*/}
                    {/*          render={({ handleSubmit }) => (*/}
                    {/*            <form onSubmit={handleSubmit}>*/}
                    {/*              <Field type="file" name="invoice">*/}
                    {/*                {renderInputFile({*/}
                    {/*                  classNameWrapper: styles.fieldRow,*/}
                    {/*                  customInput: styles.customInputFile,*/}
                    {/*                  customLabel: styles.customLabel,*/}
                    {/*                  classNameWrapperForIcon: styles.iconPlus,*/}
                    {/*                  widthInputBlock: styles.widthInputBlock,*/}
                    {/*                  file: true,*/}
                    {/*                  accept:*/}
                    {/*                    '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',*/}
                    {/*                  icon: <IconPlus />,*/}
                    {/*                })}*/}
                    {/*              </Field>*/}
                    {/*            </form>*/}
                    {/*          )}*/}
                    {/*        />*/}
                    {/*      </>*/}
                    {/*    ) : (*/}
                    {/*      <>*/}
                    {/*        <p>{cell.row.original.paiment[0]}</p>*/}
                    {/*        <p>{cell.row.original.paiment[1]}</p>*/}
                    {/*      </>*/}
                    {/*    )}*/}
                    {/*  </>*/}
                    {/*) : (*/}
                    {/*  <>{cell.render('Cell')}</>*/}
                    {/*)}*/}
                    <>{cell.render('Cell')}</>
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

  const invoices = useSelector(invoicesDataSelector);
  const isDataReceived = useSelector(invoicesDataReceivedSelector);

  useEffect(() => {
    dispatch(
      getParts({
        page: router.query.page || 1,
        countpage: router.query.countpage || '10',
        search: router.query.search || '',
      }),
    );
  }, [router.query]);

  useEffect(() => {
    dispatch(getInvoices({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  console.log(invoices);

  return (
    <MainLayout admin>
      <SubHeader
        onClick={() => {
          router.push({
            pathname: '/auto-admin/invoices',
            query: {
              ...router.query,
              page: 1,
              search: document.querySelector('#search').value,
            },
          });
          dispatch(
            getParts({
              search: document.querySelector('#search').value,
            }),
          );
        }}
      />
      <div className={styles.container}>
        {invoices.data.length !== 0 ? (
          <CustomTable>
            <Pagination
              params={invoices.links}
              pathname="/auto-admin/invoices"
              router={router}
            />
            <Table columns={columns} data={invoices.data} />
            <Pagination
              params={invoices.links}
              pathname="/auto-admin/invoices"
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
