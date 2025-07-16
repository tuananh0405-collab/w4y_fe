import { Box, Drawer, List, ListItem, ListItemIcon, ListItemText, ListItemButton, Typography, Divider, Toolbar, Button } from "@mui/material";
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Work as WorkIcon,
  Business as BusinessIcon,
  Logout as LogoutIcon,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/features/authSlice";
import { useSignOutMutation } from "../../redux/api/authApiSlice";

const menuItems = [
  { text: "Overview", icon: <DashboardIcon />, path: "overview" },
  { text: "Users", icon: <PeopleIcon />, path: "users" },
  { text: "Jobs", icon: <WorkIcon />, path: "jobs" },
  { text: "Application Activities", icon: <BusinessIcon />, path: "applications" },
];

const AdminSidebar = ({ selected, setSelected }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [signOut] = useSignOutMutation();

  const handleNavigation = (path) => {
    setSelected(path);
  };

  const handleLogout = async () => {
    try {
      await signOut().unwrap();
      dispatch(logout());
      navigate("/admin/auth");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "primary.dark",
          color: "common.white",
          border: "none",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        },
      }}
    >
      <Box>
        <Toolbar>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Box
              component="img"
              src="/logo.png"
              alt="Logo"
              sx={{
                width: 40,
                height: 40,
                borderRadius: "8px",
                backgroundColor: "white",
                padding: 0.5,
                boxShadow: 2,
              }}
            />
            <Typography variant="h6" noWrap>
              Admin Panel
            </Typography>
          </Box>
        </Toolbar>

        <Divider sx={{ bgcolor: "rgba(255,255,255,0.12)" }} />

        <List>
          {menuItems.map(({ text, icon, path }) => (
            <ListItem key={text} disablePadding>
              <ListItemButton
                selected={selected === path}
                onClick={() => handleNavigation(path)}
                sx={{
                  "&.Mui-selected": {
                    backgroundColor: "rgba(255,255,255,0.12)",
                  },
                  "&:hover": {
                    backgroundColor: "rgba(255,255,255,0.08)",
                  },
                }}
              >
                <ListItemIcon sx={{ color: "inherit" }}>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <Box sx={{ p: 2 }}>
        <Button
          fullWidth
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Drawer>
  );
};

export default AdminSidebar;
