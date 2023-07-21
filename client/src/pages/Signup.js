//import * as React from "react";
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
  Container,
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
    <main className="flex-row justify-center mb-4">
      <div className="col-12 col-lg-10">
        <div className="card">
          <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
          <div className="card-body">
            {data ? (
              <p>
                Success! You may now head{' '}
                <Link to="/login">back to the Login page.</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>
                <input
                  className="form-input"
                  placeholder="Your username"
                  name="username"
                  type="text"
                  value={formState.name}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="Your email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                />
                <input
                  className="form-input"
                  placeholder="******"
                  name="password"
                  type="password"
                  value={formState.password}
                  onChange={handleChange}
                />
                <button
                  className="btn btn-block btn-primary"
                  style={{ cursor: 'pointer' }}
                  type="submit"
                >
                  Submit
                </button>
              </form>
            )}

            {error && (
              <div className="my-3 p-3 bg-danger text-white">
                {error.message}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
  export default Signup;
    // <ThemeProvider theme={theme}>
    //   <Grid container component="main" sx={{ height: "75vh" }}>
    //     <CssBaseline />
    //     <Grid
    //       item
    //       xs={false}
    //       sm={4}
    //       md={7}
    //       sx={{
    //         backgroundImage:
    //           "url(https://source.unsplash.com/random)",
    //         backgroundRepeat: "no-repeat",
    //         backgroundColor: (t) =>
    //           t.palette.mode === "light"
    //             ? t.palette.grey[50]
    //             : t.palette.grey[900],
    //         backgroundSize: "cover",
    //         backgroundPosition: "center",
    //       }}
    //     />
    //     <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
    //       <Box
    //         sx={{
    //           my: 8,
    //           mx: 4,
    //           display: "flex",
    //           flexDirection: "column",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
    //           <LockOutlinedIcon />
    //         </Avatar>
    //         <Typography component="h1" variant="h5">
    //           Sign up
    //         </Typography>
    //         <Box
    //           component="form"
    //           noValidate
    //           onSubmit={handleSubmit}
    //           sx={{ mt: 3 }}
    //         >
    //           <Grid container spacing={2}>
    //             <Grid item xs={12} sm={6}>
    //               <TextField
    //                 autoComplete="given-name"
    //                 name="firstName"
    //                 required
    //                 fullWidth
    //                 id="firstName"
    //                 label="First Name"
    //                 autoFocus
    //               />
    //             </Grid>
    //             <Grid item xs={12} sm={6}>
    //               <TextField
    //                 required
    //                 fullWidth
    //                 id="lastName"
    //                 label="Last Name"
    //                 name="lastName"
    //                 autoComplete="family-name"
    //               />
    //             </Grid>
    //             <Grid item xs={12}>
    //               <TextField
    //                 required
    //                 fullWidth
    //                 id="email"
    //                 label="Email Address"
    //                 name="email"
    //                 autoComplete="email"
    //               />
    //             </Grid>
    //             <Grid item xs={12}>
    //               <TextField
    //                 required
    //                 fullWidth
    //                 name="password"
    //                 label="Password"
    //                 type="password"
    //                 id="password"
    //                 autoComplete="new-password"
    //               />
    //             </Grid>
    //             <Grid item xs={12}>
    //               <FormControlLabel
    //                 control={
    //                   <Checkbox value="allowExtraEmails" color="primary" />
    //                 }
    //                 label="I want to receive inspiration, marketing promotions and updates via email."
    //               />
    //             </Grid>
    //           </Grid>
    //           <Button
    //             type="submit"
    //             fullWidth
    //             variant="contained"
    //             sx={{ mt: 3, mb: 2 }}
    //           >
    //             Sign Up
    //           </Button>
    //           <Grid container justifyContent="flex-end">
    //             <Grid item>
    //               <Link href="#" variant="body2">
    //                 Already have an account? Sign in
    //               </Link>
    //             </Grid>
    //           </Grid>
    //         </Box>
    //       </Box>
    //     </Grid>
    //   </Grid>
    // </ThemeProvider>
  //);
