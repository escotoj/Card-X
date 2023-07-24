import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

import { CREATE_CARD } from '../../utils/mutations';

import Auth from '../../utils/auth';

const CardForm = ({ cardId }) => {

  const [cardTitle, setCardTitle] = useState('');
  const [cardText, setCardText] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [image, setImage] = useState(null);
  const [fontStyle, setFontStyle] = useState('Arial'); // Default font style is 'Arial'



  const [characterCount, setCharacterCount] = useState(0);


  const [createCard, { error }] = useMutation(CREATE_CARD);

  const navigate = useNavigate();

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createCard({
        variables: {
          details: cardText,
          title: cardTitle,
          date: expirationDate,
          picture:'',
          cardAuthor: Auth.getProfile().data.username,
        }
      });

      setCardTitle('');
      setCardText('');
      setExpirationDate('');
      setImage(null);
      setFontStyle('Arial');
      console.log(data)
      navigate('/my-cards');
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'cardText' && value.length <= 280) {
      setCardText(value);
      setCharacterCount(value.length);
      console.log(event);
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
          marginTop: '11rem',
          boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
          borderRadius: '4px',
          width: '600px',
          marginLeft: '250px',
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: (t) =>
          t.palette.mode === "light"
            ? t.palette.grey[50]
            : t.palette.grey[900]
        }}
      >
    <div>

      {Auth.loggedIn() ? (
        <>

        <div className='createCard' >
          <Typography component="h1" variant="h4"
            sx={{
              fontSize: "3rem",
              fontFamily: "Lucida Handwritting, Roboto, Helvetica, Arial, sans-serif",
              marginTop: "1vh",
              textAlign: "center",
              textShadow: "2px 2px 2px #a7a59e",
            }}
            >Create Card
          </Typography>
        </div>
        
        <div className="col-12 col-lg-9">
      {/* Card Title */}
      <TextField
        margin='normal'

        fullWidth
        id="cardTitle"
        label="Card Title"
        placeholder="Card Title"
        value={cardTitle}
        variant="outlined"
        size="large"
        onChange={handleChange}
        name="cardTitle"
      />

      {/* Font Style */}
      <FormControl fullWidth variant="outlined" size="small" sx={{ width: '200px' }}>
        <InputLabel htmlFor="font-style-select">Font Style</InputLabel>
        <Select
          value={fontStyle}
          onChange={handleChange}
          input={<OutlinedInput label="Font Style" id="font-style-select" />}
          name="fontStyle"
          label="Font Style"
        >
          <MenuItem value="Arial">Arial</MenuItem>
          <MenuItem value="Verdana">Verdana</MenuItem>
          <MenuItem value="Helvetica">Helvetica</MenuItem>
          {/* Add more font style options here */}
        </Select>
      </FormControl>

      {/* Card Text */}
      <TextField
        margin="normal"

        fullWidth
        id="cardText"
        placeholder="Add your card..."
        label="Card Text"
        value={cardText}
        onChange={handleChange}
        name="cardText"
        
      ></TextField>

      {/* Expiration Date */}
      <TextField
        type="date"
        name="expirationDate"
        value={expirationDate}
        className="form-input w-100"
        onChange={handleChange}
      />

      {/* Image/File Input */}
      <input
        type="file"
        name="image"
        accept="image/*"
        className="form-input w-100"
        onChange={handleChange}
      />
    </div>
      
          <Link onClick={handleFormSubmit}>
            <button 
              variant="contained"
              color="primary"
              fullWidth
              style={{ marginTop: '1rem' }}
            >
              Add Card
            </button>
          </Link>
        
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
            onClick={handleFormSubmit}
          >
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