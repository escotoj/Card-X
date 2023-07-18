import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  const [cards, setCards] = useState([]);

  const handleCardSubmit = (event) => {
    // ...your existing code for handling card submission
  };

  const handleCardDelete = (cardId) => {
    // ...your existing code for handling card deletion
  };

  console.log('Cards:', cards);

  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar />

        {/* Navigation */}
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signup">Signup</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          </ul>
        </nav>

        {/* Routes */}
        <Routes>
          {/* Home Page */}
          <Route exact path="/" render={() => (
            <Home cards={cards} handleCardDelete={handleCardDelete} />
          )} />

          {/* Login Page */}
          <Route exact path="/login" component={Login} />

          {/* Signup Page */}
          <Route exact path="/signup" component={Signup} />

          {/* Profile Page */}
          <Route exact path="/profile" component={Profile} />

          {/* Card Submission Form */}
          <Route exact path="/" render={() => (
            <div>
              {/* <h1>Personalized Card Messaging App</h1> */}
              {/* Replace or remove the duplicate heading above */}
              {/* ...rest of the code */}
            </div>
          )} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
