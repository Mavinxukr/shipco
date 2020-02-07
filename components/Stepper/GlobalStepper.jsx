import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import cx from 'classnames';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import IconCar from '../../assets/svg/iconcar.svg';
import styles from './GlobalStepper.scss';

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
    zIndex: 1,
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

const getSteps = () => ['', '', ''];

const HorizontalLabelPositionBelowStepper = ({ activeStep }) => {
  const steps = getSteps();

  return (
    <div className={styles.root}>
      <Stepper activeStep={activeStep} connector={<ColorlibConnector />}>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel StepIconComponent={ColorlibStepIcon}>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>
    </div>
  );
};

export default HorizontalLabelPositionBelowStepper;
