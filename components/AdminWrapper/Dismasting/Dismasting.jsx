import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { Field, Form } from 'react-final-form';
import {
  getDismanting,
  updateDismanting,
} from '../../../redux/actions/dismanting';
import {
  dismantingDataSelector,
  dismantingDataReceivedSelector,
} from '../../../utils/selectors';
import MainLayout from '../../Layout/Global/Global';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import CustomTable from '../../CustomTable/CustomTable';
import Button from '../../Button/Button';
import Pagination from '../../Pagination/Pagination';
import CarInformation from '../../CarInformation/CarInformation';
import { stateStatus, status } from './data';
import styles from './Dismasting.scss';
import Loader from '../../Loader/Loader';
import { updateShipping } from '../../../redux/actions/shipping';
import { renderSelect, renderInput } from '../../../utils/renderInputs';

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
      pathname: '/auto-admin/dismanting',
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

  const allModel = { id: 0, value: '', label: 'All Model' };
  const model = dismanting.additional.models;
  const modelArr = Object.keys(model).map((item, index = '1') => ({
    id: index + 1,
    label: model[index].model_name,
    value: model[index].model_name,
  }));

  const newModel = [allModel, ...modelArr];
  const allYear = { id: 0, value: '', label: 'All Years' };
  const years = dismanting.additional.years;
  const yearArr = Object.keys(years).map((item, index = '1') => ({
    id: index + 1,
    label: years[index].year,
    value: years[index].year,
  }));
  const newYear = [allYear, ...yearArr];

  const allMakes = { id: 0, value: '', label: 'All Makes' };
  const makes = dismanting.additional.makes;
  const makeArr = Object.keys(makes).map((item, index = '1') => ({
    id: index + 1,
    label: makes[index].make_name,
    value: makes[index].make_name,
  }));
  const newMakes = [allMakes, ...makeArr];

  return (
    <MainLayout newLink admin>
      <SubHeader
        onClick={() => {
          router.push({
            pathname: '/auto-admin/dismanting',
            query: {
              ...router.query,
              page: 1,
              search: document.querySelector('#search').value,
            },
          });
          dispatch(
            getDismanting({
              search: document.querySelector('#search').value,
            }),
          );
        }}
      />
      <div className={styles.container}>
        <div className={styles.flex}>
          <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, invalid, submitting }) => (
              <form className={styles.fullWidth} onSubmit={handleSubmit}>
                <Field
                  name="port"
                  component={renderSelect({
                    placeholder: router.query.port || 'All Ports',
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={stateStatus}
                />
                <Field
                  name="status"
                  component={renderSelect({
                    placeholder: router.query.status || 'All Status',
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={status}
                />
                <Field
                  name="date"
                  type="text"
                  defaultValue={router.query.date || ''}
                >
                  {renderInput({
                    placeholder: router.query.date || 'All Date',
                    classNameWrapper: styles.widthSelect,
                  })}
                </Field>
                <Field
                  name="years"
                  component={renderSelect({
                    placeholder: router.query.year || 'All Years',
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newYear}
                />
                <Field
                  name="makes"
                  component={renderSelect({
                    placeholder: router.query.year || 'All Makes',
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newMakes}
                />
                <Field
                  name="model"
                  component={renderSelect({
                    placeholder: router.query.model || 'All Model',
                    classNameWrapper: styles.widthSelect,
                  })}
                  options={newModel}
                />
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  Ok
                </Button>
              </form>
            )}
          />
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
                router={router}
                updateShipping={updateDismanting}
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
