// components/admin-dashboard/charts/TotalSummaryCards.jsx
import { Paper, Typography, Grid, Box } from "@mui/material";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import BusinessIcon from "@mui/icons-material/Business";
import BarChartIcon from "@mui/icons-material/BarChart";

const StatCard = ({ label, value, icon }) => (
  <Paper sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box sx={{ fontSize: 32 }}>{icon}</Box>
    <Box>
      <Typography variant="subtitle2" color="textSecondary">
        {label}
      </Typography>
      <Typography variant="h6">{value}</Typography>
    </Box>
  </Paper>
);

const TotalSummaryCards = ({ users, applicants, recruiters, traffic }) => (
  <Grid container spacing={3}>
    <Grid item xs={12} md={3}>
      <StatCard label="Total Users" value={users} icon={<PeopleIcon />} />
    </Grid>
    <Grid item xs={12} md={3}>
      <StatCard label="Applicants" value={applicants} icon={<PersonIcon />} />
    </Grid>
    <Grid item xs={12} md={3}>
      <StatCard label="Recruiters" value={recruiters} icon={<BusinessIcon />} />
    </Grid>
    <Grid item xs={12} md={3}>
      <StatCard label="Page Views" value={traffic} icon={<BarChartIcon />} />
    </Grid>
  </Grid>
);

export default TotalSummaryCards;
