import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import CircularProgress from "@material-ui/core/CircularProgress";
import DoneIcon from "@material-ui/icons/Done";
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
import steps from "./steps";
import {Formik} from "formik";
import {connect} from "react-redux";
import {getReferencePrice, signUpIPO} from "../../actions/IPO";
import {push} from "connected-react-router";
import {withStyles} from "@material-ui/core/styles";

const SimpleSelect = ({id, name, options, value, onChange}) => {
  return (
    <FormControl style={{minWidth: 400}}>
      <InputLabel htmlFor={id}>{name}</InputLabel>
      <Select
        value={value}
        onChange={onChange}
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
    </FormControl>);
};

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

class IssuerForm extends React.Component {
  state = {
    activeStep: 0,
  };

  componentDidMount () {
    steps.forEach(step => {
      if (step.input) {
        step.input.forEach(field => {
          this.setState({[field.id]: ""});
        });
      }
    });
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

  render() {
    const {classes, IPO, createIPO, getIPOReferencePrice} = this.props;
    const {activeStep} = this.state;

    return (
      <Grid
        container
        xs={12}
        className={classes.root}>
        <Grid
          item
          xs={12}>
          <h1>IPO Yourself</h1>
        </Grid>
        <Grid
          item
          xs={12}>
          <Paper
            className={classes.paper}
            elevation={1}>
            <Formik
              onSubmit={(values, {setSubmitting}) => {
                if (activeStep === 3) {
                  getIPOReferencePrice(values);
                } else {
                  values.issuer_id =
                  createIPO(values);
                }
                setSubmitting(false);
              }}
            >
              {({
                values,
                errors,
                handleChange,
                handleSubmit,
                isSubmitting,
                setFieldValue,
                /* and other goodies */
              }) => (
                <form onSubmit={handleSubmit}>
                  <Stepper
                    activeStep={activeStep}
                    orientation="vertical"
                    style={{backgroundColor: "transparent"}}>
                    {steps.map(step => {
                      if (step.input) {
                        step.input.forEach(field => {
                          if (!values[field.id]) {
                            values[field.id] = 1;
                          }
                        });
                      }
                      return (
                        !IPO.processing && <Step key={step.label}>
                          <StepLabel>{step.label}</StepLabel>
                          <StepContent>
                            <Typography>
                              {step.content && step.content}
                              {step.input && (
                                <Grid
                                  container
                                  direction="column"
                                  spacing={16}
                                  style={{paddingBottom: 20}}>
                                  { activeStep === 3 &&
                                  <p>Our recommended price: <Chip
                                    icon={<DoneIcon />}
                                    label={IPO.referencePrice}
                                    color="primary"
                                    variant="outlined"
                                  />
                                  </p>}
                                  {
                                    step.input.map(field => (
                                      <Grid
                                        item
                                        key={field.id}>
                                        {field.dropdown &&
                                        <SimpleSelect
                                          id={field.id}
                                          name={field.name}
                                          options={field.dropdown}
                                          value={values[field.id]}
                                          onChange={e => {
                                            setFieldValue(field.id,e.target.value);
                                          }}
                                        />}
                                        {!field.dropdown &&
                                        <TextField
                                          style={{minWidth: 400}}
                                          id={field.id}
                                          label={field.name}
                                          margin="dense"
                                          variant="filled"
                                          onChange={handleChange}
                                          value={values[field.id]}
                                          type={field.type}
                                        />}
                                      </Grid>
                                    ))}
                                </Grid>
                              )}
                            </Typography>
                            <div className={classes.actionsContainer}>
                              <div>
                                <Button
                                  disabled={activeStep === 0 || isSubmitting}
                                  onClick={this.handleBack}
                                  className={classes.button}
                                >
                        Back
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() => {
                                    if (activeStep >= 2 && JSON.stringify(errors) === JSON.stringify({})) {
                                      this.setState(state => ({
                                        activeStep: state.activeStep + 1,
                                      }));
                                      handleSubmit();
                                    } else {
                                      this.handleNext();
                                    }
                                  }}
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
                </form>
              )}
            </Formik>
            {IPO.processing &&
            <CircularProgress
              size={50} />}
            {!IPO.processing && IPO.error}
            {activeStep === steps.length && IPO.referencePrice && (
              <Paper
                square
                elevation={0}
                className={classes.resetContainer}>
                <Typography>All steps completed - you&quot;re finished</Typography>
                <Button
                  onClick={()=>this.props.changePage()}
                  className={classes.button}>
              Ok
                </Button>
              </Paper>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

IssuerForm.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = state => ({
  IPO: state.IPO || {},
  user: state.users.user,
});

const mapDispatchToProps = {
  getIPOReferencePrice: getReferencePrice,
  createIPO: signUpIPO,
  changePage: () => push("/issuer_profile"),
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(IssuerForm));
