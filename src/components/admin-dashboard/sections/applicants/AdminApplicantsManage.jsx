import { Box, Typography } from "@mui/material";
import ApplicantsChartsSection from "./ApplicantsChartsSection";
import ApplicantsTable from "./ApplicantsTable";

const AdminApplicantsManage = () => (
  <Box>
    <Typography variant="h5" fontWeight="bold" mb={3}>
      Applicants Management
    </Typography>
    <ApplicantsChartsSection />
    <ApplicantsTable />
  </Box>
);

export default AdminApplicantsManage; 