import React, { useEffect, useState } from 'react';
import { useTable } from 'react-table';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import cx from 'classnames';
import { Field, Form } from 'react-final-form';
import {
  getClientParts,
  addNewClientParts,
  deleteClientParts,
  updateClientParts,
} from '../../../redux/actions/clientParts';
import {
  clientPartsDataSelector,
  clientPartsDataReceivedSelector,
  currentUserDataSelector,
} from '../../../utils/selectors';
import MainLayout from '../../Layout/Global/Global';
import Popup from '../../Popup/Popup';
import Button from '../../Button/Button';
import AsNavForSlider from '../../AsNavForSlider/AsNavForSlider';
import IconP from '../../../assets/svg/p.svg';
import IconTrash from '../../../assets/svg/Trash.svg';
import IconPlus from '../../../assets/svg/Plus.svg';
import IconFilter from '../../../assets/svg/Group (5).svg';
import CustomTable from '../../CustomTable/CustomTable';
import { columns, status } from './data';
import {
  composeValidators,
  mustBeNumber,
  required,
} from '../../../utils/validation';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import styles from './Parts.scss';
import Loader from '../../Loader/Loader';
import Pagination from '../../Pagination/Pagination';
import { getCurrentUser } from '../../../redux/actions/currentUser';
import HoverPopup from '../../HoverPopup/HoverPopup';
import { getParts } from '../../../redux/actions/parts';

const Table = ({
  columns,
  data,
  setIsPopupPhotoOpen,
  setSliderImages,
  setIsPopupUpdateOpen,
  setUpdateData,
}) => {
  const dispatch = useDispatch();

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
                  {cell.column.id === 'actions' ? (
                    <div className={styles.tdFlex}>
                      <Button
                        type="button"
                        customBtn={styles.actionsButton}
                        onClick={() => {
                          setUpdateData(cell.row.original);
                          setIsPopupUpdateOpen(true);
                        }}
                      >
                        <IconP />
                      </Button>
                      <Button
                        type="button"
                        customBtn={styles.actionsButton}
                        onClick={() => dispatch(deleteClientParts({}, cell.row.original.id))
                        }
                      >
                        <IconTrash />
                      </Button>
                    </div>
                  ) : (
                    <>
                      {cell.column.id === 'photo' ? (
                        <Button
                          type="button"
                          customBtn={cx(
                            styles.background,
                            styles.colorDec,
                            cell.row.original.images.length === 0
                              && styles.disabled,
                          )}
                          onClick={() => {
                            if (cell.row.original.images.length > 0) {
                              setSliderImages(cell.row.original.images);
                              setIsPopupPhotoOpen(true);
                            }
                          }}
                        >
                          View pics
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
  );
};

const Parts = () => {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupPhotoOpen, setIsPopupPhotoOpen] = useState(false);
  const [isPopupUpdateOpen, setIsPopupUpdateOpen] = useState(false);
  const [updateData, setUpdateData] = useState(null);
  const [stepIndex, setStepIndex] = useState(0);
  const [sliderImages, setSliderImages] = useState([]);
  const clientParts = useSelector(clientPartsDataSelector);
  const isDataReceived = useSelector(clientPartsDataReceivedSelector);
  const user = useSelector(currentUserDataSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser({}));
  }, []);

  useEffect(() => {
    dispatch(getClientParts({}));
  }, []);

  useEffect(() => {
    dispatch(
      getClientParts({
        page: router.query.page || 1,
        countpage: router.query.countpage || '10',
        part_status: router.query.status || '',
      }),
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  const vinNumbers = clientParts.additional.vin_numbers;
  const vinArr = Object.keys(vinNumbers).map((item, index) => ({
    id: index + 1,
    label: vinNumbers[index].vin,
    value: vinNumbers[index].vin,
  }));

  const catalogNumbers = clientParts.additional.catalog_numbers;
  const catalogArr = Object.keys(catalogNumbers).map((item, index) => ({
    id: index + 1,
    label: catalogNumbers[index].catalog_number,
    value: catalogNumbers[index].catalog_number,
  }));

  const onSubmit = async (values) => {
    dispatch(
      addNewClientParts(
        {},
        {
          ...values,
          client_id: user.id,
          vin: values.vin && values.vin.label,
          catalog_number: values.catalog_number && values.catalog_number.label,
        },
      ),
    );
    setIsPopupOpen(false);
  };

  const onSubmitUpdate = async (values) => {
    dispatch(
      updateClientParts(
        {},
        {
          ...values,
          vin: values.vin && values.vin.label,
          catalog_number: values.catalog_number && values.catalog_number.label,
        },
        updateData.id,
      ),
    );
    setIsPopupUpdateOpen(false);
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
              Status
            </Button>
            <HoverPopup>
              {status.map((statusFilter, index) => {
                const classNameForButton = cx(styles.btnStatus, {
                  [styles.activeStatus]: stepIndex === index,
                });

                return (
                  <Button
                    onClick={() => {
                      setStepIndex(index);
                      router.push({
                        pathname: '/parts',
                        query: {
                          ...router.query,
                          page: 1,
                          part_status: statusFilter.value,
                        },
                      });
                      dispatch(
                        getParts({
                          part_status: statusFilter.value,
                        }),
                      );
                    }}
                    customBtn={classNameForButton}
                    key={statusFilter.id}
                  >
                    {statusFilter.label}
                  </Button>
                );
              })}
            </HoverPopup>
          </div>
        </div>
        {clientParts.data.length !== 0 ? (
          <CustomTable>
            <Pagination
              params={clientParts.links}
              pathname="/parts"
              router={router}
            />
            <div className={styles.scrollTable}>
              <Table
                columns={columns}
                data={clientParts.data}
                setIsPopupPhotoOpen={setIsPopupPhotoOpen}
                setSliderImages={setSliderImages}
                setIsPopupOpen={setIsPopupOpen}
                setIsPopupUpdateOpen={setIsPopupUpdateOpen}
                setUpdateData={setUpdateData}
              />
            </div>
            <Pagination
              params={clientParts.links}
              pathname="/parts"
              router={router}
            />
          </CustomTable>
        ) : (
          <h1 className={styles.notFound}>nothing found</h1>
        )}
      </div>
      {isPopupUpdateOpen && (
        <Popup setIsPopupOpen={setIsPopupUpdateOpen} title="Update Part">
          <Form
            onSubmit={onSubmitUpdate}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="catalog_number"
                  component={renderSelect({
                    placeholder: updateData.catalog_number,
                    label: 'Catalog number',
                    classNameWrapper: styles.popupFieldRow,
                    classNameLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                  options={catalogArr}
                />
                <Field
                  name="name"
                  type="text"
                  defaultValue={updateData.name || ''}
                >
                  {renderInput({
                    label: 'Name',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="auto"
                  type="text"
                  defaultValue={updateData.auto || ''}
                >
                  {renderInput({
                    label: 'Auto',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="vin"
                  isRequired
                  component={renderSelect({
                    placeholder: updateData.vin,
                    label: 'VIN Number',
                    classNameWrapper: styles.popupFieldRow,
                    classNameLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                  options={vinArr}
                />
                <Field
                  name="container"
                  validate={mustBeNumber}
                  type="text"
                  defaultValue={updateData.container || ''}
                >
                  {renderInput({
                    label: 'Container',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field
                  name="quality"
                  type="text"
                  defaultValue={updateData.quality || ''}
                >
                  {renderInput({
                    label: 'Quality',
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
                    defaultValue={updateData.comment || ''}
                  />
                </div>
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  Update part
                </Button>
              </form>
            )}
          />
        </Popup>
      )}
      {isPopupOpen && (
        <Popup setIsPopupOpen={setIsPopupOpen} title="Add New Part">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
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
                  options={catalogArr}
                />
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
                  options={vinArr}
                />
                <Field
                  name="container"
                  validate={composeValidators(required, mustBeNumber)}
                  type="text"
                >
                  {renderInput({
                    label: 'Container',
                    classNameWrapper: styles.popupFieldRow,
                    classNameWrapperLabel: styles.label,
                    widthInputBlock: styles.widthInput,
                  })}
                </Field>
                <Field name="quality" validate={required} type="text">
                  {renderInput({
                    label: 'Quality',
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
          <AsNavForSlider sliderImages={sliderImages} />
        </Popup>
      )}
    </MainLayout>
  );
};

export default Parts;
