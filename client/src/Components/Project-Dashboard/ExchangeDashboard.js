import React from "react";
import Navbar from "../Navbar/Navbar";
import PurchaseTokens from "./PurchaseTokens";
import ExchangeTrends from "./ExchangeTrends";

export default function ProjectDashboard() {
  return (
    <div class="bg-white w-10/12 mx-40 my-10 height-adjuster">
      <Navbar />
      <div class="flex w-full mt-5 h-5/6 justify-around">
        <ExchangeTrends />
        <PurchaseTokens />
      </div>
    </div>
  );
}
