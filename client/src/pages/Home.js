import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { QUERY_CARD } from '../utils/queries'
import { GET_ME } from '../utils/queries'
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import '../css/style.css';
// import App from '../App';



export default function Home() {
  const { userData } = useQuery(GET_ME);
  console.log(userData);
  const user = userData?.me || {};
  console.log(user);

  // const [user, setUser] = useState({});
  const [userCards, setUserCards] = useState([]);
  // const [singleCard, setSingleCard] = useState(null);
  const { cardData } = useQuery(QUERY_CARD);
  const { cards } = cardData?.me || {};
  console.log(cards);




  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

  };
  // Function to handle logout should go here

  return (

    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: "12vh",
        }}
      >
                    <Typography variant="h3"
                    sx={{
                      fontSize:"4rem",
                      textAlign: "center",
                      fontFamily: "Lucida Handwriting, Roboto, Helvetica, Arial, sans-serif",
                    }}
                    
                    >Welcome to Card-X
                    </Typography>
        {Auth.loggedIn() ? (
          <div>



            < div className='welcomeMessage' >
              <Typography variant="h4"
              sx={{
                fontFamily: "Lucida Handwriting, Roboto, Helvetica, Arial, sans-serif",
                marginTop: "4vh",
                textAlign: "center",
            }}
              >Welcome {user.username}!</Typography>
            </div >
            <div className="cardListStyling">
              {/* Display all cards if 'cards' is defined and is an array */}
              {Array.isArray(cards) && cards.length > 0 ? (
                cards.map((card) => (
                  <Card key={card._id}>
                    <CardContent>
                      <Typography variant="h5">{card.title}</Typography>
                      <Typography variant="body1">{card.details}</Typography>
                      {/* Add more card content as needed */}
                    </CardContent>
                  </Card>
                ))
              ) : (
                <p className="empty-message">You have no cards yet.</p>
              )}
            </div>

          </div>
        ) : (
          <div>

            <Container component="main" maxWidth="lg"
              minheight="60vh"
            >
              <Box
                sx={{
                  marginTop: "4vh",
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
                      backgroundImage: "url(https://source.unsplash.com/random)",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: (t) =>
                        t.palette.mode === "light"
                          ? t.palette.grey[50]
                          : t.palette.grey[900],
                      backgroundSize: "cover",
                      backgroundPosition: "center",
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
                      <Typography component="h1" variant="h5">
                        Sign in
                      </Typography>
                      <Box
                        component="form"
                        noValidate
                        onSubmit={handleSubmit}
                        sx={{ mt: 1 }}
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
                          fullWidth
                          variant="contained"
                          sx={{ mt: 3, mb: 2 }}
                        >
                          Sign In
                        </Button>
                        <Grid container>
                          <Grid item>
                            <Link href="/signup" variant="body2">
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
          </div>
        )}
      </Box>
    </Container>
  );
}