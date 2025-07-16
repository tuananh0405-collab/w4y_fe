import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Container, TextField, Button, Typography, Paper, Alert, Stack, InputAdornment, Avatar } from "@mui/material";
import { bgImage, emailIcon, keyPasswordIcon } from "../assets";

import { useAdminSignInMutation } from "../redux/api/authApiSlice";
import { setCredentials } from "../redux/features/authSlice";

const AdminAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [adminSignIn] = useAdminSignInMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await adminSignIn({ email, password }).unwrap();
      if (res?.user?.accountType !== "Admin") {
        throw new Error("You do not have admin permissions.");
      }
      dispatch(setCredentials(res.user));
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err?.data?.message || err?.message || "Failed to login");
    }
  };

  return (
    <Box
      sx={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="xs">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 2,
            bgcolor: "rgba(255,255,255,0.9)",
          }}
        >
          <Typography variant="h5" component="h1" gutterBottom color="primary">
            Admin Login
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            sx={{ width: "100%", mt: 1 }}
          >
            <Stack spacing={2}>
              <TextField
                label="Email Address"
                type="email"
                required
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                autoFocus
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar src={emailIcon} sx={{ width: 24, height: 24 }} />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                label="Password"
                type="password"
                required
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Avatar
                        src={keyPasswordIcon}
                        sx={{ width: 24, height: 24 }}
                      />
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
              >
                Sign In
              </Button>
            </Stack>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default AdminAuth;
