import { useEffect, useRef } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import Chart from "chart.js/auto";

const ApplicantsOverTimeChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Placeholder data
  const isLoading = false;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const counts = [15, 20, 25, 18, 30, 35, 28, 22, 19, 24, 27, 31];

  const getChartData = () => ({
    labels: months,
    datasets: [
      {
        label: "Applicants Registered",
        data: counts,
        fill: false,
        borderColor: "#42a5f5",
        backgroundColor: "#42a5f5",
        tension: 0.4,
      },
    ],
  });

  useEffect(() => {
    if (!chartRef.current || isLoading) return;
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
  }, [isLoading]);

  return (
    <Paper sx={{ p: 3, height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Applicants Registered Over Time
      </Typography>
      <Box sx={{ height: "100%" }}>
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

export default ApplicantsOverTimeChart; 