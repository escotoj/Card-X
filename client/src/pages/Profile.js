import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { UPDATE_USER } from "../utils/mutations";
import { Typography, Paper, Box, TextField, Button } from "@mui/material";

const Profile = () => {
  const { loading, data, error } = useQuery(GET_ME);
  console.log(data);
  const user = data?.me || {};
  console.log(user);
  const [updateUserMutation] = useMutation(UPDATE_USER);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
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
        console.log("Update successful :)", result);
        setShowUpdateForms(false);
        setUpdateSuccess(true);
      })
      .catch((error) => {
        console.error("Update failed :(", error);
      });
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 10,
        textAlign: "center"
      }}
    >
      <Typography variant="h4" gutterBottom>
        Profile
      </Typography>

      {user ? (
        <Paper elevation={3} sx={{ p: 5, mt: 2, width: '35%' }}>
          <Typography variant="h6">Account Details</Typography>
          <Paper elevation={3} sx={{ p: 1, mt: 1 }}>
          <Typography variant="body1" sx={{ mt: 1 }}>
            Username
          </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
            {user.username}
          </Typography>
          </Paper>
          <Paper elevation={3} sx={{ p: 1, mt: 1 }}>
          <Typography variant="body1" sx={{ mt: 1 }}>
          Email
          </Typography>
          <Typography variant="body1" fontWeight="bold" sx={{ mt: 2 }}>
            {user.email}
          </Typography>
          </Paper>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ p: 2, mt: 2 }}>
          <Typography variant="body1">You are not logged in.</Typography>
          <Typography variant="body1">
            Please login to view your profile.
          </Typography>
        </Paper>
      )}

      {user && (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          ></Box>
        </>
      )}

      {updateSuccess && (
        <Paper
          elevation={3}
          sx={{ p: 2, mt: 2, backgroundColor: "green", color: "white", maxWidth: "300px" }}
        >
          Update successful!
        </Paper>
      )}

      {showUpdateForms && (
      
        <Paper elevation={3} sx={{ p: 2, mt: 2, maxWidth: "300px" }}>
          <Typography />
          Update Profile <Typography />
          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
                  <TextField
                    name="username"
                    label="New Username"
                    value={formData.username}
                    onChange={handleChange}
                    sx={{ borderRadius: 8, marginRight: 2 }}
                  />
                  <TextField
                    name="email"
                    label="New Email"
                    value={formData.email}
                    onChange={handleChange}
                    sx={{ borderRadius: 8, marginRight: 2 }}
                  />
                </Box>

          <Button
            variant="contained"
            color="success"
            onClick={handleSaveUpdate}
            sx={{ mt: 2 }}
          >
            Save Update
          </Button>

        </Paper>
      )}
      {!showUpdateForms && (
        <Button
          variant="contained"
          color="success"
          onClick={handleUpdate}
          sx={{ mt: 2 }}
        >
          Update
        </Button>
      )}
    </Box>
  );
};

export default Profile;

