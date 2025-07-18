import { useEffect, useRef } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import Chart from "chart.js/auto";

const ApplicationStatusPieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Placeholder data
  const isLoading = false;
  const data = {
    pending: 50,
    interview: 20,
    rejected: 15,
    accepted: 10,
  };

  const getChartData = () => ({
    labels: ["Pending", "Interview", "Rejected", "Accepted"],
    datasets: [
      {
        label: "Applications",
        data: [data.pending, data.interview, data.rejected, data.accepted],
        backgroundColor: ["#ffb300", "#42a5f5", "#ef5350", "#66bb6a"],
        hoverOffset: 8,
      },
    ],
  });

  useEffect(() => {
    if (!chartRef.current || isLoading) return;
    if (chartInstance.current) chartInstance.current.destroy();
    const ctx = chartRef.current.getContext("2d");
    chartInstance.current = new Chart(ctx, {
      type: "pie",
      data: getChartData(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
        },
      },
    });
    return () => chartInstance.current?.destroy();
  }, [isLoading]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        Application Status Distribution
      </Typography>
      <Box sx={{ height: 300, position: "relative" }}>
        {isLoading && (
          <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
            <CircularProgress />
          </Box>
        )}
        <canvas ref={chartRef} style={{ opacity: isLoading ? 0.3 : 1 }} />
      </Box>
    </Paper>
  );
};

export default ApplicationStatusPieChart; 