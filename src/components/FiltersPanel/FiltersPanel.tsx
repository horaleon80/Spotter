import React from 'react';
import { Box, Typography, Slider, Checkbox, FormControlLabel } from '@mui/material';

const FiltersPanel: React.FC = () => {
  return (
    <Box sx={{ p: 2, boxShadow: 1, borderRadius: 2, mb: 2 }}>
      <Typography variant="h6" gutterBottom>
        Filters
      </Typography>
      <Box sx={{ mb: 2 }}>
        <Typography>Price Range</Typography>
        <Slider value={[100, 1000]} min={0} max={2000} valueLabelDisplay="auto" />
      </Box>
      <Box>
        <FormControlLabel control={<Checkbox />} label="Non-stop flights" />
        <FormControlLabel control={<Checkbox />} label="Only refundable" />
      </Box>
    </Box>
  );
};

export default FiltersPanel;
