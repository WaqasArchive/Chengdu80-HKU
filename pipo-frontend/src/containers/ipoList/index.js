import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Grid from "@material-ui/core/Grid";
import IPOList from "./IPOList";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
//import currentIPOs from "../../data/currentIPOs";
import api from "../../services/backend";
import nextIPOs from "../../data/nextIPOs";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    paddingTop: 20,
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
});

class SimpleExpansionPanel extends React.Component {
  state = {
    currentIPOs: [],
  }
  componentDidMount() {
    api.getAllIPOs().then(response => {
      this.setState({currentIPOs: response});
    }).catch(error => console.log(error));
  }
  render() {
    const {classes} = this.props;
    const {currentIPOs} = this.state;
    return (
      <Grid
        container
        xs={12}
        className={classes.root}>
        <Grid
          item
          xs={12}>
          <h1>Upcoming Personal IPOs</h1>
        </Grid>
        <Grid
          item
          xs={12}>
          <ExpansionPanel>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>This Week</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <IPOList rows={currentIPOs}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Next Week</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <IPOList rows={nextIPOs}/>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Grid>
      </Grid>
    );
  }
}

SimpleExpansionPanel.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleExpansionPanel);
