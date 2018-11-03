import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
import EntityData from "../../data/CurrentTrades";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {VictoryChart, VictoryLine} from "victory";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
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
  chip: {
    margin: theme.spacing.unit,
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
            <TableCell>Number of Shares</TableCell>
            <TableCell>Bid Price</TableCell>
            <TableCell>Transaction Status</TableCell>
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
                <TableCell>
                  {row.status && <Chip
                    label={row.transactionStatus}
                    clickable
                    className={classes.chip}
                    color="primary"
                    deleteIcon={<DoneIcon />}
                  />}
                  {!row.status && <Chip
                    label={row.transactionStatus}
                    className={classes.chip}
                    color="secondary"
                  />
                  }
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
