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
  CircularProgress,
} from "@mui/material";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  useGetMonthlyJobStatsQuery,
  useGetQuarterlyJobStatsQuery,
  useGetYearlyJobStatsQuery,
} from "../../redux/api/jobApiSlice";

Chart.register(ChartDataLabels);

const currentYear = new Date().getFullYear();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const quarters = ["Q1", "Q2", "Q3", "Q4"];

const JobsChart = ({ title = "Job Posting Stats" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [timeRange, setTimeRange] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState(currentYear);

  const handleTimeChange = (_, newValue) => {
    setTimeRange(newValue);
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const {
    data: monthlyStats,
    isLoading: isMonthlyLoading,
  } = useGetMonthlyJobStatsQuery(selectedYear, { skip: timeRange !== "monthly" });

  const {
    data: quarterlyStats,
    isLoading: isQuarterlyLoading,
  } = useGetQuarterlyJobStatsQuery(selectedYear, { skip: timeRange !== "quarterly" });

  const {
    data: yearlyStats,
    isLoading: isYearlyLoading,
  } = useGetYearlyJobStatsQuery(selectedYear, { skip: timeRange !== "yearly" });

  const isLoading = {
    monthly: isMonthlyLoading,
    quarterly: isQuarterlyLoading,
    yearly: isYearlyLoading,
  }[timeRange];

  const getLabels = () => {
    if (timeRange === "monthly") return monthNames;
    if (timeRange === "quarterly") return quarters;
    if (timeRange === "yearly") return [selectedYear - 3, selectedYear - 2, selectedYear - 1, selectedYear];
    return [];
  };

  const getChartData = () => {
    const labels = getLabels();

    const data = labels.map((_, index) => {
      if (timeRange === "monthly") return monthlyStats?.data?.[index] || 0;
      if (timeRange === "quarterly") return quarterlyStats?.data?.[index] || 0;
      if (timeRange === "yearly") return yearlyStats?.data?.[index] || 0;
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
    if (isLoading || !chartRef.current) return;

    if (chartInstance.current) chartInstance.current.destroy();
    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: getChartData(),
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 500,
        },
        layout: {
          padding: { top: 30 },
        },
        scales: {
          y: {
            beginAtZero: true,
            ticks: { stepSize: 10 },
          },
        },
        plugins: {
          legend: { position: "bottom" },
          datalabels: {
            display: true,
            align: "top",
            anchor: "end",
            color: "#555",
            font: { weight: "bold" },
            formatter: (value) => value,
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    return () => chartInstance.current?.destroy();
  }, [timeRange, selectedYear, isLoading, monthlyStats, quarterlyStats, yearlyStats]);

  const renderDropdown = () => {
    const years = Array.from({ length: 10 }, (_, i) => currentYear - i).reverse();

    return (
      <FormControl size="small" sx={{ minWidth: 160 }}>
        <InputLabel>Year</InputLabel>
        <Select label="Year" value={selectedYear} onChange={handleYearChange}>
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
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Tabs value={timeRange} onChange={handleTimeChange}>
            <Tab label="Monthly" value="monthly" />
            <Tab label="Quarterly" value="quarterly" />
            <Tab label="Yearly" value="yearly" />
          </Tabs>
          {renderDropdown()}
        </Box>

        <Box sx={{ height: 300, position: "relative" }}>
          {isLoading && (
            <Box
              sx={{
                position: "absolute",
                top: "40%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: 10,
              }}
            >
              <CircularProgress size={32} />
            </Box>
          )}
          <canvas ref={chartRef} style={{ opacity: isLoading ? 0.3 : 1 }} />
        </Box>
      </Paper>
    </LocalizationProvider>
  );
};

export default JobsChart;
