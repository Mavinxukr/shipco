import React, { useEffect, useState } from 'react';
import { Field, Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import {
  getPrices,
  addNewPrices,
} from '../../../redux/actions/prices';
import {
  pricesDataSelector,
  pricesDataReceivedSelector,
} from '../../../utils/selectors';
import { renderInput, renderSelect } from '../../../utils/renderInputs';
import Button from '../../Button/Button';
import MainLayout from '../../Layout/Global/Global';
import {
  required,
  mustBeNumber,
  composeValidators,
} from '../../../utils/validation';
import styles from './AddNewPrice.scss';
import { type } from './data';
import Loader from '../../Loader/Loader';

const AddNewPrice = () => {
  const [priceableData, setPriceableData] = useState(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const prices = useSelector(pricesDataSelector);
  const isDataReceived = useSelector(pricesDataReceivedSelector);

  const onSubmit = (values) => {
    dispatch(
      addNewPrices(
        {},
        {
          ...values,
          priceable_type: values.priceable_type && values.priceable_type.value,
          priceable_id: values.priceable_id && values.priceable_id.value,
          country_id: values.country_id && values.country_id.value,
          cities: values.cities && values.cities.value,
        },
      ),
    );
    router.push('/prices');
  };

  useEffect(() => {
    dispatch(
      getPrices(),
    );
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout admin>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, invalid, submitting}) => (
          <form onSubmit={handleSubmit}>
            <Field name="name" validate={required} type="text">
              {renderInput({
                label: 'Name',
              })}
            </Field>
            <Field
              name="priceable_type"
              component={renderSelect({
                placeholder: '',
                label: 'Applicable type',
                custonOnChange: (value) => {
                  const key =
                    value.label === 'clients' ? 'clients' : 'groups';
                  setPriceableData(prices.additional[key]);
                },
              })}
              options={type}
            />
            <Field
              name="priceable_id"
              component={renderSelect({
                placeholder: '',
                label: 'Applicable id',
              })}
              options={
                (priceableData
                  && priceableData.map(item => ({
                    value: item.id,
                    label: item.name,
                  })))
                || []
              }
            />
            <Field
              name="country_id"
              component={renderSelect({
                placeholder: '',
                label: 'States',
              })}
              options={
                prices.additional.states.map(item => ({
                  value: item.id,
                  label: item.name,
                }))
              }
            />
            <Field
              name="cities"
              component={renderSelect({
                placeholder: '',
                label: 'City',
              })}
              options={
                prices.additional.cities.map(item => ({
                  value: item.id,
                  label: item.name,
                }))
              }
            />
            <Field name="price" validate={composeValidators(required, mustBeNumber)} type="text">
              {renderInput({
                label: 'Price',
              })}
            </Field>
            <div className={styles.submitPopup}>
              <Button
                customBtn={styles.btnSubmit}
                type="submit"
                disabled={submitting || invalid}
              >
                ADD New Price
              </Button>
            </div>
          </form>
        )}
      />
    </MainLayout>
  );
};

export default AddNewPrice;
