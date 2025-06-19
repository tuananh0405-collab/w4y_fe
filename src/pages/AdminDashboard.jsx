import { Box, Container, Stack, Toolbar } from "@mui/material";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

import AdminSidebar from "../components/admin-dashboard/AdminSidebar";
import TotalSummaryCards from "../components/admin-dashboard/TotalSummaryCards";
import JobsChart from "../components/admin-dashboard/JobsChart";
import UserGrowthChart from "../components/admin-dashboard/UserGrowthChart";
import TrafficLineChart from "../components/admin-dashboard/TrafficLineChart";
import UserTypePieChart from "../components/admin-dashboard/UserTypePieChart";

Chart.register(ChartDataLabels);

const AdminDashboard = () => {
  // Sample mock totals and chart data can be passed via props or fetched later
  const stats = {
    users: 540,
    applicants: 320,
    recruiters: 220,
    traffic: 1840,
  };

  return (
    <Box className="bg-teal-50" sx={{ display: "flex", height: "100vh", width: "100%" }}>
        <Toolbar />
      <AdminSidebar />
        <Container className="bg-teal-50"  sx={{ flexGrow: 1, p: 3 }}>
          <Stack spacing={3}>
            <TotalSummaryCards
              users={stats.users}
              applicants={stats.applicants}
              recruiters={stats.recruiters}
              traffic={stats.traffic}
            />
            <Stack direction={{ xs: "column", md: "row" }} spacing={3}>
              <JobsChart />
              <UserGrowthChart />
            </Stack>
            <UserTypePieChart
              applicants={stats.applicants}
              recruiters={stats.recruiters}
            />
            <TrafficLineChart />
          </Stack>
        </Container>
    </Box>
  );
};

export default AdminDashboard;
