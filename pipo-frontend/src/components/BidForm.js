//import BidData from "../data/bidData";
import Button from "@material-ui/core/Button";
import ConfirmBid from "./ConfirmBid";
import Paper from "@material-ui/core/Paper";
import PlaceBid from "./PlaceBid";
import PropTypes from "prop-types";
import React from "react";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import Typography from "@material-ui/core/Typography";
import api from "../services/backend";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";

const styles = theme => ({
  appBar: {
    position: "relative",
  },
  layout: {
    width: "auto",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginTop: theme.spacing.unit * 6,
      marginBottom: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
});

const steps = ["Place Bid", "Review your order"];

class Checkout extends React.Component {
  state = {
    activeStep: 0,
    bidPrice: "",
    noOfShares: "",
  };

  getStepContent(step) {
    const {bidPrice, noOfShares} = this.state;
    const BidData = [
      {
        "id": this.props.user.id,
        "name": this.props.user.name,
        "quantity": noOfShares,
        "ref_price": bidPrice,
      },
    ];

    switch (step) {
      case 0:
        return <PlaceBid
          bidPrice={bidPrice}
          bidPriceHandleChange={(e)=>this.setState({bidPrice: e.target.value})}
          noOfShares={noOfShares}
          noOfSharesHandleChange={(e)=>this.setState({noOfShares: e.target.value})}
        />;
      case 1:
        return <ConfirmBid rows={BidData} />;
      default:
        throw new Error("Unknown step");
    }
  }

  handleNext = () => {
    const {activeStep, bidPrice, noOfShares} = this.state;
    const {user, issuerId} = this.props;
    console.log(issuerId);
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
    if (activeStep === steps.length - 1) {
      api.addBid({
        "bid_price":bidPrice,
        "no_of_shares":noOfShares,
        "investor_id":user.id,
        "issuer_id":issuerId,
      }).then((response)=>console.log(response));
    }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  render() {
    const {classes} = this.props;
    const {activeStep} = this.state;

    return (
      <React.Fragment>
        <main className={classes.layout}>
          <Paper className={classes.paper}>
            <Typography
              component="h1"
              variant="h4"
              align="center">
              Checkout
            </Typography>
            <Stepper
              activeStep={activeStep}
              className={classes.stepper}>
              {steps.map(label => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            <React.Fragment>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Typography
                    variant="h5"
                    gutterBottom>
                    Thank you for your order.
                  </Typography>
                  <Typography variant="subtitle1">
                    Your order number is #2001539. We have emailed your order confirmation, and will
                    send you an update when your order has shipped.
                  </Typography>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  {this.getStepContent(activeStep)}
                  <div className={classes.buttons}>
                    {activeStep !== 0 && (
                      <Button
                        onClick={this.handleBack}
                        className={classes.button}>
                        Back
                      </Button>
                    )}
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleNext}
                      className={classes.button}
                    >
                      {activeStep === steps.length - 1 ? "Place order" : "Next"}
                    </Button>
                  </div>
                </React.Fragment>
              )}
            </React.Fragment>
          </Paper>
        </main>
      </React.Fragment>
    );
  }
}

Checkout.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.users.user || {"id": 3, "name": "Sudhams Tarun"} ,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Checkout));
