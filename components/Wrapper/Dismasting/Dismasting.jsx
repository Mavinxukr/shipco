import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getClientDismanting } from '../../../redux/actions/clientDismanting';
import {
  clientDismantingDataReceivedSelector,
  clientDismantingDataSelector,
} from '../../../utils/selectors';
import MainLayout from '../../Layout/Global/Global';
import SelectCustom from '../../SelectCustom/SelectCustom';
import CustomTable from '../../CustomTable/CustomTable';
import Button from '../../Button/Button';
import Pagination from '../../Pagination/Pagination';
import CarInformation from '../../CarInformation/CarInformation';
import IconFilter from '../../../assets/svg/Group (5).svg';
import Search from '../../Search/Search';
import { stateStatus } from './data';
import styles from './Dismasting.scss';
import Loader from '../../Loader/Loader';

const Dismasting = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const clientDismanting = useSelector(clientDismantingDataSelector);
  const isDataReceived = useSelector(clientDismantingDataReceivedSelector);

  useEffect(() => {
    dispatch(getClientDismanting({}));
  }, []);

  useEffect(() => {
    dispatch(
      getClientDismanting({
        page: router.query.page || 1,
        countpage: router.query.countpage || '10',
        port: router.query.port || '',
        search: router.query.search || '',
      }),
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.container}>
        <h3 className={styles.title}>Auto for dismanting</h3>
        <div className={styles.flex}>
          <SelectCustom
            classNameWrapper={styles.widthSelect}
            placeholder="All Ports"
            options={stateStatus}
            custonOnChange={(value) => {
              router.push({
                pathname: '/dismanting',
                query: {
                  ...router.query,
                  port: value.value,
                },
              });
              dispatch(getClientDismanting({ port: value.value }));
            }}
          />
          <div className={styles.rightBlock}>
            <Button customBtn={styles.filterText}>
              <IconFilter className={styles.filterIcon} />
              Filter
            </Button>
            <Search
              onClick={() => {
                router.push({
                  pathname: '/dismanting',
                  query: {
                    ...router.query,
                    page: 1,
                    search: document.querySelector('#search').value,
                  },
                });
                dispatch(
                  getClientDismanting({
                    search: document.querySelector('#search').value,
                  }),
                );
              }}
            />
          </div>
        </div>
        {clientDismanting.data.length === 0 ? (
          <h1 className={styles.notFound}>nothing found</h1>
        ) : (
          <CustomTable>
            <Pagination
              params={clientDismanting.links}
              pathname="/dismanting"
              router={router}
            />
            {clientDismanting.data.map(item => (
              <CarInformation key={item.id} item={item} disassembled />
            ))}
            <Pagination
              params={clientDismanting.links}
              pathname="/dismanting"
              router={router}
            />
          </CustomTable>
        )}
      </div>
    </MainLayout>
  );
};

export default Dismasting;
