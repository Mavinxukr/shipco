import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import cx from 'classnames';
import formatStringByPattern from 'format-string-by-pattern';
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
} from '../../../utils/renderInputs';
import Pickers from '../../Pickers/Pickers';
import {
  composeValidators,
  mustBeNumber,
  required,
} from '../../../utils/validation';
import Button from '../../Button/Button';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const AutoOpen = () => {
  const [arrPicsDamage, setArrPicsDamage] = useState([]);

  const onSubmit = async (values) => {
    await sleep(300);
    window.alert(JSON.stringify(values, 0, 2));
  };

  return (
    <MainLayout>
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
                        {renderInput({
                          label: 'CarFax report',
                          classNameWrapper: styles.popupFieldRow,
                          customInput: styles.customInputFile,
                          accept:
                            '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                          icon: <IconTrash />,
                          classNameWrapperForIcon: styles.trashIcon,
                          onClickForIcon: () => form.change('report', ''),
                        })}
                      </Field>
                      <Field name="invoice" type="file">
                        {renderInput({
                          label: 'Invoice',
                          classNameWrapper: styles.popupFieldRow,
                          customInput: styles.customInputFile,
                          accept:
                            '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                          icon: <IconTrash />,
                          classNameWrapperForIcon: styles.trashIcon,
                          onClickForIcon: () => form.change('invoice', ''),
                        })}
                      </Field>
                      <Field name="creport" type="file">
                        {renderInput({
                          label: 'Checklist report',
                          classNameWrapper: styles.popupFieldRow,
                          customInput: styles.customInputFile,
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
                            checked: true,
                            id: 'disassemblyYes',
                          })}
                        </Field>
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
                      {lot.map(item => (
                        <div
                          className={styles.items}
                          key={`${item.id}${item.title}`}
                        >
                          <span>{item.title}</span>
                          <span className={styles.widthItems}>{item.text}</span>
                        </div>
                      ))}
                    </>
                  </InformationBlock>
                  <InformationBlock>
                    <>
                      {sale.map(item => (
                        <div
                          className={styles.items}
                          key={`${item.id}${item.title}`}
                        >
                          <span>{item.title}</span>
                          <span className={styles.widthItems}>{item.text}</span>
                        </div>
                      ))}
                    </>
                  </InformationBlock>
                  <InformationBlock>
                    <>
                      {features.map(item => (
                        <div
                          className={styles.items}
                          key={`${item.id}${item.title}`}
                        >
                          <span>{item.title}</span>
                          <span className={styles.widthItems}>{item.text}</span>
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
