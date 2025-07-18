import { Grid } from "@mui/material";
import ApplicationStatusPieChart from "./ApplicationStatusPieChart";
import ApplicationsByJobBarChart from "./ApplicationsByJobBarChart";
import ApplicationsOverTimeChart from "./ApplicationsOverTimeChart";

const ApplicationsChartsSection = () => (
  <Grid container spacing={3} paddingBottom={5}>
    <Grid item xs={12} md={4}><ApplicationStatusPieChart /></Grid>
    <Grid item xs={12} md={4}><ApplicationsByJobBarChart /></Grid>
    <Grid item xs={12} md={4}><ApplicationsOverTimeChart /></Grid>
  </Grid>
);

export default ApplicationsChartsSection; 