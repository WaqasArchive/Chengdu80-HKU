import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Help from "@material-ui/icons/Help";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import Paper from "@material-ui/core/Paper";
import PersonAdd from "@material-ui/icons/PersonAdd";
import PropTypes from "prop-types";
import React from "react";
import Send from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import classNames from "classnames";
import {connect} from "react-redux";
import {push} from "connected-react-router";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  margin: {
    margin: theme.spacing.unit,
  },
  textField: {
    flexBasis: 200,
  },
  input: {
    textAlign: "center",
    padding: 10,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
});

class LoginSheet extends React.Component {
  state = {
    password: "",
    showPassword: false,
    status: false,
  };

  handleChange = prop => event => {
    this.setState({[prop]: event.target.value});
  };

  handleClickShowPassword = () => {
    this.setState(state => ({showPassword: !state.showPassword}));
  };

  render() {
    const {classes} = this.props;

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{minHeight: "100vh", backgroundColor: "#7E57C2"}}
      >
        {!this.state["status"] && (
        <Grid
          item
          xs={6}>
          <Paper
            className={classes.root}
            elevation={1}>
            <Grid
              item
              className={classNames(classes.input)}>
              <TextField
                id="outlined-email-input"
                label="Email"
                className={classes.textField}
                type="email"
                name="email"
                autoComplete="email"
                margin="normal"
                variant="outlined"
                style={{width: 300}}
              />
            </Grid>
            <Grid
              item
              className={classNames(classes.input)}>
              <TextField
                id="outlined-adornment-password"
                className={classNames(classes.margin, classes.textField)}
                variant="outlined"
                type={this.state.showPassword ? "text" : "password"}
                label="Password"
                value={this.state.password}
                onChange={this.handleChange("password")}
                style={{width: 300}}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Toggle password visibility"
                        onClick={this.handleClickShowPassword}
                      >
                        {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
           <Grid
              item
              className={classNames(classes.input)}>
              <Button
                className={classes.button}
                onClick={() => this.props.changePage("/register")}>
                <PersonAdd className={classes.leftIcon} />
                  Register
              </Button>
              <Button
                className={classes.button}>
                <Help className={classes.leftIcon} />
                  Forgot Password?
              </Button>
           </Grid>
            <Grid
              item
              className={classNames(classes.input)}>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={() => this.setState({status: true})}>
                Next
                <Send className={classes.rightIcon} />
              </Button>
            </Grid>
          </Paper>
        </Grid>)}
            
        {this.state["status"] && (
           <Grid
           item
           xs={6}>
           <Paper
             className={classes.root}
             elevation={1}>
              <Grid
              item
              className={classNames(classes.input)}>
              <TextField
                id="two-factor-auth"
                label="Enter confirmation code"
                className={classes.textField}
                type="otp"
                name="otp"
                autoComplete="otp"
                margin="normal"
                variant="outlined"
                style={{width: 300}}
              />
            </Grid>
             <Grid
             item
             className={classNames(classes.input)}>
             <Button
               variant="contained"
               color="primary"
               className={classes.button}
               onClick={() => this.props.changePage("/")}>
               Login
               <Send className={classes.rightIcon} />
             </Button>
           </Grid>
           </Paper>
        </Grid>)}
            
      </Grid>
    );
  }
}

LoginSheet.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  changePage: (path) => push(path),
};

export default connect(
  null,
  mapDispatchToProps
)(withStyles(styles)(LoginSheet));

