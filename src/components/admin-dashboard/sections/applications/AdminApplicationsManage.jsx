import { Box, Typography } from "@mui/material";
import ApplicationsChartsSection from "./ApplicationsChartsSection";
import ApplicationsTable from "./ApplicationsTable";

const AdminApplicationsManage = () => (
  <Box>
    <Typography variant="h5" fontWeight="bold" mb={3}>
      Applications Management
    </Typography>
    <ApplicationsChartsSection />
    <ApplicationsTable />
  </Box>
);

export default AdminApplicationsManage; 