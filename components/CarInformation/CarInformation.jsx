import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';
import { Field, Form } from 'react-final-form';
import { useDispatch } from 'react-redux';
import Button from '../Button/Button';
import { updateDismanting } from '../../redux/actions/dismanting';
import CustomStepper from '../CustomStepper/CustomStepper';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import IconEdit from '../../assets/svg/edit.svg';
import styles from './CarInformation.scss';
import Popup from '../Popup/Popup';
import { required } from '../../utils/validation';

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

const CarInformation = ({
  item,
  disassembled,
  status,
  admin,
  updateStatus,
  updateShipping,
  router,
}) => {
  const [isCommentPopupOpen, setIsCommentPopupOpen] = useState(false);
  const [isHistoryPopupOpen, setIsHistoryPopupOpen] = useState(false);
  const [switchOn, setSwitchOn] = useState(item.ship_info.disassembly);
  const fileCarfac = getArr(arrTypes, item.document)[3].images;
  const fileInvoice = getArr(arrTypes, item.document)[4].images;
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    dispatch(
      updateShipping(
        {},
        {
          auto_id: item.id,
          ...values,
        },
        '',
        true,
      ),
    );
    setIsCommentPopupOpen(false);
  };

  return (
    <div className={styles.flexItems}>
      <div className={styles.image}>
        <img
          src={
            (item.document
              && item.document.length !== 0
              && item.document[0].link)
            || '/images/no-preview-available.png'
          }
          alt={item.model_name || '21321'}
        />
      </div>
      <div className={styles.column}>
        <p className={styles.colorText}>{item.auto || '21321'}</p>
        <p>Lot # {(item.lot_info && item.lot_info.lot_number) || '12312'}</p>
        <p>VIN: {(item.lot_info && item.lot_info.vin_code) || '21321'}</p>
        {admin && (
          <Link
            href={{
              pathname: '/auto-admin/auto-open',
              query: {
                idAuto: item.id,
              },
            }}
          >
            <a className={styles.link}>
              <IconEdit className={styles.svg} /> Edit
            </a>
          </Link>
        )}
      </div>
      <div className={cx(styles.column, styles.stepperContainer)}>
        <CustomStepper
          status={status}
          item={item}
          customBlock={styles.paddingBlock}
          paddingBottom={styles.paddingBottom}
          updateStatus={updateStatus}
        />
      </div>
      <div className={styles.column}>
        <p>
          Tracking id:{' '}
          <span className={styles.colorText}>
            {(item.ship_info && item.ship_info.tracking_id) || '21321'}
          </span>
        </p>
        <p>
          Point of loading:{' '}
          {(item.ship_info && item.ship_info.point_delivery[0]) || '21321'}
        </p>
        <p>
          Container id:{' '}
          <span className={styles.colorText}>
            {(item.ship_info && item.ship_info.container_id) || '21321'}
          </span>
        </p>
        {disassembled && (
          <div className={styles.flex}>
            <span>Disassembled:</span>
            {admin ? (
              <ButtonGroup>
                <Button
                  customBtn={styles.btnYes}
                  active={switchOn}
                  onClick={() => {
                    dispatch(
                      updateDismanting(
                        {},
                        {
                          disassembly: 1,
                          port: router.query.port || '',
                          search: router.query.search || '',
                          shipping_status: router.query.shipping_status || '',
                          auto_name: router.query.auto_name || '',
                          auto_year: router.query.auto_year || '',
                          auto_make: router.query.auto_make || '',
                        },
                        item.id,
                      ),
                    );
                    setSwitchOn(true);
                  }}
                >
                  Yes
                </Button>
                <Button
                  customBtn={styles.btnNo}
                  active={!switchOn}
                  onClick={() => {
                    dispatch(
                      updateDismanting(
                        {},
                        {
                          disassembly: 0,
                          port: router.query.port || '',
                          search: router.query.search || '',
                          shipping_status: router.query.shipping_status || '',
                          auto_name: router.query.auto_name || '',
                          auto_year: router.query.auto_year || '',
                          auto_make: router.query.auto_make || '',
                        },
                        item.id,
                      ),
                    );
                    setSwitchOn(false);
                  }}
                >
                  No
                </Button>
              </ButtonGroup>
            ) : (
              <ButtonGroup>
                {switchOn ? (
                  <Button customBtn={styles.btnYes} active={switchOn}>
                    Yes
                  </Button>
                ) : (
                  <Button customBtn={styles.btnNo} active={!switchOn}>
                    No
                  </Button>
                )}
              </ButtonGroup>
            )}
          </div>
        )}
      </div>
      <div className={styles.column}>
        <a
          href={(fileCarfac.length !== 0 && fileCarfac[0].link_for_download) || ''}
          download
          className={cx(
            styles.colorText,
            fileCarfac.length === 0 && styles.disabled,
          )}
        >
          CarFax report
        </a>
        <a
          href={(fileInvoice.length !== 0 && fileInvoice[0].link_for_download) || ''}
          download
          className={cx(
            styles.colorText,
            fileInvoice.length === 0 && styles.disabled,
          )}
        >
          Invoice
        </a>
        <Button
          customBtn={styles.colorText}
          onClick={() => setIsCommentPopupOpen(true)}
        >
          Adding notes
        </Button>
      </div>
      {isCommentPopupOpen && (
        <Popup title="Adding notes" setIsPopupOpen={setIsCommentPopupOpen}>
          <Form
            onSubmit={onSubmit}
            render={({
              handleSubmit, submitting, form, values, invalid,
            }) => (
              <form onSubmit={handleSubmit} className={styles.fullWidth}>
                <div className={styles.flex}>
                  <label className={styles.label}>Comment:</label>
                  <Field
                    className={styles.customTextarea}
                    name="comment"
                    validate={required}
                    component="textarea"
                    placeholder=""
                  />
                </div>
                <Button
                  customBtn={styles.btnSubmit}
                  type="submit"
                  disabled={submitting || invalid}
                >
                  Adding notes
                </Button>
              </form>
            )}
          />
          <Button
            customBtn={styles.btnSubmit}
            type="button"
            onClick={() => {
              setIsCommentPopupOpen(false);
              setIsHistoryPopupOpen(true);
            }}
          >
            History
          </Button>
        </Popup>
      )}
      {isHistoryPopupOpen && (
        <Popup title="History notes" setIsPopupOpen={setIsHistoryPopupOpen}>
          {item.notes.length === 0 ? (
            <p className={styles.noComment}>Not Comments</p>
          ) : (
            <>
              {item.notes.map((itemNotes, index) => (
                <div className={styles.blockComment} key={index}>
                  <b className={styles.name}>{itemNotes.client.name}:</b>
                  <p className={styles.comment}>{itemNotes.comment}</p>
                </div>
              ))}
            </>
          )}
        </Popup>
      )}
    </div>
  );
};

CarInformation.propTypes = {
  disassembled: PropTypes.bool,
  updateStatus: PropTypes.func,
  status: PropTypes.bool,
  admin: PropTypes.bool,
  item: PropTypes.object,
  updateShipping: PropTypes.func,
};

export default CarInformation;
