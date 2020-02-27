import React, { useState } from 'react';
import { usePagination, useRowSelect, useTable } from 'react-table';
import cx from 'classnames';
import { Field, Form } from 'react-final-form';
import MainLayout from '../../Layout/Global/Global';
import Popup from '../../Popup/Popup';
import Button from '../../Button/Button';
import AsNavForSlider from '../../AsNavForSlider/AsNavForSlider';
import IconP from '../../../assets/svg/p.svg';
import IconTrash from '../../../assets/svg/Trash.svg';
import IconPlus from '../../../assets/svg/Plus.svg';
import IconFilter from '../../../assets/svg/Group (5).svg';
import IconAc from '../../../assets/svg/Ac.svg';
import IconSearch from '../../../assets/svg/Search_icon.svg';
import IconDec from '../../../assets/svg/Dec.svg';
import Search from '../../Search/Search';
import CustomTable from '../../CustomTable/CustomTable';
import {
  columns, dataTable, stateOptions, images,
} from './data';
import { required } from '../../../utils/validation';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import styles from './Parts.scss';

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

const Table = ({ columns, data, setIsPopupPhotoOpen }) => {
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
          {page.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => (
                  <td
                    className={`Parts-${cell.column.id}`}
                    {...cell.getCellProps()}
                  >
                    {cell.column.id === 'actions' ? (
                      <div className={styles.tdFlex}>
                        <Button type="button" customBtn={styles.actionsButton}>
                          <IconP />
                        </Button>
                        <Button
                          type="button"
                          customBtn={styles.actionsButton}
                          onClick={() => console.log(cell.row)}
                        >
                          <IconTrash />
                        </Button>
                        <div className={styles.rightIcon}>
                          <Button type="button" customBtn={styles.background}>
                            <IconDec />
                          </Button>
                          <Button type="button" customBtn={styles.background}>
                            <IconAc />
                          </Button>
                        </div>
                        {/* <span className={styles.colorAc}>Accepted</span><span className={styles.colorDec}>Declined</span> */}
                      </div>
                    ) : (
                      <>
                        {cell.column.id === 'photo' ? (
                          <Button
                            type="button"
                            customBtn={cx(styles.background, styles.colorDec)}
                            onClick={() => setIsPopupPhotoOpen(true)}
                          >
                            {cell.render('Cell')}
                          </Button>
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

const Parts = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupPhotoOpen, setIsPopupPhotoOpen] = useState(false);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <MainLayout>
      <div className={styles.container}>
        <h3 className={styles.title}>Parts</h3>
        <div className={styles.flex}>
          <Button
            customBtn={styles.btnIcon}
            onClick={() => setIsPopupOpen(true)}
          >
            <IconPlus className={styles.plus} />
            Add New Part
          </Button>
          <div className={styles.rightBlock}>
            <Button customBtn={styles.filterText}>
              <IconFilter className={styles.filterIcon} />
              Filter
            </Button>
            <Search />
          </div>
        </div>
        <CustomTable>
          <Table
            columns={columns}
            data={dataTable}
            setIsPopupPhotoOpen={setIsPopupPhotoOpen}
          />
        </CustomTable>
      </div>
      {isPopupOpen && (
        <Popup
          isPopupOpen={isPopupOpen}
          setIsPopupOpen={setIsPopupOpen}
          title="Add New Part"
        >
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Field name="catalog" validate={required} type="text">
                  {renderInput({
                    label: 'Catalog number',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                    icon: <IconSearch />,
                    classNameWrapperForIcon: styles.positionIcon,
                  })}
                </Field>
                <Field name="name" validate={required} type="text">
                  {renderInput({
                    label: 'Name',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field name="make" validate={required} type="text">
                  {renderInput({
                    label: 'Make',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="vin"
                  isRequired
                  validate={required}
                  component={renderSelect({
                    placeholder: '',
                    label: 'VIN Number',
                    classNameWrapper: styles.popupFieldRow,
                    classNameLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                  options={stateOptions}
                />
                <Field name="quantity" validate={required} type="text">
                  {renderInput({
                    label: 'Quantity',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <div className={styles.popupFieldRow}>
                  <label className={cx(styles.label, styles.colorDec)}>
                    Comment
                  </label>
                  <Field
                    className={cx(styles.widthInput, styles.customTextarea)}
                    name="comment"
                    component="textarea"
                    placeholder=""
                  />
                </div>
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  ADD New part
                </Button>
              </form>
            )}
          />
        </Popup>
      )}
      {isPopupPhotoOpen && (
        <Popup
          isPopupOpen={isPopupPhotoOpen}
          setIsPopupOpen={setIsPopupPhotoOpen}
          title="Parts photo"
          customPopup={styles.paddingBottom}
        >
          <AsNavForSlider sliderImages={images} />
        </Popup>
      )}
    </MainLayout>
  );
};

export default Parts;
