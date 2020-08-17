import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { useSortBy, useTable } from 'react-table';
import { Field, Form } from 'react-final-form';
import cx from 'classnames';
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
import { renderInputFile, renderSelect } from '../../../utils/renderInputs';
import IconPlus from '../../../assets/svg/Plus.svg';
import Loader from '../../Loader/Loader';
import Button from '../../Button/Button';
import { printData, getIdsArr } from '../../../utils/helpers';
import Popup from '../../Popup/Popup';
import MultiSelect from '../../Multi/Multi';
import {
  print, columns, firstStatus, secondStatus, firstStatusSelect, secondStatusSelect,
} from './data';
import Pickers from '../../Pickers/Pickers';
import styles from './Invoices.scss';
import HoverPopup from '../../HoverPopup/HoverPopup';

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
                      <>
                        {cell.column.id === 'status' ? (
                          <>
                            <div className={styles.position}>
                              <span className={styles.status}>
                                {cell.row.original.status[0]}
                              </span>
                              <HoverPopup>
                                {secondStatus.map((carStatus, index) => {
                                  const classNameForButton = cx(styles.btn, {
                                    [styles.activeStatus]: carStatus.value === cell.row.original.status[0],
                                  });
                                  return (
                                    <Button
                                      onClick={() => (
                                        dispatch(
                                          updateInvoices(
                                            {},
                                            {
                                              status: `${carStatus.value}`,
                                            },
                                            cell.row.original.id,
                                          ),
                                        )
                                      )}
                                      customBtn={classNameForButton}
                                      key={index}
                                      id={carStatus.label}
                                    >
                                      {carStatus.value}
                                    </Button>
                                  );
                                })}
                              </HoverPopup>
                            </div>
                            <div className={styles.position}>
                              <span className={styles.status}>
                                {cell.row.original.status[1]}
                              </span>
                              <HoverPopup>
                                {firstStatus.map((carStatus, index) => {
                                  const classNameForButton = cx(styles.btn, {
                                    [styles.activeStatus]: carStatus.value === cell.row.original.status[1],
                                  });
                                  return (
                                    <Button
                                      onClick={() => (
                                        dispatch(
                                          updateInvoices(
                                            {},
                                            {
                                              status_shipping: `${carStatus.value}`,
                                            },
                                            cell.row.original.id,
                                          ),
                                        )
                                      )}
                                      customBtn={classNameForButton}
                                      key={index}
                                      id={carStatus.label}
                                    >
                                      {carStatus.value}
                                    </Button>
                                  );
                                })}
                              </HoverPopup>
                            </div>
                          </>
                        ) : (
                          <>{cell.render('Cell')} </>
                        )}
                      </>
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
        client_id: router.query.client_id || '',
        past_due: router.query.past_due || '',
        date_from: router.query.date_from || '',
        shipping_status: router.query.shipping_status || '',
        auction_status: router.query.auction_status || '',
        date_to: router.query.date_to || '',
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
  const clientId = invoices.additional.clients.map(item => ({
    label: item.name,
    value: item.name,
  }));

  clientId.unshift({
    label: 'All clients',
    value: '',
  });

  const onSubmitFilter = async (values) => {
    router.push({
      pathname: '/invoices-admin',
      query: {
        ...router.query,
        client_id: values.client_id && values.client_id.value,
        shipping_status: values.shipping_status && values.shipping_status.value,
        auction_status: values.auction_status && values.auction_status.value,
        date_from: document.querySelector('#from').value || '',
        past_due: document.querySelector('#past_due').value || '',
        date_to: document.querySelector('#to').value || '',
      },
    });
  };

  return (
    <MainLayout admin>
      <SubHeader
        onClick={() => {
          router.push({
            pathname: '/invoices-admin',
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
        <Form
          onSubmit={onSubmitFilter}
          render={({ handleSubmit, invalid, submitting }) => (
            <form className={cx(styles.flex, styles.filter)} onSubmit={handleSubmit}>
              <Field
                name="client_id"
                component={renderSelect({
                  placeholder: 'All clients',
                  label: '',
                  classNameWrapper: styles.popupFieldRow,
                })}
                options={clientId}
              />
              <Field
                name="auction_status"
                component={renderSelect({
                  placeholder: 'Auction status',
                  label: '',
                  classNameWrapper: styles.popupFieldRow,
                })}
                options={secondStatusSelect}
              />
              <Field
                name="shipping_status"
                component={renderSelect({
                  placeholder: 'Shipping status',
                  label: '',
                  classNameWrapper: styles.popupFieldRow,
                })}
                options={firstStatusSelect}
              />
              <input type="number" id="past_due" className={styles.inputNumber} />
              <div className={cx(styles.flex, styles.pickers)}>
                <p>Date from</p>
                <Pickers
                  time={router.query.date_from || ''}
                  defaultValue=""
                  id="from"
                />
              </div>
              <div className={cx(styles.flex, styles.pickers)}>
                <p>Date to</p>
                <Pickers
                  time={router.query.date_to || ''}
                  defaultValue=""
                  id="to"
                />
              </div>
              <div className={cx(styles.flex, styles.selectBlock)}>
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  Ok
                </Button>
              </div>
            </form>
          )}
        />
        {invoices.data.length !== 0 ? (
          <CustomTable>
            <Pagination
              params={invoices.links}
              pathname="/invoices-admin"
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
              pathname="/invoices-admin"
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
