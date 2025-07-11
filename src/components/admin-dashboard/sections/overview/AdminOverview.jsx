import { Container, Stack, Typography } from "@mui/material";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

import TotalSummaryCards from "./TotalSummaryCards";
import JobsChart from "./JobsChart";
import UserGrowthChart from "./UserGrowthChart";
import TrafficLineChart from "./TrafficLineChart";
import UserTypePieChart from "./UserTypePieChart";

Chart.register(ChartDataLabels);

const Overview = () => {
  return (
    <Container className="bg-teal-50" sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Overview
      </Typography>
      <Stack spacing={3}>
        <TotalSummaryCards />
        <Stack direction={{ xs: "column", md: "column" }} spacing={3}>
          <JobsChart />
          <UserGrowthChart />
        </Stack>
        <UserTypePieChart />
        <TrafficLineChart />
      </Stack>
    </Container>
  );
};

export default Overview;
