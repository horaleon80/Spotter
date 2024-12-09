import React from "react";
import { Box, Typography, Paper, Divider, Grid, Avatar } from "@mui/material";
import { Itinerary } from "../../interfaces/global";

const ItineraryItem: React.FC<Itinerary> = ({ price, legs }) => {
  return (
    <Paper
      elevation={3}
      style={{
        margin: "10px 0",
        padding: "15px",
        borderRadius: "10px",
      }}
    >
      <Divider style={{ margin: "10px 0" }} />
      {legs.map((leg, index) => (
        <Box key={leg.id} style={{ marginBottom: "20px" }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={2}>
              <Avatar
                src={leg.carriers.marketing[0].logoUrl}
                alt={leg.carriers.marketing[0].name}
                style={{ width: 40, height: 40 }}
              />
              <Typography variant="body2" textAlign="center">
                {leg.carriers.marketing[0].name}
              </Typography>
            </Grid>
            <Grid item xs={4}>
              <Typography variant="subtitle1" fontWeight="bold">
                {leg.origin.displayCode} → {leg.destination.displayCode}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                {leg.origin.city}, {leg.origin.country} → {leg.destination.city}
                , {leg.destination.country}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2">
                Departure: {new Date(leg.departure).toLocaleTimeString()}
              </Typography>
              <Typography variant="body2">
                Arrival: {new Date(leg.arrival).toLocaleTimeString()}
              </Typography>
              <Typography variant="body2" color="textSecondary">
                Duration: {Math.floor(leg.durationInMinutes / 60)}h{" "}
                {leg.durationInMinutes % 60}m
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <Typography variant="body2" color="textSecondary">
                Stops:{" "}
                {leg.stopCount === 0 ? "Direct" : `${leg.stopCount} stop(s)`}
              </Typography>
            </Grid>
          </Grid>
          {index < legs.length - 1 && <Divider style={{ margin: "10px 0" }} />}
        </Box>
      ))}
      <Typography variant="h6" color="primary">
        Price: {price?.formatted}
      </Typography>
    </Paper>
  );
};

export default ItineraryItem;
