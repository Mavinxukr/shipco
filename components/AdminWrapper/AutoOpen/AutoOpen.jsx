import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import cx from 'classnames';
import formatStringByPattern from 'format-string-by-pattern';
import { getAuto } from '../../../redux/actions/auto';
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
  features, stateOptions, lot, sale, damage, status,
} from './data';
import {
  renderInput,
  renderSelect,
  renderRadio,
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

  const onSubmit = async (values) => {
    console.log(values);
  };

  if (!isDataReceived) {
    return <Loader />;
  }

  const saleObj = auto.data.sale_info;
  const saleArr = Object.keys(saleObj).map((item, index) => ({
    id: index + 1,
    title: item.split('_').join(' '),
    value: saleObj[item],
  }));

  const lotObj = auto.data.lot_info;
  const lotArr = Object.keys(lotObj).map((item, index) => ({
    id: index + 1,
    title: item.split('_').join(' '),
    value: lotObj[item],
  }));

  const featureObj = auto.data.feature_info;
  const featureArr = Object.keys(featureObj).map((item, index) => ({
    id: index + 1,
    title: item.split('_').join(' '),
    value: featureObj[item],
  }));

  console.log(auto.data.ship_info.disassembly);

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
                  <CustomTabs />
                  <div className={styles.flex}>
                    <div className={styles.fullWidth}>
                      <Field name="report" type="file">
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
                      <Field name="invoice" type="file">
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
                      <Field name="creport" type="file">
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
                        name="tracking"
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
                          name="loading"
                          validate={required}
                          isRequired
                          component={renderSelect({
                            placeholder: '',
                            label: 'Point of loading:',
                            classNameWrapper: styles.selectFieldRow,
                            classNameLabel: styles.blackLabel,
                          })}
                          options={stateOptions}
                        />
                        <Pickers id="loadind" />
                      </div>
                      <Field
                        name="container"
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
                          name="delivery"
                          validate={required}
                          isRequired
                          component={renderSelect({
                            placeholder: '',
                            label: 'Point of delivery:',
                            classNameWrapper: styles.selectFieldRow,
                            classNameLabel: styles.blackLabel,
                          })}
                          options={stateOptions}
                        />
                        <Pickers id="delivery" />
                      </div>
                      <div className={styles.flexRadio}>
                        <p className={styles.label}>Disassembly</p>
                        <Field name="disassembly" type="radio">
                          {renderRadio({
                            label: 'Yes',
                            title: 'Yes',
                            checked: 'checked',
                            id: 'disassemblyYes',
                          })}
                        </Field>
                        <p>{auto.data.ship_info.disassembly ?  '1' : '2'}</p>
                        <Field name="disassembly" type="radio">
                          {renderRadio({
                            label: 'No',
                            title: 'No',
                            checked: false,
                            id: 'disassemblyNo',
                          })}
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
                        <div
                          className={styles.items}
                          key={item.id}
                        >
                          <span>{item.title}:</span>
                          <span className={styles.widthItems}>{item.value}</span>
                        </div>
                      ))}
                    </>
                  </InformationBlock>
                  <InformationBlock>
                    <>
                      <div
                        className={styles.items}
                      >
                        <span>Sale Information</span>
                      </div>
                      {saleArr.map(item => (
                        <div
                          className={styles.items}
                          key={item.id}
                        >
                          <span>{item.title}:</span>
                          <span className={styles.widthItems}>{item.value}</span>
                        </div>
                      ))}
                    </>
                  </InformationBlock>
                  <InformationBlock>
                    <div
                      className={styles.items}
                    >
                      <span>Features</span>
                    </div>
                    <>
                      {featureArr.map(item => (
                        <div
                          className={styles.items}
                          key={item.id}
                        >
                          <span>{item.title}:</span>
                          <span className={styles.widthItems}>{item.value}</span>
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
