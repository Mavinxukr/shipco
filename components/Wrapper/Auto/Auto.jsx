import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import cx from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { usePagination, useRowSelect, useTable } from 'react-table';
import { getAutoClient } from '../../../redux/actions/autoClient';
import {
  autoClientDataSelector,
  autoClientDataReceivedSelector,
} from '../../../utils/selectors';
import MainLayout from '../../Layout/Global/Global';
import InputNumber from '../../InputNumber/InputNumber';
import { stateOptions, columns, filter } from './data';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import Filter from '../../Filter/Filter';
import Button from '../../Button/Button';
import Pagination from '../../Pagination/Pagination';
import CustomTable from '../../CustomTable/CustomTable';
import styles from './Auto.scss';
import Loader from '../../Loader/Loader';
import { getBaseClient } from '../../../redux/actions/baseClient';

const Auto = () => {
  const autoClient = useSelector(autoClientDataSelector);
  const isDataReceived = useSelector(autoClientDataReceivedSelector);

  const [initialPage, setInitialPage] = useState(0);
  const [countPagination, setCountPagination] = useState('10');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAutoClient({}));
  }, []);

  useEffect(() => {
    if (autoClient) {
      setCountPagination(`${autoClient.links.per_page}`);
    }
  }, [autoClient]);

  if (!isDataReceived) {
    return <Loader />;
  }

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <h4 className={styles.title}>Auto List</h4>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, invalid, submitting }) => (
            <form onSubmit={handleSubmit}>
              <div className={styles.flex}>
                <div className={styles.column}>
                  <div className={styles.flex}>
                    <Field name="from" type="number">
                      {({ input }) => (
                        <InputNumber
                          cassNameLabel={styles.firstLabel}
                          title="Year from:"
                          name="from"
                          input={input}
                        />
                      )}
                    </Field>
                    <Field name="to" type="number">
                      {({ input }) => (
                        <InputNumber title="to:" name="to" input={input} />
                      )}
                    </Field>
                  </div>
                  <Field name="Lot" type="text">
                    {renderInput({
                      label: 'Lot:',
                      classNameWrapper: styles.firstFlexInput,
                      classNameWrapperLabel: styles.customLabel,
                      classNameWrapperForInput: styles.customWidthInput,
                    })}
                  </Field>
                </div>
                <div className={cx(styles.column, styles.secondBlock)}>
                  <Field
                    name="Model"
                    component={renderSelect({
                      placeholder: '',
                      label: 'Model:',
                      classNameWrapper: styles.rowSelect,
                      classNameLabel: styles.labelSelect,
                    })}
                    options={stateOptions}
                  />
                  <Field name="VIN" type="text">
                    {renderInput({
                      label: 'VIN:',
                      classNameWrapper: styles.flexInput,
                      classNameWrapperLabel: cx(
                        styles.customLabel,
                        styles.secondLabel,
                      ),
                      classNameWrapperForInput: styles.customWidthInput,
                    })}
                  </Field>
                </div>
                <div className={cx(styles.column, styles.lastColumn)}>
                  <Field
                    name="Point"
                    component={renderSelect({
                      placeholder: '',
                      label: 'Point of loading:',
                      classNameWrapper: styles.rowSelect,
                      classNameLabel: styles.labelSelect,
                    })}
                    options={stateOptions}
                  />
                  <Field name="container" type="text">
                    {renderInput({
                      label: 'Сontainer:',
                      classNameWrapper: styles.flexInput,
                      classNameWrapperLabel: cx(
                        styles.customLabel,
                        styles.labelContainer,
                      ),
                      classNameWrapperForInput: styles.customWidthInput,
                    })}
                  </Field>
                </div>
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  Search
                </Button>
              </div>
            </form>
          )}
        />
        <div className={styles.row}>
          <div className={styles.leftBlock}>
            <Filter title="GA Warehouse">
              {filter.map(item => (
                <div className={styles.itemFilter} key={item.id}>
                  <span className={styles.colorFilter}>{item.title}</span>
                  <span>{item.num}</span>
                </div>
              ))}
            </Filter>
            <Filter title="GA Warehouse">
              {filter.map(item => (
                <div className={styles.itemFilter} key={item.id}>
                  <span className={styles.colorFilter}>{item.title}</span>
                  <span>{item.num}</span>
                </div>
              ))}
            </Filter>
            <Filter title="GA Warehouse">
              {filter.map(item => (
                <div className={styles.itemFilter} key={item.id}>
                  <span className={styles.colorFilter}>{item.title}</span>
                  <span>{item.num}</span>
                </div>
              ))}
            </Filter>
            <Filter title="GA Warehouse">
              {filter.map(item => (
                <div className={styles.itemFilter} key={item.id}>
                  <span className={styles.colorFilter}>{item.title}</span>
                  <span>{item.num}</span>
                </div>
              ))}
            </Filter>
          </div>
          <CustomTable title="">
            <Pagination
              params={autoClient.links}
              countPagination={countPagination}
              setInitialPage={setInitialPage}
              initialPage={initialPage}
              action={getAutoClient}
              onPageChange={(data) => {
                dispatch(
                  getAutoClient({
                    page: data.selected + 1,
                    countpage: countPagination,
                  }),
                );
                setInitialPage(data.selected);
              }}
            />
            <div className={styles.scrollTable}>
              <Table columns={columns} data={autoClient.data} />
            </div>
            <Pagination
              params={autoClient.links}
              countPagination={countPagination}
              setInitialPage={setInitialPage}
              initialPage={initialPage}
              action={getAutoClient}
              onPageChange={(data) => {
                dispatch(
                  getAutoClient({
                    page: data.selected + 1,
                    countpage: countPagination,
                  }),
                );
                setInitialPage(data.selected);
              }}
            />
          </CustomTable>
        </div>
      </div>
    </MainLayout>
  );
};

export default Auto;

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    usePagination,
    useRowSelect,
  );

  return (
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
                  className={`Auto-${cell.column.id}`}
                  {...cell.getCellProps()}
                >
                  <>{cell.render('Cell')}</>
                  <>
                    {cell.column.id === 'id' && (
                      <span className={styles.index}>
                        {cell.row.index + 1}.
                      </span>
                    )}
                  </>
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};
