import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import PropTypes from "prop-types";
import React from "react";
import Select from "@material-ui/core/Select";
import Step from "@material-ui/core/Step";
import StepContent from "@material-ui/core/StepContent";
import StepLabel from "@material-ui/core/StepLabel";
import Stepper from "@material-ui/core/Stepper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import fields from "./fields";
import {withStyles} from "@material-ui/core/styles";

const SimpleSelect = ({id, name, options, value, onChange}) =>
  <FormControl style={{minWidth: 400}}>
    <InputLabel htmlFor={id}>{name}</InputLabel>
    <Select
      value={value}
      onChange={onChange}
      inputProps={{
        name: {id},
      }}
    >
      <MenuItem value="">
        <em>None</em>
      </MenuItem>
      {options.map(item =>
        <MenuItem
          key={item.value}
          value={item.value}>{item.option}
        </MenuItem>)}
    </Select>
  </FormControl>;

const styles = theme => ({
  root: {
    width: "90%",
    paddingTop: 20,
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  dense: {
    marginTop: 16,
  },
});

function getSteps() {
  return ["Introduction to your IPO", "Add Personal Details", "Specify IPO Details"];
}

class IssuerForm extends React.Component {
  state = {
    activeStep: 0,
  };

  componentDidMount () {
    fields.forEach(step => {
      step.forEach(field => {
        this.setState({[field.id]: ""});
      });
    });
  }

  getStepContent = (step) => {
    switch (step) {
      case 0:
        return "Three easy steps to your IPO, add some information about yourself, specify particulars regarding your IPO and There you go!";
      case 1:
      case 2:
        return (
          <Grid
            container
            direction="column"
            spacing={16}
            style={{paddingBottom: 20}}>
            {
              fields[step].map(field => (
                <Grid
                  item
                  key={field.id}>
                  {field.dropdown &&
                    <SimpleSelect
                      id={field.id}
                      name={field.name}
                      options={field.dropdown}
                      value={this.state[field.id]}
                      onChange={this.handleChange}
                    />}
                  {!field.dropdown &&
                    <TextField
                      style={{minWidth: 400}}
                      id={field.id}
                      label={field.name}
                      margin="dense"
                      variant="filled"
                      type={field.type}
                    />}
                </Grid>
              ))}
          </Grid>
        );
      default:
        return "Unknown step";
    }
  }

  handleNext = () => {
    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleChange = event => {
    this.setState({[event.target.name.id]: event.target.value});
  };

  render() {
    const {classes} = this.props;
    const steps = getSteps();
    const {activeStep} = this.state;

    return (
      <div className={classes.root}>
        <Paper
          className={classes.paper}
          elevation={1}>
          <Stepper
            activeStep={activeStep}
            orientation="vertical"
            style={{backgroundColor: "transparent"}}>
            {steps.map((label, index) => {
              return (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                  <StepContent>
                    <Typography>{this.getStepContent(index)}</Typography>
                    <div className={classes.actionsContainer}>
                      <div>
                        <Button
                          disabled={activeStep === 0}
                          onClick={this.handleBack}
                          className={classes.button}
                        >
                        Back
                        </Button>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={this.handleNext}
                          className={classes.button}
                        >
                          {activeStep === steps.length - 1 ? "Finish" : "Next"}
                        </Button>
                      </div>
                    </div>
                  </StepContent>
                </Step>
              );
            })}
          </Stepper>
          {activeStep === steps.length && (
            <Paper
              square
              elevation={0}
              className={classes.resetContainer}>
              <Typography>All steps completed - you&quot;re finished</Typography>
              <Button
                className={classes.button}>
              Ok
              </Button>
            </Paper>
          )}
        </Paper>
      </div>
    );
  }
}

IssuerForm.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(IssuerForm);
