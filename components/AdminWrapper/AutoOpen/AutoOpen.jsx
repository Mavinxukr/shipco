import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';
import formatStringByPattern from 'format-string-by-pattern';
import { getAuto, updateAuto } from '../../../redux/actions/auto';
import {
  autoDataSelector,
  autoDataReceivedSelector,
} from '../../../utils/selectors';
import MainLayout from '../../Layout/Global/Global';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import CustomTabs from '../../CustomTabs/CustomTabs';
import InformationBlock from '../../InformationBlock/InformationBlock';
import HoverPopup from '../../HoverPopup/HoverPopup';
import Previews from '../../Previews/Previews';
import Radio from '../../Radio/Radio';
import IconTrash from '../../../assets/svg/Trash.svg';
import styles from './AutoOpen.scss';
import { stateOptions, damage, status } from './data';
import {
  renderInput,
  renderSelect,
  renderInputFile,
} from '../../../utils/renderInputs';
import Pickers from '../../Pickers/Pickers';
import {
  composeValidators,
  mustBeNumber,
  required,
} from '../../../utils/validation';
import Button from '../../Button/Button';
import IconPlus from '../../../assets/svg/Plus.svg';
import Loader from '../../Loader/Loader';

const arrTypes = [
  'auction_picture',
  'warehouse_picture',
  'container_picture',
  'car_fax_report',
  'invoice',
  'checklist_report',
  'shipping_damage',
];

const getArr = (items, arr) => items.map((item, index) => {
  const images = arr.filter(itemChild => itemChild.type === item);
  return {
    id: index + 1,
    title: item,
    images,
  };
});

const AutoOpen = () => {
  const auto = useSelector(autoDataSelector);
  const isDataReceived = useSelector(autoDataReceivedSelector);
  const [arrPicsDamage, setArrPicsDamage] = useState([]);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    const idAuto = router.query.idAuto;
    dispatch(getAuto({}, +idAuto));
  }, []);

  useEffect(() => {
    if (auto && auto.data.document.length > 0) {
      setArrPicsDamage(getArr(arrTypes, auto.data.document)[6].images);
    }
  }, [auto]);

  if (!isDataReceived) {
    return <Loader />;
  }

  const saleObj = auto.data.sale_info;
  const saleArr = Object.keys(saleObj).map((item, index) => ({
    id: index + 1,
    title: item.split('_').join(' '),
    value: saleObj[item],
  }));

  saleArr[1].title = 'Lane/Item/Grid/Row';

  const lotObj = auto.data.lot_info;
  const lotArr = Object.keys(lotObj).map((item, index) => ({
    id: index + 1,
    title: item.split('_').join(' '),
    value: lotObj[item],
  }));

  lotArr[0].title = 'Lot # ';
  lotArr[4].title = 'Primary Damage';
  lotArr[5].title = 'Secondary Damage';
  lotArr[6].title = 'Est. Retail Value';
  lotArr[7].title = 'VIN';

  const featureObj = auto.data.feature_info;
  const featureArr = Object.keys(featureObj).map((item, index) => ({
    id: index + 1,
    title: item.split('_').join(' '),
    value: featureObj[item],
  }));

  featureArr[2].title = 'Engine Type';
  featureArr[4].title = 'Transmission';

  const imagesData = getArr(arrTypes, auto.data.document);

  const onSubmit = async (values) => {
    dispatch(
      updateAuto(
        {},
        {
          ship: 1,
          ...values,
          point_load_city: values.point_load_city && values.point_load_city.label,
          point_delivery_city: values.point_delivery_city && values.point_delivery_city.label,
          // document: [{ type: 'shipping_damage', file: [arrPicsDamage] }],
        },
        auto.data.id,
      ),
    );
  };

  console.log('arrPicsDamage', arrPicsDamage);

  return (
    <MainLayout admin>
      <SubHeader />
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, form, values }) => (
          <form className={styles.fullWidth}>
            <div className={styles.container}>
              <div className={styles.flex}>
                <div className={styles.maxWidth}>
                  <CustomTabs data={imagesData} />
                  <div className={styles.flex}>
                    <div className={styles.fullWidth}>
                      <Field
                        name="car_fax_report"
                        type="file"
                        defaultValue={
                          imagesData[3].images.length !== 0
                            ? imagesData[3].images[0].link
                            : ''
                        }
                      >
                        {renderInputFile({
                          label: 'CarFax report',
                          classNameWrapper: styles.popupFieldRow,
                          customInput: styles.customInputFile,
                          file: true,
                          accept:
                            '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                          icon: <IconTrash />,
                          classNameWrapperForIcon: styles.trashIcon,
                          onClickForIcon: () => form.change('report', ''),
                        })}
                      </Field>
                      <Field
                        name="invoice"
                        type="file"
                        defaultValue={
                          imagesData[4].images.length !== 0
                            ? imagesData[4].images[0].link
                            : ''
                        }
                      >
                        {renderInputFile({
                          label: 'Invoice',
                          classNameWrapper: styles.popupFieldRow,
                          customInput: styles.customInputFile,
                          file: true,
                          accept:
                            '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                          icon: <IconTrash />,
                          classNameWrapperForIcon: styles.trashIcon,
                          onClickForIcon: () => form.change('invoice', ''),
                        })}
                      </Field>
                      <Field
                        name="checklist_report"
                        type="file"
                        defaultValue={
                          imagesData[5].images.length !== 0
                            ? imagesData[5].images[0].link
                            : ''
                        }
                      >
                        {renderInputFile({
                          label: 'Checklist report',
                          classNameWrapper: styles.popupFieldRow,
                          customInput: styles.customInputFile,
                          file: true,
                          accept:
                            '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                          icon: <IconTrash />,
                          classNameWrapperForIcon: styles.trashIcon,
                          onClickForIcon: () => form.change('creport', ''),
                        })}
                      </Field>
                      <h4 className={styles.title}>Shipping Information</h4>
                      <Field
                        name="tracking_id"
                        validate={composeValidators(required, mustBeNumber)}
                        type="text"
                        parse={formatStringByPattern('99 9999 9999 9999')}
                        defaultValue={auto.data.ship_info.tracking_id || ''}
                      >
                        {renderInput({
                          label: 'Tracking id:',
                          customInput: styles.color,
                          classNameWrapper: styles.popupFieldRow,
                          classNameWrapperLabel: styles.blackLabel,
                        })}
                      </Field>
                      <div className={cx(styles.fullWidth, styles.flexInput)}>
                        <Field
                          name="point_load_city"
                          component={renderSelect({
                            placeholder: '',
                            label: 'Point of loading:',
                            classNameWrapper: styles.selectFieldRow,
                            classNameLabel: styles.blackLabel,
                            defaultInputValue:
                              auto.data.ship_info.point_load[0] || '',
                          })}
                          options={stateOptions}
                        />
                        <Pickers id="loadind" />
                      </div>
                      <Field
                        name="container_id"
                        validate={composeValidators(required, mustBeNumber)}
                        type="text"
                        parse={formatStringByPattern('999999999')}
                        defaultValue={auto.data.ship_info.container_id || ''}
                      >
                        {renderInput({
                          label: 'Container id:',
                          classNameWrapper: styles.popupFieldRow,
                          customInput: styles.color,
                          classNameWrapperLabel: styles.blackLabel,
                        })}
                      </Field>
                      <div className={cx(styles.fullWidth, styles.flexInput)}>
                        <Field
                          name="point_delivery_city"
                          component={renderSelect({
                            placeholder: '',
                            label: 'Point of delivery:',
                            classNameWrapper: styles.selectFieldRow,
                            classNameLabel: styles.blackLabel,
                            defaultInputValue:
                              auto.data.ship_info.point_delivery[0] || '',
                          })}
                          options={stateOptions}
                        />
                        <Pickers id="delivery" />
                      </div>
                      <div className={styles.flexRadio}>
                        <p className={styles.label}>Disassembly</p>
                        <Field name="disassembly">
                          {({ input }) => (
                            <div>
                              <Radio
                                name={input.name}
                                title="Yes"
                                value="Yes"
                                checked={
                                  input.value === 'Yes'
                                  || auto.data.ship_info.disassembly
                                }
                                onChange={input.onChange}
                                inputName="Yes"
                                id="yes"
                              />
                              <Radio
                                name={input.name}
                                title="No"
                                value="No"
                                checked={
                                  input.value === 'No'
                                  || !auto.data.ship_info.disassembly
                                }
                                onChange={input.onChange}
                                inputName="No"
                                id="no"
                              />
                            </div>
                          )}
                        </Field>
                      </div>
                      <div className={styles.submit}>
                        <Button
                          onClick={handleSubmit}
                          customBtn={styles.btnSubmit}
                          type="submit"
                        >
                          save
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.widthBlock}>
                  <InformationBlock>
                    <>
                      {lotArr.map(item => (
                        <div className={styles.items} key={item.id}>
                          <span>{item.title}:</span>
                          <span className={styles.widthItems}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </>
                  </InformationBlock>
                  <InformationBlock>
                    <>
                      <div className={styles.items}>
                        <span>Sale Information</span>
                      </div>
                      {saleArr.map(item => (
                        <div className={styles.items} key={item.id}>
                          <span>{item.title}:</span>
                          <span className={styles.widthItems}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </>
                  </InformationBlock>
                  <InformationBlock>
                    <div className={styles.items}>
                      <span>Features</span>
                    </div>
                    <>
                      {featureArr.map(item => (
                        <div className={styles.items} key={item.id}>
                          <span>{item.title}:</span>
                          <span className={styles.widthItems}>
                            {item.value}
                          </span>
                        </div>
                      ))}
                    </>
                  </InformationBlock>
                  <InformationBlock>
                    <>
                      {damage.map(item => (
                        <div
                          className={styles.items}
                          key={`${item.id}${item.title}`}
                        >
                          <span>{item.title}</span>
                          <span className={styles.widthItems}>{item.text}</span>
                        </div>
                      ))}
                      <div className={styles.items}>
                        <span>Shipping Damage</span>
                        <div className={styles.position}>
                          <Button customBtn={styles.status}>
                            {values.status || 'Case closed'}
                          </Button>
                          <HoverPopup>
                            <Field name="status">
                              {({ input }) => (
                                <>
                                  {status.map(item => (
                                    <Radio
                                      key={item.id}
                                      value={item.text}
                                      id={item.text}
                                      name={input.name}
                                      customRadio={styles.statusPopup}
                                      title={item.text}
                                      onChange={input.onChange}
                                      checked={
                                        (item.text === 'Case closed'
                                          && input.value === '')
                                        || input.value === item.text
                                      }
                                    />
                                  ))}
                                </>
                              )}
                            </Field>
                          </HoverPopup>
                        </div>
                      </div>
                      <Previews
                        setArrPics={setArrPicsDamage}
                        arrPics={arrPicsDamage}
                        customTumd="Previews-reverse"
                        icon={<IconPlus className={styles.icon} />}
                        title="Add photo"
                      />
                    </>
                  </InformationBlock>
                </div>
              </div>
            </div>
          </form>
        )}
      />
    </MainLayout>
  );
};

AutoOpen.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string,
    index: PropTypes.number,
    id: PropTypes.number,
  }),
};

export default AutoOpen;
