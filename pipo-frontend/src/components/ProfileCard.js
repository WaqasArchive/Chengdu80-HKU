import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Icon from "@material-ui/core/Icon";
import LinearProgress from "@material-ui/core/LinearProgress";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import classNames from "classnames";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  card: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
    marginTop: 12,
  },
  row: {
    display: "flex",
    justifyContent: "center",
  },
  avatar: {
    margin: 10,
  },
  bigAvatar: {
    width: 60,
    height: 60,
  },
  root: {
    flexGrow: 1,
  },
});

function SimpleCard(props) {
  const {classes} = props;

  return (
    <Card className={classes.card}>
      <CardContent>
        <Typography
          className={classes.title}
          color="textPrimary"
          gutterBottom>
          Henry Charles
        </Typography>
        <Typography
          variant="h5"
          component="h2">
          <div className={classes.row}>
            <Avatar
              alt="Henry Charles"
              src="/static/images/avatar1.jpg"
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
          </div>
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary">
          Progress to your personal IPO
        </Typography>
        <div className={classes.root}>
          <LinearProgress
            variant="determinate"
            value="20" />
        </div>
        <Typography
          className={classes.pos}
          color="textSecondary">
          Add more details <br/>
          Know your value <br/>
          Make your dreams true!
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          size="large"
          styles={{align:"center"}}>
        IPO NOW
          <Icon className={classes.rightIcon}>send</Icon>
        </Button>
      </CardActions>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);