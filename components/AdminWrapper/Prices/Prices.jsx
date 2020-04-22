import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import { useRouter } from 'next/router';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import { getPrices } from '../../../redux/actions/prices';
import {
  pricesDataSelector,
  pricesDataReceivedSelector,
} from '../../../utils/selectors';
import { renderInput } from '../../../utils/renderInputs';
import Button from '../../Button/Button';
import Popup from '../../Popup/Popup';
import MainLayout from '../../Layout/Global/Global';
import IconPlus from '../../../assets/svg/Plus.svg';
import CustomTable from '../../CustomTable/CustomTable';
import {
  composeValidators,
  required,
  mustBeNumber,
} from '../../../utils/validation';
import Pagination from '../../Pagination/Pagination';
import { columns } from './data';
import Loader from '../../Loader/Loader';
import styles from './Prices.scss';

const Table = ({ columns, data }) => {
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
                    {cell.column.id === 'client' ? (
                      <>{cell.row.original.clients.length}</>
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

const Groups = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const prices = useSelector(pricesDataSelector);
  const isDataReceived = useSelector(pricesDataReceivedSelector);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPrices({}));
  }, []);

  useEffect(() => {
    dispatch(
      getPrices({
        page: router.query.page || 1,
        countpage: router.query.countpage || '10',
      }),
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  const onSubmit = values => console.log(values);

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
              onClick={() => setIsPopupOpen(true)}
            >
              <IconPlus className={cx(styles.plus, styles.icon)} />
              Add New Prices
            </Button>
          </div>
          <div className={styles.groupBtn}>
            <Button customBtn={styles.rightBtn}>Print</Button>
            <Button customBtn={styles.rightBtn}>Import</Button>
          </div>
        </div>
        {prices.data.length !== 0 ? (
          <CustomTable>
            <Pagination
              params={prices.links}
              pathname="/prices"
              router={router}
            />
            <div className={styles.scrollTable}>
              <Table
                columns={columns}
                data={prices.data}
                dispatch={dispatch}
                groupsArr={prices.additional.clients}
              />
            </div>
            <Pagination
              params={prices.links}
              pathname="/prices"
              router={router}
            />
          </CustomTable>
        ) : (
          <h1 className={styles.notFound}>nothing found</h1>
        )}
      </div>
      {isPopupOpen && (
        <Popup setIsPopupOpen={setIsPopupOpen} title="Add New Price ">
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
                  name="price"
                  validate={composeValidators(required, mustBeNumber)}
                  type="text"
                >
                  {renderInput({
                    label: 'Price plan',
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
                    ADD New Price
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

export default Groups;
