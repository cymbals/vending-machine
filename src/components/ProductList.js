import React from "react";
import { useDispatch } from "react-redux";
import { addProduct, productSelected } from "../screens/vendingMachineSlice";
import { currencyFormatter } from "../App";
import styles from "./ProductList.module.css";

export function ProductList(props) {
  return (
    <div className={styles.title}>
      <b>Product List</b>
      <div className={styles.row}>
        <div className={styles.productListContainer}>
          <div className={styles.row}>
            <b className={styles.field}>Product</b>
            <b className={styles.field}>Price</b>
            <b className={styles.field}>Qty</b>
          </div>
          {props.products.map((product, index) => (
            <ProductListItem
              key={index}
              product={product}
              restockingMode={props.restockingMode}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductListItem(props) {
  const dispatch = useDispatch();

  return (
    <div className={styles.row}>
      <div className={styles.field}>{props.product.name}</div>
      <div className={styles.field}>
        {currencyFormatter.format(props.product.price)}
      </div>
      <div className={styles.field}>{props.product.quantity}</div>
      <div className={styles.field}>
        {props.restockingMode ? (
          <button onClick={() => dispatch(addProduct(props.product))}>
            Add
          </button>
        ) : (
          <button onClick={() => dispatch(productSelected(props.product))}>
            Select
          </button>
        )}
      </div>
    </div>
  );
}
