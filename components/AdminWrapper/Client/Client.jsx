import React, {
  useEffect, forwardRef, useState, useRef,
} from 'react';
import { usePagination, useTable, useRowSelect } from 'react-table';
import formatStringByPattern from 'format-string-by-pattern';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
  getClient,
  deleteClient,
  addNewClient,
} from '../../../redux/actions/client';
import {
  clientDataSelector,
  clientDataReceivedSelector,
  currentClientDataSelector,
  currentClientDataReceivedSelector,
} from '../../../utils/selectors';
import { getCurrentClient } from '../../../redux/actions/currentClient';
import Button from '../../Button/Button';
import MainLayout from '../../Layout/Global/Global';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import CustomTable from '../../CustomTable/CustomTable';
import IconPlus from '../../../assets/svg/Plus.svg';
import IconMinus from '../../../assets/svg/min.svg';
import { printData, getIdsArr } from '../../../utils/helpers';
import {
  columns, stateStatus, status, city, print,
} from './data';
import SelectCustom from '../../SelectCustom/SelectCustom';
import Loader from '../../Loader/Loader';
import Popup from '../../Popup/Popup';
import {
  required,
  mustBeNumber,
  composeValidators,
  lengthDueDay,
} from '../../../utils/validation';
import {
  renderInput,
  renderSelect,
  renderInputFile,
} from '../../../utils/renderInputs';
import Pagination from '../../Pagination/Pagination';
import MultiSelect from '../../Multi/Multi';
import styles from './Client.scss';

const IndeterminateCheckbox = forwardRef(({ indeterminate, ...rest }, ref) => {
  const defaultRef = useRef();
  const resolvedRef = ref || defaultRef;

  useEffect(() => {
    resolvedRef.current.indeterminate = indeterminate;
  }, [resolvedRef, indeterminate]);

  return (
    <>
      <input type="checkbox" ref={resolvedRef} {...rest} />
    </>
  );
});

const Client = () => {
  const client = useSelector(clientDataSelector);
  const error = useSelector(state => state.client.error);
  const currentClient = useSelector(currentClientDataSelector);
  const isDataReceived = useSelector(clientDataReceivedSelector);
  const isDataReceivedClient = useSelector(currentClientDataReceivedSelector);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [printPopup, setPrintPopup] = useState(false);
  const [selected, setSelected] = useState([]);

  const dispatch = useDispatch();

  const arrAutoId = [];

  const router = useRouter();

  const onSubmit = (values) => {
    dispatch(
      addNewClient(
        {},
        {
          ...values,
          status: values.status && values.status.value,
          point_load_city:
            values.point_load_city && values.point_load_city.label,
          point_delivery_city:
            values.point_delivery_city && values.point_delivery_city.label,
          ship: 1,
          lot: 1,
          sale: 1,
          feature: 1,
          disassembly: 0,
          invoice: 1,
          invoice_document: [
            {
              type: 'invoice',
              file: document.querySelector('#car_fax_report').files,
            },
            {
              type: 'invoices',
              file: document.querySelector('#invoice').files,
            },
          ],
        },
      ),
    );
  };

  useEffect(() => {
    if (!error) {
      setIsPopupOpen(false);
    }
  }, [error]);

  useEffect(() => {
    const params = router.query.isClient
      ? {}
      : { client: +router.query.idUser };
    if (router.query.idUser) {
      dispatch(getCurrentClient({}, +router.query.idUser));
    }
    dispatch(getClient(params));
  }, []);

  useEffect(() => {
    if (router.query.isClient) {
      dispatch(getClient({}));
    }
  }, [router.query.isClient]);

  useEffect(() => {
    dispatch(
      getClient({
        page: router.query.page || 1,
        countpage: router.query.countpage || '10',
        client: router.query.idUser || '',
        auto_status: router.query.auto_status || '',
        search: router.query.search || '',
      }),
    );
  }, [router.query]);

  if (router.query.idUser) {
    if (!isDataReceived || !isDataReceivedClient) {
      return <Loader />;
    }
  }

  if (!isDataReceived) {
    return <Loader />;
  }

  if (isPopupOpen === true || printPopup === true) {
    document.querySelector('#__next').classList.add('Global-overflow');
  } else {
    document.querySelector('#__next').classList.remove('Global-overflow');
  }

  const onSubmitPrint = () => {
    const idsArr = getIdsArr(selected);
    const paramsClient = router.query.isClient
      ? {
        fields: idsArr,
      }
      : {
        client_id: +router.query.idUser || '',
        fields: idsArr,
      };
    const tableClient = router.query.isClient ? 'autos' : 'client';
    printData({
      params: paramsClient,
      table: tableClient,
      selected: idsArr,
      setSelected,
      setPrintPopup,
    });
  };

  return (
    <MainLayout admin>
      <SubHeader
        hidden
        currentClient={currentClient}
        currentClientId={router.query.idUser}
        onClick={() => {
          router.push({
            pathname: '/auto-admin',
            query: {
              ...router.query,
              page: 1,
              search: document.querySelector('#search').value,
            },
          });
          dispatch(
            getClient({
              search: document.querySelector('#search').value,
            }),
          );
        }}
      />
      <div className={styles.container}>
        <div className={styles.flex}>
          <div className={styles.groupBtn}>
            <Button
              type="button"
              customBtn={styles.btnIcon}
              onClick={() => setIsPopupOpen(true)}
            >
              <IconPlus className={cx(styles.plus, styles.icon)} />
              Add New offers
            </Button>
            <Button
              customBtn={styles.btnIcon}
              onClick={() => {
                dispatch(
                  deleteClient(
                    {},
                    {
                      auto_id: arrAutoId,
                    },
                  ),
                );
              }}
            >
              <IconMinus className={styles.icon} />
              Delete
            </Button>
          </div>
          <div className={styles.groupBtn}>
            <Button
              customBtn={styles.rightBtn}
              onClick={() => setPrintPopup(true)}
            >
              Print
            </Button>
            <Button customBtn={styles.rightBtn}>Import</Button>
          </div>
        </div>
        <div className={cx(styles.flex, styles.selectBlock)}>
          <SelectCustom
            placeholder="All Status"
            options={stateStatus}
            onChange={(value) => {
              router.push({
                pathname: '/auto-admin',
                query: {
                  ...router.query,
                  page: 1,
                  auto_status: value.value,
                },
              });
              dispatch(
                getClient({
                  status: value.value,
                }),
              );
            }}
          />
        </div>
        <>
          {client.data.length !== 0 ? (
            <CustomTable>
              <Pagination
                params={client.links}
                pathname="/auto-admin"
                router={router}
              />
              <div className={styles.scrollTable}>
                <Table
                  columns={columns}
                  data={client.data}
                  arrAutoId={arrAutoId}
                />
              </div>
              <Pagination
                params={client.links}
                pathname="/auto-admin"
                router={router}
              />
            </CustomTable>
          ) : (
            <h1 className={styles.notFound}>nothing found</h1>
          )}
        </>
        {isPopupOpen && (
          <Popup setIsPopupOpen={setIsPopupOpen} title="Add New offers">
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, invalid, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <Field name="make_name" validate={required} type="text">
                    {renderInput({
                      label: 'Make',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="year"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({
                      label: 'Year',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="model_name" validate={required} type="text">
                    {renderInput({
                      label: 'Model',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="client_id"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({
                      label: 'Client id',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="status"
                    validate={required}
                    component={renderSelect({
                      placeholder: '',
                      label: 'Status',
                      classNameWrapper: styles.popupFieldRow,
                    })}
                    options={status}
                  />
                  <Field
                    name="tracking_id"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({
                      label: 'Tracking id',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="container_id"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({
                      label: 'Container id',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="point_load_city"
                    component={renderSelect({
                      placeholder: '',
                      label: 'Point of loading',
                      classNameWrapper: styles.popupFieldRow,
                    })}
                    options={city}
                  />
                  <Field
                    name="point_load_date"
                    validate={composeValidators(required, mustBeNumber, lengthDueDay)}
                    type="text"
                    parse={formatStringByPattern('9999-99-99')}
                  >
                    {renderInput({
                      label: 'Load date',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="point_delivery_city"
                    component={renderSelect({
                      placeholder: '',
                      label: 'Delivery City',
                      classNameWrapper: styles.popupFieldRow,
                    })}
                    options={city}
                  />
                  <Field
                    name="point_delivery_date"
                    validate={composeValidators(required, mustBeNumber, lengthDueDay)}
                    type="text"
                    parse={formatStringByPattern('9999-99-99')}
                  >
                    {renderInput({
                      label: 'Delivery date',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="lot_number"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({
                      label: 'Lot number',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="doc_type" validate={required} type="text">
                    {renderInput({
                      label: 'Doc type',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="odometer" validate={required} type="text">
                    {renderInput({
                      label: 'Odometer',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="highlight" validate={required} type="text">
                    {renderInput({
                      label: 'Highlight',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="pri_damage" validate={required} type="text">
                    {renderInput({
                      label: 'Primary damage',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="sec_damage" validate={required} type="text">
                    {renderInput({
                      label: 'Secondary damage',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="ret_value" validate={required} type="text">
                    {renderInput({
                      label: 'Retail value',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="vin_code" validate={required} type="text">
                    {renderInput({
                      label: 'Vin code',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="location" validate={required} type="text">
                    {renderInput({
                      label: 'Location',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="grid_item" validate={required} type="text">
                    {renderInput({
                      label: 'Grid item',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="sale_name" validate={required} type="text">
                    {renderInput({
                      label: 'Saller name',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="ret_date"
                    validate={composeValidators(required, mustBeNumber, lengthDueDay)}
                    type="text"
                    parse={formatStringByPattern('9999-99-99')}
                  >
                    {renderInput({
                      label: 'Retail date',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="body_style" validate={required} type="text">
                    {renderInput({
                      label: 'Body style',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="color" validate={required} type="text">
                    {renderInput({
                      label: 'Color',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="eng_type" validate={required} type="text">
                    {renderInput({
                      label: 'Engine type',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="cylinder" validate={required} type="text">
                    {renderInput({
                      label: 'Cylinder',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="trans" validate={required} type="text">
                    {renderInput({
                      label: 'Transmission',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="drive" validate={required} type="text">
                    {renderInput({
                      label: 'Drive',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="fuel" validate={required} type="text">
                    {renderInput({
                      label: 'Fuel',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="key" validate={required} type="text">
                    {renderInput({
                      label: 'Key',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="note" validate={required} type="text">
                    {renderInput({
                      label: 'Note',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="invoice_total_price"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({
                      label: 'Total Price',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="invoice_paid_price"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({
                      label: 'Paid Price',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field
                    name="invoice_outstanding_price"
                    validate={composeValidators(required, mustBeNumber)}
                    type="text"
                  >
                    {renderInput({
                      label: 'Invoice Price',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name=" invoice_status" validate={required} type="text">
                    {renderInput({
                      label: 'Invoice Status',
                      classNameWrapper: styles.popupFieldRow,
                      widthInputBlock: styles.widthInputBlock,
                      classNameWrapperLabel: styles.label,
                    })}
                  </Field>
                  <Field name="car_fax_report" type="file" validate={required}>
                    {renderInputFile({
                      label: 'CarFax report',
                      classNameWrapper: styles.popupFieldRow,
                      customInput: styles.customInputFile,
                      widthInputBlock: styles.noFiles,
                      file: true,
                      id: 'car_fax_report',
                      accept: '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                    })}
                  </Field>
                  <Field name="invoice" type="file" validate={required}>
                    {renderInputFile({
                      label: 'Invoice',
                      classNameWrapper: styles.popupFieldRow,
                      customInput: styles.customInputFile,
                      widthInputBlock: styles.noFiles,
                      id: 'invoice',
                      file: true,
                      accept: '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                    })}
                  </Field>
                  {error && <p className={styles.error}>Client not found</p>}
                  <div className={styles.submitPopup}>
                    <Button
                      customBtn={styles.btnSubmit}
                      type="submit"
                      disabled={submitting || invalid}
                    >
                      ADD New offers
                    </Button>
                  </div>
                </form>
              )}
            />
          </Popup>
        )}
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
      </div>
    </MainLayout>
  );
};

export default Client;

const Table = ({ columns, data, arrAutoId }) => {
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
          {rows.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    className={cx(
                      `Client-${cell.column.id}`,
                      `Client-${cell.value}`,
                    )}
                    {...cell.getCellProps()}
                    onClick={() => {
                      if (!cell.row.isSelected) {
                        arrAutoId.push(cell.row.original.id);
                      } else {
                        const index = arrAutoId.indexOf(cell.row.original.id);
                        if (index > -1) {
                          arrAutoId.splice(index, 1);
                        }
                      }
                    }}
                  >
                    {cell.column.id === 'paiment' ? (
                      <>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            cell.row.original.document.length === 0
                              ? '/'
                              : cell.row.original.document[0].link
                          }
                          onClick={(e) => {
                            if (cell.row.original.document.length === 0) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Auction invoice
                        </a>
                        <a
                          target="_blank"
                          rel="noopener noreferrer"
                          href={
                            cell.row.original.document.length === 2
                              ? cell.row.original.document[1].link
                              : '/'
                          }
                          onClick={(e) => {
                            if (cell.row.original.document.length !== 2) {
                              e.preventDefault();
                            }
                          }}
                        >
                          Shipping charge invoice
                        </a>
                      </>
                    ) : (
                      <>
                        {cell.column.id === 'client.due_day' ? (
                          <Link
                            href={{
                              pathname: '/prices',
                              query: {
                                idClient: cell.row.original.client.price_id,
                              },
                            }}
                          >
                            <a
                              className={
                                cell.row.original.client.is_finish
                                  ? styles.red
                                  : undefined
                              }
                            >
                              {cell.render('Cell')}
                            </a>
                          </Link>
                        ) : (
                          <>{cell.render('Cell')}</>
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
