import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useTable } from 'react-table';
import Example from '../../Multi/Multi';
import {
  getGroups,
  deleteGroups,
  addNewGroups,
  updateGroups,
} from '../../../redux/actions/groups';
import {
  groupsDataSelector,
  groupsDataReceivedSelector,
} from '../../../utils/selectors';
import { printData, getIdsArr } from '../../../utils/helpers';
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
import { renderInput } from '../../../utils/renderInputs';
import { columns, print } from './data';
import Loader from '../../Loader/Loader';
import IconTrash from '../../../assets/svg/Trash.svg';
import styles from './Groups.scss';
import IconP from '../../../assets/svg/p.svg';

const Table = ({
  columns, data, dispatch, groupsArr,
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
    initialState: { pageIndex: 0 },
  });
  const [deleteId, setDeleteId] = useState(null);
  const [isPopupDelete, setIsPopupDelete] = useState(false);
  const [isPopupUpdate, setIsPopupUpdate] = useState(false);
  const [itemGroup, setItemGroup] = useState(null);
  const [selected, setSelected] = useState([]);

  const onSubmit = (values) => {
    const id = selected;
    const arrId = Object.keys(id).map((item, index) => ({
      value: Object.values(id)[index].value,
    }));
    const submitId = [];
    arrId.forEach((item) => {
      submitId.push(Object.values(item));
    });
    dispatch(
      updateGroups(
        {},
        {
          ...values,
          clients: submitId.join(),
        },
        itemGroup.id,
      ),
    );
    setIsPopupUpdate(false);
  };

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
                            setIsPopupUpdate(true);
                            setSelected(
                              cell.row.original.clients
                                ? cell.row.original.clients.map(item => ({
                                  value: item.clients.id,
                                  label: item.clients.name,
                                }))
                                : selected,
                            );
                          }}
                        >
                          <IconP />
                        </Button>
                        <Button
                          type="button"
                          customBtn={styles.actionsButton}
                          onClick={() => {
                            setDeleteId(cell.row.original.id);
                            setIsPopupDelete(true);
                          }}
                        >
                          <IconTrash />
                        </Button>
                      </>
                    ) : (
                      <>
                        {cell.column.id === 'client' ? (
                          <>
                            {(cell.row.original.clients
                              && cell.row.original.clients.length)
                              || '0'}
                          </>
                        ) : (
                          <>
                            {cell.column.id === 'due_day' ? (
                              <Link
                                href={{
                                  pathname: '/prices',
                                  query: {
                                    idClient: cell.row.original.price_id,
                                  },
                                }}
                              >
                                <a
                                  className={
                                    cell.row.original.is_finish
                                      ? styles.red
                                      : undefined
                                  }
                                >
                                  {cell.render('Cell')}
                                </a>
                              </Link>
                            ) : (
                              <>{cell.render('Cell')}</>
                            )}
                          </>
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
      {isPopupUpdate && (
        <Popup setIsPopupOpen={setIsPopupUpdate} title="Update Group ">
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
                <Field
                  name="name"
                  validate={required}
                  type="text"
                  defaultValue={itemGroup.name}
                >
                  {renderInput({
                    label: 'Name',
                    classNameWrapper: styles.popupFieldRow,
                    widthInputBlock: styles.widthInputBlock,
                    classNameWrapperLabel: styles.label,
                  })}
                </Field>
                <Example
                  options={groupsArr}
                  setSelected={setSelected}
                  value={selected}
                />
                <Field
                  name="price"
                  validate={composeValidators(required, mustBeNumber)}
                  type="text"
                  defaultValue={itemGroup.price}
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
                    Update Group
                  </Button>
                </div>
              </form>
            )}
          />
        </Popup>
      )}
      {isPopupDelete && (
        <Popup setIsPopupOpen={setIsPopupDelete} title="Delete this group">
          <p>Are you sure that you want to delete this group?</p>
          <div className={styles.groupPopupBtn}>
            <Button
              type="button"
              customBtn={styles.popupBtn}
              onClick={() => {
                dispatch(deleteGroups({}, deleteId));
                setDeleteId(null);
                setIsPopupDelete(false);
              }}
            >
              Yes
            </Button>
            <Button
              type="button"
              customBtn={styles.popupBtn}
              onClick={() => {
                setDeleteId(null);
                setIsPopupDelete(false);
              }}
            >
              No
            </Button>
          </div>
        </Popup>
      )}
    </>
  );
};

const Groups = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [printPopup, setPrintPopup] = useState(false);
  const [selected, setSelected] = useState([]);

  const groups = useSelector(groupsDataSelector);
  const isDataReceived = useSelector(groupsDataReceivedSelector);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGroups({}));
  }, []);

  useEffect(() => {
    dispatch(
      getGroups({
        page: router.query.page || 1,
        countpage: router.query.countpage || '10',
      }),
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  const onSubmit = (values) => {
    const arrId = selected.map(item => item.value);
    dispatch(
      addNewGroups(
        {},
        {
          ...values,
          clients: arrId.join(),
        },
      ),
    );
    setIsPopupOpen(false);
  };

  const onSubmitPrint = () => {
    const idsArr = getIdsArr(selected);
    printData({
      params: {
        fields: idsArr,
      },
      table: 'groups',
      selected: idsArr,
      setSelected,
      setPrintPopup,
    });
  };

  return (
    <MainLayout admin>
      <div className={styles.container}>
        <div className={styles.flex}>
          <h4 className={styles.title}>Groups</h4>
        </div>
        <div className={styles.flex}>
          <div className={styles.groupBtn}>
            <Button
              type="button"
              customBtn={styles.btnIcon}
              onClick={() => {
                setSelected([]);
                setIsPopupOpen(true);
              }}
            >
              <IconPlus className={cx(styles.plus, styles.icon)} />
              Add New Groups
            </Button>
          </div>
          <div className={styles.groupBtn}>
            <Button
              customBtn={styles.rightBtn}
              onClick={() => setPrintPopup(true)}
            >
              Print
            </Button>
            <Button customBtn={styles.rightBtn}>Import</Button>
          </div>
        </div>
        {groups.data.length !== 0 ? (
          <CustomTable>
            <Pagination
              params={groups.links}
              pathname="/groups"
              router={router}
            />
            <div className={styles.scrollTable}>
              <Table
                columns={columns}
                data={groups.data}
                dispatch={dispatch}
                groupsArr={groups.additional.clients}
              />
            </div>
            <Pagination
              params={groups.links}
              pathname="/groups"
              router={router}
            />
          </CustomTable>
        ) : (
          <h1 className={styles.notFound}>nothing found</h1>
        )}
      </div>
      {isPopupOpen && (
        <Popup setIsPopupOpen={setIsPopupOpen} title="Add New Group ">
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
                <Example
                  options={groups.additional.clients}
                  setSelected={setSelected}
                  value={selected}
                />
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
                    ADD New Group
                  </Button>
                </div>
              </form>
            )}
          />
        </Popup>
      )}
      {printPopup && (
        <Popup
          customPopup={styles.heightPopup}
          setIsPopupOpen={setPrintPopup}
          title="Print"
        >
          <Form
            onSubmit={onSubmitPrint}
            render={({ handleSubmit, invalid, submitting }) => (
              <form onSubmit={handleSubmit}>
                <div className={styles.columnSelect}>
                  <Example
                    options={print}
                    setSelected={setSelected}
                    value={selected}
                    label="Select the fields Print"
                  />
                  <Button
                    customBtn={styles.btnSubmit}
                    type="submit"
                    disabled={submitting || invalid}
                  >
                    Submit
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
