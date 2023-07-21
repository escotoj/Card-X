import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';
import { Typography, Paper, Box, TextField, Button } from "@mui/material";


const Profile = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [updateUserMutation] = useMutation(UPDATE_USER);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const [showUpdateForms, setShowUpdateForms] = useState(false);

  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  // const user = data.me;


  const user = {
    username: "JohnDoe",
    email: "johndoe@example.com",
    password: "xxxxxxxx",
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleUpdate = () => {
    setShowUpdateForms(true);
  };

  const handleSaveUpdate = () => {
    updateUserMutation({
      variables: {
        userId: user._id,
        email: formData.email,
        username: formData.username,
      },
    })
      .then((result) => {
        console.log('Update successful :)', result);
        setShowUpdateForms(false);
      })
      .catch((error) => {
        console.error('Update failed :(', error);
      });
  };

  return (
    <Box sx={{ textAlign: 'center', mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      {user ? (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Typography variant="body1">Username: {user.username}</Typography>
          <Typography variant="body1">Email: {user.email}</Typography>
          {/* You should not display the user's password in the UI for security reasons */}
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Typography variant="body1">You are not logged in.</Typography>
          <Typography variant="body1">Please login to view your profile.</Typography>
        </Paper>
      )}

      {/* Render the update forms when showUpdateForms is true */}
      {showUpdateForms && (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <TextField
            name="username"
            label="New Username"
            value={formData.username}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <TextField
            name="email"
            label="New Email"
            value={formData.email}
            onChange={handleChange}
            sx={{ mt: 2 }}
          />
          <Button variant="contained" color="success" onClick={handleSaveUpdate} sx={{ mt: 2 }}>
            Save Update
          </Button>
        </Paper>
      )}

      {/* Render the "Update" button when showUpdateForms is false */}
      {!showUpdateForms && (
        <Button variant="contained" color="success" onClick={handleUpdate} sx={{ mt: 2 }}>
          Update
        </Button>
      )}
    </Box>
  );
};

export default Profile;




//for auth
  // if (loading) {
  //   return <p>Loading...</p>;
  // }

  // if (error) {
  //   return <p>Error: {error.message}</p>;
  // }

  // const user = data.me;

  // hardcode for texting
  // const user = {
  //   username: "JohnDoe",
  //   email: "johndoe@example.com",
  //   password: "xxxxxxxx",
  // };