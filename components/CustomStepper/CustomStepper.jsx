import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import cx from 'classnames';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconCar from '../../assets/svg/iconcar.svg';
import HoverPopup from '../HoverPopup/HoverPopup';
import IconUpdate from '../../assets/svg/updateStatus.svg';
import Button from '../Button/Button';
import { statusCar } from './data';
import styles from './CustomStepper.scss';

const ColorlibConnector = withStyles({
  alternativeLabel: {
    left: 'calc(-50% + 28px)',
    right: 'calc(50% + 28px)',
  },
  active: {
    '& $line': {
      backgroundColor: '#d73e3e',
    },
  },
  completed: {
    '& $line': {
      backgroundColor: '#d73e3e',
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: '#f8bebe',
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: '#f8bebe',
    zIndex: -1,
    color: '#f8bebe',
    width: 15,
    height: 15,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  active: {
    backgroundColor: '#fff',
    width: 45,
    height: 15,
  },
  completed: {
    backgroundColor: '#d73e3e',
  },
});

function ColorlibStepIcon({ active, completed }) {
  const classes = useColorlibStepIconStyles();

  return (
    <div
      className={cx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {active ? <IconCar /> : null}
    </div>
  );
}

const getSteps = () => ['', '', '', ''];

const CustomStepper = ({
  item, customBlock, paddingBottom, status,
}) => {
  const steps = getSteps();
  const [isOpenStatusPanel, setIsOpenStatusPanel] = useState(false);
  const [stepIndex, setStepIndex] = useState(item.step);
  const classNameForOpenStatus = cx(styles.status, {
    [styles.active]: isOpenStatusPanel,
  });

  return (
    <>
      <div className={styles.flex}>
        <span>{item.firstDate}</span>
        <span>{item.secondDate}</span>
      </div>
      <div className={cx(styles.flex, paddingBottom)}>
        <b>{item.from}</b>
        <b>{item.to}</b>
      </div>
      <div className={styles.root}>
        <Stepper activeStep={stepIndex} connector={<ColorlibConnector />}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel StepIconComponent={ColorlibStepIcon}>
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </div>
      {status ? (
        <div className={classNameForOpenStatus}>
          <Button
            onClick={() => setIsOpenStatusPanel(!isOpenStatusPanel)}
            customBtn={styles.update}
          >
            <IconUpdate className={styles.icon} /> Update status
          </Button>
          <p className={cx(styles.center, customBlock)}>{item.car}</p>
          <HoverPopup customClass={styles.statusPopup}>
            {statusCar.map((carStatus, index) => {
              const classNameForButton = cx(styles.btn, {
                [styles.activeStatus]: stepIndex === index,
              });

              return (
                <Button
                  onClick={() => {
                    setStepIndex(index);
                    setIsOpenStatusPanel(false);
                  }}
                  customBtn={classNameForButton}
                  key={`${carStatus.id}${item.id}`}
                >
                  {carStatus.text}
                  <span className={styles.circle} />
                </Button>
              );
            })}
          </HoverPopup>
        </div>
      ) : (
        <p className={cx(styles.center, customBlock)}>{item.car}</p>
      )}
    </>
  );
};

CustomStepper.propTypes = {
  status: PropTypes.bool,
  paddingBottom: PropTypes.string,
  customBlock: PropTypes.string,
  item: PropTypes.shape({
    firstDate: PropTypes.string,
    secondDate: PropTypes.string,
    id: PropTypes.number,
    from: PropTypes.string,
    to: PropTypes.string,
    step: PropTypes.number,
    car: PropTypes.string,
  }),
};

export default CustomStepper;
