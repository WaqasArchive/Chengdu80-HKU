import BarGraph from "../../components/bargraph";
import BidDistribution from "../../data/BidDistribution";
import BidTable from "../../components/BidTable";
import BidsData from "../../data/bids";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import TextField from "@material-ui/core/TextField";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
const styles = theme => ({
  root: {
    width: "90%",
    paddingTop: 20,
  },
  tableContainer: {
    height: 400,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    height: "100vh",
    overflow: "auto",
  },
  paper: {
    marginTop:25,
  },
  row: {
    display: "flex",
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing.unit*5,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  dense: {
    marginTop: 19,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    marginLeft: theme.spacing.unit*5,
    marginBottom: theme.spacing.unit*5,
    marginTop: theme.spacing.unit,
  },
});

class Dashboard extends React.Component {
  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    const {classes} = this.props;

    return (
      <Grid
        container
        xs={12}
        className={classes.root}>
        <Grid
          item
          xs={12}>
          <h1>Respond To Bids</h1>
        </Grid>
        <Grid
          container
          spacing={16}
          justify="space-evenly"
          xs={12}>
          <Grid
            item
            xs={6}>
            <BarGraph
              sampleData={BidDistribution}/>
          </Grid>
          <Grid
            item
            xs={6}>
            <BidTable
              rows={BidsData}/>
          </Grid>
          <Grid
            item
            xs={3}>
            <Paper
              className={classes.paper}
              elevation={1}>
              <Grid
                container
                spacing={4}
                justify="space-evenly">
                <Grid
                  item
                  xs={12}>
                  <ListSubheader
                    align="left"
                    style={{fontWeight: "bold"}} >Decide Ask Price
                  </ListSubheader>
                  <Divider />
                </Grid>
                <Grid
                  item
                  xs={12}><TextField
                    id="1"
                    label="Ask Price"
                    margin="dense"
                    variant="filled"
                    className={classNames(classes.textField, classes.dense)}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    size="large"

                  >
        SET PRICE
                    <Icon className={classes.rightIcon}>send</Icon>
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);
