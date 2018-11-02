import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import FavoriteIcon from "@material-ui/icons/Favorite";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import classnames from "classnames";
import red from "@material-ui/core/colors/red";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  card: {
    maxWidth: 240,

  },
  media: {
    height: 0,
    paddingTop: "86.25%", // 16:9
  },
  actions: {
    display: "flex",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
});

class FeedItem extends React.Component {
  state = {expanded: false};

  handleExpandClick = () => {
    this.setState(state => ({expanded: !state.expanded}));
  };

  render() {
    const {classes, item} = this.props;

    return (
      <Card className={classes.card}>
        <CardHeader
          avatar={
            <Avatar
              src="/static/images/cards/man.png"
              aria-label="Recipe"
              className={classes.avatar}>
              {item.name[0]}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={item.name}
          subheader={item.date}
        />
        {item.image && <CardMedia
          className={classes.media}
          image={item.image}
          title="Paella dish" />}
        <CardContent style={{marginBottom: 0, paddingBottom: 0}}>
          <Typography component="p">{item.content}</Typography>
        </CardContent>
        <CardActions
          className={classes.actions}
          disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Add">
            <AddIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  }
}

FeedItem.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FeedItem);
