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
// import App from '../App';



export default function Home() {
  const { userLoading, userError, userData } = useQuery(GET_ME);
  // const [user, setUser] = useState({});
  const [userCards, setUserCards] = useState([]);
  // const [singleCard, setSingleCard] = useState(null);
  const { cardLoading, cardError, cardData } = useQuery(QUERY_CARD)

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    });

  };
  // Function to handle logout should go here

  // const fetchSingleCard = async (cardId) => {
  //   try {
  //     // Replace this with  actual API endpoint for QUERY_SINGLE_CARD
  //     const response = await fetch(`https://api.example.com/cards/${cardId}`);
  //     if (!response.ok) {
  //       throw new Error('Network response was not ok');
  //     }
  //     const data = await response.json();
  //     setSingleCard(data);
  //   } catch (error) {
  //     console.error('Error fetching single card:', error);
  //   }
  // };

  if (Auth.loggedIn()) {

    <Typography variant="h3">Welcome to Card-X!</Typography>


    if (userLoading) return <p>Loading...</p>;
    if (userError) return <p>Error fetching user data!</p>;

    if (cardLoading) return <p>Loading...</p>;
    if (cardError) return <p>Error fetching card data!</p>;

    const { me } = userData;
    const { username } = me;

    const { cards } = cardData;

<div className='welcomeMessage'>
      <Typography variant="h4">Welcome {username}!</Typography>
    </div>


    if (!userCards.length) {
      return <p className="empty-message">You have no cards yet.</p>;
    } else return (
  <div clasName="cardListStyling">
      {/* Display all cards */}
      {cards.map((card) => (
        <Card key={card._id}>
          <CardContent>
            <Typography variant="h5">{card.title}</Typography>
            <Typography variant="body1">{card.details}</Typography>
            {/* Add more card content as needed */}
          </CardContent>
        </Card>
      ))}
    </div>
          // <ul className="card-list">
      //   {userCards.map((card) => (
      //     <li key={card.id} className="card-item">
      //       <span>{card.title}</span>
      //       {/* Get individual card details */}
      //       <button className="view-details-btn" onClick={() => fetchSingleCard(card.id)}>
      //         View Details
      //       </button>
      //     </li>
      //   ))}
      // </ul>
    );
  } else {

    // default landing page with login container
    
    return (
      <Container component="main" maxWidth="lg"
        minheight="60vh"
      >
        <Box
          sx={{
            marginTop: "18vh",
          }}
        >
          <Typography variant="h3">Welcome to Card-X!</Typography>
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
    );
  };

};
