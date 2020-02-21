import React from 'react';
import cx from 'classnames';
import { useTable, useSortBy } from 'react-table';
import CustomSlider from '../../CustomSlider/CustomSlider';
import CustomStepper from '../../CustomStepper/CustomStepper';
import styles from './Overview.scss';
import MainLayout from '../../Layout/Global/Global';
import CustomTable from '../../CustomTable/CustomTable';
import Image from '../../Image/Image';
import IconShipping from '../../../assets/svg/icon.svg';
import {
  dataSlider, dataShipping, dataTable, columns,
} from './data';
import IconSortTable from '../../../assets/svg/SortTable.svg';

const Overview = () => (
  <MainLayout>
    <div className={styles.container}>
      <CustomSlider
        className={styles.containerSlider}
        titleSlider="Popular Vehicles Right Now"
        count={4}
        countXl={2}
        countMd={1}
        amountArrProduct={dataSlider.length}
      >
        {dataSlider.map(item => (
          <div className={styles.slider} key={item.id}>
            <div>
              <Image className={styles.image} src={item.src} />
            </div>
            <h6 className={styles.titleSlider}>{item.title}</h6>
            <div className={styles.flex}>
              <span>{item.lot}</span>
              <span>
                Current Bid:{' '}
                <span className={styles.title}>{item.current}</span>
              </span>
            </div>
            <div className={styles.flex}>
              <span>{item.location}</span>
              <span className={styles.circle}>e</span>
            </div>
            <div className={styles.bg}>{item.view}</div>
          </div>
        ))}
      </CustomSlider>
      <CustomSlider
        className={styles.containerSlider}
        titleSlider="Shipping "
        count={3}
        countXl={2}
        countMd={1}
        amountArrProduct={dataShipping.length}
      >
        {dataShipping.map(item => (
          <div className={styles.slider} key={item.id}>
            <div className={cx(styles.flex, styles.firstBlock)}>
              <span className={styles.title}>
                <IconShipping className={styles.sliderIcon} />
                {item.idCar}
              </span>
              <span className={styles.title}>{item.title}</span>
            </div>
            <div className={styles.flex}>
              <span>{item.firstDate}</span>
              <span>{item.secondDate}</span>
            </div>
            <div className={styles.flex}>
              <b>{item.from}</b>
              <b>{item.to}</b>
            </div>
            <CustomStepper activeStep={item.step} />
            <p className={styles.center}>{item.car}</p>
          </div>
        ))}
      </CustomSlider>
      <CustomTable title="Invoices">
        <Table columns={columns} data={dataTable} />
      </CustomTable>
    </div>
  </MainLayout>
);

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
                  <td className={`Overview-${cell.column.id}`} {...cell.getCellProps()}>{cell.render('Cell')}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};
