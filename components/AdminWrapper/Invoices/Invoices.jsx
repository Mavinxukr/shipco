import React from 'react';
import { useSortBy, useTable } from 'react-table';
import { Field, Form } from 'react-final-form';
import MainLayout from '../../Layout/Global/Global';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import Pagination from '../../Pagination/Pagination';
import CustomTable from '../../CustomTable/CustomTable';
import { columns, dataTable } from './data';
import IconSortTable from '../../../assets/svg/SortTable.svg';
import { renderInputFile } from '../../../utils/renderInputs';
import IconPlus from '../../../assets/svg/Plus.svg';
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

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
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
                    {cell.column.id === 'paiment' ? (
                      <>
                        {cell.row.original.paiment[1] === '' ? (
                          <>
                            <p>{cell.row.original.paiment[0]}</p>
                            <Form
                              onSubmit={onSubmit}
                              render={({ handleSubmit }) => (
                                <form onSubmit={handleSubmit}>
                                  <Field type="file" name="invoice">
                                    {renderInputFile({
                                      classNameWrapper: styles.fieldRow,
                                      customInput: styles.customInputFile,
                                      customLabel: styles.customLabel,
                                      classNameWrapperForIcon: styles.iconPlus,
                                      widthInputBlock: styles.widthInputBlock,
                                      file: true,
                                      accept:
                                        '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                                      icon: <IconPlus />,
                                    })}
                                  </Field>
                                </form>
                              )}
                            />
                          </>
                        ) : (
                          <>
                            <p>{cell.row.original.paiment[0]}</p>
                            <p>{cell.row.original.paiment[1]}</p>
                          </>
                        )}
                      </>
                    ) : (
                      <>{cell.render('Cell')}</>
                    )}
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
  <MainLayout admin>
    <SubHeader />
    <div className={styles.container}>
      <CustomTable>
        <Pagination />
        <Table columns={columns} data={dataTable} />
        <Pagination />
      </CustomTable>
    </div>
  </MainLayout>
);

export default Invoices;
