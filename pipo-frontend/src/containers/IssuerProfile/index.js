import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import InvesterData from "../../data/InvesterData";
import IssuerCard from "../../components/IssuerCard";
import LineData from "../../data/LineChart";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import SimpleLineChart from "../../components/SimpleLineChart";
import SimpleTable from "../../components/SimpleTable";
import Typography from "@material-ui/core/Typography";
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
  chartContainer: {
    marginLeft: -22,
  },
  paper: {
    marginTop: 25,
  },
  row: {
    display: "flex",
    justifyContent: "center",
  },
});

class Dashboard extends React.Component {
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
                variant="h4"
                gutterBottom
                component="h2">
              Henry Charles
              </Typography>
            </Grid>
            <Grid
              item
              xs={3}>
              <IssuerCard />
            </Grid>
            <Grid
              item
              xs={9}>
              <Typography
                component="div"
                className={classes.chartContainer}>
                <SimpleLineChart data={LineData}/>
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}>
              <div className={classes.tableContainer}>
                <SimpleTable rows={InvesterData}/>
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
                    className={classes.root}
                    spacing={24}
                    justify="space-evenly">
                    <Grid
                      item
                      xs={12}>
                      <ListSubheader align="left">Money Raised</ListSubheader>
                      <Divider />
                    </Grid>
                    <Grid
                      item
                      xs={12}>
                      <Typography
                        variant="h3"
                        align="center"
                        gutterBottom>
                    $17,253
                      </Typography>
                    </Grid>
                    <Grid
                      item
                      xs={10}>
                      <Typography
                        color="textSecondary">
          Target: $30,000
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value="60" />
                    </Grid>
                    <Grid
                      item
                      xs={12}>
                      <Typography
                        variant="h6"
                        align="center"
                        gutterBottom>
                    Ask Price: $17.28
                      </Typography>
                      <br />
                      <br />
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