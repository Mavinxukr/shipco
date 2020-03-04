import React from 'react';
import MainLayout from '../../Layout/Global/Global';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import SelectCustom from '../../SelectCustom/SelectCustom';
import CustomTable from '../../CustomTable/CustomTable';
import Button from '../../Button/Button';
import Pagination from '../../Pagination/Pagination';
import CarInformation from '../../CarInformation/CarInformation';
import IconFilter from '../../../assets/svg/Group (5).svg';
import Search from '../../Search/Search';
import { stateStatus, carInfo } from './data';
import styles from './Shipping.scss';

const Shipping = () => (
  <MainLayout>
    <SubHeader />
    <div className={styles.container}>
      <div className={styles.flex}>
        <SelectCustom classNameWrapper={styles.widthSelect} placeholder="All Status" options={stateStatus} />
        <div className={styles.rightBlock}>
          <Button customBtn={styles.filterText}>
            <IconFilter className={styles.filterIcon} />
            Filter
          </Button>
          <Search />
        </div>
      </div>
      <CustomTable>
        <Pagination />
        {carInfo.map(item => (
          <CarInformation key={item.id} item={item} />
        ))}
        <Pagination />
      </CustomTable>
    </div>
  </MainLayout>
);

export default Shipping;
