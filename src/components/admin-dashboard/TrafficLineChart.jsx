// components/admin-dashboard/charts/TrafficLineChart.jsx
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

const TrafficLineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [timeRange, setTimeRange] = useState("monthly");

  const handleTimeChange = (e, newValue) => setTimeRange(newValue);

  const getChartData = () => ({
    labels: labelsByRange[timeRange],
    datasets: [
      {
        label: "Page Views",
        data: [100, 200, 150, 300, 400, 500],
        backgroundColor: "rgba(153, 102, 255, 0.2)",
        borderColor: "rgba(153, 102, 255, 1)",
        fill: true,
        tension: 0.4,
      },
      {
        // Second dataset.
        datalabels: {
          labels: {
            title: null
          }
        }
      }
    ],
  });

  useEffect(() => {
    if (chartRef.current) {
      if (chartInstance.current) chartInstance.current.destroy();
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
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
        <Typography variant="h6">Website Traffic</Typography>
        <Chip
          label="+21% growth"
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

export default TrafficLineChart;
