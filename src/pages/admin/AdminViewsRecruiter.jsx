import { useState } from "react";
import { Box, Container, Paper, Typography, TablePagination } from "@mui/material";
import { styled } from "@mui/material/styles";
import AdminSidebar from "../../components/admin/AdminSidebar";
import RecruiterTable from "../../components/admin/RecruiterTable";
import { useGetAllUsersQuery } from "../../redux/api/userApiSlice";

const drawerWidth = 240;

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginLeft: drawerWidth,
  backgroundColor: "#f5f5f5",
  minHeight: "100vh",
  width: `calc(100% - ${drawerWidth}px)`,
}));

const AdminViewsRecruiter = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const { data, isLoading } = useGetAllUsersQuery({
    page: page + 1,
    limit: rowsPerPage,
    accountType: "recruiter",
  });

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Transform user data to match recruiter table format
  const transformedRecruiters = data?.users?.map((user) => ({
    _id: user._id,
    name: user.name,
    email: user.email,
    phone: user.phone || "N/A",
    jobsPosted: user.jobsPosted || 0,
    avatar: user.avatar,
    unseenProfiles: user.unseenProfiles || 0,
  })) || [];

  return (
    <Box sx={{ display: "flex" }}>
      <AdminSidebar />
      <Main>
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4, height: "calc(100vh - 64px)" }}>
          <Paper 
            sx={{ 
              p: 2, 
              height: "100%", 
              display: "flex", 
              flexDirection: "column" 
            }}
          >
            <Typography variant="h5" gutterBottom>
              Recruiter Management
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              View and manage all recruiters in the system
            </Typography>
            <Box sx={{ flexGrow: 1, overflow: "auto" }}>
              <RecruiterTable 
                recruiters={transformedRecruiters} 
                isLoading={isLoading}
              />
            </Box>
            <TablePagination
              component="div"
              count={data?.pagination?.total || 0}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Paper>
        </Container>
      </Main>
    </Box>
  );
};

export default AdminViewsRecruiter; 