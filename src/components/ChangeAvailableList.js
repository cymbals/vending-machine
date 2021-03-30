import React from "react";
import { useDispatch } from "react-redux";
import { addChange } from "../screens/vendingMachineSlice";
import { currencyFormatter } from "../App";
import styles from "./ChangeAvailableList.module.css";

export function ChangeAvailableList(props) {
  return (
    <div className={styles.title}>
      <b>Change Available</b>
      <div className={styles.row}>
        <div className={styles.ChangeAvailableListContainer}>
          <div className={styles.row}>
            <b className={styles.field}>Coin</b>
            <b className={styles.field}>Qty</b>
          </div>
          {props.changeAvailable.map((denomination, index) => (
            <ChangeAvailableListItem
              key={index}
              denomination={denomination}
              restockingMode={props.restockingMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ChangeAvailableListItem(props) {
  const dispatch = useDispatch();

  return (
    <div className={styles.row}>
      <div className={styles.field}>
        {currencyFormatter.format(props.denomination.value)}
      </div>
      <div className={styles.field}>{props.denomination.quantity}</div>
      {props.restockingMode ? (
        <button
          className={styles.addButton}
          onClick={() => dispatch(addChange(props.denomination))}
        >
          Add
        </button>
      ) : null}
    </div>
  );
}
