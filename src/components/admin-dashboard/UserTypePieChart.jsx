// components/admin-dashboard/charts/UserTypePieChart.jsx
import { useEffect, useRef } from "react";
import { Paper, Typography, Box } from "@mui/material";
import Chart from "chart.js/auto";


const UserTypePieChart = ({ applicants = 0, recruiters = 0 }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const getChartData = () => {
    return {
      labels: ["Applicants", "Recruiters"],
      datasets: [
        {
          label: "User Type",
          data: [applicants, recruiters],
          backgroundColor: ["#42a5f5", "#66bb6a"],
          hoverOffset: 8,
        },
      ],
    };
  };

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy();
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: getChartData(),
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            datalabels: {
              formatter: (value, context) => {
                const data = context.chart.data.datasets[0].data;
                const total = data.reduce((sum, val) => sum + val, 0);
                const percentage = ((value / total) * 100).toFixed(1);
                return `${percentage}%`;
              },
              color: "#fff",
              font: {
                weight: "bold",
              },
            },
          },
        },
      });
    }
    return () => chartInstance.current?.destroy();
  }, [applicants, recruiters]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        User Type Distribution
      </Typography>
      <Box sx={{ height: 300 }}>
        <canvas ref={chartRef}></canvas>
      </Box>
    </Paper>
  );
};

export default UserTypePieChart;