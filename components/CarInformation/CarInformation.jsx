import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import cx from 'classnames';
import Button from '../Button/Button';
import CustomStepper from '../CustomStepper/CustomStepper';
import ButtonGroup from '../ButtonGroup/ButtonGroup';
import IconEdit from '../../assets/svg/edit.svg';
import styles from './CarInformation.scss';

const CarInformation = ({
  item, disassembled, status, admin,
}) => {
  const [switchOn, setSwitchOn] = useState(item.disassembled);

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
        <p className={styles.colorText}>{item.model_name || '21321'}</p>
        <p>Lot # {item.lot_info && item.lot_info.lot_number || '12312'}</p>
        <p>VIN: {item.lot_info && item.lot_info.vin_code || '21321'}</p>
        <Link
          href={{
            pathname: '/auto-open',
            query: {
              idAuto: item.id,
            },
          }}
        >
          <a className={styles.link}>
            <IconEdit className={styles.svg} /> Edit
          </a>
        </Link>
      </div>
      <div className={cx(styles.column, styles.stepperContainer)}>
        <CustomStepper
          status={status}
          item={item}
          customBlock={styles.paddingBlock}
          paddingBottom={styles.paddingBottom}
        />
      </div>
      <div className={styles.column}>
        <p>
          Tracking id:{' '}
          <span className={styles.colorText}>
            {item.ship_info && item.ship_info.tracking_id || '21321'}
          </span>
        </p>
        <p>Point of loading: {item.ship_info && item.ship_info.point_delivery[0] || '21321'}</p>
        <p>
          Container id:{' '}
          <span className={styles.colorText}>
            {item.ship_info && item.ship_info.container_id || '21321'}
          </span>
        </p>
        {disassembled && (
          <div className={styles.flex}>
            <span>Disassembled:</span>
            {admin ? (
              <ButtonGroup>
                <Button
                  customBtn={styles.btnYes}
                  onClick={() => setSwitchOn(true)}
                  active={switchOn}
                >
                  Yes
                </Button>
                <Button
                  customBtn={styles.btnNo}
                  onClick={() => setSwitchOn(false)}
                  active={!switchOn}
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
          href={item.car_fax_href}
          download={item.car_fax_href}
          className={styles.colorText}
        >
          CarFax report
        </a>
        <a
          href={item.invoice_href}
          download={item.invoice_href}
          className={styles.colorText}
        >
          Invoice
        </a>
        <a
          href={item.notes_href}
          download={item.notes_href}
          className={styles.colorText}
        >
          Adding notes
        </a>
      </div>
    </div>
  );
};

CarInformation.propTypes = {
  disassembled: PropTypes.bool,
  status: PropTypes.bool,
  admin: PropTypes.bool,
  item: PropTypes.shape({
    src: PropTypes.string,
    name: PropTypes.string,
    lot: PropTypes.number,
    vin: PropTypes.string,
    tracking_id: PropTypes.string,
    point: PropTypes.string,
    container_id: PropTypes.number,
    car_fax_href: PropTypes.string,
    invoice_href: PropTypes.string,
    disassembled: PropTypes.bool,
    notes_href: PropTypes.string,
  }),
};

export default CarInformation;
