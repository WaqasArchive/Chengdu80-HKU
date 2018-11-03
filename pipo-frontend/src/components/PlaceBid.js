import Grid from "@material-ui/core/Grid";
import React from "react";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

function PlaceBid(props) {
  const {bidPrice, bidPriceHandleChange, noOfShares, noOfSharesHandleChange} = props;
  return (
    <React.Fragment>
      <Typography
        variant="h6"
        gutterBottom>
        Choose Bid
      </Typography>
      <Grid
        container
        spacing={24}>
        <Grid
          item
          xs={12}
          md={6}>
          <TextField
            required
            id="bid_price"
            label="Bid Price"
            value={bidPrice}
            onChange={bidPriceHandleChange}
            fullWidth />
        </Grid>
        <Grid
          item
          xs={12}
          md={6}>
          <TextField
            required
            id="no_of_shares"
            label="Number of Shares"
            value={noOfShares}
            onChange={noOfSharesHandleChange}
            fullWidth />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}

export default PlaceBid;
