import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PropTypes from "prop-types";
import React from "react";
import StarIcon from "@material-ui/icons/Star";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

function InsetList(props) {
  const {issuers} = props;
  return (
    <List subheader={<ListSubheader align="left" style={{fontWeight: 'bold', color: 'black'}}>Top 5 Issuers</ListSubheader>}>
      <Divider style={{marginBottom: 20}} />
      {issuers.map((name, index) => (
        <ListItem
          key={index}
          button>
          <ListItemIcon>
            <StarIcon />
          </ListItemIcon>
          <ListItemText
            inset
            primary={name} />
        </ListItem>
      ))}
    </List>
  );
}

InsetList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InsetList);
