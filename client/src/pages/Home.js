import React from 'react';
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

const Home = () => {
  // Function to handle logout
  const handleLogout = () => {
    Auth.logout();
  };

  return ( 
    <main className='homepageMain'>
      <h1>Welcome to Card-X</h1>

      {Auth.loggedIn() ? (
        <>
          <p>You are logged in.</p>
          <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          <p>You are not currently logged in.</p>
          <p>
            Please <Link to="/login">login</Link> or <Link to="/signup">sign up</Link> to access the site.
          </p>
        </>
      )}
    </main>
  );
};

export default Home;
