import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CardForm from './components/CardComponent';


const CREATE_CARD = gql`
  mutation createCard($title: String!, $message: String!, $image: String!) {
    createCard(title: $title, message: $message, image: $image) {
      id
      title
      message
      image
    }
  }
`;

function App() {
  const [cards, setCards] = useState([]);
  const [createCard] = useMutation(CREATE_CARD);
 // eslint-disable-next-line
  const handleCardSubmit = async (event) => {
    event.preventDefault();
    const { title, message, image } = event.target.elements;

    try {
      const { data } = await createCard({
        variables: { title: title.value, message: message.value, image: image.value },
      });

      setCards((prevCards) => [...prevCards, data.createCard]);
      event.target.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCardDelete = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  const handleLogout = () => {
    // Perform any additional logout-related tasks here, if necessary
    // For example, you might want to clear local storage, reset state, etc.

    // After performing necessary cleanup, redirect the user to the login page
    // Replace '/login' with the URL of your login page
    window.location.href = '/login';
  };

  console.log('Cards:', cards);

  return (
    <Router>
      <div style={{ paddingBottom: '60px' }}>
        <Navbar handleLogout={handleLogout} />

        <Routes>
          <Route
            exact
            path="/"
            element={<Home cards={cards} handleCardDelete={handleCardDelete} />}
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/card-create" element={<CardForm />} />
        </Routes>

        <div className="card-list">
          {cards.map((card) => (
            <div key={card.id} className="card">
              <img src={card.image} alt={card.title} />
              <h2>{card.title}</h2>
              <p>{card.message}</p>
              <button onClick={() => handleCardDelete(card.id)}>Delete</button>
            </div>
          ))}
        </div>

        <Footer />
      </div>
    </Router>
  );
}

export default App;