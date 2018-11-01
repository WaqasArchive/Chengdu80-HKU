import Grid from "@material-ui/core/Grid";
import InvestorOrders from "./graphs/InvestorOrders";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 20,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

function IssuerDetails(props) {
  const {classes} = props;

  return (
    <Grid
      container
      className={classes.root}
      spacing={24}>
      <Grid
        item
        xs={12}>
        <h1>Issuer Details</h1>
      </Grid>
      <Grid item>
        <Paper className={classes.paper}>
          <InvestorOrders />
        </Paper>
      </Grid>
    </Grid>
  );
}

IssuerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IssuerDetails);
