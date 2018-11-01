import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";
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
    <Card>
      <CardHeader
        title="Number of IPOs"
        titleTypographyProps={{align: "center"}}
      />
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
    </Card>
  );

}

export default withStyles(styles)(ipocard);