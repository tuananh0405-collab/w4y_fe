import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Typography,
  Divider,
} from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const menuItems = [
  { text: "Dashboard", icon: <DashboardIcon />, path: "/admin/dashboard" },
  { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
  { text: "Recruiters", icon: <BusinessIcon />, path: "/admin/recruiters" },
  { text: "Jobs", icon: <WorkIcon />, path: "/admin/jobs" },
];

const AdminSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selected, setSelected] = useState(location.pathname);

  const handleNavigation = (path) => {
    setSelected(path);
    navigate(path);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        position: "fixed",
        left: 0,
        top: 0,
        height: "100vh",
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
          backgroundColor: "#1a237e",
          color: "white",
          border: "none",
        },
      }}
    >
      <Box sx={{ p: 2, display: "flex", alignItems: "center", gap: 1 }}>
        <img
          src="/logo.png"
          alt="Logo"
          style={{ width: "40px", height: "40px" }}
        />
        <Typography variant="h6" noWrap component="div">
          Admin Panel
        </Typography>
      </Box>
      <Divider sx={{ backgroundColor: "rgba(255,255,255,0.12)" }} />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={selected === item.path}
              onClick={() => handleNavigation(item.path)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "rgba(255,255,255,0.08)",
                },
                "&:hover": {
                  backgroundColor: "rgba(255,255,255,0.04)",
                },
              }}
            >
              <ListItemIcon sx={{ color: "white" }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default AdminSidebar; 