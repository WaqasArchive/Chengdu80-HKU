import AgriIcon from "@material-ui/icons/Cached";
import Avatar from "@material-ui/core/Avatar";
import BusinessIcon from "@material-ui/icons/Assignment";
import Divider from "@material-ui/core/Divider";
import FinanceIcon from "@material-ui/icons/ShowChart";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PropTypes from "prop-types";
import React from "react";
import TechIcon from "@material-ui/icons/Computer";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function FolderList(props) {
  const {classes} = props;
  return (
    <div className={classes.root}>
      <List subheader={<ListSubheader align="left" style={{fontWeight: 'bold', color: 'black'}}>Trending Investment Topics</ListSubheader>}>
        <Divider style={{marginBottom: 20}} />
        <ListItem>
          <Avatar>
            <TechIcon />
          </Avatar>
          <ListItemText
            primary="Technology"
            secondary="Oct 31, 2018" />
        </ListItem>
        <ListItem>
          <Avatar>
            <FinanceIcon />
          </Avatar>
          <ListItemText
            primary="Finance"
            secondary="Oct 31, 2018" />
        </ListItem>
        <ListItem>
          <Avatar>
            <BusinessIcon />
          </Avatar>
          <ListItemText
            primary="Business"
            secondary="Nov 1, 2018" />
        </ListItem>
        <ListItem>
          <Avatar>
            <AgriIcon />
          </Avatar>
          <ListItemText
            primary="Agriculture"
            secondary="Nov 2, 2018" />
        </ListItem>
      </List>
    </div>
  );
}

FolderList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FolderList);