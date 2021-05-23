import React, { useContext } from "react";
import { deleteGroups } from "../../../redux/actions/groups";
import styles from "./DeleteGroupForm.scss";
import Button from "../../Button/Button";
import { useDispatch } from "react-redux";
import { PopupContext } from "../../../context/PopupContext";

export const DeleteGroupForm = ({ deleteId }) => {
  const dispatch = useDispatch();
  const { setIsOpen } = useContext(PopupContext);

  return (
    <>
      <p>Are you sure that you want to delete this group?</p>
      <div className={styles.groupPopupBtn}>
        <Button
          type="button"
          customBtn={styles.popupBtn}
          onClick={() => {
            dispatch(deleteGroups({}, deleteId));
            setIsOpen(false);
          }}
        >
          Yes
        </Button>
        <Button
          type="button"
          customBtn={styles.popupBtn}
          onClick={() => {
            setIsOpen(false);
          }}
        >
          No
        </Button>
      </div>
    </>
  );
};
