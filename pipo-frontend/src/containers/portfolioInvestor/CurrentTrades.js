import Chip from "@material-ui/core/Chip";
import DoneIcon from "@material-ui/icons/Done";
//import EntityData from "../../data/CurrentTrades";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import api from "../../services/backend";
import {connect} from "react-redux";
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

class SimpleTable extends React.Component {
  state = {
    rows: [],
  }
  componentDidMount() {
    api.getInvestorBids(this.props.user.id).then(response => {
      this.setState({rows: response});
    }).catch(error => console.log(error));
  }

  render() {
    const {classes} = this.props;
    const {rows} = this.state;
    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Person Name</TableCell>
              <TableCell>Symbol</TableCell>
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
                    {row.ipo_name}
                  </TableCell>
                  <TableCell>
                    {row.ipo_symbol}
                  </TableCell>
                  <TableCell>
                    {row.price}
                  </TableCell>
                  <TableCell>
                    {row.status && <Chip
                      label={row.status}
                      clickable
                      className={classes.chip}
                      color="primary"
                      deleteIcon={<DoneIcon />}
                    />}
                    {!row.status && <Chip
                      label={row.status}
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
}

SimpleTable.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.users.user || {"id": 3, "name": "Sudhams Tarun"} ,
});

export default connect(mapStateToProps, null)(withStyles(styles)(SimpleTable));
