import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import React from "react";
import {VictoryBar,
  VictoryChart} from "victory";

const sampleData = [
  {x: "July", y: 100},
  {x: "Aug", y: 230},
  {x: "Sept", y: 420},
  {x: "Oct", y: 100},
  {x: "Nov", y: 200},
  {x: "Dec", y: 500}];

export default function Bargraph() {
  return (
    <Grid style={{padding: 5}}>
      <ListSubheader style={{fontWeight: 'bold', color: 'black'}}
        align="left"
      >Investor Trend
      </ListSubheader>
      <VictoryChart
        domainPadding={20}>
        <VictoryBar
          style={{data: {fill: "#3f51b5"}}}
          data={sampleData}/>
      </VictoryChart>
    </Grid>

  );
}
