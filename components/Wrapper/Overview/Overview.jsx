import React, { useEffect } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useTable, useSortBy } from 'react-table';
import CustomSlider from '../../CustomSlider/CustomSlider';
import CustomStepper from '../../CustomStepper/CustomStepper';
import MainLayout from '../../Layout/Global/Global';
import CustomTable from '../../CustomTable/CustomTable';
import Image from '../../Image/Image';
import IconShipping from '../../../assets/svg/icon.svg';
import { columns } from './data';
import IconSortTable from '../../../assets/svg/SortTable.svg';
import { getOverview } from '../../../redux/actions/overview';
import Loader from '../../Loader/Loader';
import {
  overviewDataSelector,
  overviewDataReceivedSelector,
} from '../../../utils/selectors';
import styles from './Overview.scss';

const Overview = () => {
  const overviews = useSelector(overviewDataSelector);
  const isDataReceived = useSelector(overviewDataReceivedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOverview({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  console.log(overviews.vehicles);

  return (
    <MainLayout>
      <div className={styles.container}>
        <>
          {overviews.vehicles && (
            <CustomSlider
              className={styles.containerSlider}
              titleSlider="Popular Vehicles Right Now"
              count={4}
              countXl={2}
              countMd={1}
              amountArrProduct={overviews.vehicles.length}
            >
              {overviews.vehicles.map(item => (
                <div className={styles.slider} key={item.id}>
                  <div>
                    {item.document ? (
                      <Image
                        className={styles.image}
                        src={item.document.link}
                      />
                    ) : (
                      <Image
                        className={styles.image}
                        src="/images/no-preview-available.png"
                      />
                    )}
                  </div>
                  <h6 className={styles.titleSlider}>{item.model_name}</h6>
                  <div className={styles.flex}>
                    <span>{item.lot_info.lot_number}</span>
                  </div>
                  <div className={styles.flex}>
                    <span>{item.sale_info.location}</span>
                    <span className={styles.circle}>e</span>
                  </div>
                  <div className={styles.bg}>
                    <Link href="/auto/[bid]" as={`/auto/${item.id}`}>
                      <a className={styles.link}>view</a>
                    </Link>
                  </div>
                </div>
              ))}
            </CustomSlider>
          )}
        </>
        <>
          {overviews.latest_shippings && (
            <CustomSlider
              className={styles.containerSlider}
              titleSlider="Shipping "
              count={3}
              countXl={2}
              countMd={1}
              // amountArrProduct={overviews.latest_shippings.length}
            >
              {overviews.latest_shippings.map(item => (
                <div className={styles.slider} key={item.id}>
                  <div className={cx(styles.flex, styles.firstBlock)}>
                    <span className={styles.title}>
                      <IconShipping className={styles.sliderIcon} />
                      {item.id}
                    </span>
                    <span className={styles.title}>{item.model_name}</span>
                  </div>
                  <CustomStepper item={item} />
                </div>
              ))}
            </CustomSlider>
          )}
        </>
        <>
          {overviews.latest_invoices && (
            <CustomTable title="Invoices">
              <Table columns={columns} data={overviews.latest_invoices} />
            </CustomTable>
          )}
        </>
      </div>
    </MainLayout>
  );
};

export default Overview;

const Table = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns,
      data,
    },
    useSortBy,
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <IconSortTable className={styles.sort} />
                  {column.render('Header')}
                </th>
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
                    className={`Overview-${cell.column.id}`}
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
    </>
  );
};
