import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

const Feed = (props) => {
  const {classes} = props;

  return (
    <Paper className={classes.paper}>xs=6</Paper>
  );
};

Feed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Feed);