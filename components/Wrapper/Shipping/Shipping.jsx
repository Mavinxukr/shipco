import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import formatStringByPattern from 'format-string-by-pattern';
import { Field, Form } from 'react-final-form';
import {
  getClientShipping,
  updateClientShipping,
} from '../../../redux/actions/clientShipping';
import {
  clientShippingDataSelector,
  clientShippingDataReceivedSelector,
} from '../../../utils/selectors';
import MainLayout from '../../Layout/Global/Global';
import CustomTable from '../../CustomTable/CustomTable';
import Button from '../../Button/Button';
import Pagination from '../../Pagination/Pagination';
import CarInformation from '../../CarInformation/CarInformation';
import Search from '../../Search/Search';
import { stateStatus, status } from './data';
import styles from './Shipping.scss';
import Loader from '../../Loader/Loader';
import { renderSelect, renderInput } from '../../../utils/renderInputs';
import useTranslation from 'next-translate/useTranslation';

const Shipping = () => {
  const router = useRouter();
  const { t } = useTranslation('shipping');
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
        shipping_status: router.query.shipping_status || '',
        auto_name: router.query.auto_name || '',
        auto_year: router.query.auto_year || '',
        auto_make: router.query.auto_make || '',
        date: router.query.date || '',
      }),
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  const onSubmit = async (values) => {
    router.push({
      pathname: '/shipping',
      query: {
        ...router.query,
        date: values.date,
        port: values.port && values.port.value,
        shipping_status: values.status && values.status.value,
        auto_name: values.model && values.model.value,
        auto_year: values.years && values.years.value,
        auto_make: values.makes && values.makes.value,
      },
    });
  };

  const allModel = { id: 0, value: '', label: t('allModel')};
  const model = clientShipping.additional.models;
  const modelArr = Object.keys(model).map((item, index = '1') => ({
    id: index + 1,
    label: model[index].model_name,
    value: model[index].model_name,
  }));
  const newModel = [allModel, ...modelArr];

  const allYear = { id: 0, value: '', label: t('allYears')};
  const years = clientShipping.additional.years;
  const yearArr = Object.keys(years).map((item, index = '1') => ({
    id: index + 1,
    label: years[index].year,
    value: years[index].year,
  }));
  const newYear = [allYear, ...yearArr];

  const allMakes = { id: 0, value: '', label: t('allMakes') };
  const makes = clientShipping.additional.makes;
  const makeArr = Object.keys(makes).map((item, index = '1') => ({
    id: index + 1,
    label: makes[index].make_name,
    value: makes[index].make_name,
  }));
  const newMakes = [allMakes, ...makeArr];

  return (
    <MainLayout>
      <div className={styles.container}>
        <div className={styles.container_header}>
          <h3 className={styles.title}>{t('shipping')}</h3>
          <div className={styles.rightBlock}>
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

        <div className={styles.flex}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form className={styles.fullWidth} onSubmit={handleSubmit}>
                <Field
                  name="port"
                  component={renderSelect({
                    placeholder: router.query.port || t('allPorts'),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={stateStatus}
                />
                <Field
                  name="status"
                  component={renderSelect({
                    placeholder: router.query.status || t('allStatus'),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={status}
                />
                <Field
                  name="date"
                  type="text"
                  defaultValue={router.query.date || ''}
                  parse={formatStringByPattern('99-99-9999')}
                >
                  {renderInput({
                    placeholder: router.query.date || t('allDate'),
                    classNameWrapper: styles.widthSelect,
                  })}
                </Field>
                <Field
                  name="years"
                  component={renderSelect({
                    placeholder: router.query.year || t('allYears'),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newYear}
                />
                <Field
                  name="makes"
                  component={renderSelect({
                    placeholder: router.query.year || t('allMakes'),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newMakes}
                />
                <Field
                  name="model"
                  component={renderSelect({
                    placeholder: router.query.model || t('allModel'),
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newModel}
                />
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  {t('ok')}
                </Button>
              </form>
            )}
          />
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
            {clientShipping.data.map((item) => (
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
