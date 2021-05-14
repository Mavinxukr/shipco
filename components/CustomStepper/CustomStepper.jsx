import React, { useState } from "react";
import PropTypes from "prop-types";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import cx from "classnames";
import StepLabel from "@material-ui/core/StepLabel";
import StepConnector from "@material-ui/core/StepConnector";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import IconCar from "../../assets/svg/iconcar.svg";
import HoverPopup from "../HoverPopup/HoverPopup";
import IconUpdate from "../../assets/svg/updateStatus.svg";
import Button from "../Button/Button";
import { statusCar } from "./data";
import { getStatusInNumber } from "../../utils/helpers";
import styles from "./CustomStepper.scss";
import useTranslation from "next-translate/useTranslation";

const ColorlibConnector = withStyles({
  alternativeLabel: {
    left: "calc(-50% + 28px)",
    right: "calc(50% + 28px)",
  },
  active: {
    "& $line": {
      backgroundColor: "#d73e3e",
    },
  },
  completed: {
    "& $line": {
      backgroundColor: "#d73e3e",
    },
  },
  line: {
    height: 3,
    border: 0,
    backgroundColor: "#f8bebe",
  },
})(StepConnector);

const useColorlibStepIconStyles = makeStyles({
  root: {
    backgroundColor: "#f8bebe",
    // zIndex: -1,
    color: "#f8bebe",
    width: 15,
    height: 15,
    display: "flex",
    borderRadius: "50%",
    justifyContent: "center",
    alignItems: "center",
  },
  active: {
    backgroundColor: "#fff",
    width: 45,
    height: 15,
  },
  completed: {
    backgroundColor: "#d73e3e",
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

const getSteps = () => ["", "", "", ""];

const CustomStepper = ({
  item,
  customBlock,
  paddingBottom,
  disassembled,
  status,
  updateStatus,
}) => {
  const steps = getSteps();
  const [isOpenStatusPanel, setIsOpenStatusPanel] = useState(false);
  const [stepIndex, setStepIndex] = useState(
    (item.shipping && getStatusInNumber(item.shipping.status)) || 0
  );
  const { t } = useTranslation("dismanting");

  const classNameForOpenStatus = cx(styles.status, {
    [styles.active]: isOpenStatusPanel,
  });

  return (
    <>
      {item.ship_info ? (
        <>
          {!disassembled && (
            <>
              <div className={styles.flex}>
                <span>{item.ship_info.point_load_date}</span>
                <span>{item.ship_info.point_delivery_date}</span>
              </div>
              <div className={cx(styles.flex, paddingBottom)}>
                <b>{item.ship_info.point_load_city}</b>
                <b>{item.ship_info.point_delivery_city}</b>
              </div>
            </>
          )}
        </>
      ) : (
        <>
          <div className={styles.flex}>
            <span>23123</span>
            <span>rewre</span>
          </div>
          <div className={cx(styles.flex, paddingBottom)}>
            <b>sdfsdf</b>
            <b>sadasd</b>
          </div>
        </>
      )}
      <div className={styles.root}>
        <Stepper activeStep={stepIndex} connector={<ColorlibConnector />}>
          {steps.map((label) => (
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
            <IconUpdate className={styles.icon} /> {t("updatesSatus")}
          </Button>
          <>
            {item.ship_info ? (
              <>
                {item.ship_info.disassembly ? (
                  <p className={cx(styles.center, customBlock)}>Disassembled</p>
                ) : (
                  <p className={cx(styles.center, customBlock)}>
                    Car on the way to port
                  </p>
                )}
              </>
            ) : null}
          </>
          <HoverPopup customClass={styles.statusPopup}>
            {statusCar.map((carStatus, index) => {
              const classNameForButton = cx(styles.btn, {
                [styles.activeStatus]: stepIndex === index,
              });

              return (
                <Button
                  onClick={(el) => {
                    setStepIndex(index);
                    setIsOpenStatusPanel(false);
                    updateStatus(el);
                  }}
                  customBtn={classNameForButton}
                  key={`${carStatus.id}${item.id}`}
                  id={carStatus.label}
                >
                  {carStatus.text}
                  <span id={carStatus.label} className={styles.circle} />
                </Button>
              );
            })}
          </HoverPopup>
        </div>
      ) : (
        <>
          {item.ship_info ? (
            <>
              {item.ship_info.disassembly ? (
                <p className={cx(styles.center, customBlock)}>Disassembled</p>
              ) : (
                <p className={cx(styles.center, customBlock)}>
                  Car on the way to port
                </p>
              )}
            </>
          ) : null}
        </>
      )}
    </>
  );
};

CustomStepper.propTypes = {
  status: PropTypes.bool,
  disassembled: PropTypes.bool,
  updateStatus: PropTypes.func,
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
