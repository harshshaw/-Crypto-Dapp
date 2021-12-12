import React from "react";
import Navbar from "../Navbar/Navbar";
import PurchaseTokens from "./PurchaseTokens";
import EthereumTrends from "./EthereumTrends";

const ProjectDashboard = (props) => {
  return (
    <div class="rounded-xl bg-white w-10/12 mx-40 my-10 height-adjuster">
      <Navbar account ={props.account}/>
      <div class="flex w-full mt-5 h-5/6 justify-around">
        <EthereumTrends />
        <PurchaseTokens networkId={props.networkId} account={props.account} />
      </div>
    </div>
  );
}

export default ProjectDashboard;
