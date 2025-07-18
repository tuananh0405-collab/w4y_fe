import { useEffect, useRef } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import Chart from "chart.js/auto";
import { useGetApplicationsByJobQuery } from "../../../../redux/api/applicationApiSlice";

const ApplicationsByJobBarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { data, isLoading, error } = useGetApplicationsByJobQuery();

  const jobs = data?.data?.map((item) => item.job) || [];
  const counts = data?.data?.map((item) => item.count) || [];

  const getChartData = () => ({
    labels: jobs,
    datasets: [
      {
        label: "Applications",
        data: counts,
        backgroundColor: "#42a5f5",
      },
    ],
  });

  useEffect(() => {
    if (!chartRef.current || isLoading || error) return;
    if (chartInstance.current) chartInstance.current.destroy();
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: getChartData(),
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
        },
        scales: {
          x: { beginAtZero: true },
        },
      },
    });
    return () => chartInstance.current?.destroy();
  }, [isLoading, error, data]);

  return (
    <Paper sx={{ p: 3, height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Applications by Job
      </Typography>
      <Box sx={{ height: "100%" }}>
        {isLoading && (
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2, color: "red" }}>
            Error loading data
          </Box>
        )}
        <canvas ref={chartRef} style={{ opacity: isLoading ? 0.3 : 1 }} />
      </Box>
    </Paper>
  );
};

export default ApplicationsByJobBarChart; 