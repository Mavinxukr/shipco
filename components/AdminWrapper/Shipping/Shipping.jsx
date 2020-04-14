import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { getShipping, updateShipping } from '../../../redux/actions/shipping';
import {
  shippingDataSelector,
  shippingDataReceivedSelector,
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
import styles from './Shipping.scss';
import Loader from '../../Loader/Loader';

const Shipping = () => {
  const router = useRouter();

  const shipping = useSelector(shippingDataSelector);
  const isDataReceived = useSelector(shippingDataReceivedSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getShipping({}));
  }, []);

  useEffect(() => {
    dispatch(
      getShipping({
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
    <MainLayout newLink admin>
      <SubHeader
        onClick={() => {
          router.push({
            pathname: '/auto-admin/shipping',
            query: {
              ...router.query,
              page: 1,
              search: document.querySelector('#search').value,
            },
          });
          dispatch(
            getShipping({
              search: document.querySelector('#search').value,
            }),
          );
        }}
      />
      <div className={styles.container}>
        <div className={styles.flex}>
          <SelectCustom
            classNameWrapper={styles.widthSelect}
            placeholder="All Ports"
            options={stateStatus}
            custonOnChange={(value) => {
              router.push({
                pathname: '/auto-admin/shipping',
                query: {
                  ...router.query,
                  port: value.value,
                },
              });
              dispatch(getShipping({ port: value.value }));
            }}
          />
          <div className={styles.rightBlock}>
            <Button customBtn={styles.filterText}>
              <IconFilter className={styles.filterIcon} />
              Filter
            </Button>
          </div>
        </div>
        {shipping.data.length === 0 ? (
          <h1 className={styles.notFound}>nothing found</h1>
        ) : (
          <CustomTable>
            <Pagination
              params={shipping.links}
              pathname="/auto-admin/shipping"
              router={router}
            />
            {shipping.data.map(item => (
              <CarInformation
                key={item.id}
                item={item}
                status
                admin
                updateShipping={updateShipping}
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
              params={shipping.links}
              pathname="/auto-admin/shipping"
              router={router}
            />
          </CustomTable>
        )}
      </div>
    </MainLayout>
  );
};

export default Shipping;
