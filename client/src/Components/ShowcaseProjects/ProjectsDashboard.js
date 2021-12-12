import React, { useEffect, useState } from "react";
import ProjectsSeedData from "./ProjectsSeedData";
import Project from "./Project";
import CbToken from '../../abis/CbToken.json';
import FundSwap from '../../abis/FundSwap.json';
import Navbar from "../Navbar/Navbar";


export default function ProjectsDashboard(props) {



  const networkId = props.networkId;
  // const account = props.account;
  const [n, setN] = useState(false);
  const [cbToken, updatecbToken] = useState();
  const [fundSwap, updateFundSwap] = useState();
  const [totalProject, setTotalProject] = useState();
  const [rows, setRows] = useState([]);
  
  


  useEffect(async () => {
    loadBlockchainData();
  }, [n]);

  function tokens(n) {
    return window.web3.utils.toWei(n, 'ether');
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
      const num = await fundSwap.methods.totalProject().call();
      setTotalProject(num);
      console.log(totalProject)
      let row = []
      for(let i = 1; i <= totalProject; i++) {
        let proj = await fundSwap.methods.projects(i).call();
        row.push(proj);
      }
      setRows(row)
    }
    setN(true)
  }
  

console.log(rows)




  return (
    <div class="rounded-xl bg-white w-10/12 mx-40 my-10 height-adjuster">
      <Navbar account= {props.account} />
      <div class="flex max-w-full h-5/6 mx-7 mt-2 flex-wrap overflow-y-auto">
        {rows.map((data,i) => {
          return <Project
            id={i+1}
            data={data} 
            networkId={props.networkId}
            account={props.account}
        />
        })}
        
        
      </div>
    </div>
  );
}
