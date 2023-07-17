import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Home = () => {
  // Function to handle logout
  const handleLogout = () => {
    Auth.logout();
  };

  return (
    <main>
      <h1>Welcome to the Home Page</h1>

      {Auth.loggedIn() ? (
        <>
          <p>You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>You are not logged in.</p>
          <p>
            Please <Link to="/login">login</Link> to access the dashboard.
          </p>
        </>
      )}
    </main>
  );
};

export default Home;
