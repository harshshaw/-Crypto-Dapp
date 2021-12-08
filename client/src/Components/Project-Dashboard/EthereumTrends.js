import React, { useState, useEffect } from "react";
import { AgChartsReact } from "ag-charts-react";
import * as agCharts from "ag-charts-community";
import chartData from "./ChartDataOptions.js";
import Axios from "axios";

function EthereumTrends(props) {
  var [chartMetaData, setChartMetaData] = useState(chartData);

  useEffect(() => {
    Axios.get(
      `https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=100&api_key=${process.env.REACT_APP_CRYPTO_COMPARE_API_KEY}`
    ).then((response) => {
      /* PENDING
      const updatedData = response["data"]["Data"]["Data"].map(
        (timeInstanceData) => {
          const objectData = timeInstanceData;
          const convertedDate = new Date(objectData.time).toLocaleTimeString(
            undefined,
            { timeZone: "Asia/Kolkata" }
          );

          objectData.time = new Date(convertedDate).getTime();

          return objectData;
        }
      ); */

      setChartMetaData((prevState) => ({
        ...prevState,
        options: {
          ...prevState.options,
          data: response["data"]["Data"]["Data"],
        },
      }));
    });
  }, []);

  return (
    <div className="-mt-2.5">
      <AgChartsReact options={chartMetaData.options} />
    </div>
  );
}

export default EthereumTrends;
