import Divider from "@material-ui/core/Divider";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import {VictoryBar,
  VictoryChart} from "victory";

function Bargraph(props) {
  const {sampleData} = props;
  return (
    <Paper >
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
    </Paper>

  );
}

Bargraph.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default (Bargraph);
