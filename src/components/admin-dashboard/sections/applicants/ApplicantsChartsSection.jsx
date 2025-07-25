import { Grid } from "@mui/material";
import ApplicantStatusPieChart from "./ApplicantStatusPieChart";
import ApplicantsByCityBarChart from "./ApplicantsByCityBarChart";
import ApplicantsOverTimeChart from "./ApplicantsOverTimeChart";

const ApplicantsChartsSection = () => (
  <Grid container spacing={3} paddingBottom={5}>
    <Grid item xs={12} md={4}><ApplicantStatusPieChart /></Grid>
    <Grid item xs={12} md={4}><ApplicantsByCityBarChart /></Grid>
    <Grid item xs={12} md={4}><ApplicantsOverTimeChart /></Grid>
  </Grid>
);

export default ApplicantsChartsSection; 