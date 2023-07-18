import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from "../utils/auth";
import Footer from "../components/Footer";

// Styling imports
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";


const theme = createTheme();

export default function Login(props) {
  const [formState, setFormState] = useState({
    email: "",
    password: "",
  });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
    } catch (e) {
      console.error(e);
    }
  };

  // Update state based on form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${
              // ADD IMAGE
              process.env.PUBLIC_URL + ""
            })`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItem: "center",
            }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="5">
                Login
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleFormSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  onChange={handleChange}
                  />
                  <TextField
                    margin="normal"
                    requiredfullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handleChange}
                    />
                    <FormControlLabel
                      control={<Checkbox value="remeber" color="primary" />}
                      label="Remember me"
                    />
                    <Button
                      type="submit"
                      fullWidth 
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                    >
                      Login
                    </Button>
              </Box>
              {/*Error Message for incorrect login/Pop-ip*/}
              {error ? (
                <div className="my-3 p-3 bg-danger text-white">
                  {error.message}
                </div>
              ) :
              null}
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/Signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
              <Footer sx={{ mt: 5}} />
            </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}