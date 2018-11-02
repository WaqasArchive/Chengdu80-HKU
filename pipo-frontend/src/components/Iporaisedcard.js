import Button from "@material-ui/core/Button";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import ListSubheader from "@material-ui/core/ListSubheader";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

const styles = theme => ({
  cardHeader: {
    backgroundColor: theme.palette.grey[200],
  },
  cardPricing: {
    display: "flex",
    justifyContent: "center",
    alignItems: "baseline",
    marginBottom: theme.spacing.unit * 2,
  },
  cardActions: {
    [theme.breakpoints.up("sm")]: {
      paddingBottom: theme.spacing.unit * 2,
    },
  },
});

function ipocard() {
  return (
    <Grid>
      <ListSubheader align="left" style={{fontWeight: 'bold', color: 'black'}}>Personal IPOs</ListSubheader>
      <Divider style={{marginBottom: 20}} />
      <CardContent>
        <div>
          <Typography
            component="h2"
            variant="h3"
            color="textPrimary">
            186
          </Typography>
          <Typography
            variant="h6"
            color="textSecondary">
                      /mo
          </Typography>
        </div>
      </CardContent>
      <CardActions >
        <Button
          fullWidth
          color="primary"
          variant="contained">
          IPO Now!

        </Button>
      </CardActions>
    </Grid>
  );

}

export default withStyles(styles)(ipocard);
