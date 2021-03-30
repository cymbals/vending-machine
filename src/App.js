import React from 'react';
import { VendingMachine } from './screens/VendingMachine';
import './App.css';

// Create number formatter.
var currencyFormatter = new Intl.NumberFormat("en-EN", {
  style: "currency",
  currency: "GBP",
});
export {currencyFormatter};

function App() {
  return (
    <div className="App-header">
      <h1 className="title">Vending Machine</h1>
        <VendingMachine />
      </div>
  );
}

export default App;
