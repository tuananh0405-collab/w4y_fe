// components/admin-dashboard/charts/UserGrowthChart.jsx
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
import ChartDataLabels from "chartjs-plugin-datalabels";

Chart.register(ChartDataLabels);

const currentDate = new Date();
const currentYear = currentDate.getFullYear();
const currentMonth = currentDate.getMonth(); // 0-based
const currentQuarter = Math.floor(currentMonth / 3); // 0 = Q1, 1 = Q2...

const UserGrowthChart = ({ title = "User Growth" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [timeRange, setTimeRange] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState(currentYear.toString());

  const handleTimeChange = (e, newValue) => setTimeRange(newValue);
  const handleDropdownChange = (e) => setSelectedYear(e.target.value);

  const generateLabels = () => {
    if (timeRange === "monthly") {
      return [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
      ];
    }
    if (timeRange === "quarterly") {
      return ["Q1", "Q2", "Q3", "Q4"];
    }
    if (timeRange === "yearly") {
      const end = parseInt(selectedYear, 10);
      return [end - 3, end - 2, end - 1, end].map(String);
    }
    return [];
  };

  const getChartData = () => {
    const labels = generateLabels();
    const applicantsData = [];
    const recruitersData = [];

    labels.forEach((label, index) => {
      let isFuture = false;

      if (timeRange === "monthly") {
        const labelDate = new Date(`${selectedYear}-${index + 1}-01`);
        isFuture = labelDate > currentDate;
      } else if (timeRange === "quarterly") {
        const quarterMonth = (index + 1) * 3;
        const labelDate = new Date(`${selectedYear}-${quarterMonth}-01`);
        isFuture = labelDate > currentDate;
      } else if (timeRange === "yearly") {
        isFuture = parseInt(label) > currentYear;
      }

      applicantsData.push(isFuture ? 0 : Math.floor(Math.random() * 100 + 10));
      recruitersData.push(isFuture ? 0 : Math.floor(Math.random() * 50 + 5));
    });

    return {
      labels,
      datasets: [
        {
          label: "Applicants",
          data: applicantsData,
          backgroundColor: "rgba(66, 165, 245, 0.5)",
          borderColor: "rgba(66, 165, 245, 1)",
          borderWidth: 1,
        },
        {
          label: "Recruiters",
          data: recruitersData,
          backgroundColor: "rgba(102, 187, 106, 0.5)",
          borderColor: "rgba(102, 187, 106, 1)",
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
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 20,
              },
            },
          },
          plugins: {
            legend: {
              position: "bottom",
            },
            datalabels: {
              display: true,
              align: 'end',
              anchor: 'end',
              color: '#444',
              font: {
                weight: 'bold',
              },
              formatter: (value) => (value === 0 ? '' : value),
            },
          },
        },
        plugins: [ChartDataLabels],
      });
    }

    return () => chartInstance.current?.destroy();
  }, [timeRange, selectedYear]);

  const renderDropdown = () => {
    const yearOptions = Array.from({ length: 10 }, (_, i) => (currentYear - 9 + i).toString());

    return (
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>{timeRange === "yearly" ? "End Year" : "Year"}</InputLabel>
        <Select
          value={selectedYear}
          onChange={handleDropdownChange}
          label={timeRange === "yearly" ? "End Year" : "Year"}
        >
          {yearOptions.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    );
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <Chip
          label="+18% growth"
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
  );
};

export default UserGrowthChart;
