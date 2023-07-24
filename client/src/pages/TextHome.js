export default function Home() {
    // const { userData } = useQuery(GET_ME);
    // console.log(userData);
    // const user = userData?.me || {};
    // console.log(user);
  
  
  
  

    // Function to handle logout should go here
  
  
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
                      fontSize: "3rem",
                      fontFamily: "Lucida Handwriting, Roboto, Helvetica, Arial, sans-serif",
                      marginTop: "6vh",
                      textAlign: "center",
                      marginBottom: "3vh",
                      textShadow: " 2px 2px 2px #A7A59E",
                    }}
                  >Welcome {user.username}! <Link to="/card-create" variant="body2"
                    sx={{
                      textDecoration: "none",
                      marginBottom: "4vh",
                      '&:active': {
                        color: "inherit",
                      }
                    }}
                  >Let's make a card!</Link></Typography>
                </div >
  
                <Typography variant="h4"
                  sx={{
                    fontSize: "2.6rem",
                    textAlign: "center",
                    fontFamily: "Lucida Handwriting, Roboto, Helvetica, Arial, sans-serif",
                    textShadow: " 2px 2px 2px #A7A59E",
                    marginBottom: "2vh",
                  }}
  
                >~Your Cards~</Typography>
                <div className="cardListStyling"
                  sx={{
                    marginTop: "10px",
                  }}
                >
                  {/* Display all cards if 'cards' is defined and is an array */}
                  {reversedCards.length > 0 ? (
                    console.log(reversedCards),
                    userCardList.map((card) => (
                      console.log("card rendering"),
                      <Card

                        key={card._id}>
                        <CardContent>
                          <Typography variant="h4"
  
                            textAlign="center"

                          >{card.title}</Typography>
                          <Typography
                            fontStyle="italic"

                          >{card.details}</Typography>
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
  
              <Container component="main" maxWidth="lg">
                        <Typography variant="h3">Welcome to Card-X
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

                    />
                    <Grid
                        item
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
                        }}>
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
                            Sign In
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