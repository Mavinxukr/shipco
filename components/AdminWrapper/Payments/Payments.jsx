import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import formatStringByPattern from 'format-string-by-pattern';
import {
  getPayments,
  addNewPayments,
  deletePayments,
  updatePayments,
} from '../../../redux/actions/payments';
import {
  paymentsDataSelector,
  paymentsDataReceivedSelector,
} from '../../../utils/selectors';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import Button from '../../Button/Button';
import Popup from '../../Popup/Popup';
import MainLayout from '../../Layout/Global/Global';
import IconPlus from '../../../assets/svg/Plus.svg';
import CustomTable from '../../CustomTable/CustomTable';
import {
  composeValidators,
  required,
  mustBeNumber,
  lengthDueDay,
} from '../../../utils/validation';
import Pagination from '../../Pagination/Pagination';
import Loader from '../../Loader/Loader';
import styles from './Payments.scss';
import IconP from '../../../assets/svg/p.svg';
import IconTrash from '../../../assets/svg/Trash.svg';
import { columns, city, type } from './data';

const Table = ({
  columns,
  data,
  dispatch,
  paymentsData,
  setPaymentsData,
  payments,
}) => {
  const [isPopupUpdate, setIsPopupUpdate] = useState(false);
  const [itemGroup, setItemGroup] = useState(null);
  const [priceable, setPriceable] = useState('');

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({
    columns,
    data,
    initialState: { pageIndex: 0 },
  });

  const onSubmit = (values) => {
    dispatch(
      updatePayments(
        {},
        {
          ...values,
          applicable_type: values.applicable_type && values.applicable_type.value,
          applicable_id: values.applicable_id && values.applicable_id.value,
        },
        itemGroup.id,
      ),
    );
    setIsPopupUpdate(false);
  };

  if (isPopupUpdate === true) {
    document.querySelector('#__next').classList.add('Global-overflow');
  } else {
    document.querySelector('#__next').classList.remove('Global-overflow');
  }

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps()}
                  className={`Groups-${column.id}Header`}
                >
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    className={`Groups-${cell.column.id}`}
                    {...cell.getCellProps()}
                  >
                    {cell.column.id === 'actions' ? (
                      <>
                        <Button
                          type="button"
                          customBtn={styles.actionsButton}
                          onClick={() => {
                            setItemGroup(cell.row.original);
                            console.log(cell.row.original);
                            setPriceable(cell.row.original.applicable.name);
                            setIsPopupUpdate(true);
                          }}
                        >
                          <IconP />
                        </Button>
                        <Button
                          type="button"
                          customBtn={styles.actionsButton}
                          onClick={() => {
                            dispatch(deletePayments({}, cell.row.original.id));
                          }}
                        >
                          <IconTrash />
                        </Button>
                      </>
                    ) : (
                      <>
                        <>{cell.render('Cell')}</>
                      </>
                    )}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
      {isPopupUpdate && (
        <Popup setIsPopupOpen={setIsPopupUpdate} title="Update Payments ">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="name"
                  validate={required}
                  type="text"
                  defaultValue={itemGroup.name || ''}
                >
                  {renderInput({
                    label: 'Name',
                    classNameWrapper: styles.popupFieldRow,
                    widthInputBlock: styles.widthInputBlock,
                    classNameWrapperLabel: styles.label,
                  })}
                </Field>
                <Field
                  name="applicable_type"
                  component={renderSelect({
                    placeholder: itemGroup.applicable_type || '',
                    label: 'Priceable type',
                    classNameWrapper: 'SelectCustom-popupFieldRow',
                    custonOnChange: (value) => {
                      setPriceable('');
                      const key =
                        value.label === 'clients' ? 'clients' : 'groups';
                      setPaymentsData(payments.additional[key]);
                    },
                  })}
                  options={type}
                />
                <Field
                  name="applicable_id"
                  component={renderSelect({
                    placeholder: priceable,
                    label: 'Priceable id',
                    id: 'priceable_id',
                    classNameWrapper: 'SelectCustom-popupFieldRow',
                  })}
                  options={
                    (paymentsData
                      && paymentsData.map(item => ({
                        value: item.id,
                        label: item.name,
                      })))
                    || []
                  }
                />
                <Field
                  name="due_day"
                  validate={composeValidators(
                    required,
                    mustBeNumber,
                  )}
                  type="text"
                  defaultValue={itemGroup.due_day || ''}
                >
                  {renderInput({
                    label: 'Days to pay',
                    classNameWrapper: styles.popupFieldRow,
                    widthInputBlock: styles.widthInputBlock,
                    classNameWrapperLabel: styles.label,
                  })}
                </Field>
                <div className={styles.submitPopup}>
                  <Button
                    customBtn={styles.btnSubmit}
                    type="submit"
                    disabled={submitting || invalid}
                  >
                    Update Price
                  </Button>
                </div>
              </form>
            )}
          />
        </Popup>
      )}
    </>
  );
};

const Payments = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [paymentsData, setPaymentsData] = useState(null);

  const payments = useSelector(paymentsDataSelector);
  const isDataReceived = useSelector(paymentsDataReceivedSelector);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPayments({
        page: router.query.page || 1,
        countpage: router.query.countpage || '10',
        client: +router.query.idClient || '',
      }),
    );
  }, [router.query]);

  useEffect(() => {
    const params = router.query.isClient
      ? {}
      : { client: +router.query.idClient };
    if (router.query.idClient) {
      dispatch(getPayments({}, +router.query.idClient));
    } else {
      dispatch(getPayments(params));
    }
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  const onSubmit = (values) => {
    dispatch(
      addNewPayments(
        {},
        {
          ...values,
          cities: values.cities && values.cities.value,
          applicable_type: values.applicable_type && values.applicable_type.value,
          applicable_id: values.applicable_id && values.applicable_id.value,
        },
      ),
    );
    setIsPopupOpen(!isPopupOpen);
  };

  if (isPopupOpen === true) {
    document.querySelector('#__next').classList.add('Global-overflow');
  } else {
    document.querySelector('#__next').classList.remove('Global-overflow');
  }

  return (
    <MainLayout admin>
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>Payments</h4>
        </div>
        <div className={styles.flex}>
          <div className={styles.groupBtn}>
            <Button
              type="button"
              customBtn={styles.btnIcon}
              onClick={() => setIsPopupOpen(true)}
            >
              <IconPlus className={cx(styles.plus, styles.icon)} />
              Add New Payments
            </Button>
          </div>
        </div>
        {payments && payments.data.length !== 0 ? (
          <CustomTable>
            {typeof payments.data === 'object' && payments.links && (
              <Pagination
                params={payments.links}
                pathname="/payments"
                router={router}
              />
            )}
            <div className={styles.scrollTable}>
              <Table
                columns={columns}
                data={
                  (Array.isArray(payments.data) && payments.data) || [payments.data]
                }
                dispatch={dispatch}
                groupsArr={payments.additional.clients}
                setPaymentsData={setPaymentsData}
                paymentsData={paymentsData}
                payments={payments}
              />
            </div>
            {typeof payments.data === 'object' && payments.links && (
              <Pagination
                params={payments.links}
                pathname="/payments"
                router={router}
              />
            )}
          </CustomTable>
        ) : (
          <h1 className={styles.notFound}>nothing found</h1>
        )}
      </div>
      {isPopupOpen && (
        <Popup setIsPopupOpen={setIsPopupOpen} title="Add New Payments ">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Field name="name" validate={required} type="text">
                  {renderInput({
                    label: 'Name',
                    classNameWrapper: styles.popupFieldRow,
                    widthInputBlock: styles.widthInputBlock,
                    classNameWrapperLabel: styles.label,
                  })}
                </Field>
                <Field
                  name="applicable_type"
                  component={renderSelect({
                    placeholder: '',
                    label: 'Applicable type',
                    classNameWrapper: styles.popupFieldRow,
                    custonOnChange: (value) => {
                      const key =
                        value.label === 'clients' ? 'clients' : 'groups';
                      setPaymentsData(payments.additional[key]);
                    },
                  })}
                  options={type}
                />
                <Field
                  name="applicable_id"
                  component={renderSelect({
                    placeholder: '',
                    label: 'Applicable id',
                    classNameWrapper: styles.popupFieldRow,
                  })}
                  options={
                    (paymentsData
                      && paymentsData.map(item => ({
                        value: item.id,
                        label: item.name,
                      })))
                    || []
                  }
                />
                <Field
                  name="due_day"
                  validate={composeValidators(
                    required,
                    mustBeNumber,
                  )}
                  type="text"
                >
                  {renderInput({
                    label: 'Days to pay',
                    classNameWrapper: styles.popupFieldRow,
                    widthInputBlock: styles.widthInputBlock,
                    classNameWrapperLabel: styles.label,
                  })}
                </Field>
                <div className={styles.submitPopup}>
                  <Button
                    customBtn={styles.btnSubmit}
                    type="submit"
                    disabled={submitting || invalid}
                  >
                    ADD New Payments
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

export default Payments;
