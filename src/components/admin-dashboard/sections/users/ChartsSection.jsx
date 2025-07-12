import React from "react";
import { Grid, Box } from "@mui/material";
import HorizontalCitiesBarChart from "./HorizontalCitiesBarChart";
import AgeGenderPyramidChart from "./AgeGenderPyramidChart";

const ChartsSection = () => {
  return (
    <Grid container spacing={3} paddingBottom={5}>
      <Grid item xs={12} md={6}>
        <Box sx={{ height: 400 }}>
          <HorizontalCitiesBarChart />
        </Box>
      </Grid>
      <Grid item xs={12} md={6}>
        <Box sx={{ height: 400 }}>
          <AgeGenderPyramidChart />
        </Box>
      </Grid>
    </Grid>
  );
};

export default ChartsSection;
