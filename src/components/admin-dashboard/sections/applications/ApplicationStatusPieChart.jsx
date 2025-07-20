import { useEffect, useRef } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import Chart from "chart.js/auto";
import { useGetApplicationStatusDistributionQuery } from "../../../../redux/api/applicationApiSlice";

const statusLabels = ["Pending", "Phỏng vấn", "Từ chối", "Mới nhận"];
const statusColors = ["#ffb300", "#42a5f5", "#ef5350", "#66bb6a"];

const ApplicationStatusPieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const { data, isLoading, error } = useGetApplicationStatusDistributionQuery();

  const chartData = statusLabels.map((status) => (data?.data?.[status] || 0));

  const getChartData = () => ({
    labels: statusLabels,
    datasets: [
      {
        label: "Applications",
        data: chartData,
        backgroundColor: statusColors,
        hoverOffset: 8,
      },
    ],
  });

  useEffect(() => {
    if (!chartRef.current || isLoading || error) return;
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
  }, [isLoading, error, data]);

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

export default ApplicationStatusPieChart; 