import { Box, Container } from "@mui/material";
import { useState } from "react";

import AdminSidebar from "../components/admin-dashboard/AdminSidebar";

import Overview from "../components/admin-dashboard/sections/overview/AdminOverview";
import AdminUsersManage from "../components/admin-dashboard/sections/users/AdminUsersManage";
// import Users from "../components/admin-dashboard/sections/Users";
// import Jobs from "../components/admin-dashboard/sections/Jobs";
// import Applications from "../components/admin-dashboard/sections/Applications";

const AdminDashboard = () => {
  const [selected, setSelected] = useState("overview");

  const renderContent = () => {
    switch (selected) {
      case "overview":
        return <Overview />;
      case "users":
        return <AdminUsersManage/>;
      case "jobs":
        // return <Jobs />;
      case "applications":
        // return <Applications />;
      default:
        return <Overview />;
    }
  };

  return (
    <Box className="bg-teal-50" sx={{ display: "flex", height: "100%", width: "100%" }}>
      <AdminSidebar selected={selected} setSelected={setSelected} />
      <Container className="bg-teal-50"  sx={{ flexGrow: 1, p: 3 }}>
        {renderContent()}
      </Container>
    </Box>
  );
};

export default AdminDashboard;
