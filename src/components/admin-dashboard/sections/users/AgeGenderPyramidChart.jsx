import React, { useEffect, useRef } from "react";
import { Paper, Typography, Box } from "@mui/material";
import Chart from "chart.js/auto";
import { useGetAgeGenderPyramidQuery } from "../../../../redux/api/userApiSlice";

const AgeGenderPyramidChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const { data = [], isLoading, isError } = useGetAgeGenderPyramidQuery();

  useEffect(() => {
    if (!data.length) return;

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    const ctx = chartRef.current.getContext("2d");

    const labels = data.map(d => d.age);
    const maleData = data.map(d => -d.male); // âm để cột bên trái
    const femaleData = data.map(d => d.female);

    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [
          {
            label: "Male",
            data: maleData,
            backgroundColor: "#42a5f5",
          },
          {
            label: "Female",
            data: femaleData,
            backgroundColor: "#ef5350",
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
          legend: { position: "bottom" },
          tooltip: {
            callbacks: {
              title: (items) => `Age: ${items[0].label}`,
              label: (ctx) => {
                const gender = ctx.dataset.label;
                const value = Math.abs(ctx.parsed.x);
                return `${gender}: ${value}`;
              },
            },
          },
          datalabels:{
            display: false,
          }
        },
        scales: {
          x: {
            stacked: true,
            ticks: {
              callback: (val) => Math.abs(val),
            },
          },
          y: {
            stacked: true,
          },
        },
      },
    });

    return () => chartInstance.current.destroy();
  }, [data]);

  if (isLoading) return <Typography>Loading...</Typography>;
  if (isError) return <Typography>Error loading data</Typography>;

  return (
    <Paper sx={{ p: 3, height: "100%" }}>
      <Typography variant="h6" gutterBottom>
        Age–Gender Pyramid
      </Typography>
      <Box sx={{ height: "100%" }}>
        <canvas ref={chartRef} />
      </Box>
    </Paper>
  );
};

export default AgeGenderPyramidChart;
