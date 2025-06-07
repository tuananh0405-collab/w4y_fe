import { useState, useEffect, useRef } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  Avatar,
  IconButton,
  Tooltip,
  CircularProgress,
} from "@mui/material";
import {
  Visibility as ViewIcon,
  PersonAdd as InviteIcon,
  Cancel as RejectIcon,
} from "@mui/icons-material";
import Chart from "chart.js/auto";

const RecruiterTable = ({ recruiters, isLoading }) => {
  const [selectedRecruiter, setSelectedRecruiter] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const handleViewDetails = (recruiter) => {
    setSelectedRecruiter(recruiter);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedRecruiter(null);
  };

  useEffect(() => {
    if (openDialog && selectedRecruiter && chartRef.current) {
      // Destroy existing chart if it exists
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: ["Jobs Posted", "Unseen Profiles"],
          datasets: [
            {
              label: "Recruiter Statistics",
              data: [
                selectedRecruiter.jobsPosted,
                selectedRecruiter.unseenProfiles,
              ],
              backgroundColor: [
                "rgba(75, 192, 192, 0.2)",
                "rgba(255, 99, 132, 0.2)",
              ],
              borderColor: [
                "rgba(75, 192, 192, 1)",
                "rgba(255, 99, 132, 1)",
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
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
  }, [openDialog, selectedRecruiter]);

  if (isLoading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <TableContainer 
        component={Paper} 
        sx={{ 
          height: "100%",
          "& .MuiTable-root": {
            minHeight: "100%"
          }
        }}
      >
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Recruiter</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Phone</TableCell>
              <TableCell>Jobs Posted</TableCell>
              <TableCell>Unseen Profiles</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {recruiters.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  <Typography variant="body1" color="text.secondary">
                    No recruiters found
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              recruiters.map((recruiter) => (
                <TableRow key={recruiter._id}>
                  <TableCell>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Avatar src={recruiter.avatar} alt={recruiter.name} />
                      <Typography>{recruiter.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{recruiter.email}</TableCell>
                  <TableCell>{recruiter.phone}</TableCell>
                  <TableCell>{recruiter.jobsPosted}</TableCell>
                  <TableCell>{recruiter.unseenProfiles}</TableCell>
                  <TableCell>
                    <IconButton
                      onClick={() => handleViewDetails(recruiter)}
                      color="primary"
                    >
                      <ViewIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
      >
        {selectedRecruiter && (
          <>
            <DialogTitle>
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <Avatar
                  src={selectedRecruiter.avatar}
                  alt={selectedRecruiter.name}
                />
                <Typography variant="h6">{selectedRecruiter.name}</Typography>
              </Box>
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Contact Information
                </Typography>
                <Typography>Email: {selectedRecruiter.email}</Typography>
                <Typography>Phone: {selectedRecruiter.phone}</Typography>
              </Box>
              <Box sx={{ mt: 4, height: 300 }}>
                <canvas ref={chartRef}></canvas>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>
    </>
  );
};

export default RecruiterTable; 