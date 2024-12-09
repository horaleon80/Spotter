import React from 'react';
import { Box, Typography, Grid, Button } from '@mui/material';

const FlightCard: React.FC = () => {
  return (
    <Box sx={{ p: 2, boxShadow: 1, borderRadius: 2, mb: 2 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={6}>
          <Typography variant="h6">Airline Name</Typography>
          <Typography>Duration: 3h 45m</Typography>
          <Typography>Stops: Non-stop</Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography variant="h6">$450</Typography>
        </Grid>
        <Grid item xs={3}>
          <Button variant="contained" color="primary">
            Book Now
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FlightCard;
