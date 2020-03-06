import React, { useState } from 'react';
import cx from 'classnames';
import {
  usePagination, useRowSelect, useTable, useSortBy,
} from 'react-table';
import { Field, Form } from 'react-final-form';
import formatStringByPattern from 'format-string-by-pattern';
import Button from '../../Button/Button';
import Search from '../../Search/Search';
import Popup from '../../Popup/Popup';
import MainLayout from '../../Layout/Global/Global';
import IconPlus from '../../../assets/svg/Plus.svg';
import IconMinus from '../../../assets/svg/min.svg';
import { columns, dataTable } from './data';
import CustomTable from '../../CustomTable/CustomTable';
import IconSortTable from '../../../assets/svg/SortTable.svg';
import {
  composeValidators,
  emailValidation,
  mustBeNumber,
  required,
  passwordValidation,
} from '../../../utils/validation';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import styles from './BaseClient.scss';
import { stateOptions } from '../../Wrapper/ProfileSettings/data';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef();
    const resolvedRef = ref || defaultRef;

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate;
    }, [resolvedRef, indeterminate]);

    return (
      <>
        <input type="checkbox" ref={resolvedRef} {...rest} />
      </>
    );
  },
);

const BaseClient = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <MainLayout admin>
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>Base client</h4>
          <Search />
        </div>
        <div className={styles.flex}>
          <div className={styles.groupBtn}>
            <Button
              type="button"
              onClick={() => setIsPopupOpen(true)}
              customBtn={styles.btnIcon}
            >
              <IconPlus className={cx(styles.plus, styles.icon)} />
              Add New client
            </Button>
            {isPopupOpen && (
              <Popup
                setIsPopupOpen={setIsPopupOpen}
                title="Add New Client "
                subTitle="(000011) 31.08.2019"
              >
                <Form
                  onSubmit={onSubmit}
                  render={({ handleSubmit, invalid, submitting }) => (
                    <form onSubmit={handleSubmit}>
                      <Field name="Name" validate={required} type="text">
                        {renderInput({
                          label: 'Name',
                          classNameWrapper: styles.popupFieldRow,
                          widthInputBlock: styles.widthInputBlock,
                          classNameWrapperLabel: styles.label,
                        })}
                      </Field>
                      <Field name="Username" validate={required} type="text">
                        {renderInput({
                          label: 'Username',
                          classNameWrapper: styles.popupFieldRow,
                          widthInputBlock: styles.widthInputBlock,
                          classNameWrapperLabel: styles.label,
                        })}
                      </Field>
                      <Field
                        name="Email Address"
                        validate={composeValidators(required, emailValidation)}
                        type="email"
                      >
                        {renderInput({
                          label: 'Email Address',
                          classNameWrapper: styles.popupFieldRow,
                          widthInputBlock: styles.widthInputBlock,
                          classNameWrapperLabel: styles.label,
                        })}
                      </Field>
                      <Field
                        name="phone number"
                        validate={composeValidators(required, mustBeNumber)}
                        type="text"
                        parse={formatStringByPattern('+9 9999 999 99 99')}
                      >
                        {renderInput({
                          label: 'Phone number',
                          classNameWrapper: styles.popupFieldRow,
                          widthInputBlock: styles.widthInputBlock,
                          classNameWrapperLabel: styles.label,
                        })}
                      </Field>
                      <Field
                        name="Password"
                        validate={composeValidators(
                          required,
                          passwordValidation,
                        )}
                        type="password"
                      >
                        {renderInput({
                          label: 'Password',
                          classNameWrapper: styles.popupFieldRow,
                          widthInputBlock: styles.widthInputBlock,
                          classNameWrapperLabel: styles.label,
                        })}
                      </Field>
                      <Field
                        name="country"
                        validate={required}
                        isRequired
                        component={renderSelect({
                          placeholder: '',
                          label: 'Country',
                          classNameWrapper: 'SelectCustom-popupFieldRow',
                        })}
                        options={stateOptions}
                      />
                      <Field
                        name="city"
                        validate={required}
                        isRequired
                        component={renderSelect({
                          placeholder: '',
                          classNameWrapper: 'SelectCustom-popupFieldRow',
                          label: 'City',
                        })}
                        options={stateOptions}
                      />
                      <Field
                        name="zip"
                        validate={composeValidators(required, mustBeNumber)}
                        type="text"
                      >
                        {renderInput({
                          label: 'Zip',
                          classNameWrapper: styles.popupFieldRow,
                          widthInputBlock: styles.widthInputBlock,
                          classNameWrapperLabel: styles.label,
                        })}
                      </Field>
                      <Field name="adress" validate={required} type="text">
                        {renderInput({
                          label: 'Adress',
                          classNameWrapper: styles.popupFieldRow,
                          widthInputBlock: styles.widthInputBlock,
                          classNameWrapperLabel: styles.label,
                        })}
                      </Field>
                      <Field
                        name="cart"
                        validate={composeValidators(required, mustBeNumber)}
                        type="text"
                        parse={formatStringByPattern('9999 9999 9999 9999')}
                      >
                        {renderInput({
                          label: 'Cart number',
                          classNameWrapper: styles.popupFieldRow,
                          widthInputBlock: styles.widthInputBlock,
                          classNameWrapperLabel: styles.label,
                        })}
                      </Field>
                      <Field name="Add photo" type="file">
                        {renderInput({
                          label: 'Add photo',
                          classNameWrapper: styles.popupFieldRow,
                          widthInputBlock: cx(styles.widthInputBlock, styles.file),
                          classNameWrapperLabel: styles.label,
                        })}
                      </Field>
                      <div className={styles.submitPopup}>
                        <Button
                          customBtn={styles.btnSubmit}
                          type="submit"
                          disabled={submitting || invalid}
                        >
                          ADD New Client
                        </Button>
                      </div>
                    </form>
                  )}
                />
              </Popup>
            )}
            <Button customBtn={styles.btnIcon}>
              <IconMinus className={styles.icon} />
              Delete client
            </Button>
          </div>
          <div className={styles.groupBtn}>
            <Button customBtn={styles.rightBtn}>Print</Button>
            <Button customBtn={styles.rightBtn}>Import</Button>
          </div>
        </div>
        <CustomTable>
          <Table columns={columns} data={dataTable} />
        </CustomTable>
      </div>
    </MainLayout>
  );
};

export default BaseClient;

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
    useSortBy,
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
                <th
                  className={styles.sortHeader}
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
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    className={`BaseClient-${cell.column.id}`}
                    {...cell.getCellProps()}
                  >
                    {cell.render('Cell')}
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
