import BarGraph from "../../components/bargraph";
import BidDistribution from "../../data/BidDistribution";
import BidTable from "../../components/BidTable";
//import BidsData from "../../data/bids";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Icon from "@material-ui/core/Icon";
import ListSubheader from "@material-ui/core/ListSubheader";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import Tab from "@material-ui/core/Tab";
import Tabs from "@material-ui/core/Tabs";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import api from "../../services/backend";
import classNames from "classnames";
import {connect} from "react-redux";
import {withStyles} from "@material-ui/core/styles";
const styles = theme => ({
  root: {
    width: "90%",
    paddingTop: 20,
  },
  tableContainer: {
    height: 400,
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit,
    height: "100vh",
    overflow: "auto",
  },
  paper: {
    marginTop:25,
  },
  row: {
    display: "flex",
    justifyContent: "center",
  },
  textField: {
    marginLeft: theme.spacing.unit*5,
    marginRight: theme.spacing.unit,
    width: 150,
  },
  dense: {
    marginTop: 19,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
    color: "inherit",
  },
  button: {
    marginLeft: theme.spacing.unit*5,
    marginBottom: theme.spacing.unit*5,
    marginTop: theme.spacing.unit,
  },
});

class Dashboard extends React.Component {
  state = {
    bids: [],
    ask_price: "",
    quantity_of_shares_to_sell: "",
    settled: false,
    value: 0,
  }

  componentDidMount() {
    api.getIssuerBids(this.props.user.id).then(response => {
      this.setState({bids: response || []});
    }).catch(error => console.log(error));
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleTabChange = (event, value) => {
    this.setState({value});
  };

  settleBids = () => {
    const {ask_price, quantity_of_shares_to_sell} = this.state;
    api.settleBids({
      issuer_id: this.props.user.id,
      ask_price,
      quantity_of_shares_to_sell,
    }).then((response)=>{
      console.log(response);
      this.setState({settled: true});
    }).catch(error => console.log(error.message));
  }

  render() {
    const {bids, value} = this.state;
    const {classes} = this.props;

    return (
      <Grid
        container
        xs={12}
        className={classes.root}>
        <Grid
          item
          xs={12}>
          <h1>Respond To Bids</h1>
        </Grid>
        <Grid
          container
          spacing={16}
          justify="space-evenly"
          xs={12}>
          <Grid
            item
            xs={6}>
            <BidTable
              rows={bids}/>
          </Grid>
          <Grid
            item
            xs={6}>
            <Paper
              className={classes.paper}
              elevation={1}>
              <Grid
                container
                spacing={2}
                justify="space-evenly">
                <Grid
                  item
                  xs={12}>
                  <ListSubheader
                    align="left"
                    style={{fontWeight: "bold"}} >Settle Bids
                  </ListSubheader>
                  <Divider />
                </Grid><Tabs
                  value={this.state.value}
                  onChange={this.handleTabChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="FIFO Matching" />
                  <Tab label="Custom Share Distribution Matching" />
                       </Tabs>
                {value === 0 && !this.state.settled &&
                    <Grid
                      container
                      justify="space-evenly">
                      <Grid
                        item
                      ><TextField
                          id="1"
                          label="Ask Price"
                          margin="dense"
                          variant="filled"
                          type="number"
                          value={this.state.ask_price}
                          onChange={this.handleChange("ask_price")}
                          className={classNames(classes.textField, classes.dense)}
                        />
                        <Grid
                          item
                        ><TextField
                            id="1"
                            label="Number of Shares"
                            margin="dense"
                            variant="filled"
                            type="number"
                            value={this.state.quantity_of_shares_to_sell}
                            onChange={this.handleChange("quantity_of_shares_to_sell")}
                            className={classNames(classes.textField, classes.dense)}
                          />
                        </Grid>
                        <Grid
                          item
                        >
                          <Button
                            variant="contained"
                            color="primary"
                            className={classes.button}
                            size="large"
                            onClick={this.settleBids}
                          >Settle<Icon className={classes.rightIcon}>send</Icon>
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>}
                {value === 1 && !this.state.settled &&
                        <Grid
                          container
                          justify="space-evenly">
                          <Grid
                            item
                          ><Grid
                              item
                            ><TextField
                                id="1"
                                label="Number of Shares"
                                margin="dense"
                                variant="filled"
                                type="number"
                                value={this.state.quantity_of_shares_to_sell}
                                onChange={this.handleChange("quantity_of_shares_to_sell")}
                                className={classNames(classes.textField, classes.dense)}
                              />
                            </Grid>
                            <Grid
                              item
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                size="large"
                                onClick={this.settleBids}
                              >Settle<Icon className={classes.rightIcon}>send</Icon>
                              </Button>
                            </Grid>
                          </Grid>
                        </Grid>}
                {this.state.settled &&
                  <Grid
                    item
                    xs={12}>
                    <Typography style={{padding:40, color:"green"}}>Successfully Settled</Typography>
                  </Grid>}
              </Grid>
            </Paper>
          </Grid>
          <Grid
            item
            xs={6}>
            <BarGraph
              sampleData={BidDistribution}/>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  user: state.users.user || {"id": 4, "name": "Waqas Ali"} ,
});

export default connect(mapStateToProps, null)(withStyles(styles)(Dashboard));
