import React, { useEffect, useState } from 'react';
import { usePagination, useRowSelect, useTable } from 'react-table';
import { useSelector, useDispatch } from 'react-redux';
import { Field, Form } from 'react-final-form';
import { getParts, deleteParts } from '../../../redux/actions/parts';
import {
  partsDataSelector,
  partsDataReceivedSelector,
} from '../../../utils/selectors';
import Loader from '../../Loader/Loader';
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
// import IconSearch from '../../../assets/svg/Search_icon.svg';
import Search from '../../Search/Search';
import CustomTable from '../../CustomTable/CustomTable';
import { columns } from './data';
import styles from './Parts.scss';
import {
  required,
  mustBeNumber,
  composeValidators,
} from '../../../utils/validation';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import Pagination from '../../Pagination/Pagination';

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
  const dispatch = useDispatch();

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
                  {cell.column.id === 'actions' ? (
                    <>
                      <Button type="button" customBtn={styles.actionsButton}>
                        <IconP />
                      </Button>
                      <Button
                        type="button"
                        customBtn={styles.actionsButton}
                        onClick={() => dispatch(deleteParts({}, cell.row.original.id))
                        }
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
  );
};

const Parts = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [arrPicsContainer, setArrPicsContainer] = useState([]);
  const [newArrPicsContainer, setNewArrPicsContainer] = useState([]);
  const [initialPage, setInitialPage] = useState(0);
  const [countPagination, setCountPagination] = useState('10');

  const parts = useSelector(partsDataSelector);
  const isDataReceived = useSelector(partsDataReceivedSelector);

  useEffect(() => {
    if (parts) {
      setCountPagination(`${parts.links.per_page}`);
    }
  }, [parts]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getParts({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  const vinNumbers = parts.additional.vin_numbers;
  const vinArr = Object.keys(vinNumbers).map((item, index) => ({
    id: index + 1,
    label: item,
    value: vinNumbers[item],
  }));

  console.log('vinArr', vinArr);

  const onSubmit = async (values) => {
    console.log(values);
  };

  return (
    <MainLayout admin>
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
          <Pagination
            params={parts.links}
            countPagination={countPagination}
            setInitialPage={setInitialPage}
            initialPage={initialPage}
            action={getParts}
            onPageChange={(data) => {
              dispatch(
                getParts({
                  page: data.selected + 1,
                  countpage: countPagination,
                }),
              );
              setInitialPage(data.selected);
            }}
          />
          <div className={styles.scrollTable}>
            <Table columns={columns} data={parts.data} />
          </div>
          <Pagination
            params={parts.links}
            countPagination={countPagination}
            setInitialPage={setInitialPage}
            initialPage={initialPage}
            action={getParts}
            onPageChange={(data) => {
              dispatch(
                getParts({
                  page: data.selected + 1,
                  countpage: countPagination,
                }),
              );
              setInitialPage(data.selected);
            }}
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
                <Field name="client_id" validate={required} type="text">
                  {renderInput({
                    label: 'Client ID',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="catalog_number"
                  validate={required}
                  component={renderSelect({
                    placeholder: '',
                    label: 'Catalog number',
                    classNameWrapper: styles.popupFieldRow,
                    classNameLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                  options={parts.additional.catalog_numbers}
                />
                {/* <Field name="catalog_number" validate={required} type="text"> */}
                {/*  {renderInput({ */}
                {/*    label: 'Catalog number', */}
                {/*    classNameWrapper: styles.popupFieldRow, */}
                {/*    classNameWrapperLabel: styles.label, */}
                {/*    widthInputBlock: styles.widthInput, */}
                {/*    icon: <IconSearch />, */}
                {/*    classNameWrapperForIcon: styles.positionIcon, */}
                {/*  })} */}
                {/* </Field> */}
                <Field name="name" validate={required} type="text">
                  {renderInput({
                    label: 'Name',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field name="auto" validate={required} type="text">
                  {renderInput({
                    label: 'Auto',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                {/*<Field*/}
                {/*  name="vin"*/}
                {/*  validate={required}*/}
                {/*  component={renderSelect({*/}
                {/*    placeholder: '',*/}
                {/*    label: 'VIN Number',*/}
                {/*    classNameWrapper: styles.popupFieldRow,*/}
                {/*    classNameLabel: styles.label,*/}
                {/*    widthInputBlock: styles.widthInput,*/}
                {/*  })}*/}
                {/*  options={vinArr}*/}
                {/*/>*/}
                <Field name="quality" validate={required} type="text">
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
                  setNewArrPics={setNewArrPicsContainer}
                  newArrPics={newArrPicsContainer}
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
