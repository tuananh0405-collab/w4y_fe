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
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ChartDataLabels from "chartjs-plugin-datalabels";
import {
  useGetMonthlyUserGrowthQuery,
  useGetQuarterlyUserGrowthQuery,
  useGetYearlyUserGrowthQuery,
} from "../../../../redux/api/userApiSlice";

Chart.register(ChartDataLabels);

const currentYear = new Date().getFullYear();
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const quarters = ["Q1", "Q2", "Q3", "Q4"];

const UserGrowthChart = ({ title = "User Growth" }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [timeRange, setTimeRange] = useState("monthly");
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [endYear, setEndYear] = useState(currentYear);

  const handleTimeChange = (_, newValue) => {
    setTimeRange(newValue);
  };

  const handleYearChange = (e) => {
    const value = e.target.value;
    if (timeRange === "yearly") setEndYear(value);
    else setSelectedYear(value);
  };

  // === API Queries ===
  const {
    data: monthlyData,
    isLoading: isMonthlyLoading,
  } = useGetMonthlyUserGrowthQuery(selectedYear, {
    skip: timeRange !== "monthly",
  });

  const {
    data: quarterlyData,
    isLoading: isQuarterlyLoading,
  } = useGetQuarterlyUserGrowthQuery(selectedYear, {
    skip: timeRange !== "quarterly",
  });

  const {
    data: yearlyData,
    isLoading: isYearlyLoading,
  } = useGetYearlyUserGrowthQuery(endYear, {
    skip: timeRange !== "yearly",
  });

  const isLoading =
    (timeRange === "monthly" && isMonthlyLoading) ||
    (timeRange === "quarterly" && isQuarterlyLoading) ||
    (timeRange === "yearly" && isYearlyLoading);

  const getLabels = () => {
    if (timeRange === "monthly") return monthNames;
    if (timeRange === "quarterly") return quarters;
    if (timeRange === "yearly") {
      const end = endYear;
      return [end - 3, end - 2, end - 1, end];
    }
    return [];
  };

  const getChartData = () => {
    const labels = getLabels();
    const applicants = [];
    const recruiters = [];

    labels.forEach((_, index) => {
      if (timeRange === "monthly") {
        applicants.push(monthlyData?.data?.applicant?.[index] || 0);
        recruiters.push(monthlyData?.data?.recruiter?.[index] || 0);
      } else if (timeRange === "quarterly") {
        applicants.push(quarterlyData?.data?.applicant?.[index] || 0);
        recruiters.push(quarterlyData?.data?.recruiter?.[index] || 0);
      } else if (timeRange === "yearly") {
        applicants.push(yearlyData?.data?.applicant?.[index] || 0);
        recruiters.push(yearlyData?.data?.recruiter?.[index] || 0);
      }
    });

    return {
      labels,
      datasets: [
        {
          label: "Applicants",
          data: applicants,
          backgroundColor: "rgba(66, 165, 245, 0.5)",
          borderColor: "rgba(66, 165, 245, 1)",
          borderWidth: 1,
        },
        {
          label: "Recruiters",
          data: recruiters,
          backgroundColor: "rgba(102, 187, 106, 0.5)",
          borderColor: "rgba(102, 187, 106, 1)",
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
            ticks: {
              stepSize: 10,
            },
          },
        },
        plugins: {
          legend: {
            position: "bottom",
          },
          datalabels: {
            display: true,
            align: "end",
            anchor: "end",
            color: "#444",
            font: {
              weight: "bold",
            },
            formatter: (value) => (value === 0 ? "" : value),
          },
        },
      },
      plugins: [ChartDataLabels],
    });

    return () => chartInstance.current?.destroy();
  }, [timeRange, selectedYear, endYear, isLoading, monthlyData, quarterlyData, yearlyData]);

  const renderDropdown = () => {
    const years = Array.from({ length: 6 }, (_, i) => currentYear - 5 + i);

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
    <Paper sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
      </Box>

      <Box
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}
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
  );
};

export default UserGrowthChart;
