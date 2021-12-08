let chartData = {
  options: {
    title: { text: "Ethereum price range" },
    subtitle: { text: "in USD" },
    series: [
      {
        type: "line",
        xKey: "time",
        yKey: "high",
      },
      {
        type: "line",
        xKey: "time",
        yKey: "low",
      },
      {
        type: "line",
        xKey: "time",
        yKey: "open",
      },
    ],
    axes: [
      {
        type: "log",
        position: "left",
        title: {
          enabled: true,
          text: "Price",
        },
        label: {
          format: ",.0f",
          fontSize: 10,
        },
      },
      {
        type: "number",
        position: "bottom",
        title: {
          enabled: true,
          text: "Timestamp",
        },
        label: { fontSize: 10 },
      },
    ],
    legend: { enabled: true },
  },
};

export default chartData;
