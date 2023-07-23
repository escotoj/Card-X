import React, { useState } from 'react';
import { useQuery, useMutation } from '@apollo/client';
import { GET_ME } from '../utils/queries';
import { UPDATE_USER } from '../utils/mutations';
import { Typography, Paper, Box, TextField, Button } from "@mui/material";


const Profile = () => {
  const { loading, data, error } = useQuery(GET_ME);
 console.log(data);
  const user = data?.me || {};
  console.log(user);
  const [updateUserMutation] = useMutation(UPDATE_USER);

  const [formData, setFormData] = useState({
    username: '',
    email: '',
  });

  const [showUpdateForms, setShowUpdateForms] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }


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
        // userId: user._id,
        email: formData.email,
        username: formData.username,
      },
    })
      .then((result) => {
        console.log('Update successful :)', result);
        setShowUpdateForms(false);
        setUpdateSuccess(true);
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
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Typography variant="body1">You are not logged in.</Typography>
          <Typography variant="body1">Please login to view your profile.</Typography>
        </Paper>
      )}
    {updateSuccess && (
        <Paper elevation={3} sx={{ p: 2, mt: 2, backgroundColor: "green", color: "white" }}>
          Update successful!
        </Paper>
      )}

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
      {!showUpdateForms && (
        <Button variant="contained" color="success" onClick={handleUpdate} sx={{ mt: 2 }}>
          Update
        </Button>
      )}
    </Box>
  );
};

export default Profile;
