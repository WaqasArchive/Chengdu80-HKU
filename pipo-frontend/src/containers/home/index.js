import Feed from "../../components/Feed";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import TopIssuerList from "../../components/TopIssuerList";
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
  const feed = [
    {
      name: "Piyush Jha",
      date: "October 31, 2018",
      content: "This is a random post.",
      image: "/static/images/cards/paella.jpg",
    },
    {
      name: "Waqas Ali",
      date: "November 1, 2018",
      content: "This is a random post.",
    },
    {
      name: "Piyush Jha",
      date: "October 31, 2018",
      content: "This is a random post.",
      image: "/static/images/cards/paella.jpg",
    },
    {
      name: "Waqas Ali",
      date: "November 1, 2018",
      content: "This is a random post.",
    },
    {
      name: "Piyush Jha",
      date: "October 31, 2018",
      content: "This is a random post.",
      image: "/static/images/cards/paella.jpg",
    },
    {
      name: "Waqas Ali",
      date: "November 1, 2018",
      content: "This is a random post.",
    },
    {
      name: "Piyush Jha",
      date: "October 31, 2018",
      content: "This is a random post.",
      image: "/static/images/cards/paella.jpg",
    },
    {
      name: "Waqas Ali",
      date: "November 1, 2018",
      content: "This is a random post.",
    },
    {
      name: "Waqas Ali",
      date: "November 1, 2018",
      content: "This is a random post.",
    },
    {
      name: "Piyush Jha",
      date: "October 31, 2018",
      content: "This is a random post.",
      image: "/static/images/cards/paella.jpg",
    },
  ];

  return (
    <Grid
      container
      className={classes.root}
      spacing={24}>
      <Grid
        item
        xs={12}>
        <h1>Home</h1>
      </Grid>
      <Grid
        item
        xs={9}>
        <Feed items={feed} />
      </Grid>
      <Grid
        item
        xs={3}>
        <Paper className={classes.paper}>
          <TopIssuerList />
        </Paper>
      </Grid>
    </Grid>
  );
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
