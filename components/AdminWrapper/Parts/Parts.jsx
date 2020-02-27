import React, { useState } from 'react';
import { usePagination, useRowSelect, useTable } from 'react-table';
import { Field, Form } from 'react-final-form';
import MainLayout from '../../Layout/Global/Global';
import Popup from '../../Popup/Popup';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import Button from '../../Button/Button';
import Previews from '../../Previews/Previews';
import IconP from '../../../assets/svg/p.svg';
import IconTrash from '../../../assets/svg/Trash.svg';
import IconPlus from '../../../assets/svg/Plus.svg';
import IconUpload from '../../../assets/svg/uploadfile.svg';
import IconFilter from '../../../assets/svg/Group (5).svg';
import IconSearch from '../../../assets/svg/Search_icon.svg';
import Search from '../../Search/Search';
import CustomTable from '../../CustomTable/CustomTable';
import { columns, dataTable, stateOptions } from './data';
import styles from './Parts.scss';
import { required, mustBeNumber, composeValidators } from '../../../utils/validation';
import { renderInput, renderSelect } from '../../../utils/renderInputs';

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
                      <>
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

const Parts = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [arrPicsContainer, setArrPicsContainer] = useState([]);

  const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

  const onSubmit = async (values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <MainLayout>
      <SubHeader />
      <div className={styles.container}>
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
          <Table columns={columns} data={dataTable} />
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
                <Field
                  name="id"
                  validate={required}
                  type="text"
                >
                  {renderInput({
                    label: 'Client ID',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="catalog"
                  validate={required}
                  type="text"
                >
                  {renderInput({
                    label: 'Catalog number',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                    icon: <IconSearch />,
                    classNameWrapperForIcon: styles.positionIcon,
                  })}
                </Field>
                <Field
                  name="name"
                  validate={required}
                  type="text"
                >
                  {renderInput({
                    label: 'Name',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="make"
                  validate={required}
                  type="text"
                >
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
                <Field
                  name="quantity"
                  validate={required}
                  type="text"
                >
                  {renderInput({
                    label: 'Quantity',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="container"
                  validate={composeValidators(required, mustBeNumber)}
                  type="text"
                >
                  {renderInput({
                    label: 'Add container #',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Previews
                  icon={<IconUpload className={styles.icon} />}
                  setArrPics={setArrPicsContainer}
                  arrPics={arrPicsContainer}
                  title="Add photo"
                  customText={styles.customText}
                  customIconBlock={styles.customIconBlock}
                  customThumbs={styles.thumbs}
                />
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
    </MainLayout>
  );
};

export default Parts;
