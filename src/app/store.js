import { configureStore } from '@reduxjs/toolkit';
import vendingMachineReducer from '../screens/vendingMachineSlice';

export default configureStore({
  reducer: {
    vendingMachine: vendingMachineReducer,
  },
});
