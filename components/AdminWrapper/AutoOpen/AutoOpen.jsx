import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import MainLayout from '../../Layout/Global/Global';
import SubHeader from '../../Layout/SubHeader/SubHeader';
import CustomTabs from '../../CustomTabs/CustomTabs';
import InformationBlock from '../../InformationBlock/InformationBlock';
import IconTrash from '../../../assets/svg/Trash.svg';
import styles from './AutoOpen.scss';
import { infoData } from './data';
import { renderInput } from '../../../utils/renderInputs';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async (values) => {
  await sleep(300);
  window.alert(JSON.stringify(values, 0, 2));
};

const AutoOpen = () => (
  <MainLayout>
    <SubHeader />
    <div className={styles.container}>
      <div className={styles.flex}>
        <div className={styles.maxWidth}>
          <CustomTabs />
          <div className={styles.flex}>
            <Form
              onSubmit={onSubmit}
              render={({ form }) => (
                <form className={styles.fullWidth}>
                  <Field name="report" type="file">
                    {renderInput({
                      label: 'CarFax report',
                      classNameWrapper: 'InputFormWrapper-popupFieldRow',
                      accept: '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                      icon: <IconTrash />,
                      classNameWrapperForIcon: 'Input-trashIcon',
                      onClickForIcon: () => form.change('report', ''),
                    })}
                  </Field>
                  <Field name="invoice" type="file">
                    {renderInput({
                      label: 'Invoice',
                      classNameWrapper: 'InputFormWrapper-popupFieldRow',
                      accept: '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                      icon: <IconTrash />,
                      classNameWrapperForIcon: 'Input-trashIcon',
                      onClickForIcon: () => form.change('invoice', ''),
                    })}
                  </Field>
                  <Field name="creport" type="file">
                    {renderInput({
                      label: 'Checklist report',
                      classNameWrapper: 'InputFormWrapper-popupFieldRow',
                      accept: '.xlsx,.xls,.doc, .docx,.ppt, .pptx,.txt,.pdf',
                      icon: <IconTrash />,
                      classNameWrapperForIcon: 'Input-trashIcon',
                      onClickForIcon: () => form.change('creport', ''),
                    })}
                  </Field>
                </form>
              )}
            />
          </div>
        </div>
        <div className={styles.widthBlock}>
          {infoData.map(item => (
            <InformationBlock key={item.id} item={item}>
              <>
                {item.response.map(items => (
                  <div
                    className={styles.items}
                    key={`${items.id}${items.title}`}
                  >
                    <span>{items.title}</span>
                    <span className={styles.widthItems}>{items.text}</span>
                  </div>
                ))}
              </>
            </InformationBlock>
          ))}
        </div>
      </div>
    </div>
  </MainLayout>
);

AutoOpen.propTypes = {
  item: PropTypes.shape({
    label: PropTypes.string,
    index: PropTypes.number,
    id: PropTypes.number,
  }),
};

export default AutoOpen;
