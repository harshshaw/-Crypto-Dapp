import React, { useEffect, useState } from "react";
import ExchangeLogo from "../../ether.png";
import CbToken from '../../abis/CbToken.json';
import FundSwap from '../../abis/FundSwap.json';
import Web3 from 'web3';


export default function PurchaseTokens(props) {
  const networkId = props.networkId;
  const account = props.account;
  const [purchasingState, setPurchasingState] = useState("buy");
  const [transactAmount, setTransactAmount] = useState(0);
  const [equivalentAmount, setEquivalentAmount] = useState(0);
  const [cbToken, updatecbToken] = useState();
  const [fundSwap, updateFundSwap] = useState();
  const [CbTokenBalance, updatecbTokenBalance] = useState(0);
  const [rewardBalance, updaterewardBalance] = useState();


  useEffect(async () => {
    await loadBlockchainData();
  }, [account]);


  function tokens(n) {
    return window.web3.utils.toWei(n, 'ether');
  }

  function fromwei(n){
    return window.web3.utils.fromWei(n, 'ether');
  }

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


  const transact = async (e) => {
    console.log("Inside");
    if (purchasingState == "buy") {
      const result = await fundSwap.methods.buycbTokens().send({ from: account, value: tokens(`${transactAmount}`) }).on('transactionHash', (hash) => {
        // console.log("hash===", hash);
      });
      const investorBalance = await cbToken.methods.balanceOf(account).call();
      updatecbTokenBalance(fromwei(`${investorBalance}`));

    }
    else if (purchasingState == "sell") {
      console.log(transactAmount);
      const result = await cbToken.methods.approve(FundSwap.networks[networkId].address,tokens(`${transactAmount}`)).send({from: account}).on('transactionHash', async (hash)=>{
        await fundSwap.methods.sellcbTokens(tokens(`${transactAmount}`)).send({from: account}).on('transactionHash', async (transHash)=>{
          // console.log(transHash);
          const investorBalance = await cbToken.methods.balanceOf(account).call();
          updatecbTokenBalance(fromwei(`${investorBalance}`));
        })
      })

    }
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const cbTokenData = CbToken.networks[networkId];
    if (cbTokenData) {
      const cbToken = new web3.eth.Contract(CbToken.abi, cbTokenData.address);
      updatecbToken(cbToken);
      let cbTokenBalance = await cbToken.methods.balanceOf(account).call();
      updatecbTokenBalance(fromwei(`${cbTokenBalance}`));
      console.log("CbToken Balance==", cbTokenBalance);
    }
    const fundSwapData = FundSwap.networks[networkId];
    if (fundSwapData) {
      const fundSwap = new web3.eth.Contract(FundSwap.abi, fundSwapData.address);
      updateFundSwap(fundSwap);
      let rewardBalance =await fundSwap.methods.totalReward(account).call();
      updaterewardBalance(fromwei(`${rewardBalance}`))
    }
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      await window.ethereum.enable();
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
    }
  }



  console.log("TransactAmount==", transactAmount);

  return (
    <div class="w-4/12 height-adjuster">
      <div class="flex flex-row w-full">
        <div class="flex flex-col w-5/12 items-start">
          <p class="text-xs text-red-400 font-bold">Total Reward</p>
          <h2 class="text-3xl text-gray-500">{`${rewardBalance} Cb`}</h2>
        </div>
        <div class="flex flex-col w-5/12 items-end">
          <p class="text-xs text-green-400 font-bold">Total Balance</p>
          <h2 class="text-3xl text-gray-500">{`${CbTokenBalance} Cb`}</h2>
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
          <button
            class="transition duration-500 ease-in-out bg-red-500 hover:bg-red-700 text-white font-bold py-4 px-4 w-full"
            onClick={() => transact()}>
            Transact
          </button>
        </div>
      </div>
    </div>
  );
}
