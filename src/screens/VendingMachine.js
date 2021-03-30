import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectChangeAvailable,
  selectProducts,
  selectTotalAmmountInserted,
  selectOutput,
  selectRestockingMode,
  setRestockingMode,
} from "./vendingMachineSlice";
import { ProductList } from "../components/ProductList";
import { ChangeAvailableList } from "../components/ChangeAvailableList";
import { InsertCoins } from "../components/InsertCoins";
import styles from "./VendingMachine.module.css";



export function VendingMachine() {
  const dispatch = useDispatch();

  const products = useSelector(selectProducts);
  const changeAvailable = useSelector(selectChangeAvailable);
  const totalAmmountInserted = useSelector(selectTotalAmmountInserted);
  const output = useSelector(selectOutput);
  const restockingMode = useSelector(selectRestockingMode);

  return (
    <div className={styles.column}>
      <button
        className={styles.restockingModeButton}
        onClick={() => dispatch(setRestockingMode(!restockingMode))}
      >
        {restockingMode ? "Disable Restocking Mode" : "Enable Restocking Mode"}
      </button>
      <div className={styles.row}>
        <div className={styles.productListContainer}>
          <ProductList
            products={products}
            restockingMode={restockingMode}
          ></ProductList>
        </div>
        <div className={styles.changeAvailableContainer}>
          <ChangeAvailableList
            changeAvailable={changeAvailable}
            restockingMode={restockingMode}
          ></ChangeAvailableList>
        </div>
      </div>
      <InsertCoins
        output={output}
        totalAmmountInserted={totalAmmountInserted}
      ></InsertCoins>
    </div>
  );
}
