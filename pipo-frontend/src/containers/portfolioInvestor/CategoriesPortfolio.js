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

const styles = theme => ({
  root: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
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
            <TableCell>Performance</TableCell>
            <TableCell>Distribution</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow
                key={row.id}>
                <TableCell
                  component="th"
                  scope="row">
                  {row.factor}
                </TableCell>
                <TableCell style={{width: 400}}>
                  <VictoryChart
                    minDomain={{y: 700}}>
                    {row.performance.slice(0,3).map((factorData,index) => <VictoryLine
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
