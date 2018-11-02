import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import PropTypes from "prop-types";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {withStyles} from "@material-ui/core/styles";

const payments = [
  {name: "Card type", detail: "Visa"},
  {name: "Card holder", detail: "Mr John Smith"},
  {name: "Card number", detail: "xxxx-xxxx-xxxx-1234"},
  {name: "Expiry date", detail: "04/2024"},
];

const styles = theme => ({
  listItem: {
    padding: `${theme.spacing.unit}px 0`,
  },
  total: {
    fontWeight: "700",
  },
  title: {
    marginTop: theme.spacing.unit * 2,
  },
});

function ConfirmBid(props) {
  const {classes, rows} = props;
  return (
    <React.Fragment>
      <Typography
        variant="h6"
        gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {rows.map(row => (
          <ListItem
            className={classes.listItem}
            key={row.id}>
            <ListItemText
              primary={row.name}
              secondary={row.quantity} />
            <Typography variant="body2">{row.ref_price}</Typography>
          </ListItem>
        ))}
        <ListItem className={classes.listItem}>
          <ListItemText primary="Total" />
          <Typography
            variant="subtitle1"
            className={classes.total}>
            $3442
          </Typography>
        </ListItem>
      </List>
      <Grid
        container
        spacing={16}>
        <Grid
          item
          container
          direction="column"
          xs={12}
          sm={6}>
          <Typography
            variant="h6"
            gutterBottom
            className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid
                  item
                  xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid
                  item
                  xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

ConfirmBid.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ConfirmBid);