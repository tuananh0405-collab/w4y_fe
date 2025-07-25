import { useEffect, useRef } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import Chart from "chart.js/auto";
import { useGetJobsPostedOverTimeQuery } from "../../../../redux/api/jobApiSlice";

const JobsOverTimeChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { data, isLoading, error } = useGetJobsPostedOverTimeQuery();

  // Prepare labels and counts from API data
  const labels = data ? Object.keys(data.data || {}) : [];
  const counts = data ? Object.values(data.data || {}) : [];

  const getChartData = () => ({
    labels,
    datasets: [
      {
        label: "Jobs Posted",
        data: counts,
        fill: false,
        borderColor: "#42a5f5",
        backgroundColor: "#42a5f5",
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    if (!chartRef.current || isLoading || error) return;
    if (chartInstance.current) chartInstance.current.destroy();
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "line",
      data: getChartData(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    });
    return () => chartInstance.current?.destroy();
  }, [isLoading, error, data]);

  return (
    <Paper sx={{ p: 3, height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Jobs Posted Over Time
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

export default JobsOverTimeChart; 