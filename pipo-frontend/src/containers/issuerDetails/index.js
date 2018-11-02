import BidForm from "../../components/BidForm";
import Grid from "@material-ui/core/Grid";
import InvestorOrders from "./graphs/InvestorOrders";
import OrderHistory from "./graphs/OrderHistory";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import{VictoryLabel} from "victory";
import {withStyles} from "@material-ui/core/styles";
const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop: 20,
  },
  paper: {
    padding: theme.spacing.unit,
    textAlign: "center",
    color: theme.palette.text.secondary,
    maxWidth: 450,
  },
});

function IssuerDetails(props) {
  const {classes, match} = props;

  return (
    <Grid
      container
      className={classes.root}
      spacing={24}>
      <Grid
        item
        xs={12}>
        <h1>Issuer Details {match.params.id && match.params.id}</h1>
      </Grid>
      <Grid
        container
        xs={12}
        spacing={16}
        justify="space-evenly">
        <Grid
          item>
          <Paper className={classes.paper}>
            <VictoryLabel
              text={"Investor Orders"}
              x={110}
              y={30}
            />
            <InvestorOrders />
          </Paper>
        </Grid>
        <Grid
          item
        >
          <Paper className={classes.paper}>
            <VictoryLabel
              text={"Order History"}
              x={110}
              y={30} />
            <OrderHistory />
          </Paper>
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}>
        <BidForm />
      </Grid>
    </Grid>
  );
}

IssuerDetails.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(IssuerDetails);
