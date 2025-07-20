import { Grid } from "@mui/material";
import JobStatusPieChart from "./JobStatusPieChart";
import JobsByCategoryBarChart from "./JobsByCategoryBarChart";
import JobsOverTimeChart from "./JobsOverTimeChart";

const JobsChartsSection = () => (
  <Grid container spacing={3} paddingBottom={5}>
    <Grid item xs={12} md={4}><JobStatusPieChart /></Grid>
    <Grid item xs={12} md={4}><JobsByCategoryBarChart /></Grid>
    <Grid item xs={12} md={4}><JobsOverTimeChart /></Grid>
  </Grid>
);

export default JobsChartsSection; 