import { useEffect, useRef } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import Chart from "chart.js/auto";

const ApplicantsByCityBarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  // Placeholder data
  const isLoading = false;
  const cities = ["Hanoi", "Ho Chi Minh", "Da Nang", "Hai Phong", "Can Tho"];
  const counts = [80, 120, 30, 20, 15];

  const getChartData = () => ({
    labels: cities,
    datasets: [
      {
        label: "Applicants",
        data: counts,
        backgroundColor: "#42a5f5",
      },
    ],
  });

  useEffect(() => {
    if (!chartRef.current || isLoading) return;
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
  }, [isLoading]);

  return (
    <Paper sx={{ p: 3, height: 300 }}>
      <Typography variant="h6" gutterBottom>
        Applicants by City
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

export default ApplicantsByCityBarChart; 