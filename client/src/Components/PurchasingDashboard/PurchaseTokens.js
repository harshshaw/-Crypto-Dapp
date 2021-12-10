import React, { useState } from "react";
import ExchangeLogo from "../../ether.png";

export default function PurchaseTokens() {
  const [purchasingState, setPurchasingState] = useState("buy");
  const [transactAmount, setTransactAmount] = useState(0);
  const [equivalentAmount, setEquivalentAmount] = useState(0);

  const handlePurchaseChange = (e) => {
    setPurchasingState(e.target.name);

    if (e.target.name === "sell") {
      setEquivalentAmount(transactAmount / 20);
    } else {
      setEquivalentAmount(transactAmount * 20);
    }
  };

  const handleTransactionChange = (e) => {
    if (purchasingState === "buy") {
      const changedAmount = e.target.value * 20;

      setEquivalentAmount(changedAmount);
    } else {
      const changedAmount = e.target.value / 20;

      setEquivalentAmount(changedAmount);
    }
    setTransactAmount(e.target.value);
  };

  return (
    <div class="w-4/12 height-adjuster">
      <div class="flex flex-row w-full">
        <div class="flex flex-col w-5/12 items-start">
          <p class="text-xs text-red-400 font-bold">Total Reward</p>
          <h2 class="text-3xl text-gray-500">$9,928</h2>
        </div>
        <div class="flex flex-col w-5/12 items-end">
          <p class="text-xs text-green-400 font-bold">Total Balance</p>
          <h2 class="text-3xl text-gray-500">$202,244</h2>
        </div>
      </div>
      <div class="flex flex-col w-full h-full pt-14 space-y-7">
        <div class="w-10/12 flex">
          <div class="text-2xl text-gray-500">Exchange Currency</div>
          <img class="ml-auto h-8" src={ExchangeLogo} />
        </div>
        <div class="flex flex-row buttons-state w-full">
          <button
            onClick={handlePurchaseChange}
            name="buy"
            class="transition duration-500 ease-in-out bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 w-5/12"
          >
            Buy
          </button>
          <button
            onClick={handlePurchaseChange}
            name="sell"
            class="transition duration-500 ease-in-out bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 w-5/12"
          >
            Sell
          </button>
        </div>
        <div class="flex flex-col border-b border-teal-500 py-2 w-10/12">
          <label class="mb-2 text-lg text-gray-500" for="fname">
            {purchasingState === "buy" ? "Ethereum" : "CB Tokens"}
          </label>
          <input
            class="disabled appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="number"
            placeholder="Enter amount"
            aria-label="tokens"
            value={transactAmount}
            onChange={handleTransactionChange}
          />
        </div>
        <div class="flex flex-col border-b border-teal-500 py-2 w-10/12">
          <label class="mb-2 text-lg text-gray-500" for="ether">
            {purchasingState === "buy" ? "CB Tokens" : "Ethereum"}
          </label>
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder={
              purchasingState === "buy"
                ? "Equivalent CB Tokens"
                : "Equivalent Ethereum"
            }
            value={equivalentAmount}
            onChange={handleTransactionChange}
            aria-label="tokens"
          />
        </div>
        <div class="flex w-10/12 pt-5">
          <button class="transition duration-500 ease-in-out bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 w-full">
            Transact
          </button>
        </div>
      </div>
    </div>
  );
}
