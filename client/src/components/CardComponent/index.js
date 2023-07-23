import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { Container, TextareaAutosize } from "@mui/material";

import { CREATE_CARD } from '../../utils/mutations';
import Auth from '../../utils/auth';

const CardForm = ({ cardId }) => {
  const [cardTitle, setCardTitle] = useState('');
  const [cardText, setCardText] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [image, setImage] = useState(null);
  const [fontStyle, setFontStyle] = useState('Arial');
  const [characterCount, setCharacterCount] = useState(0);
  const [createCard, { error }] = useMutation(CREATE_CARD);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createCard({
        variables: {
          details: cardText,
          title: cardTitle,
          date: expirationDate,
          picture: image, // assuming this is a base64 string
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

  const handleFileRead = (e) => {
    const content = e.target.result;
    setImage(content);
  };

  const handleFileChosen = (file) => {
    const fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsDataURL(file);
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
      handleFileChosen(event.target.files[0]);
    } else if (name === 'fontStyle') {
      setFontStyle(value);
    }
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: '5rem',
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
              <div className='createCard'>
                <Typography component="h1" variant="h4"
                  sx={{
                    fontSize: "3rem",
                    fontFamily: "Lucida Handwritting, Roboto, Helvetica, Arial, sans-serif",
                    marginTop: "1vh",
                    textAlign: "center",
                    textShadow: "2px 2px 2px #a7a59e",
                  }}
                >
                  Create Card
                </Typography>
              </div>

              <div className="col-12 col-lg-9">
                <TextField
                  margin="normal"
                  fullWidth
                  id="cardTitle"
                  label="Card Title"
                  placeholder="Card Title"
                  value={cardTitle}
                  className="form-input w-100"
                  onChange={handleChange}
                />
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
                  </Select>
                </FormControl>
                <TextField
                  margin="normal"
                  fullWidth
                  id="cardText"
                  placeholder="Add your card..."
                  value={cardText}
                  className="form-input w-100"
                  onChange={handleChange}
                />
                <TextField
                  margin="normal"
                  fullWidth
                  id="expirationDate"
                  label="Expiration Date"
                  placeholder="MM-DD-YYYY"
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
                <Button
                  type="submit"
                  onClick={handleFormSubmit}
                  sx={{
                    backgroundColor: "purple",
                    fontFamily: "Lucida Handwritting, Roboto, Helvetica, Arial, sans-serif",
                    fontSize: "1.5rem",
                    borderRadius: "1rem",
                    color: "#f8f5f1",
                    boxShadow: "2px 2px 2px #a7a59e",
                    marginTop: "2vh",
                    marginBottom: "2vh",
                  }}
                >
                  Create
                </Button>
              </div>
            </>
          ) : (
            <p>
              You need to be logged in to see this page. Use the navigation links above to sign up or log in!
            </p>
          )}
        </div>
      </Box>
    </Container>
  );
};

export default CardForm;
