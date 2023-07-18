import React, { useState } from 'react';
import { useMutation, gql } from '@apollo/client'; // Import useMutation and gql from Apollo Client
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Navbar from './components/Navbarr';

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
  const [createCard] = useMutation(CREATE_CARD); // Use the createCard mutation

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

  // flag
  const handleCardDelete = (cardId) => {
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));
  };

  console.log('Cards:', cards);

  return (
    <Router>
      <div>
        {/* Navbar */}
        <Navbar />

        {/* Routes */}
        <Routes>
          {/* Home Page */}
          <Route
            exact
            path="/"
            element={<Home cards={cards} handleCardDelete={handleCardDelete} />}
          />

          {/* Login Page */}
          <Route exact path="/login" element={<Login />} />

          {/* Signup Page */}
          <Route exact path="/signup" element={<Signup />} />

          {/* Profile Page */}
          <Route exact path="/profile" element={<Profile />} />
        </Routes>

   {/* Card Submission Form */}
        {/* <div>
          <h1>Personalized Card Messaging App</h1> */}
          {/* Form for creating a card */}
          {/* <form onSubmit={handleCardSubmit}>
            <input type="text" name="title" placeholder="Title" required />
            <input type="text" name="message" placeholder="Message" required />
            <input type="text" name="image" placeholder="Image URL" required />
            <button type="submit">Create Card</button>
          </form> */}
          {/* Conditional rendering based on the number of cards */}
          {/* {cards.length === 0 ? (
            <p>No cards yet. Create one!</p>
          ) : ( */}
            <div className="card-list">
              {/* Render individual cards */}
              {cards.map((card) => (
                <div key={card.id} className="card">
                  <img src={card.image} alt={card.title} />
                  <h2>{card.title}</h2>
                  <p>{card.message}</p>
                  <button onClick={() => handleCardDelete(card.id)}>Delete</button>
                </div>
              ))}
            </div>
          {/* )} */}
        {/* </div> */}
      </div>
    </Router>
  );
}

export default App;
