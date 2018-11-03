import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import PropTypes from "prop-types";
import React from "react";
import {VictoryBar,
  VictoryChart} from "victory";
import {throws} from "assert";

function Bargraph(props) {
  const {sampleData} = props;
  return (
    <Grid >
      <ListSubheader
        style={{fontWeight: "bold"}}
        align="left"
      >{sampleData.heading}
      </ListSubheader>
      <Divider />
      <VictoryChart
        domainPadding={20}
      >
        <VictoryBar
          style={{data: {fill: "#3f51b5"}}}
          data={sampleData.data}
          animate={{
            onExit: {
              duration: 500,
              before: () => ({
                _y: 0,
                fill: "#3f51b5",
              }),
            },
          }}
        />
      </VictoryChart>
    </Grid>

  );
}

Bargraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (Bargraph);
