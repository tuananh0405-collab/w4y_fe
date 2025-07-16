import React, { useEffect, useRef } from "react";
import { Paper, Typography, Box } from "@mui/material";
import Chart from "chart.js/auto";
import { useGetTopCitiesQuery } from "../../../../redux/api/userApiSlice";

const HorizontalCitiesBarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { data: cities = [], isLoading, isError } = useGetTopCitiesQuery();

  useEffect(() => {
    if (!cities.length) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: cities.map((d) => d.city),
        datasets: [
          {
            label: "Applicants",
            data: cities.map((d) => d.count),
            backgroundColor: "#42a5f5",
          },
        ],
      },
      options: {
        indexAxis: "y",
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: { bottom: 30 },
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: (ctx) => `${ctx.parsed.x} applicants`,
            },
          },
        },
        scales: {
          x: { beginAtZero: true },
        },
      },
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [cities]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading data</Typography>;

  return (
    <Paper sx={{ p: 3, height: 400 }}>
      <Typography variant="h6" gutterBottom>
        Applicants by City
      </Typography>
      <Box sx={{ height: "100%" }}>
        <canvas ref={chartRef} />
      </Box>
    </Paper>
  );
};

export default HorizontalCitiesBarChart;
