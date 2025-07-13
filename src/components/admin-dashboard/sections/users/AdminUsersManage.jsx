import { Box, Typography } from "@mui/material";
import ChartsSection from "./ChartsSection";
import UsersTable from "./UsersTable";

const AdminUsersManage = () => {
  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={3}>
        Users Management
      </Typography>

      <ChartsSection />

      <UsersTable />
    </Box>
  );
};

export default AdminUsersManage;
