import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getDismanting } from '../../../redux/actions/dismanting';
import {
  dismantingDataSelector,
  dismantingDataReceivedSelector,
} from '../../../utils/selectors';
import MainLayout from '../../Layout/Global/Global';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import SelectCustom from '../../SelectCustom/SelectCustom';
import CustomTable from '../../CustomTable/CustomTable';
import Button from '../../Button/Button';
import Pagination from '../../Pagination/Pagination';
import CarInformation from '../../CarInformation/CarInformation';
import IconFilter from '../../../assets/svg/Group (5).svg';
import { stateStatus } from './data';
import styles from './Dismasting.scss';
import Loader from '../../Loader/Loader';
import { updateShipping } from '../../../redux/actions/shipping';

const Dismasting = () => {
  const router = useRouter();

  const dismanting = useSelector(dismantingDataSelector);
  const isDataReceived = useSelector(dismantingDataReceivedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDismanting({}));
  }, []);

  useEffect(() => {
    dispatch(
      getDismanting({
        page: router.query.page || 1,
        countpage: router.query.countpage || '10',
        port: router.query.port || '',
      }),
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout newLink admin>
      <SubHeader />
      <div className={styles.container}>
        <div className={styles.flex}>
          <SelectCustom
            classNameWrapper={styles.widthSelect}
            placeholder="All Ports"
            options={stateStatus}
            custonOnChange={(value) => {
              router.push({
                pathname: '/auto-admin/dismanting',
                query: {
                  ...router.query,
                  port: value.value,
                },
              });
              dispatch(getDismanting({ port: value.value }));
            }}
          />
          <div className={styles.rightBlock}>
            <Button customBtn={styles.filterText}>
              <IconFilter className={styles.filterIcon} />
              Filter
            </Button>
          </div>
        </div>
        {dismanting.data.length === 0 ? (
          <h1 className={styles.notFound}>nothing found</h1>
        ) : (
          <CustomTable>
            <Pagination
              params={dismanting.links}
              pathname="/auto-admin/dismanting"
              router={router}
            />
            {dismanting.data.map(item => (
              <CarInformation
                key={item.id}
                item={item}
                disassembled
                status
                admin
                updateStatus={el => dispatch(
                  updateShipping(
                    {},
                    {
                      status: el.target.id,
                    },
                    item.id,
                  ),
                )
                }
              />
            ))}
            <Pagination
              params={dismanting.links}
              pathname="/auto-admin/dismanting"
              router={router}
            />
          </CustomTable>
        )}
      </div>
    </MainLayout>
  );
};

export default Dismasting;
