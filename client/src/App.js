import NewProject from "./Components/Create-Project/NewProject";
import ExchangeDashboard from "./Components/PurchasingDashboard/ExchangeDashboard";
import ProjectsDashboard from "./Components/ShowcaseProjects/ProjectsDashboard";
import Web3 from 'web3';
import React, { useState, useEffect } from "react";
// import CbToken from '../src/abis/CbToken.json';
// import FundSwap from '../src/abis/FundSwap.json';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

function App() {

  const [account, updateAccounts] = useState();
  const [validate, updateValidate] = useState(false);
  const [cbToken, updatecbToken] = useState();
  const [fundSwap, updateFundSwap] = useState();
  const [NetworkId, updateNetworkId] = useState();
  // const [CbTokenBalance, updatecbTokenBalance] = useState(0);
  // const [FundSwapBalance, updatefundSwapBalance] = useState();

  useEffect( async () => {

    await loadWeb3();
    await loadBlockchainData();
  }, [0]);


  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    updateAccounts(accounts[0]);
    updateNetworkId(networkId);
    console.log("Account 0", account);
    // updateValidate(false)
    // console.log("Network Id", networkId);

    // const cbTokenData = CbToken.networks[networkId];
    // if (cbTokenData) {
    //   const cbToken = new web3.eth.Contract(CbToken.abi, cbTokenData.address);
    //   updatecbToken(cbToken);
    //   let cbTokenBalance = await cbToken.methods.balanceOf(account).call();
    //   // updatecbTokenBalance(cbTokenBalance);
    //   console.log("CbToken Balance==", cbTokenBalance);
    // }
    // const fundSwapData = FundSwap.networks[networkId];
    // if (fundSwapData) {
    //   const fundSwap = new web3.eth.Contract(FundSwap.abi, fundSwapData.address);
    //   console.log("Address===", fundSwapData.address);
    //   updateFundSwap(fundSwap);
    //   let fundSwapBalance = await cbToken.methods.balanceOf(fundSwapData.address).call();
    //   // updatefundSwapBalance(fundSwapBalance);
    //   console.log("FundSwap Balance==", fundSwapBalance.toString());
    // }

  }

  window.ethereum.on('accountsChanged', function (accounts) {
    // console.log("hello")
    // console.log(accounts)
    updateAccounts(accounts[0]);
    // updateValidate(!validate);
  })




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


  return (
    <Router>
      <Routes>
        <Route exact path="/"
          element={
            <ExchangeDashboard
              networkId={NetworkId}
              account={account}
            />}
        >

        </Route>
        <Route exact path="/create-project" element={<NewProject 
          networkId={NetworkId}
          account={account}
        />}></Route>
        <Route
          exact
          path="/show-projects"
          element={<ProjectsDashboard
            networkId={NetworkId}
            account={account}
          />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
