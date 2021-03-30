import React from "react";
import { useDispatch } from "react-redux";
import { addCoin, refund } from "../screens/vendingMachineSlice";
import { currencyFormatter } from "../App";
import styles from "./InsertCoins.module.css";

export function InsertCoins(props) {
  const dispatch = useDispatch();

  return (
    <div className={styles.coinButtonsContainer}>
      <div className={styles.outputPane}>{props.output}</div>
      <div className={styles.total}>
        TOTAL: {currencyFormatter.format(props.totalAmmountInserted)}
      </div>
      <div className={styles.row}>
        <button
          className={styles.coinButton}
          onClick={() => dispatch(addCoin(0.01))}
        >
          1p
        </button>
        <button
          className={styles.coinButton}
          onClick={() => dispatch(addCoin(0.02))}
        >
          2p
        </button>
        <button
          className={styles.coinButton}
          onClick={() => dispatch(addCoin(0.05))}
        >
          5p
        </button>
        <button
          className={styles.coinButton}
          onClick={() => dispatch(addCoin(0.1))}
        >
          10p
        </button>
        <button
          className={styles.coinButton}
          onClick={() => dispatch(addCoin(0.2))}
        >
          20p
        </button>
        <button
          className={styles.coinButton}
          onClick={() => dispatch(addCoin(0.5))}
        >
          50p
        </button>
        <button
          className={styles.coinButton}
          onClick={() => dispatch(addCoin(1.0))}
        >
          £1
        </button>
        <button
          className={styles.coinButton}
          onClick={() => dispatch(addCoin(2.0))}
        >
          £2
        </button>
        <button
          className={styles.coinButton}
          onClick={() => dispatch(refund())}
        >
          Refund
        </button>
      </div>
    </div>
  );
}
