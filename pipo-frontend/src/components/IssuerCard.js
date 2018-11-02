import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import LinearProgress from "@material-ui/core/LinearProgress";
import ListSubheader from "@material-ui/core/ListSubheader";
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
        <ListSubheader align="left">Henry Charles</ListSubheader>
        <Divider style={{marginBottom: 20}} />
        <Typography
          variant="h5"
          component="h2">
          <div className={classes.row}>
            <Avatar
              alt="Henry Charles"
              src="/static/images/cards/man.png"
              className={classNames(classes.avatar, classes.bigAvatar)}
            />
          </div>
        </Typography>
        <Typography
          className={classes.pos}
          color="textSecondary">
          You have now finished your IPO
        </Typography>
        <div className={classes.root}>
          <LinearProgress
            variant="determinate"
            value="100" />
        </div>
        <br />
        <Typography
          component="h5"
          variant="h5"
          color="textPrimary">
          Trading Value <br />
          $12.78
        </Typography>
      </CardContent>
    </Card>
  );
}

SimpleCard.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);
