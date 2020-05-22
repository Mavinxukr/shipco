import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import _ from 'lodash';
import { useTable } from 'react-table';
import {
  getPrices,
  addNewPrices,
} from '../../../redux/actions/prices';
import {
  pricesDataSelector,
  pricesDataReceivedSelector,
} from '../../../utils/selectors';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import Button from '../../Button/Button';
import MainLayout from '../../Layout/Global/Global';
import { required } from '../../../utils/validation';
import styles from './AddNewPrice.scss';
import Loader from '../../Loader/Loader';
import { columnsPrice, type } from './data';

const Table = ({
  columns,
  data,
}) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps()}
                className={`Parts-${column.id}Header`}
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
                  className={`Parts-${cell.column.id}`}
                  {...cell.getCellProps()}
                >
                  {cell.column.id === 'price' ? (
                    <Field
                      name={`price_${cell.row.original.id}`}
                      type="number"
                      defaultValue="0"
                    >
                      {renderInput({
                        classNameWrapper: styles.widthInput,
                      })}
                    </Field>
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
  );
};

const AddNewPrice = () => {
  const [priceableData, setPriceableData] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const prices = useSelector(pricesDataSelector);
  const isDataReceived = useSelector(pricesDataReceivedSelector);

  const onSubmit = (values) => {
    const arr = [];
    _.forIn(values, (value, key) => {
      if (key.indexOf('price_') !== -1) {
        arr.push(`c=${key.split('_')[1]},p=${value}`);
      }
    });
    dispatch(
      addNewPrices(
        {},
        {
          name: values.name,
          priceable_type: values.priceable_type && values.priceable_type.value,
          priceable_id: values.priceable_id && values.priceable_id.value,
          dependency: arr.join(';'),
        },
      ),
    );
    router.push('/prices');
  };

  useEffect(() => {
    dispatch(
      getPrices(),
    );
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout admin>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid, submitting }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <Field name="name" validate={required} type="text">
              {renderInput({
                label: 'Name',
                classNameWrapper: styles.widthInput,
              })}
            </Field>
            <Field
              name="priceable_type"
              component={renderSelect({
                placeholder: '',
                label: 'Applicable type',
                custonOnChange: (value) => {
                  const key =
                    value.label === 'clients' ? 'clients' : 'groups';
                  setPriceableData(prices.additional[key]);
                },
              })}
              options={type}
            />
            <Field
              name="priceable_id"
              component={renderSelect({
                placeholder: '',
                label: 'Applicable id',
              })}
              options={
                (priceableData
                  && priceableData.map(item => ({
                    value: item.id,
                    label: item.name,
                  })))
                || []
              }
            />
            <div className={styles.scrollTable}>
              <Table columns={columnsPrice} data={prices.additional.cities} />
            </div>
            <div className={styles.submitPopup}>
              <Button
                customBtn={styles.btnSubmit}
                type="submit"
                disabled={submitting || invalid}
              >
                ADD New Price
              </Button>
            </div>
          </form>
        )}
      />
    </MainLayout>
  );
};

export default AddNewPrice;
