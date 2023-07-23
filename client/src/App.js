import React, { useState, useEffect } from 'react';
import { useMutation, useQuery, gql } from '@apollo/client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import CardForm from './components/CardComponent';
import MyCard from './pages/MyCard';

import { QUERY_CARD } from './utils/queries';


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
  const { error, data } = useQuery(QUERY_CARD);
  const [createCard] = useMutation(CREATE_CARD);

  useEffect(() => {
    if (data) {
      setCards(data.cards);
    }
  }, [data]);

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

  const handleLogout = () => {
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
            element={<Home cards={cards} />}
          />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route
            exact
            path="/my-cards"
            element={<MyCard cards={cards} setCards={setCards} />}
          />
          <Route exact path="/card-create" element={<CardForm handleCardSubmit={handleCardSubmit} />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
