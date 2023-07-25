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
import { Container } from "@mui/material";
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
    <Container component="main" maxWidth="lg"
    minheight="60vh">
      <Box
        sx={{
          marginTop: "16vh",
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              borderRadius: "1rem 0 0 1rem",
              backgroundImage: "url(https://picsum.photos/800/1200)", // Replace with your background image URL
              backgroundRepeat: "no-repeat",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
              backgroundSize: "cover",
              backgroundPosition: "center",
              minWidth: "25vh",
              boxShadow: " 3px 3px 3px #7b8782",
            }}
          />
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
            sx={{
              borderRadius: "0 1rem 1rem 0",
              opacity: 0.86,
              background: "linear-gradient(0.625turn, rgba(203, 211, 255, 0.75), rgba(195, 214, 247, 0.75))",
              boxShadow: " 3px 3px 3px #7b8782"
            }}
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5"
                sx={{
                  fontWeight: "400",
                  fontSize: "2.5rem",
                  fontFamily: "Calibri, Roboto, Helvetica, Arial, sans-serif",
                  marginTop: "-4vh",
                  marginBottom: "1vh",
                }}
              >
                Log in
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{
                  mt: 1,
                }}
              >
                <TextField
                  margin="normal"
                  required
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
                          variant="contained"
                          sx={{ mt: 3, mb: 2,
                            alignSelf: "center",
                            width: "24vh",
                            background: "linear-gradient(0.305turn, #535d9a, #9fb4d7)",
                            '&:hover': {
                              background: "linear-gradient(0.3turn, #6a77bf, #bacff2)",
                            }
                            }}
                >
                  Log in
                </Button>
                <Grid container>
                  <Grid item>
                    <Link component={RouterLink} to="/signup" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
