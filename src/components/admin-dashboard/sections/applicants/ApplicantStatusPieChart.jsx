import { useEffect, useRef } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import Chart from "chart.js/auto";

const ApplicantStatusPieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Placeholder data
  const isLoading = false;
  const data = {
    active: 200,
    suspended: 20,
    pending: 10,
  };

  const getChartData = () => ({
    labels: ["Active", "Suspended", "Pending"],
    datasets: [
      {
        label: "Applicants",
        data: [data.active, data.suspended, data.pending],
        backgroundColor: ["#42a5f5", "#ef5350", "#ffb300"],
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
        Applicant Status Distribution
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

export default ApplicantStatusPieChart; 