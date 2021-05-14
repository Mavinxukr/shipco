import React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import Button from "../Button/Button";
import styles from "./Input.scss";
import useTranslation from "next-translate/useTranslation";

const Input = ({
  placeholder,
  addInputProps,
  icon,
  customInput,
  classNameWrapperForIcon,
  onClickForIcon,
  widthInputBlock,
  accept,
  file,
  id,
  fileValue,
  onKeyUp,
  onChange,
}) => {
  const { t } = useTranslation("admin-auto-edit");

  return (
    <div className={cx(styles.inputBlock, widthInputBlock)}>
      {onChange ? (
        <input
          className={cx(styles.input, customInput)}
          placeholder={placeholder}
          id={id}
          {...addInputProps}
          accept={accept}
          onKeyUp={onKeyUp}
          onChange={onChange}
        />
      ) : (
        <input
          className={cx(styles.input, customInput)}
          placeholder={placeholder}
          id={id}
          {...addInputProps}
          accept={accept}
          onKeyUp={onKeyUp}
        />
      )}
      {icon && (
        <Button
          type="button"
          className={classNameWrapperForIcon}
          onClick={onClickForIcon}
        >
          {icon}
        </Button>
      )}
      <>
        {file && (
          <>
            {addInputProps.value === "" ? (
              <p className={styles.chosenFile}>
                {fileValue || t("No file choosen")}
              </p>
            ) : (
              <p className={styles.chosenFileValue}>{addInputProps.value}</p>
            )}
          </>
        )}
      </>
    </div>
  );
};

Input.propTypes = {
  customInput: PropTypes.string,
  fileValue: PropTypes.string,
  id: PropTypes.string,
  widthInputBlock: PropTypes.string,
  classNameWrapperForIcon: PropTypes.string,
  placeholder: PropTypes.string,
  icon: PropTypes.node,
  onClickForIcon: PropTypes.func,
  addInputProps: PropTypes.object,
  accept: PropTypes.string,
  file: PropTypes.bool,
  onKeyUp: PropTypes.func,
  onChange: PropTypes.func,
};

export default Input;
