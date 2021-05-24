import React from "react";
import { useSelector } from "react-redux";
import { autoIdDataSelector } from "../../../utils/selectors";
import styles from "./HistoryNotes.scss";

export const HistoryNotes = () => {
  const autoId = useSelector(autoIdDataSelector);

  return autoId.notes.length === 0 ? (
    <p className={styles.noComment}>Not Comments</p>
  ) : (
    <>
      {autoId.notes.map((item, index) => (
        <div className={styles.blockComment} key={index}>
          <b className={styles.name}>{item.client.name}:</b>
          <p className={styles.comment}>{item.comment}</p>
        </div>
      ))}
    </>
  );
};
