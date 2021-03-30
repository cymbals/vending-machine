import { createSlice } from "@reduxjs/toolkit";

function formatValueAsCoin(value) {
  if (value >= 1) {
    return "£" + value;
  } else {
    return value * 100 + "p";
  }
}

export const vendingMachineSlice = createSlice({
  name: "vendingMachine",
  initialState: {
    products: [
      { name: "Mars", quantity: 0, price: 0.51 },
      { name: "Snickers", quantity: 0, price: 0.65 },
      { name: "Crunchie", quantity: 0, price: 0.7 },
      { name: "Wispa", quantity: 0, price: 0.65 },
      { name: "Bottle of water", quantity: 0, price: 1.05 },
      { name: "Crisps", quantity: 0, price: 0.85 },
      { name: "Dairy milk bar", quantity: 0, price: 0.5 },
    ],
    changeAvailable: [
      { value: 2, quantity: 0 },
      { value: 1, quantity: 0 },
      { value: 0.5, quantity: 0 },
      { value: 0.2, quantity: 0 },
      { value: 0.1, quantity: 0 },
      { value: 0.05, quantity: 0 },
      { value: 0.02, quantity: 0 },
      { value: 0.01, quantity: 0 },
    ],
    coinsInserted: [
      { value: 2, quantity: 0 },
      { value: 1, quantity: 0 },
      { value: 0.5, quantity: 0 },
      { value: 0.2, quantity: 0 },
      { value: 0.1, quantity: 0 },
      { value: 0.05, quantity: 0 },
      { value: 0.02, quantity: 0 },
      { value: 0.01, quantity: 0 },
    ],
    totalAmmountInserted: 0,
    output: "Add products and change",
    restockingMode: true,
  },

  reducers: {
    addProduct: (state, action) => {
      state.products.find(function (obj) {
        return obj.name === action.payload.name;
      }).quantity += 1;
    },

    addChange: (state, action) => {
      state.changeAvailable.find(function (obj) {
        return obj.value === action.payload.value;
      }).quantity += 1;
    },

    addCoin: (state, action) => {
      state.coinsInserted.find(function (obj) {
        return obj.value === action.payload;
      }).quantity += 1;
      state.totalAmmountInserted += action.payload;
    },

    refund: (state) => {
      state.totalAmmountInserted = 0;
      state.coinsInserted.forEach(
        (denomination) => (denomination.quantity = 0)
      );
    },

    productSelected: (state, action) => {
      var product = state.products.find(function (obj) {
        return obj.name === action.payload.name;
      });

      if (product) {
        if (product.quantity <= 0) {
          state.output = "Out of stock";
        } else if (action.payload.price > state.totalAmmountInserted) {
          state.output = "Insufficient funds";
        } else {
          // Subtract the price of the product from the total inserted
          state.totalAmmountInserted -= action.payload.price;

          // Add coins inserted to the machines available change
          state.coinsInserted.forEach((denomination) => {
            // Add the quantity available change
            state.changeAvailable.find(function (obj) {
              return obj.value === denomination.value;
            }).quantity += denomination.quantity;

            // Clear coins inserted quantity
            denomination.quantity = 0;
          });

          // Calculate the change to return
          var changeString = "";
          state.changeAvailable.forEach((denomination) => {
            while (
              denomination.quantity >= 1 &&
              denomination.value <= state.totalAmmountInserted
            ) {
              state.totalAmmountInserted -= denomination.value;
              denomination.quantity -= 1;
              changeString += formatValueAsCoin(denomination.value) + ", ";
            }
          });

          // Remove trailing comma and space
          if (changeString !== "") {
            changeString = changeString.slice(0, -2);
          }

          // Like all good vending machines, it keeps any money it doesn't have change for :)
          state.totalAmmountInserted = 0;

          // Display the output
          state.output =
            "You received a " +
            action.payload.name +
            (changeString !== "" ? " and " + changeString : "");

          // Decrement product quantity
          state.products.find(function (obj) {
            return obj.name === action.payload.name;
          }).quantity -= 1;
        }
      }
    },

    setRestockingMode: (state, action) => {
      state.restockingMode = action.payload;
      if (state.restockingMode) {
        state.output = "Add products and change";
      } else {
        state.output = "Insert coins and select product";
      }
    },
  },
});

export const {
  addProduct,
  addChange,
  addCoin,
  refund,
  productSelected,
  setRestockingMode,
} = vendingMachineSlice.actions;

export const selectProducts = (state) => state.vendingMachine.products;
export const selectChangeAvailable = (state) =>
  state.vendingMachine.changeAvailable;
export const selectCoinsInserted = (state) =>
  state.vendingMachine.coinsInserted;
export const selectTotalAmmountInserted = (state) =>
  state.vendingMachine.totalAmmountInserted;
export const selectOutput = (state) => state.vendingMachine.output;
export const selectRestockingMode = (state) =>
  state.vendingMachine.restockingMode;

export default vendingMachineSlice.reducer;
