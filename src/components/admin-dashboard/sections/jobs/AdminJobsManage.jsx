import { Box, Typography } from "@mui/material";
import JobsChartsSection from "./JobsChartsSection";
import JobsTable from "./JobsTable";

const AdminJobsManage = () => (
  <Box>
    <Typography variant="h5" fontWeight="bold" mb={3}>
      Jobs Management
    </Typography>
    <JobsChartsSection />
    <JobsTable />
  </Box>
);

export default AdminJobsManage; 