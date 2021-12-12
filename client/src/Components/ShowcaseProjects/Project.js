import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import CbToken from '../../abis/CbToken.json';
import FundSwap from '../../abis/FundSwap.json';
import {
  faProjectDiagram,
  faBuilding,
  faBlog,
  faDonate,
} from "@fortawesome/free-solid-svg-icons";

export default function Project(props) {

  const id = props.id
  const networkId = props.networkId;
  const account = props.account;
  const [cbToken, updatecbToken] = useState();
  const [fundSwap, updateFundSwap] = useState();
  const [amount, updateAmount] = useState();

  useEffect(async () => {
    await loadBlockchainData();
  }, [account]);

  function tokens(n) {
    return window.web3.utils.toWei(n, 'ether');
  }
  function fromwei(n){
    return window.web3.utils.fromWei(n, 'ether');
  }

  const loadBlockchainData = async () => {
    const web3 = window.web3;

    const cbTokenData = CbToken.networks[networkId];
    if (cbTokenData) {
      const cbToken = new web3.eth.Contract(CbToken.abi, cbTokenData.address);
      updatecbToken(cbToken);
    }
    const fundSwapData = FundSwap.networks[networkId];
    if (fundSwapData) {
      const fundSwap = new web3.eth.Contract(FundSwap.abi, fundSwapData.address);
      updateFundSwap(fundSwap);
    }
  }

  const transact = async()=> {
    const result = await cbToken.methods.approve(FundSwap.networks[networkId].address,tokens(`${amount}`)).send({from: account}).on('transactionHash', async (hash)=>{
      await fundSwap.methods.donate(id,props.data.creator,tokens(`${amount}`)).send({from: account}).on('transactionHash',(transHash)=>{})
    })
  }

  return (
    <div class="flex flex-col w-12/12 mb-4 mx-14 max-h-96 overflow-y-auto border border-indigo-600">
      {/* <img src={data.thumbnail} class="h-52" /> */}
      {/* <p>{id}</p> */}
      <h2 class="text-center text-xl">{props.data.projectName.toUpperCase()}</h2>
      {/* <p class="text-right mr-16 text-gray-400">~ {data.orgName}</p> */}
      <p class="p-2 text-gray-500">{props.data.description}</p>
      <div class="flex justify-around px-4 py-2 text-xl">
        {/* <a href={data.links.organizationLink}>
          <FontAwesomeIcon color="blue" icon={faBuilding} />
        </a> */}
        <a href={props.data.projectLink}>
          <FontAwesomeIcon color="purple" icon={faProjectDiagram} />
        </a>
        {/* <a href={data.links.blogLink}>
          <FontAwesomeIcon color="green" icon={faBlog} />
        </a> */}
      </div>
      <div class="flex justify-around mt-3">
        <div class="flex flex-col">
          <label class="text-lg text-gray-800">Goal (in CB)</label>
          <div class="rounded text-xl bg-green-900 text-white p-2">{fromwei(`${props.data.goal}`)}</div>
        </div>
        <div class="flex flex-col">
          <label class="text-lg text-gray-800">Completed (in CB)</label>
          <div class="rounded w-3/6 text-xl bg-indigo-800 text-white p-2">
          {fromwei(`${props.data.currentAmount}`)}
          </div>
        </div>
      </div>
      <div class="flex mt-9 mb-4 p-2">
        <input
          class="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-6/12 py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500"
          type="number"
          // value=""
          placeholder="Enter Amount"
          onChange={(e)=>{
            updateAmount(e.target.value)
          }}
        ></input>
        <button class="w-4/12 text-white rounded-lg bg-red-700 p-3"
          onClick={(e)=>{
            transact()
          }}
        >
          Donate
        </button>
      </div>
    </div>
  );
}
