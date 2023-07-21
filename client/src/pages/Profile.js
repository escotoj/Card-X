import React from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../utils/queries'
import { Typography, Paper, Box } from "@mui/material";


const Profile = () => {


  // route set up for when user is logged in
  const { loading, error, data } = useQuery(GET_ME);

  if (loading) {
    return <p>Loading...</p>;
  }
  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const user = data.me;


  // hardcode for texting
  // const user = {
  //   username: "JohnDoe",
  //   email: "johndoe@example.com",
  //   password: "xxxxxxxx",
  // };



return (
  <Box sx={{ textAlign: "center", mt: 4 }}>
    <Typography variant="h4" gutterBottom>
      Profile
    </Typography>

    {user ? (
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="body1">Username: {user.username}!</Typography>
        <Typography variant="body1">Email: {user.email}</Typography>
        <Typography variant="body1">Password: {user.password}</Typography>
      </Paper>
    ) : (
      <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
        <Typography variant="body1">You are not logged in.</Typography>
        <Typography variant="body1">Please login to view your profile.</Typography>
      </Paper>
    )}
  </Box>
);
};

export default Profile;


