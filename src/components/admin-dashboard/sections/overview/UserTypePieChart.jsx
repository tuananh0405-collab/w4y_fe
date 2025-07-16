import { useEffect, useRef } from "react";
import { Paper, Typography, Box, CircularProgress } from "@mui/material";
import Chart from "chart.js/auto";
import { useGetApplicantRecruiterCountQuery } from "../../../../redux/api/userApiSlice";

const UserTypePieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { data, isLoading } = useGetApplicantRecruiterCountQuery();
  const applicants = data?.applicant || 0;
  const recruiters = data?.recruiter || 0;

  const getChartData = () => ({
    labels: ["Applicants", "Recruiters"],
    datasets: [
      {
        label: "User",
        data: [applicants, recruiters],
        backgroundColor: ["#42a5f5", "#66bb6a"],
        hoverOffset: 8,
      },
    ],
  });

  useEffect(() => {
    if (!chartRef.current || isLoading) return;

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
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : "0.0";
              return `${percentage}%`;
            },
            color: "#fff",
            font: { weight: "bold" },
          },
        },
      },
    });

    return () => chartInstance.current?.destroy();
  }, [applicants, recruiters, isLoading]);

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        User Type Distribution
      </Typography>
      <Box sx={{ height: 300, position: "relative" }}>
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 2,
            }}
          >
            <CircularProgress />
          </Box>
        )}
        <canvas
          ref={chartRef}
          style={{ opacity: isLoading ? 0.3 : 1 }}
        />
      </Box>
    </Paper>
  );
};

export default UserTypePieChart;
