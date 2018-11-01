import ListSubheader from "@material-ui/core/ListSubheader";
import React from "react";

import {
  HorizontalGridLines,
  VerticalBarSeries,
  VerticalGridLines,
  XAxis,
  XYPlot,
  YAxis,
} from "react-vis";

const sampleData = [{x: "Oct", y: 100},
  {x: "Nov", y: 230},
  {x: "Dec", y: 420}];

export default function Example(props) {
  return (
    <div>
      <ListSubheader align="left">Investor Trend</ListSubheader>
      <XYPlot
        margin={{left: 80}}
        xType="ordinal"
        width={300}
        height={300}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis tickLabelAngle={-45} />
        <YAxis />
        <VerticalBarSeries
          data={sampleData}
        />
      </XYPlot>
    </div>

  );
}