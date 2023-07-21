import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { Container } from "@mui/material";

import { CREATE_CARD } from '../../utils/mutations';

import Auth from '../../utils/auth';

import '../../css/CardCreator.css';



const CardForm = ({ cardId }) => {
  const [cardTitle, setCardTitle] = useState('');
  const [cardText, setCardText] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [image, setImage] = useState(null);
  const [fontStyle, setFontStyle] = useState('Arial'); // Default font style is 'Arial'


  const [characterCount, setCharacterCount] = useState(0);

  const [createCard, { error }] = useMutation(CREATE_CARD);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createCard({
        variables: {
          cardId,
          cardTitle,
          cardText,
          expirationDate,
          image,
          fontStyle,
          cardAuthor: Auth.getProfile().data.username,
        },
      });

      setCardTitle('');
      setCardText('');
      setExpirationDate('');
      setImage(null);
      setFontStyle('Arial');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'cardText' && value.length <= 280) {
      setCardText(value);
      setCharacterCount(value.length);
    } else if (name === 'cardTitle') {
      setCardTitle(value);
    } else if (name === 'expirationDate') {
      setExpirationDate(value);
    } else if (name === 'image') {
      //Handle image upload here 
      setImage(event.target.files[0]);
    } else if (name === 'fontStyle') {
      setFontStyle(value);
    }
  };
  
  return (
    <Container component="main" maxWidth="lg">
            <Box
        sx={{
          marginTop: '10rem',
        }}
      >
    <div>
      <h4>Create Card </h4>

      {!Auth.loggedIn() ? (
        <>
          <p
            className={`m-0 ${
              characterCount === 280 || error ? 'text-danger' : ''
            }`}
          >
            Character Count: {characterCount}/280
            {error && <span className="ml-2">{error.message}</span>}
          </p>
          <form
            className="flex-row justify-center justify-space-between-md align-center"
            onSubmit={handleFormSubmit}
          >
            <div className="col-12 col-lg-9">
              <input
                type="text"
                name="cardTitle"
                placeholder="Card Title"
                value={cardTitle}
                className="form-input w-100"
                onChange={handleChange}
              />
              <textarea
                name="cardText"
                placeholder="Add your card..."
                value={cardText}
                className="form-input w-100"
                style={{ lineHeight: '1.5', resize: 'vertical' }}
                onChange={handleChange}
              ></textarea>
              <input
                type="date"
                name="expirationDate"
                value={expirationDate}
                className="form-input w-100"
                onChange={handleChange}
              />
              <input
                type="file"
                name="image"
                accept="image/*"
                className="form-input w-100"
                onChange={handleChange}
              />
                <select
                name="fontStyle"
                value={fontStyle}
                className="form-input w-100"
                onChange={handleChange}
              >
                <option value="Arial">Arial</option>
                <option value="Verdana">Verdana</option>
                <option value="Helvetica">Helvetica</option>
                {/* add more font style options here */}
                </select>
            </div>

            <div className="col-12 col-lg-3">
              <button className="btn btn-primary btn-block py-3" type="submit">
                Add card
              </button>
            </div>
          </form>
        </>
      ) : (
        <p>
          You need to be logged in to share your thoughts. Please{' '}
          <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
        </p>
      )}
    </div>
    </Box>
    </Container>
  );
};

export default CardForm;

