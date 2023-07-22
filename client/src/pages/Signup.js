import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import {
  Avatar,
  Button,
  TextField,
  CssBaseline,
  FormControlLabel,
  Checkbox,
  Link,
  Grid,
  Box,
  Typography,
  Container as MuiContainer,
} from "@mui/material";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

const Signup = () => {
  const [formState, setFormState] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <MuiContainer
        component="main"
        maxWidth="lg"
        sx={{
          backgroundImage: "url(https://picsum.photos/1900/1400)", // Replace with your background image URL
          backgroundRepeat: "no-repeat",
          backgroundColor: (t) =>
            t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
          backgroundSize: "cover",
          backgroundPosition: "center",
          minHeight: "100vh", // Ensure the container takes the full height of the viewport
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CssBaseline />
        <Box
          sx={{
            width: "100%",
            maxWidth: 400,
            p: 2,
            // background.secondary
            bgcolor: "background.paper",
            borderRadius: 8,
            boxShadow: 1,
            opacity: 0.85,
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            {/* Add your avatar component here */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          {data ? (
            <p>
              Success! You may now head{" "}
              <Link to="/login">back to the Login page.</Link>
            </p>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="username"
                label="Username"
                name="username"
                autoComplete="username"
                autoFocus
                value={formState.username}
                onChange={handleChange}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={formState.email}
                onChange={handleChange}
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
                value={formState.password}
                onChange={handleChange}
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
                Sign Up
              </Button>
              <Grid container>
                <Grid item>
                  <Link href="/login" variant="body2">
                    Already have an account? Log In
                  </Link>
                </Grid>
              </Grid>
            </form>
          )}
          {error && (
            <div className="my-3 p-3 bg-danger text-white">
              {error.message}
            </div>
          )}
        </Box>
      </MuiContainer>
    </ThemeProvider>
  );
};

export default Signup;