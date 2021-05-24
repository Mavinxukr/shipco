import React, { useState } from "react";
import cx from "classnames";
import SelectIcon from "../../assets/svg/selectIcon.svg";

import styles from "./Multi.scss";

const Example = ({ options, setSelected, value, label }) => {
  const [clicked, setClicked] = useState(false);
  const [receivedOptions, setReceivedOptions] = useState(
    options.filter((item) =>
      value.every((itemChild) => itemChild.value !== item.id)
    )
  );

  return (
    <div className={styles.flexSelect}>
      <label className={styles.label}>{label || "Clients id"}</label>
      <div className={styles.select}>
        {value.length ? (
          value.map((item) => (
            <div className={styles.item} key={item.value}>
              <span>{item.label}</span>
              <button
                type="button"
                onClick={() => {
                  setSelected(
                    value.filter((itemChild) => itemChild.value !== item.value)
                  );
                  setReceivedOptions([
                    { id: item.value, name: item.label },
                    ...receivedOptions,
                  ]);
                }}
              >
                x
              </button>
            </div>
          ))
        ) : (
          <div className={styles.item} />
        )}
        <button
          type="button"
          className={styles.icon}
          onClick={() => setClicked(!clicked)}
        >
          <SelectIcon />
        </button>
        <div className={cx(styles.options, clicked && styles.activeOption)}>
          {receivedOptions.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setSelected([...value, { value: item.id, label: item.name }]);
                setReceivedOptions(
                  receivedOptions.filter(
                    (itemChild) => itemChild.id !== item.id
                  )
                );
              }}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Example;
