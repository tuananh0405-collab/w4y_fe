// components/admin-dashboard/charts/JobsChart.jsx
import { useEffect, useRef, useState } from "react";
import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  Chip,
} from "@mui/material";
import Chart from "chart.js/auto";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";

const labelsByRange = {
  weekly: ["Week 1", "Week 2", "Week 3", "Week 4"],
  monthly: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  quarterly: ["Q1", "Q2", "Q3", "Q4"],
  yearly: ["2020", "2021", "2022", "2023"],
};

const JobsChart = ({ title = "Job Posting Stats" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [timeRange, setTimeRange] = useState("monthly");

  const handleTimeChange = (e, newValue) => setTimeRange(newValue);

  const getChartData = () => ({
    labels: labelsByRange[timeRange],
    datasets: [
      {
        label: "Jobs Posted",
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  });

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy();

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: getChartData(),
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            datalabels: {
              display: true,
              align: 'top',
              anchor: 'end',
              color: '#555',
              font: {
                weight: 'bold'
              },
              formatter: (value) => value,
            },
          },
        },

      });
    }

    return () => chartInstance.current?.destroy();
  }, [timeRange]);

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <Chip
          label="+12% growth"
          color="success"
          icon={<TrendingUpIcon />}
          size="small"
        />
      </Box>
      <Tabs value={timeRange} onChange={handleTimeChange} sx={{ mb: 2 }}>
        <Tab label="Weekly" value="weekly" />
        <Tab label="Monthly" value="monthly" />
        <Tab label="Quarterly" value="quarterly" />
        <Tab label="Yearly" value="yearly" />
      </Tabs>
      <Box sx={{ height: 300 }}>
        <canvas ref={chartRef}></canvas>
      </Box>
    </Paper>
  );
};

export default JobsChart;
