import React from "react";
import styles from "./HistoryNotes.scss";

export const HistoryNotes = ({ item }) => {
  return (
    <>
      <h2 className={styles.title}>
        <span className={styles.red}>History</span>
      </h2>
      {item.notes.length === 0 ? (
        <p className={styles.noComment}>Not Comments</p>
      ) : (
        item.notes.map((itemNotes, index) => (
          <div className={styles.blockComment} key={index}>
            <b className={styles.name}>{itemNotes.client.name}:</b>
            <p className={styles.comment}>{itemNotes.comment}</p>
          </div>
        ))
      )}
    </>
  );
};
