import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import ParamPie from "./ParamPie";
import PropTypes from "prop-types";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {VictoryChart, VictoryLine} from "victory";
import {factorDistributionData, factorPerformanceData} from "../../data/factorData";
import {withStyles} from "@material-ui/core/styles";

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

const styles = () => ({
  root: {
    width: "100%",
    overflowX: "auto",
  },
  table: {
    minWidth: 700,
  },
  pie: {
    width: 300,
  },
});

const rows = [];
for (const factor in factorDistributionData) {
  rows.push(
    {
      "factor": factor,
      "performance": factorPerformanceData[factor],
      "share": factorDistributionData[factor],
    }
  );
}

function SimpleTable(props) {
  const {classes} = props;
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Factor</TableCell>
            <TableCell>Best Performing Sector</TableCell>
            <TableCell>Average Returns (Past 12 Month)</TableCell>
            <TableCell>Distribution</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            let max = 0;
            let max_key = "";
            for (const key in row.share) {
              if (row.share[key] > max) {
                max = row.share[key];
                max_key = key;
              }
            }
            return (
              <TableRow
                key={row.id}>
                <TableCell>
                  {row.factor}
                </TableCell>
                <TableCell>
                  <Chip
                    label={max_key}
                    color="primary"
                    variant="outlined"/>
                </TableCell>
                <TableCell style={{width: 400}}>
                  <VictoryChart
                    maxDomain={{y: 105}}>
                    {row.performance.slice(0,6).map((factorData,index) => <VictoryLine
                      key={index}
                      style={{
                        data: {
                          stroke: getRandomColor(), strokeWidth: 3,
                        },
                        labels: {
                          fontSize: 20,
                          fill: (d) => d.x === 3 ? "#000000" : "green",
                        },
                      }}
                      data={factorData}/>)}
                  </VictoryChart>
                </TableCell>
                <TableCell className={classes.pie}>
                  <ParamPie
                    rawData={row.share}
                  />
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleTable);
