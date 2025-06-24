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
    Toolbar,
} from "@mui/material";
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    Work as WorkIcon,
    Business as BusinessIcon,
} from "@mui/icons-material";

const drawerWidth = 240;

const menuItems = [
    { text: "Overview", icon: <DashboardIcon />, path: "/admin/dashboard" },
    { text: "Users", icon: <PeopleIcon />, path: "/admin/users" },
    { text: "Jobs", icon: <WorkIcon />, path: "/admin/jobs" },
    { text: "Application Activities", icon: <BusinessIcon />, path: "/admin/applications" },
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
                width: 240,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: 240,
                    boxSizing: "border-box",
                    backgroundColor: "primary.dark",
                    color: "common.white",
                    border: "none",
                },
            }}
        >
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
                            <ListItemIcon sx={{ color: "inherit" }}>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
};

export default AdminSidebar;
