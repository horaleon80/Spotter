import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  Button,
  Menu,
  MenuItem,
  IconButton,
  Typography,
  Autocomplete,
  useTheme,
} from "@mui/material";
import { SearchContext } from "../../contexts/SearchContext";
import { useQuery } from "@tanstack/react-query";
import { searchFlights } from "../../api";
import { TripDetails } from "../../interfaces/global";

import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import PeopleIcon from "@mui/icons-material/People";
import SearchLocation from "../SearchLocation/SearchLocation";
import DataPicker from "../DatePicker/DatePicker";
import Loader from "../Loader/Loader";

const SearchPanel: React.FC = () => {
  const theme = useTheme();
  const [tripType, setTripType] = useState<string>("Round trip");
  const [flightClass, setFlightClass] = useState<string>("Economy");
  const [searchParams, setSearchParams] = useState<TripDetails | null>(null);
  const [passengerAnchorEl, setPassengerAnchorEl] =
    useState<null | HTMLElement>(null);
  const [passengers, setPassengers] = useState({
    adults: 1,
    children: 0,
    infantsInSeat: 0,
    infantsOnLap: 0,
  });
  const {
    from,
    to,
    fromDate,
    toDate,
    setTripType: setTripTypeContext,
    setItineraries,
  } = useContext(SearchContext);
  const tripTypeOptions = ["Round trip", "One way", "Multi-city"];
  const flightClassOptions = [
    "Economy",
    "Premium Economy",
    "Business",
    "First",
  ];

  const handlePassengerOpen = (event: React.MouseEvent<HTMLElement>) => {
    setPassengerAnchorEl(event.currentTarget);
  };

  const handlePassengerClose = () => {
    setPassengerAnchorEl(null);
  };

  const handlePassengerChange = (
    type: keyof typeof passengers,
    increment: boolean
  ) => {
    setPassengers((prev) => ({
      ...prev,
      [type]: Math.max(0, prev[type] + (increment ? 1 : -1)),
    }));
  };

  const { data, refetch, isFetching, isSuccess } = useQuery({
    queryKey: ["searchFlights"],
    queryFn: () => searchFlights(searchParams),
    enabled: false,
  });

  const totalPassengers = Object.values(passengers).reduce(
    (sum, count) => sum + count,
    0
  );

  const [field, setField] = useState<string | null>(null);
  const openFieldModal = (fieldName: string | null) => setField(fieldName);

  const onExplore = () => {
    const params = {
      originSkyId: typeof from === "object" ? from.skyId : undefined,
      originEntityId: typeof from === "object" ? from.entityId : undefined,
      destinationSkyId: typeof to === "object" ? to.skyId : undefined,
      destinationEntityId: typeof to === "object" ? to.entityId : undefined,
      date: fromDate,
      returnDate: toDate,
      tripType,
      cabinClass: flightClass?.toLowerCase(),
      adults: passengers.adults,
      children: passengers.children,
      infants: passengers.infantsInSeat + passengers.infantsOnLap,
      currency: "USD",
      sortBy: "best",
    };
    setSearchParams(params);
    refetch();
  };

  useEffect(() => {
    if (isSuccess && data) {
      setItineraries(data?.data?.itineraries);
    }
  }, [isSuccess, data]);

  return (
    <Box
      sx={{
        position: "relative",
        p: 3,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: "12px",
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[3],
        maxWidth: 1200,
        mx: "auto",
      }}
    >
      {isFetching && <Loader />}
      <Grid container spacing={2} alignItems="center">
        <Grid
          container
          item
          xs={12}
          spacing={2}
          alignItems="center"
          justifyContent="flex-start"
        >
          <Grid item>
            <Autocomplete
              options={tripTypeOptions}
              value={tripType}
              onChange={(_, newValue) => {
                setTripType(newValue || tripTypeOptions[0]);
                setTripTypeContext(newValue || tripTypeOptions[0]);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Trip Type"
                  variant="standard"
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                />
              )}
              sx={{
                width: "150px",
                "& .MuiInputBase-root": {
                  backgroundColor: theme.palette.background.default,
                  borderRadius: 2,
                  padding: "6px",
                },
              }}
            />
          </Grid>

          <Grid item>
            <Button
              variant="text"
              onClick={handlePassengerOpen}
              sx={{
                textTransform: "none",
                display: "flex",
                justifyContent: "space-between",
                width: "fit-content",
                color: theme.palette.text.primary,
                borderRadius: 2,
                padding: "10px",
                backgroundColor: theme.palette.background.default,
                "&:hover": {
                  backgroundColor: theme.palette.action.hover,
                },
              }}
            >
              <PeopleIcon />
              <Typography sx={{ marginLeft: 1 }}>{totalPassengers}</Typography>
            </Button>
            <Menu
              anchorEl={passengerAnchorEl}
              open={Boolean(passengerAnchorEl)}
              onClose={handlePassengerClose}
            >
              {[
                { label: "Adults", key: "adults", description: "" },
                {
                  label: "Children",
                  key: "children",
                  description: "Aged 2–11",
                },
                {
                  label: "Infants (In seat)",
                  key: "infantsInSeat",
                  description: "",
                },
                {
                  label: "Infants (On lap)",
                  key: "infantsOnLap",
                  description: "",
                },
              ].map((item) => (
                <MenuItem disableGutters key={item.key}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      width: "100%",
                    }}
                  >
                    <Box>
                      <Typography>{item.label}</Typography>
                      {item.description && (
                        <Typography variant="body2" color="textSecondary">
                          {item.description}
                        </Typography>
                      )}
                    </Box>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <IconButton
                        onClick={() =>
                          handlePassengerChange(
                            item.key as keyof typeof passengers,
                            false
                          )
                        }
                        size="small"
                        disabled={
                          passengers[item.key as keyof typeof passengers] === 0
                        }
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography>
                        {passengers[item.key as keyof typeof passengers]}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          handlePassengerChange(
                            item.key as keyof typeof passengers,
                            true
                          )
                        }
                        size="small"
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                </MenuItem>
              ))}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
              >
                <Button
                  variant="text"
                  color="inherit"
                  onClick={handlePassengerClose}
                >
                  Cancel
                </Button>
                <Button variant="contained" onClick={handlePassengerClose}>
                  Done
                </Button>
              </Box>
            </Menu>
          </Grid>

          <Grid item>
            <Autocomplete
              options={flightClassOptions}
              value={flightClass}
              onChange={(_, newValue) =>
                setFlightClass(newValue || flightClassOptions[0])
              }
              renderInput={(params) => (
                <TextField
                  {...params}
                  placeholder="Flight Class"
                  variant="standard"
                  InputProps={{ ...params.InputProps, disableUnderline: true }}
                />
              )}
              sx={{
                width: "205px",
                "& .MuiInputBase-root": {
                  backgroundColor: theme.palette.background.default,
                  borderRadius: 2,
                  padding: "6px",
                },
              }}
            />
          </Grid>
        </Grid>

        <Grid container item xs={12} spacing={2} alignItems="center">
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              value={
                typeof from === "object"
                  ? from.presentation?.suggestionTitle
                  : from
              }
              placeholder="From"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                position: "relative",
                cursor: "pointer",
                "& .MuiOutlinedInput-root": {
                  pointerEvents: "none",
                },
              }}
              onClick={() => openFieldModal("from")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              value={
                typeof to === "object" ? to.presentation?.suggestionTitle : to
              }
              placeholder="To"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                cursor: "pointer",
                "& .MuiOutlinedInput-root": {
                  pointerEvents: "none",
                },
              }}
              onClick={() => openFieldModal("to")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              value={fromDate}
              placeholder="Departure"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                cursor: "pointer",
                "& .MuiOutlinedInput-root": {
                  pointerEvents: "none",
                },
              }}
              onClick={() => openFieldModal("date")}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              variant="outlined"
              value={toDate}
              placeholder="Return"
              InputProps={{
                readOnly: true,
              }}
              sx={{
                cursor: "pointer",
                "& .MuiOutlinedInput-root": {
                  pointerEvents: "none",
                },
              }}
              onClick={() => openFieldModal("date")}
            />
          </Grid>
        </Grid>
      </Grid>

      {field === "from" && (
        <SearchLocation onClose={() => openFieldModal(null)} type="from" />
      )}

      {field === "to" && (
        <SearchLocation onClose={() => openFieldModal(null)} type="to" />
      )}

      {field === "date" && <DataPicker onClose={() => openFieldModal(null)} />}

      <Button
        variant="contained"
        color="primary"
        size="large"
        sx={{
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%) translateY(50%)",
          bottom: "-5px",
          px: 4,
          borderRadius: "24px",
        }}
        onClick={onExplore}
      >
        Explore
      </Button>
    </Box>
  );
};

export default SearchPanel;
