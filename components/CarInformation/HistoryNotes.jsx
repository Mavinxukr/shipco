import React from "react";
import styles from "./HistoryNotes.scss";

export const HistoryNotes = ({ item }) => {
  if (item.notes.length === 0) {
    return <p className={styles.noComment}>Not Comments</p>;
  } else {
    return item.notes.map((itemNotes, index) => (
      <div className={styles.blockComment} key={index}>
        <b className={styles.name}>{itemNotes.client.name}:</b>
        <p className={styles.comment}>{itemNotes.comment}</p>
      </div>
    ));
  }
};
