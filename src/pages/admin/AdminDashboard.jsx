import { useState, useEffect, useRef } from "react";
import { Box, Container, Grid, Paper, Typography, Tabs, Tab } from "@mui/material";
import { styled } from "@mui/material/styles";
import AdminSidebar from "../../components/admin/AdminSidebar";
import RecruiterTable from "../../components/admin/RecruiterTable";
import {
  useGetAllUsersQuery,
  useGetRecruiterStatsQuery,
} from "../../redux/api/userApiSlice";
import {
  useGetJobListQuery,
  useGetJobStatisticsQuery,
} from "../../redux/api/jobApiSlice";
import Chart from "chart.js/auto";

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
  width: `calc(100% - ${drawerWidth}px)`,
}));

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("monthly");
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { data: jobStats } = useGetJobStatisticsQuery();
  const { data: recruiterStats } = useGetRecruiterStatsQuery();

  const handleTimeRangeChange = (event, newValue) => {
    setTimeRange(newValue);
  };

  const getChartData = () => {
    const labels = {
      weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
      monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      quarterly: ["Q1", "Q2", "Q3", "Q4"],
      yearly: ["2020", "2021", "2022", "2023"],
    };

    return {
      labels: labels[timeRange],
      datasets: [
        {
          label: "Jobs Posted",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

  useEffect(() => {
    if (chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: getChartData(),
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }

    // Cleanup function to destroy chart when component unmounts
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [timeRange]); // Recreate chart when timeRange changes

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Main>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          <Grid container spacing={3}>
            {/* Job Statistics Chart */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Job Posting Statistics
                </Typography>
                <Tabs
                  value={timeRange}
                  onChange={handleTimeRangeChange}
                  sx={{ mb: 2 }}
                >
                  <Tab label="Weekly" value="weekly" />
                  <Tab label="Monthly" value="monthly" />
                  <Tab label="Quarterly" value="quarterly" />
                  <Tab label="Yearly" value="yearly" />
                </Tabs>
                <Box sx={{ height: 400, position: "relative" }}>
                  <canvas ref={chartRef}></canvas>
                </Box>
              </Paper>
            </Grid>

            {/* Recruiter Statistics */}
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Recruiter Statistics
                </Typography>
                <RecruiterTable recruiters={recruiterStats?.recruiters || []} />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Main>
    </Box>
  );
};

export default AdminDashboard; 