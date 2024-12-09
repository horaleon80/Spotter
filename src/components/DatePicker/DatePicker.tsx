import React, { useState, useContext } from "react";
import { Box, Typography, Grid, Paper, Button } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { SearchContext } from "../../contexts/SearchContext";

interface IDatePicker {
  onClose: () => void;
}

const DateRangePickerComponent: React.FC<IDatePicker> = ({ onClose }) => {
  const { setFromDate, setToDate, fromDate, toDate, tripType } =
    useContext(SearchContext);

  const [departureDate, setDepartureDate] = useState<Dayjs | null>(fromDate ? dayjs(fromDate) : null);
  const [returnDate, setReturnDate] = useState<Dayjs | null>(toDate ? dayjs(toDate) : null);

  const handleDepartureChange = (newDate: Dayjs | null) => {
    setDepartureDate(newDate);
    setFromDate(newDate?.format("YYYY-MM-DD") || "");
    if (newDate && returnDate && newDate.isAfter(returnDate, "day")) {
      setReturnDate(null);
    }
  };

  const handleReturnChange = (newDate: Dayjs | null) => {
    if (newDate && departureDate && newDate.isBefore(departureDate, "day")) {
      alert("The return date cannot be earlier than the departure date.");
      return;
    }
    setToDate(newDate?.format("YYYY-MM-DD") || "");
    setReturnDate(newDate);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={3}
        sx={{
          p: 3,
          width: "100%",
          maxWidth: 800,
          mx: "auto",
          borderRadius: 2,
          position: "absolute",
          zIndex: 10,
          right: 23,
          top: 80,
        }}
      >
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Select your travel dates</Typography>
        </Box>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <DatePicker
              label="Departure"
              value={departureDate}
              onChange={handleDepartureChange}
              renderInput={(params) => (
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{
                    borderRadius: "8px",
                    textAlign: "left",
                    fontSize: "1rem",
                  }}
                  {...params.inputProps}
                >
                  {departureDate
                    ? departureDate.format("YYYY-MM-DD")
                    : "Select Departure Date"}
                </Button>
              )}
            />
          </Grid>

          <Grid item xs={6}>
            {
              tripType === "Round trip" && (
                <DatePicker
                  label="Return"
                  value={returnDate}
                  onChange={handleReturnChange}
                  renderInput={(params) => (
                    <Button
                      variant="outlined"
                      fullWidth
                      sx={{
                        borderRadius: "8px",
                        textAlign: "left",
                        fontSize: "1rem",
                      }}
                      {...params.inputProps}
                    >
                      {returnDate
                        ? returnDate.format("YYYY-MM-DD")
                        : "Select Return Date"}
                    </Button>
                  )}
                />
              )
            }
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            mt: 3,
          }}
        >
          <Button variant="contained" color="primary" onClick={onClose}>
            Close
          </Button>
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default DateRangePickerComponent;
