import { useEffect, useRef, useState } from "react";
import {
  Paper,
  Typography,
  Tabs,
  Tab,
  Box,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import Chart from "chart.js/auto";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Padding } from "@mui/icons-material";


const getCurrentYear = () => new Date().getFullYear();
const currentYear = getCurrentYear();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const JobsChart = ({ title = "Job Posting Stats" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [timeRange, setTimeRange] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [endYear, setEndYear] = useState(currentYear); // For yearly

  const handleTimeChange = (_, newValue) => {
    setTimeRange(newValue);
  };

  const handleYearChange = (e) => {
    if (timeRange === "yearly") {
      setEndYear(e.target.value);
    } else {
      setSelectedYear(e.target.value);
    }
  };

  const getLabels = () => {
    if (timeRange === "monthly") return monthNames;
    if (timeRange === "quarterly") return ["Q1", "Q2", "Q3", "Q4"];
    if (timeRange === "yearly") {
      const end = endYear;
      return [end - 3, end - 2, end - 1, end];
    }
    return [];
  };

  const getChartData = () => {
    const labels = getLabels();

    const data = labels.map((label, index) => {
      if (timeRange === "monthly") {
        const monthIndex = index;
        const isFuture = selectedYear > currentYear || (selectedYear === currentYear && monthIndex > new Date().getMonth());
        return isFuture ? 0 : Math.floor(Math.random() * 20 + 1);
      }

      if (timeRange === "quarterly") {
        const quarterStartMonth = index * 3;
        const isFuture = selectedYear > currentYear || (selectedYear === currentYear && quarterStartMonth > new Date().getMonth());
        return isFuture ? 0 : Math.floor(Math.random() * 40 + 5);
      }

      if (timeRange === "yearly") {
        const year = label;
        const isFuture = year > currentYear;
        return isFuture ? 0 : Math.floor(Math.random() * 50 + 10);
      }

      return 0;
    });

    return {
      labels,
      datasets: [
        {
          label: "Jobs Posted",
          data,
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
        },
      ],
    };
  };

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
          layout: {
            padding: {
              top: 30, 
            },
          },
          scales: {
            y: { beginAtZero: true },
          },
          plugins: {
            legend: {
              position: "bottom",
            },
            datalabels: {
              display: true,
              align: "top",
              anchor: "end",
              color: "#555",
              font: {
                weight: "bold",
              },
              formatter: (value) => value,
            },
          },
        },
      });
    }

    return () => chartInstance.current?.destroy();
  }, [timeRange, selectedYear, endYear]);

  const renderDropdown = () => {
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i).reverse();

    return (
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>{timeRange === "yearly" ? "End Year" : "Year"}</InputLabel>
        <Select
          label={timeRange === "yearly" ? "End Year" : "Year"}
          value={timeRange === "yearly" ? endYear : selectedYear}
          onChange={handleYearChange}
        >
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
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
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
        <Tabs value={timeRange} onChange={handleTimeChange}>
          <Tab label="Monthly" value="monthly" />
          <Tab label="Quarterly" value="quarterly" />
          <Tab label="Yearly" value="yearly" />
        </Tabs>
        {renderDropdown()}
      </Box>
      <Box sx={{ height: 300 }}>
        <canvas ref={chartRef}></canvas>
      </Box>
    </Paper>
    </LocalizationProvider>
  );
};

export default JobsChart;
