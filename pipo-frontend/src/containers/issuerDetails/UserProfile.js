import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PropTypes from "prop-types";
import React from "react";
import users from "../../data/users";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function FolderList(props) {
  const {classes, issuerId} = props;
  let profile = [];
  users.forEach(user => {
    if (user.id === parseInt(issuerId)) {
      profile = user.profile;
    }
  });
  return (
    <div className={classes.root}>
      <ListSubheader
        style={{fontWeight: "bold"}}
        align="left"
      >Profile
      </ListSubheader>
      <Divider />
      <Grid
        container
        spacing={8}
        xs={12}>
        <Grid
          item
          xs={6}>
          <List>
            {profile.slice(0,5).map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item[0]}
                  secondary={item[1]} />
              </ListItem>))}
          </List>
        </Grid>
        <Grid
          item
          xs={6}>
          <List>
            {profile.slice(5,12).map((item, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={item[0]}
                  secondary={item[1]} />
              </ListItem>))}
          </List>
        </Grid>
      </Grid>
    </div>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);
