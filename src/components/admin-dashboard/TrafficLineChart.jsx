// components/admin-dashboard/charts/TrafficLineChart.jsx
import { useEffect, useRef, useState } from "react";
import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  Chip,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Chart from "chart.js/auto";

const TrafficLineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [timeRange, setTimeRange] = useState("monthly");

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  const currentHour = today.getHours();

  const [selectedDate, setSelectedDate] = useState(today.toISOString().split("T")[0]); // for hourly
  const [selectedMonth, setSelectedMonth] = useState(`${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`); // for daily
  const [selectedYear, setSelectedYear] = useState(currentYear); // for monthly

  const handleTimeChange = (e, newValue) => setTimeRange(newValue);

  const getLabels = () => {
    if (timeRange === "hourly") {
      return Array.from({ length: 24 }, (_, i) => `${i}:00`);
    }
    if (timeRange === "daily") {
      const [year, month] = selectedMonth.split("-");
      const daysInMonth = new Date(year, month, 0).getDate();
      return Array.from({ length: daysInMonth }, (_, i) => `${i + 1}`);
    }
    if (timeRange === "monthly") {
      return [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
    }
    return [];
  };

  const getChartData = () => {
    const labels = getLabels();
    const now = new Date();
    const data = labels.map((label, index) => {
      let isFuture = false;

      if (timeRange === "hourly") {
        const hourDate = new Date(selectedDate);
        hourDate.setHours(index);
        isFuture = hourDate > now;
      }

      if (timeRange === "daily") {
        const [year, month] = selectedMonth.split("-");
        const dayDate = new Date(year, month - 1, index + 1);
        isFuture = dayDate > now;
      }

      if (timeRange === "monthly") {
        const pointDate = new Date(selectedYear, index, 1);
        isFuture = pointDate > now;
      }

      return isFuture ? null : Math.floor(Math.random() * 1000 + 100);
    });

    const visibleIndex = data.findIndex(d => d === null);
    const trimmedLabels = labels.slice(0, visibleIndex === -1 ? labels.length : visibleIndex);
    const trimmedData = data.filter(d => d !== null);

    return {
      labels: trimmedLabels,
      datasets: [
        {
          label: "Page Views",
          data: trimmedData,
          fill: false,
          borderColor: "rgba(153, 102, 255, 1)",
          backgroundColor: "rgba(153, 102, 255, 0.3)",
          tension: 0.4,
        },
      ],
    };
  };

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
            y: {
              beginAtZero: true,
            },
          },
          plugins: {
            datalabels: {
              display: false
            },
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }

    return () => chartInstance.current?.destroy();
  }, [timeRange, selectedDate, selectedMonth, selectedYear]);

  const renderDropdown = () => {
    if (timeRange === "hourly") {
      return (
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Date</InputLabel>
          <Select
            value={selectedDate}
            label="Date"
            onChange={(e) => setSelectedDate(e.target.value)}
          >
            {[...Array(7)].map((_, i) => {
              const d = new Date();
              d.setDate(d.getDate() - i);
              const value = d.toISOString().split("T")[0];
              return (
                <MenuItem key={i} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    }

    if (timeRange === "daily") {
      return (
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Month</InputLabel>
          <Select
            value={selectedMonth}
            label="Month"
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {[...Array(12)].map((_, i) => {
              const value = `${currentYear}-${String(i + 1).padStart(2, "0")}`;
              return (
                <MenuItem key={i} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    }

    if (timeRange === "monthly") {
      return (
        <FormControl size="small" sx={{ minWidth: 160 }}>
          <InputLabel>Year</InputLabel>
          <Select
            value={selectedYear}
            label="Year"
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {[...Array(5)].map((_, i) => {
              const value = currentYear - i;
              return (
                <MenuItem key={value} value={value}>
                  {value}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      );
    }

    return null;
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">Website Traffic</Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Tabs value={timeRange} onChange={handleTimeChange}>
          <Tab label="Hourly" value="hourly" />
          <Tab label="Daily" value="daily" />
          <Tab label="Monthly" value="monthly" />
        </Tabs>
        {renderDropdown()}
      </Box>
      <Box sx={{ height: 300 }}>
        <canvas ref={chartRef}></canvas>
      </Box>
    </Paper>
  );
};

export default TrafficLineChart;
