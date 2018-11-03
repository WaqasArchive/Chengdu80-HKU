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
const styles = () => ({
  root: {
    width: "90%",
    paddingTop: 20,
  },
  tableContainer: {
    height: 320,
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
      <Grid
        container
        xs={12}
        className={classes.root}>
        <Grid
          item
          xs={12}>
          <h1>Your IPO Details</h1>
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
          container
          spacing={24}
          justify="space-evenly"
          xs={12}>
          <Grid
            item
            xs={6}>
            <SimpleTable rows={InvesterData}/>
          </Grid>
          <Grid
            item
            xs={3}
            style={{paddingTop: 50}}>
            <Paper
              elevation={1}>
              <Grid
                container
                spacing={24}
                justify="space-evenly">
                <Grid
                  item
                  xs={12}>
                  <ListSubheader
                    align="left"
                    style={{fontWeight: "bold"}} >Money Raised
                  </ListSubheader>
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
