import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
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

export default function Bargraph() {
  return (
    <Grid style={{padding: 5}}>
      <ListSubheader align="left">Investor Trend</ListSubheader>
      <Divider style={{marginBottom: 20}} />
      <XYPlot
        xType="ordinal"
        width={250}
        height={250}
        style={{marginLeft: 20}}>
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickLabelAngle={-45}
        />
        <YAxis />
        <VerticalBarSeries
          data={sampleData}
        />
      </XYPlot>
    </Grid>

  );
}
