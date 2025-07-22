import { useEffect, useRef, useState } from "react";
import {
  Box,
  Chip,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import Chart from "chart.js/auto";
import { useGetWebTrafficReportMutation } from "../../../../redux/api/analyticsApiSlice";
import { toast } from "react-toastify";

const TrafficLineChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const [timeRange, setTimeRange] = useState("monthly");

  const today = new Date();
  const currentYear = today.getFullYear();
  const currentMonth = today.getMonth();
  const currentDay = today.getDate();
  const currentHour = today.getHours();

  const [selectedDate, setSelectedDate] = useState(
    today.toISOString().split("T")[0],
  ); // for hourly
  const [selectedMonth, setSelectedMonth] = useState(
    `${currentYear}-${String(currentMonth + 1).padStart(2, "0")}`,
  ); // for daily
  const [selectedYear, setSelectedYear] = useState(currentYear); // for monthly

  const [chartData, setChartData] = useState(null);
  const [getWebTrafficReport, { isLoading }] = useGetWebTrafficReportMutation();

  const handleTimeChange = (e, newValue) => setTimeRange(newValue);

  useEffect(() => {
    const fetchTrafficData = async () => {
      const reportQueryObject = { dateRanges: [], granularity: "daily" };
      if (timeRange === "monthly") {
        reportQueryObject.dateRanges.push({
          startDate: `${selectedYear}-01-01`,
          endDate: `${selectedYear}-12-31`,
        });
      } else if (timeRange === "daily") {
        const [year, month] = selectedMonth.split("-");
        const daysInMonth = new Date(year, month, 0).getDate();
        reportQueryObject.dateRanges.push({
          startDate: `${selectedMonth}-01`,
          endDate: `${selectedMonth}-${String(daysInMonth).padStart(2, "0")}`,
        });
      } else if (timeRange === "hourly") {
        reportQueryObject.dateRanges.push({
          startDate: selectedDate,
          endDate: selectedDate,
        });
        reportQueryObject.granularity = "hourly";
      }

      try {
        const result = await getWebTrafficReport(reportQueryObject).unwrap();
        const report = result.data;
        const rows = report.rows || [];

        let labels = [];
        let data = [];

        if (timeRange === "monthly") {
          labels = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
          ];
          const monthlyData = Array(12).fill(0);
          rows.forEach((row) => {
            const monthIndex =
              parseInt(row.dimensionValues[0].value.substring(4, 6), 10) - 1;
            monthlyData[monthIndex] += parseInt(row.metricValues[0].value, 10);
          });
          data = monthlyData;
        } else if (timeRange === "daily") {
          const [year, month] = selectedMonth.split("-");
          const daysInMonth = new Date(year, month, 0).getDate();
          labels = Array.from({ length: daysInMonth }, (_, i) => String(i + 1));
          const dailyData = Array(daysInMonth).fill(0);
          rows.forEach((row) => {
            const dayIndex =
              parseInt(row.dimensionValues[0].value.substring(6, 8), 10) - 1;
            dailyData[dayIndex] = parseInt(row.metricValues[0].value, 10);
          });
          data = dailyData;
        } else { // Hourly
          labels = Array.from(
            { length: 24 },
            (_, i) => `${String(i).padStart(2, "0")}:00`,
          );
          const hourlyData = Array(24).fill(0);
          rows.forEach((row) => {
            // [1] because hour is the second dimension value
            const hourIndex = parseInt(row.dimensionValues[1].value, 10);
            hourlyData[hourIndex] = parseInt(row.metricValues[0].value, 10);
          });
          data = hourlyData;
        }

        setChartData({
          labels,
          datasets: [
            {
              label: "Sessions",
              data,
              fill: false,
              borderColor: "rgba(153, 102, 255, 1)",
              backgroundColor: "rgba(153, 102, 255, 0.3)",
              tension: 0.4,
            },
          ],
        });
      } catch (error) {
        toast.error("Failed to fetch web traffic data.");
        console.error("Failed to fetch web traffic data:", error);
      }
    };

    fetchTrafficData();
  }, [
    timeRange,
    selectedDate,
    selectedMonth,
    selectedYear,
    getWebTrafficReport,
  ]);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    if (chartRef.current && chartData) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: chartData,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true } },
          plugins: {
            legend: { position: "bottom" },
            datalabels: {
              display: (context) => {
                // Only display labels for values > 0 to avoid clutter
                return context.dataset.data[context.dataIndex] > 0;
              },
              anchor: "end", // Anchor the label to the data point
              align: "top", // Position the label above the data point
              offset: 2, // Add 8px of space above the point
              color: "#555",
              font: {
                weight: "bold",
              },
              // backgroundColor: "rgba(255, 255, 255, 0.75)",
              borderRadius: 4,
              padding: 4,
            },
          },
          layout: {
            padding: {
              top: 30,
            },
          },
        },
      });
    }
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [chartData]);

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 2,
        }}
      >
        <Tabs value={timeRange} onChange={handleTimeChange}>
          <Tab label="Hourly" value="hourly" />
          <Tab label="Daily" value="daily" />
          <Tab label="Monthly" value="monthly" />
        </Tabs>
        {renderDropdown()}
      </Box>
      <Box sx={{ height: 300, position: "relative" }}>
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <canvas ref={chartRef}></canvas>
        {!isLoading && !chartData && (
          <Typography>No data available for this period.</Typography>
        )}
      </Box>
    </Paper>
  );
};

export default TrafficLineChart;
