import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import {
  getClientShipping,
  updateClientShipping,
} from '../../../redux/actions/clientShipping';
import {
  clientShippingDataSelector,
  clientShippingDataReceivedSelector,
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
import styles from './Shipping.scss';
import Loader from '../../Loader/Loader';

const Shipping = () => {
  const router = useRouter();

  const dispatch = useDispatch();

  const clientShipping = useSelector(clientShippingDataSelector);
  const isDataReceived = useSelector(clientShippingDataReceivedSelector);

  useEffect(() => {
    dispatch(getClientShipping({}));
  }, []);

  useEffect(() => {
    dispatch(
      getClientShipping({
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
        <h3 className={styles.title}>Shipping</h3>
        <div className={styles.flex}>
          <SelectCustom
            classNameWrapper={styles.widthSelect}
            placeholder="All Ports"
            options={stateStatus}
            custonOnChange={(value) => {
              router.push({
                pathname: '/shipping',
                query: {
                  ...router.query,
                  port: value.value,
                },
              });
              dispatch(getClientShipping({ port: value.value }));
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
                  pathname: '/shipping',
                  query: {
                    ...router.query,
                    page: 1,
                    search: document.querySelector('#search').value,
                  },
                });
                dispatch(
                  getClientShipping({
                    search: document.querySelector('#search').value,
                  }),
                );
              }}
            />
          </div>
        </div>
        {clientShipping.data.length === 0 ? (
          <h1 className={styles.notFound}>nothing found</h1>
        ) : (
          <CustomTable>
            <Pagination
              params={clientShipping.links}
              pathname="/shipping"
              router={router}
            />
            {clientShipping.data.map(item => (
              <CarInformation
                key={item.id}
                item={item}
                updateShipping={updateClientShipping}
              />
            ))}
            <Pagination
              params={clientShipping.links}
              pathname="/shipping"
              router={router}
            />
          </CustomTable>
        )}
      </div>
    </MainLayout>
  );
};

export default Shipping;
