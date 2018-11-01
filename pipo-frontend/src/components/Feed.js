import Divider from "@material-ui/core/Divider";
import FeedItem from "./FeedItem";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
});

const Feed = props => {
  const {classes, items} = props;

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        justify="left">
        <Typography
          component="h5"
          variant="h5"
          style={{paddingBottom: 5}}>
          Investee Feed
        </Typography>
      </Grid>
      <Divider style={{marginBottom: 20}} />
      <Grid
        container
        justify="left"
        spacing={24}
        style={{
          maxHeight: 400,
          overflow: "auto",
          overflowY: "scroll",
        }}
      >
        {items.map((item, index) => (
          <Grid
            item
            key={index}>
            <FeedItem
              key={index}
              item={item} />
          </Grid>
        ))}
      </Grid>
    </Paper>
  );
};

Feed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Feed);
