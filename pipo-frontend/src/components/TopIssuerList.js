import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ListSubheader from "@material-ui/core/ListSubheader";
import PropTypes from "prop-types";
import React from "react";
import StarIcon from "@material-ui/icons/Star";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
});

<<<<<<< HEAD
class InsetList extends React.Component {

  handleClick = (event, id) => {
    console.log(id);
    this.props.changePage(id);
  };

  render () {
    const {issuers} = this.props;
    return (
      <List subheader={<ListSubheader align="left">Top 5 Issuers</ListSubheader>}>
        <Divider style={{marginBottom: 20}} />
        {issuers.map((name, index) => (
          <ListItem
            key={index}
            button
            onClick={event => this.handleClick(event,index)}>
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
=======
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
>>>>>>> 0be2b413e060fb5e5facf04f9c469f072f704c3e
}

InsetList.propTypes = {
  classes: PropTypes.object.isRequired,
};
const mapStateToProps = null;

const mapDispatchToProps = {
  changePage: (id) => push(`/issuer_details/${id}`),
};
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(InsetList));
