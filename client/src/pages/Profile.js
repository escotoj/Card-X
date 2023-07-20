import React from 'react';
import Auth from '../utils/auth';

const Profile = () => {
  // Function to handle logout
  const handleLogout = () => {
    Auth.logout();
  };

  // Get the logged-in user's information
  const user = Auth.getLoggedInUser();

  return (
    <div>
      <h1>Profile</h1>

      {user ? (
        <>
          <p>Welcome, {user.username}!</p>
          <p>Email: {user.email}</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <p>Please login to view your profile.</p>
        </>
      )}
    </div>
  );
};

export default Profile;