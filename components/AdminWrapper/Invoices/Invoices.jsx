import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useSortBy, useTable } from 'react-table';
import { Field, Form } from 'react-final-form';
import { getInvoices, updateInvoices } from '../../../redux/actions/invoices';
import {
  invoicesDataSelector,
  invoicesDataReceivedSelector,
} from '../../../utils/selectors';
import MainLayout from '../../Layout/Global/Global';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import Pagination from '../../Pagination/Pagination';
import CustomTable from '../../CustomTable/CustomTable';
import IconSortTable from '../../../assets/svg/SortTable.svg';
import { renderInputFile } from '../../../utils/renderInputs';
import IconPlus from '../../../assets/svg/Plus.svg';
import styles from './Invoices.scss';
import Loader from '../../Loader/Loader';
import Button from '../../Button/Button';
import { printData, getIdsArr } from '../../../utils/helpers';
import Popup from '../../Popup/Popup';
import MultiSelect from '../../Multi/Multi';
import { print, columns } from './data';

const Table = ({ columns, data, dispatch }) => {
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

  const onSubmit = async () => {
    console.log('we');
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
                    {cell.column.id === 'paiment_for' ? (
                      <>
                        {cell.row.original.documents.length <= 1 ? (
                          <>
                            <p>{cell.row.original.paiment_for[0]}</p>
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
                                      id: 'invoices',
                                      file: true,
                                      accept:
                                        '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                                      icon: <IconPlus />,
                                      onChange: () => dispatch(
                                        updateInvoices(
                                          {},
                                          {
                                            document: [
                                              {
                                                type: 'invoices',
                                                file: document.querySelector(
                                                  '#invoices',
                                                ).files,
                                              },
                                            ],
                                          },
                                          cell.row.original.id,
                                        ),
                                      ),
                                    })}
                                  </Field>
                                </form>
                              )}
                            />
                          </>
                        ) : (
                          <>
                            <p>{cell.row.original.paiment_for[0]}</p>
                            <p>{cell.row.original.paiment_for[1]}</p>
                          </>
                        )}
                      </>
                    ) : (
                      <>{cell.render('Cell')} </>
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

const Invoices = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [printPopup, setPrintPopup] = useState(false);
  const [selected, setSelected] = useState([]);

  const invoices = useSelector(invoicesDataSelector);
  const isDataReceived = useSelector(invoicesDataReceivedSelector);

  useEffect(() => {
    dispatch(
      getInvoices({
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

  const onSubmitPrint = () => {
    const idsArr = getIdsArr(selected);
    printData({
      params: {
        fields: idsArr,
      },
      table: 'invoices',
      selected: idsArr,
      setSelected,
      setPrintPopup,
    });
  };

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
            getInvoices({
              search: document.querySelector('#search').value,
            }),
          );
        }}
      />
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>Invoices</h4>
          <Button
            customBtn={styles.rightBtn}
            onClick={() => setPrintPopup(true)}
          >
            Print
          </Button>
        </div>
        {invoices.data.length !== 0 ? (
          <CustomTable>
            <Pagination
              params={invoices.links}
              pathname="/auto-admin/invoices"
              router={router}
            />
            <div className={styles.scrollTable}>
              <Table
                dispatch={dispatch}
                columns={columns}
                data={invoices.data}
              />
            </div>
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
      {printPopup && (
        <Popup
          customPopup={styles.heightPopup}
          setIsPopupOpen={setPrintPopup}
          title="Print"
        >
          <Form
            onSubmit={onSubmitPrint}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
                <div className={styles.columnSelect}>
                  <MultiSelect
                    options={print}
                    setSelected={setSelected}
                    value={selected}
                    label="Select the fields Print"
                  />
                  <Button
                    customBtn={styles.btnSubmit}
                    type="submit"
                    disabled={submitting || invalid}
                  >
                    Submit
                  </Button>
                </div>
              </form>
            )}
          />
        </Popup>
      )}
    </MainLayout>
  );
};

export default Invoices;
