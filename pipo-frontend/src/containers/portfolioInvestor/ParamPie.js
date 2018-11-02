import React from "react";
import {VictoryPie} from "victory";

export default (props) => {
  const {rawData} = props;
  const data = [];
  let count = 0;
  for (const factor in rawData) {
    data.push({
      "label": factor,
      "y": rawData[factor],
      "x":count,
    });
    count++;
  }
  return (
    <VictoryPie
      data={data}
      labelRadius={80}
      innerRadius={80}
      width={300}
      height={300}
      colorScale={["tomato", "orange", "gold", "cyan", "navy" ]}
      style={{labels: {fill: "#3f51b5", fontSize: 15}, height:300, width: 300}}
    />
  );
};
