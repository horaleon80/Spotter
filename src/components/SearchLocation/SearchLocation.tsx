import React, { useState, useContext, useEffect } from "react";
import {
  Box,
  Grid,
  TextField,
  List,
  ListItem,
  Typography,
  useTheme,
} from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { searchAirports } from "../../api";
import { SearchContext } from "../../contexts/SearchContext";

import Loader from "../Loader/Loader";

interface SearchLocationProps {
  type: "from" | "to";
  onClose: () => void;
}

const SearchLocation: React.FC<SearchLocationProps> = ({ onClose, type }) => {
  const theme = useTheme();
  const { setFrom, setTo } = useContext(SearchContext);
  const [inputValue, setInputValue] = useState("");
  const [debouncedValue, setDebouncedValue] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(inputValue);
    }, 300);

    return () => clearTimeout(handler);
  }, [inputValue]);

  const { data: suggestions, isFetching } = useQuery({
    queryKey: ["searchAirports", debouncedValue],
    queryFn: () => searchAirports(debouncedValue),
    enabled: debouncedValue.length >= 3,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSuggestionClick = (suggestion: any) => {
    const selectedAirport = suggestion.presentation.suggestionTitle;
    setInputValue(selectedAirport);
    onClose();
    type === "to" ? setTo(suggestion) : setFrom(suggestion);
  };

  return (
    <>
      {isFetching && <Loader />}

      <Box
        sx={{
          p: 3,
          border: `1px solid ${theme.palette.divider}`,
          borderRadius: "12px",
          backgroundColor: theme.palette.background.paper,
          maxWidth: 800,
          mx: "auto",
          position: "absolute",
          top: "82px",
          left: type === "to" ? "240px" : "0",
          zIndex: 10,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Box sx={{ position: "relative" }}>
              <TextField
                fullWidth
                variant="outlined"
                value={inputValue}
                placeholder="Search Airport"
                onChange={handleInputChange}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: theme.palette.background.default,
                    borderRadius: 2,
                  },
                }}
              />

              {Array.isArray(suggestions?.data) &&
                suggestions.data.length > 0 &&
                !isFetching && (
                  <List
                    sx={{
                      position: "absolute",
                      top: "100%",
                      left: 0,
                      right: 0,
                      bgcolor: theme.palette.background.paper,
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: "8px",
                      boxShadow: theme.shadows[3],
                      zIndex: 1000,
                      maxHeight: 200,
                      overflowY: "auto",
                    }}
                  >
                    {suggestions.data.map((airport: any, index: number) => (
                      <ListItem
                        key={index}
                        component="button"
                        onClick={() => handleSuggestionClick(airport)}
                        sx={{
                          bgcolor: theme.palette.background.paper,
                          "&:hover": {
                            bgcolor: theme.palette.action.hover,
                          },
                          color: theme.palette.text.primary,
                          border: `1px solid ${theme.palette.divider}`,
                        }}
                      >
                        <Typography color="inherit">
                          {airport.presentation.suggestionTitle}
                        </Typography>
                      </ListItem>
                    ))}
                  </List>
                )}
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default SearchLocation;
