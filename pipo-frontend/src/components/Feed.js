import Divider from "@material-ui/core/Divider";
import FeedItem from "./FeedItem";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
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
  fade: {
    maskImage: "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 25%)",
  },
});

const Feed = props => {
  const {classes, items} = props;

  return (
    <Paper className={classes.paper}>
      <Grid
        container
        justify="left">
        <ListSubheader align="left" style={{fontWeight: 'bold', color: 'black'}} >Investee Feed</ListSubheader>
      </Grid>
      <Divider style={{marginBottom: 20}} />
      <div className={classes.fade}>
        <Grid
          container
          justify="space-around"
          spacing={8}
          style={{
            maxHeight: 300,
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
      </div>
    </Paper>
  );
};

Feed.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Feed);
