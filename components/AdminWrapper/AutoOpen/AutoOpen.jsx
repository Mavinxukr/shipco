import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';
import formatStringByPattern from 'format-string-by-pattern';
import { getAuto, updateAuto, deleteAuto } from '../../../redux/actions/auto';
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
import {
  stateOptions, damage, status, stateOptionsDelivery,
} from './data';
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
  const [arrPicsActions, setArrPicsActions] = useState([]);
  const [arrPicsWarehouses, setArrPicsWarehouses] = useState([]);
  const [arrPicsContainer, setArrPicsContainer] = useState([]);
  const [arrPicsDamage, setArrPicsDamage] = useState([]);
  const [newArrPicsActions, setNewArrPicsActions] = useState([]);
  const [newArrPicsWarehouses, setNewArrPicsWarehouses] = useState([]);
  const [newArrPicsContainer, setNewArrPicsContainer] = useState([]);
  const [newArrPicsDamage, setNewArrPicsDamage] = useState([]);

  const router = useRouter();

  const dispatch = useDispatch();

  useEffect(() => {
    const idAuto = router.query.idAuto;
    dispatch(getAuto({}, +idAuto));
  }, []);

  useEffect(() => {
    if (auto && auto.data.document.length > 0) {
      setArrPicsDamage(getArr(arrTypes, auto.data.document)[6].images);
      setArrPicsActions(getArr(arrTypes, auto.data.document)[0].images);
      setArrPicsWarehouses(getArr(arrTypes, auto.data.document)[1].images);
      setArrPicsContainer(getArr(arrTypes, auto.data.document)[2].images);
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
  const idAuto = auto.data.id;

  const onSubmit = async (values) => {
    dispatch(
      updateAuto(
        {},
        {
          ship: 1,
          ...values,
          point_load_city:
            values.point_load_city && values.point_load_city.label,
          point_delivery_city:
            values.point_delivery_city && values.point_delivery_city.label,
          point_load_date: document.querySelector('#loadind').value,
          point_delivery_date: document.querySelector('#delivery').value,
          damage_status:
            values.damage_status
            && values.damage_status.toLowerCase().replace(' ', '_'),
          disassembly: values.disassembly,
          document: [
            {
              type: 'car_fax_report',
              file: document.querySelector('#car_fax_report').files,
            },
            {
              type: 'invoice',
              file: document.querySelector('#invoice').files,
            },
            {
              type: 'checklist_report',
              file: document.querySelector('#checklist_report').files,
            },
            {
              type: 'shipping_damage',
              file: newArrPicsDamage,
            },
            {
              type: 'auction_picture',
              file: newArrPicsActions,
            },
            {
              type: 'warehouse_picture',
              file: newArrPicsWarehouses,
            },
            {
              type: 'container_picture',
              file: newArrPicsContainer,
            },
          ],
        },
        auto.data.id,
      ),
    );
    setNewArrPicsWarehouses([]);
    setNewArrPicsContainer([]);
    setNewArrPicsDamage([]);
    setNewArrPicsActions([]);
  };

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
                  <CustomTabs
                    idAuto={idAuto}
                    arrPicsActions={arrPicsActions}
                    setArrPicsActions={setArrPicsActions}
                    arrPicsWarehouses={arrPicsWarehouses}
                    setArrPicsWarehouses={setArrPicsWarehouses}
                    arrPicsContainer={arrPicsContainer}
                    setArrPicsContainer={setArrPicsContainer}
                    newArrPicsActions={newArrPicsActions}
                    setNewArrPicsActions={setNewArrPicsActions}
                    newArrPicsWarehouses={newArrPicsWarehouses}
                    setNewArrPicsWarehouses={setNewArrPicsWarehouses}
                    newArrPicsContainer={newArrPicsContainer}
                    setNewArrPicsContainer={setNewArrPicsContainer}
                  />
                  <div className={styles.flex}>
                    <div className={styles.fullWidth}>
                      <Field name="car_fax_report" type="file">
                        {renderInputFile({
                          label: 'CarFax report',
                          classNameWrapper: styles.popupFieldRow,
                          customInput: styles.customInputFile,
                          file: true,
                          id: 'car_fax_report',
                          fileValue:
                            imagesData[3].images.length === 0
                              ? ''
                              : imagesData[3].images[0].name,
                          accept:
                            '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                          icon: <IconTrash />,
                          classNameWrapperForIcon: styles.trashIcon,
                          onClickForIcon: () => {
                            if (imagesData[3].images.length > 0) {
                              dispatch(
                                deleteAuto(
                                  {},
                                  {
                                    ids: imagesData[3].images[0].id,
                                  },
                                  idAuto,
                                ),
                              );
                              imagesData[3].images[0].name = '';
                            }
                            form.change('car_fax_report', '');
                          },
                        })}
                      </Field>
                      <Field name="invoice" type="file">
                        {renderInputFile({
                          label: 'Invoice',
                          classNameWrapper: styles.popupFieldRow,
                          customInput: styles.customInputFile,
                          id: 'invoice',
                          fileValue:
                            imagesData[4].images.length === 0
                              ? ''
                              : imagesData[4].images[0].name,
                          file: true,
                          accept:
                            '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                          icon: <IconTrash />,
                          classNameWrapperForIcon: styles.trashIcon,
                          onClickForIcon: () => {
                            if (imagesData[4].images.length > 0) {
                              dispatch(
                                deleteAuto(
                                  {},
                                  {
                                    ids: imagesData[4].images[0].id,
                                  },
                                  idAuto,
                                ),
                              );
                              imagesData[4].images[0].name = '';
                            }
                            form.change('invoice', '');
                          },
                        })}
                      </Field>
                      <Field name="checklist_report" type="file">
                        {renderInputFile({
                          label: 'Checklist report',
                          classNameWrapper: styles.popupFieldRow,
                          customInput: styles.customInputFile,
                          id: 'checklist_report',
                          fileValue:
                            imagesData[5].images.length === 0
                              ? ''
                              : imagesData[5].images[0].name,
                          file: true,
                          accept:
                            '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                          icon: <IconTrash />,
                          classNameWrapperForIcon: styles.trashIcon,
                          onClickForIcon: () => {
                            if (imagesData[5].images.length > 0) {
                              dispatch(
                                deleteAuto(
                                  {},
                                  {
                                    ids: imagesData[5].images[0].id,
                                  },
                                  idAuto,
                                ),
                              );
                              imagesData[5].images[0].name = '';
                            }
                            form.change('checklist_report', '');
                          },
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
                            label: 'Point of loading:',
                            classNameWrapper: styles.selectFieldRow,
                            classNameLabel: styles.blackLabel,
                            placeholder: auto.data.ship_info.point_load[0] || '',
                          })}
                          options={stateOptions}
                        />
                        <Pickers
                          time={auto.data.ship_info.point_load_date}
                          id="loadind"
                        />
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
                            label: 'Point of delivery:',
                            classNameWrapper: styles.selectFieldRow,
                            classNameLabel: styles.blackLabel,
                            placeholder:
                              auto.data.ship_info.point_delivery[0] || '',
                          })}
                          options={stateOptionsDelivery}
                        />
                        <Pickers
                          time={auto.data.ship_info.point_delivery_date}
                          id="delivery"
                        />
                      </div>
                      <div className={styles.flexRadio}>
                        <p className={styles.label}>Disassembly</p>
                        <Field name="disassembly">
                          {({ input }) => (
                            <div>
                              <Radio
                                name={input.name}
                                title="Yes"
                                value="1"
                                checked={
                                  input.value === '1'
                                  || auto.data.ship_info.disassembly
                                }
                                onChange={input.onChange}
                                inputName="Yes"
                                id="yes"
                              />
                              <Radio
                                name={input.name}
                                title="No"
                                value="0"
                                checked={
                                  input.value === '0'
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
                          <span className={styles.status}>
                            {values.damage_status || 'Case closed'}
                          </span>
                          <HoverPopup>
                            <Field name="damage_status">
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
                                        (item.text === 'case_closed'
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
                        idAuto={idAuto}
                        arrPics={arrPicsDamage}
                        setArrPics={setArrPicsDamage}
                        customTumd="Previews-reverse"
                        type="shipping_damage"
                        icon={<IconPlus className={styles.icon} />}
                        title="Add photo"
                        setNewArrPics={setNewArrPicsDamage}
                        newArrPics={newArrPicsDamage}
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
