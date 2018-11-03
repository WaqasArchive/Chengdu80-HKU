import AppBar from "@material-ui/core/AppBar";
import CategoriesPortfolio from "./CategoriesPortfolio";
import EntityPortfolio from "./EntityPortfolio";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

function TabContainer({children, dir}) {
  return (
    <Typography
      component="div"
      dir={dir}
      style={{padding: 8 * 3}}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired,
};

const styles = (theme) => ({
  root: {
    paddingTop: 20,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
  };

  handleChange = (event, value) => {
    this.setState({value});
  };

  handleChangeIndex = index => {
    this.setState({value: index});
  };

  render() {
    const {classes, theme} = this.props;
    const {value} = this.state;

    return (
      <Grid
        container
        xs={12}
        className={classes.root}>
        <Grid
          item
          xs={12}>
          <h1>Your Portfolio</h1>
        </Grid>
        <Grid
          item
          xs={12}
          style={{paddingBottom: 20}}>
          <Paper
            className={classes.paper}
            elevation={1}>
            <Grid
              container>
              <Grid
                item
                xs={4}>
                <Typography
                  variant="h5"
                  component="h3">
              Total Investment
                </Typography>
                <Typography component="p">
              $48,300
                </Typography>
              </Grid>
              <Grid
                item
                xs={4}>
                <Typography
                  variant="h5"
                  component="h3">
              Total Shares
                </Typography>
                <Typography component="p">
              77,063
                </Typography>
              </Grid>
              <Grid xs={4}>
                <Typography
                  variant="h5"
                  component="h3">
              Dividends (Last Month)
                </Typography>
                <Typography component="p">
              $1,100
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        <Grid
          item
          xs={12}
          style={{backgroundColor: "#f5f5f5"}}>
          <AppBar
            position="static"
            color="default">
            <Tabs
              value={value}
              onChange={this.handleChange}
              indicatorColor="primary"
              textColor="primary"
              centered
            >
              <Tab label="Portfolio Composition" />
              <Tab label="Risk Analysis" />
            </Tabs>
          </AppBar>
          {value === 0 && <TabContainer dir={theme.direction}><EntityPortfolio /></TabContainer>}
          {value === 1 && <TabContainer dir={theme.direction}><CategoriesPortfolio /></TabContainer>}
        </Grid>
      </Grid>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, {withTheme: true})(FullWidthTabs);
