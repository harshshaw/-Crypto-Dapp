import React from "react";

export default function PurchaseTokens() {
  return (
    <div class="w-4/12 height-adjuster">
      <div class="flex flex-col w-full h-full pt-14 space-y-7">
        <div class="text-2xl text-gray-600">Exchange Currency</div>
        <div class="flex flex-row buttons-state w-full">
          <button class="bg-green-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-5/12">
            Buy
          </button>
          <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-5/12">
            Sell
          </button>
        </div>
        <div class="flex flex-col border-b border-teal-500 py-2 w-8/12">
          <label class="mb-2 text-lg text-gray-500" for="fname">
            CB tokens
          </label>
          <input
            class="disabled appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="number"
            placeholder="Enter amount"
            aria-label="fname"
          />
        </div>
        <div class="flex flex-col border-b border-teal-500 py-2 w-8/12">
          <label class="mb-2 text-lg text-gray-500" for="ether">
            Ethereum
          </label>
          <input
            class="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Equivalent ether"
            aria-label="ether"
          />
        </div>
        <div class="flex w-10/12 mt-2">
          <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full">
            Transact
          </button>
        </div>
      </div>
    </div>
  );
}
