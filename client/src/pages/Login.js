import React from "react";
import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Container from "@mui/material/Container"; // Use Container from MUI
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../utils/mutations";
import auth from "../utils/auth";

export default function SignInSide() {
  const [loginUser, { error }] = useMutation(LOGIN_USER);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formDataVariables = {
      email: formData.get("email"),
      password: formData.get("password")
    }
    console.log(formDataVariables);
    try {
      const { data } = await loginUser({
        variables: {
          ...formDataVariables
        }
      })
      console.log(data);
      auth.login(data.login.token);
    } catch (e) {
      console.error(e)
    }
  };
  return (
    <Container component="main" maxWidth="lg" sx={{ position: "relative" }}>
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: "url(https://picsum.photos/1900/1400)",
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: -1, // Ensure the background is behind the content
        }}
      />
      {/* Main Content */}
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
        <Paper
          sx={{
            backgroundColor: (t) =>
              t.palette.mode === "light" ? "rgba(255, 255, 255, 0.85)" : "rgba(0, 0, 0, 0.85)",  // Set opacity here
            borderRadius: 1,
            boxShadow: 3,
            padding: 2,
            opacity: 0.85,
          }}
        >
          <Box
            sx={{
              my: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Avatar */}
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <img
                src="https://picsum.photos/200/300"
                alt="avatar"
                style={{ width: 50, height: 50 }}
              />
            </Avatar>
            {/* Login Form */}
            <Typography component="h1" variant="h5">
              Log in
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link component={RouterLink} to="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}