import React from 'react';
import { Field, Form } from 'react-final-form';
import cx from 'classnames';
import { usePagination, useRowSelect, useTable } from 'react-table';
import MainLayout from '../../Layout/Global/Global';
import InputNumber from '../../InputNumber/InputNumber';
import {
  stateOptions, columns, dataTable, filter,
} from './data';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import Filter from '../../Filter/Filter';
import Button from '../../Button/Button';
import CustomTable from '../../CustomTable/CustomTable';
import styles from './Auto.scss';

const Auto = () => {
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
            <Table columns={columns} data={dataTable} />
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
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageSize },
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
    <>
      <div className={styles.pagination}>
        <div>
          <span>Show</span>
          <select
            className={styles.paginationSelect}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
        <div>
          <span>Showing 1 to 20 of 4,260 entries</span>{' '}
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            First
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <Button customBtn={styles.paginationBtn}>1</Button>
          <Button customBtn={styles.paginationBtn}>2</Button>
          <Button customBtn={styles.paginationBtn}>3</Button>
          <Button customBtn={styles.paginationBtn}>4</Button>
          <Button customBtn={styles.paginationBtn}>5</Button>
          <Button customBtn={styles.paginationBtn} disabled={!canPreviousPage}>
            ...
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            Last
          </Button>
        </div>
      </div>
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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    className={`Auto-${cell.column.id}`}
                    {...cell.getCellProps()}
                  >
                    {cell.column.id === 'src' ? (
                      <>
                        <img className={styles.imageTable} src={cell.value} alt="" />
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
      <div className={styles.pagination}>
        <div>
          <span>Show</span>
          <select
            className={styles.paginationSelect}
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
            }}
          >
            {[10, 20, 30, 40, 50].map(pageSize => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <span>entries</span>
        </div>
        <div>
          <span>Showing 1 to 20 of 4,260 entries</span>{' '}
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => gotoPage(0)}
            disabled={!canPreviousPage}
          >
            First
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
          <Button customBtn={styles.paginationBtn}>1</Button>
          <Button customBtn={styles.paginationBtn}>2</Button>
          <Button customBtn={styles.paginationBtn}>3</Button>
          <Button customBtn={styles.paginationBtn}>4</Button>
          <Button customBtn={styles.paginationBtn}>5</Button>
          <Button customBtn={styles.paginationBtn} disabled={!canPreviousPage}>
            ...
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </Button>
          <Button
            customBtn={styles.paginationBtn}
            onClick={() => gotoPage(pageCount - 1)}
            disabled={!canNextPage}
          >
            Last
          </Button>
        </div>
      </div>
    </>
  );
};
