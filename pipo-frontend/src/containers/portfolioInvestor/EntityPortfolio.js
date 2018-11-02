import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {EntityData} from "../../data/entityData";
import {VictoryChart, VictoryLine} from "victory";
import {withStyles} from "@material-ui/core/styles";

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

function SimpleTable(props) {
  const {classes} = props;
  const rows = EntityData;
  console.log(rows);
  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell>Person Name</TableCell>
            <TableCell>Symbol</TableCell>
            <TableCell>Shares Owned</TableCell>
            <TableCell>Current Price</TableCell>
            <TableCell>Price Trend (Last 30 Days)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => {
            return (
              <TableRow
                key={row.id}>
                <TableCell>
                  {row.full_name}
                </TableCell>
                <TableCell>
                  {row.symbol}
                </TableCell>
                <TableCell>
                  {row.shares_owned}
                </TableCell>
                <TableCell>
                  {row.current_price}
                </TableCell>
                <TableCell style={{width: 250}}>
                  <VictoryChart maxDomain={{y: 105}}>
                    <VictoryLine
                      style={{
                        data: {
                          stroke: "green", strokeWidth: 3,
                        },
                        labels: {
                          fontSize: 20,
                          fill: (d) => d.x === 3 ? "#000000" : "green",
                        },
                      }}
                      data={row.performance}/>
                  </VictoryChart>
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
