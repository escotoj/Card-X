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
  Link,
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
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {/* Add an avatar icon here */}
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {data ? (
            <Typography component="p" variant="body1">
              Success! You may now head{' '}
              <Link href="/login" variant="body1">
                back to the Login page.
              </Link>
            </Typography>
          ) : (
            <Box
              component="form"
              onSubmit={handleFormSubmit}
              noValidate
              sx={{ mt: 3 }}
            >
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
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Submit
              </Button>
            </Box>
          )}

          {error && (
            <Typography component="div" sx={{ mt: 3, p: 2, bgcolor: 'error.main', color: 'error.contrastText' }}>
              {error.message}
            </Typography>
          )}
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default Signup;
  //   <main className="flex-row justify-center mb-4">
  //     <div className="col-12 col-lg-10">
  //       <div className="card">
  //         <h4 className="card-header bg-dark text-light p-2">Sign Up</h4>
  //         <div className="card-body">
  //           {data ? (
  //             <p>
  //               Success! You may now head{' '}
  //               <Link to="/login">back to the Login page.</Link>
  //             </p>
  //           ) : (
  //             <form onSubmit={handleFormSubmit}>
  //               <input
  //                 className="form-input"
  //                 placeholder="Your username"
  //                 name="username"
  //                 type="text"
  //                 value={formState.name}
  //                 onChange={handleChange}
  //               />
  //               <input
  //                 className="form-input"
  //                 placeholder="Your email"
  //                 name="email"
  //                 type="email"
  //                 value={formState.email}
  //                 onChange={handleChange}
  //               />
  //               <input
  //                 className="form-input"
  //                 placeholder="******"
  //                 name="password"
  //                 type="password"
  //                 value={formState.password}
  //                 onChange={handleChange}
  //               />
  //               <button
  //                 className="btn btn-block btn-primary"
  //                 style={{ cursor: 'pointer' }}
  //                 type="submit"
  //               >
  //                 Submit
  //               </button>
  //             </form>
  //           )}

  //           {error && (
  //             <div className="my-3 p-3 bg-danger text-white">
  //               {error.message}
  //             </div>
  //           )}
  //         </div>
  //       </div>
  //     </div>
  //   </main>

  // );
//};
  //export default 

