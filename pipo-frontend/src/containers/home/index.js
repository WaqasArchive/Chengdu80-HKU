import Bargraph from "../../components/bargraph";
import Feed from "../../components/Feed";
import Grid from "@material-ui/core/Grid";
import InvestorTrend from "../../data/investorTrend";
import Iporaisedcard from "../../components/Iporaisedcard";
import Paper from "@material-ui/core/Paper";
import ProfileCard from "../../components/ProfileCard";
import PropTypes from "prop-types";
import React from "react";
import TopIssuerList from "../../components/TopIssuerList";
import TrendingList from "../../components/TrendingList";
import feed from "../../data/feed";
import investorTrend from "../../data/investorTrend";
import topIssuers from "../../data/topIssuers";
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

function Home(props) {
  const {classes} = props;

  return (
    <Grid
      container
      className={classes.root}
      spacing={24}>
      <Grid
        item
        xs={12}>
        <h1 style={{marginBottom:0}}>Dashboard</h1>
      </Grid>
      <Grid
        item
        xs={9}>
        <Feed items={feed} />
      </Grid>
      <Grid
        item
        xs={3}>
        <ProfileCard />
      </Grid>
      <Grid
        item
        xs={3}>
        <Paper className={classes.paper}>
          <Bargraph sampleData={investorTrend}/>
        </Paper>
      </Grid>
      <Grid
        item
        xs={3}>
        <Paper className={classes.paper}>
          <Iporaisedcard />
        </Paper>
      </Grid>
      <Grid
        item
        xs={3}>
        <Paper className={classes.paper}>
          <TrendingList />
        </Paper>
      </Grid>
      <Grid
        item
        xs={3}>
        <Paper className={classes.paper}>
          <TopIssuerList issuers={topIssuers} />
        </Paper>
      </Grid>
    </Grid>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
