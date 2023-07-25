import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Box from "@mui/material/Box";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Tooltip from '@mui/material/Tooltip';
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import { GET_ME, QUERY_CARD } from '../utils/queries'
import auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { LOGIN_USER } from "../utils/mutations";
import '../css/style.css';
// import App from '../App';



export default function Home() {

  var { data } = useQuery(GET_ME);
  console.log(data);
  const user = data?.me || {};
  console.log(user);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });




  var { loading, error, data } = useQuery(QUERY_CARD);
  const [selectedCardId, setSelectedCardId] = useState(null);


  useEffect(() => {

    console.log(data)
    console.log(error)
    console.log(loading)
    tempcards = data?.cards || []
    reversedCards = tempcards.slice().reverse();
  }, [loading, data, error])

  let tempcards = data?.cards || []
  let reversedCards = tempcards.slice().reverse();


  console.log(reversedCards);
  console.log(" is reversedCards");

  // thing below is probably not needed
  const handleCardClick = (card) => {
    console.log('Click Encountered', card);
    setSelectedCardId(card._id);
  };


  const userCardList = user.cards;
  console.log(userCardList);
  console.log("is userCardList");




  const [loginUser, { err }] = useMutation(LOGIN_USER);
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


  if (loading) return <p className="error-break">Loading...</p>;
  if (error) return <p className="error-break">QUERY_CARD: {error.message}</p>;


  return (

    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: "12vh",
        }}
      >
        {auth.loggedIn() ? (
          <div>
            < div className='welcomeMessage' >
              <Typography variant="h4"
                sx={{
                  color: "#2E2D2C",
                  fontSize: "2.8rem",
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  marginTop: "6vh",
                  textAlign: "center",
                  marginBottom: "3vh",
                  textShadow: " 2px 2px 2px #A7A59E",
                }}
              >Welcome {user.username}! <Tooltip title="Click to Create a Card!">
                
                <Link to="/card-create" variant="body2"
              style={{textDecoration: "none", 
              color: "#353433",
              marginLeft: "0.25rem",
              // border: "1px solid #a6a69e77",
              // background: "linear-gradient(0.492turn, #9fd5fc88 30%, #d5e9ff88 90%)",
              // boxShadow: "3px 3px 3px #b6b6abaa",
              borderRadius: "0.5rem",
              padding: "0 0.25rem",
            }}
              >Let's make a card!</Link>
              </Tooltip>
              </Typography>
            </div >

            <Typography variant="h4"
              sx={{
                color: "#2E2D2C",
                fontSize: "2.5rem",
                textAlign: "center",
                fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                textShadow: " 2px 2px 2px #838889",
                marginBottom: "2vh",
              }}

            >~Example Cards~</Typography>
            <div className="cardListStyling"
  sx={{
    display: "flex",
    marginTop: "2.5vh",
    flexWrap: "wrap",
    flexDirection: "row",
    alignSelf: "center",
    width: "50vh",
    marginLeft: "2rem",
    marginRight: "2rem",
    justifyContent: "center",
  }}
>
  {/* Display all cards if 'cards' is defined and is an array */}
  {reversedCards.length > 0 ? (
    <Grid
      container
      spacing={2}
      alignItems="center"
      justifyContent="center"
      sx={{
        marginRight: "1vh",
        marginLeft: "1vh",
      }}
    >
      {reversedCards.slice(0, 6).map((card) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={card._id}
        >
          <Card
            className="cardX"
            sx={{
              width: "100%",
              margin: "2vh",
              marginBottom: "2vh",
              boxShadow: "3px 3px 3px #89867C",
              borderRadius: "0.5rem",
              opacity: 0.95,
              background: "linear-gradient(0.475turn, rgba(218, 227, 254, 0.8), rgba(244, 245, 249, 0.8))",
              minHeight: "28vh",
            }}
          >
            <CardContent>
              <Typography
                variant="h4"
                textAlign="center"
                sx={{
                  fontSize: "2.5rem",
                  color: "#2F2F2E",
                  fontFamily: "Roboto, Helvetica, Arial, sans-serif",
                  marginBottom: "1vh",
                  marginTop: "0.25rem",
                  textShadow: "1px 1px 1px #838889",
                }}
              >
                {card.title}
              </Typography>
              <Typography
                fontStyle="italic"
                variant="body1"
                textAlign="center"
                sx={{
                  marginTop: "10vh",
                }}
              >
                {card.details}
              </Typography>
              {/* Add more card content as needed */}
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
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
              <Typography variant="h3"
                sx={{
                  fontSize: "5rem",
                  textAlign: "center",
                  fontFamily: "Lucida Handwriting, Roboto, Helvetica, Arial, sans-serif",
                  textShadow: " 3px 3px 3px #a7a59e",
                }}

              >Card-X
              </Typography>
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
                      borderRadius: "1rem 0 0 1rem",
                      backgroundImage: "url(https://source.unsplash.com/random)",
                      backgroundRepeat: "no-repeat",
                      backgroundColor: (t) =>
                        t.palette.mode === "light"
                          ? t.palette.grey[50]
                          : t.palette.grey[900],
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      minWidth: "25vh",
                      boxShadow: " 3px 3px 3px #7b8782"
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
                        }}>
                        Log in
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
                          variant="contained"
                          sx={{
                            mt: 3, mb: 2,
                            alignSelf: "center",
                            width: "24vh",
                            background: "linear-gradient(0.305turn, #535d9a, #9fb4d7)",
                            '&:hover': {
                              background: "linear-gradient(0.305turn, #6a77bf, #bacff2)",
                            }
                          }}
                        >
                          Log in
                        </Button>
                        <Grid container>
                          <Grid item>
                            <Link to="/signup" variant="body2">
                              {"Don't have an account? Sign Up!"}
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