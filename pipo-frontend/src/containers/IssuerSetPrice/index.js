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
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";
const styles = theme => ({
  tableContainer: {
    height: 320,
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
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 5,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: 25,
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
      <React.Fragment>
        <CssBaseline />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <Grid
            container
            className={classes.root}
            spacing={24}
            justify="space-evenly">
            <Grid
              item
              xs={12}>
              <Typography
                style={{fontWeight: "bold", color: "black"}}
                variant="h4"
                gutterBottom
                component="h4">
                Henry Charles
              </Typography>
            </Grid>
            <Grid
              item
              xs={9}>
              <div className={classes.tableContainer}>
                <BidTable rows={BidsData}/>
              </div>
            </Grid>
            <Grid
              item
              xs={3}>
              <div>
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
                        style={{fontWeight: "bold", color: "black"}} >Decide ask Price!
                      </ListSubheader>
                      <Divider />
                    </Grid>
                    <Grid
                      item
                      xs={12}><TextField
                        id="1"
                        label="ask price"
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
              </div>
            </Grid>

          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);