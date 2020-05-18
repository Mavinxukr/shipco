import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import {
  getPrices,
  deletePrices,
  updatePrices,
} from '../../../redux/actions/prices';
import {
  pricesDataSelector,
  pricesDataReceivedSelector,
} from '../../../utils/selectors';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import Button from '../../Button/Button';
import Popup from '../../Popup/Popup';
import MainLayout from '../../Layout/Global/Global';
import IconPlus from '../../../assets/svg/Plus.svg';
import CustomTable from '../../CustomTable/CustomTable';
import {
  required,
} from '../../../utils/validation';
import Pagination from '../../Pagination/Pagination';
import Loader from '../../Loader/Loader';
import styles from './Prices.scss';
import IconP from '../../../assets/svg/p.svg';
import IconTrash from '../../../assets/svg/Trash.svg';
import { columns, type } from './data';

const Table = ({
  columns,
  data,
  dispatch,
  priceableData,
  setPriceableData,
  prices,
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
      updatePrices(
        {},
        {
          ...values,
          cities:
            (values.cities && values.cities.value) || itemGroup.cities[0].id,
          priceable_type: values.priceable_type && values.priceable_type.value,
          priceable_id: values.priceable_id && values.priceable_id.value,
          country_id: values.country_id && values.country_id.value,
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

  console.log(itemGroup);

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
                            setPriceable(cell.row.original.priceable.name);
                            setIsPopupUpdate(true);
                          }}
                        >
                          <IconP />
                        </Button>
                        <Button
                          type="button"
                          customBtn={styles.actionsButton}
                          onClick={() => {
                            dispatch(deletePrices({}, cell.row.original.id));
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
        <Popup setIsPopupOpen={setIsPopupUpdate} title="Update Price ">
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
                  name="priceable_type"
                  component={renderSelect({
                    placeholder: itemGroup.priceable_type || '',
                    label: 'Applicable type',
                    classNameWrapper: 'SelectCustom-popupFieldRow',
                    custonOnChange: (value) => {
                      setPriceable('');
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
                    placeholder: priceable,
                    label: 'Applicable id',
                    id: 'priceable_id',
                    classNameWrapper: 'SelectCustom-popupFieldRow',
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
                <Field
                  name="country_id"
                  component={renderSelect({
                    label: 'States',
                    classNameWrapper: 'SelectCustom-popupFieldRow',
                    placeholder: itemGroup.country[0].name || '',
                  })}
                  options={
                    prices.additional.states.map(item => ({
                      value: item.id,
                      label: item.name,
                    }))
                  }
                />
                <Field
                  name="cities"
                  component={renderSelect({
                    label: 'Cities',
                    classNameWrapper: 'SelectCustom-popupFieldRow',
                    placeholder: itemGroup.cities[0].name || '',
                  })}
                  options={
                    prices.additional.cities.map(item => ({
                      value: item.id,
                      label: item.name,
                    }))
                  }
                />
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

const Prices = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [priceableData, setPriceableData] = useState(null);

  const prices = useSelector(pricesDataSelector);
  const isDataReceived = useSelector(pricesDataReceivedSelector);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getPrices({
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
      dispatch(getPrices({}, +router.query.idClient));
    } else {
      dispatch(getPrices(params));
    }
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  if (isPopupOpen === true) {
    document.querySelector('#__next').classList.add('Global-overflow');
  } else {
    document.querySelector('#__next').classList.remove('Global-overflow');
  }

  return (
    <MainLayout admin>
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>Prices</h4>
        </div>
        <div className={styles.flex}>
          <div className={styles.groupBtn}>
            <Button
              type="button"
              customBtn={styles.btnIcon}
              onClick={() => router.push('/prices/new-price')}
            >
              <IconPlus className={cx(styles.plus, styles.icon)} />
              Add New Prices
            </Button>
          </div>
        </div>
        {prices.data.length !== 0 ? (
          <CustomTable>
            {typeof prices.data === 'object' && prices.links && (
              <Pagination
                params={prices.links}
                pathname="/prices"
                router={router}
              />
            )}
            <div className={styles.scrollTable}>
              <Table
                columns={columns}
                data={
                  (Array.isArray(prices.data) && prices.data) || [prices.data]
                }
                dispatch={dispatch}
                groupsArr={prices.additional.clients}
                setPriceableData={setPriceableData}
                priceableData={priceableData}
                prices={prices}
              />
            </div>
            {typeof prices.data === 'object' && prices.links && (
              <Pagination
                params={prices.links}
                pathname="/prices"
                router={router}
              />
            )}
          </CustomTable>
        ) : (
          <h1 className={styles.notFound}>nothing found</h1>
        )}
      </div>
    </MainLayout>
  );
};

export default Prices;
