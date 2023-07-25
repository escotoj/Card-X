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
import { Grid } from "@mui/material";
import { Button } from "@mui/material";

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
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: (t) =>
          t.palette.mode === "light"
            ? t.palette.grey[50]
            : t.palette.grey[900]
        }}
      >
        <Grid container justifyContent="center"> {/* Add a Grid container */}
          <Grid item xs={12}> {/* Make the form take full width on small screens */}
            <Typography
              variant="h4"
              sx={{
                fontSize: "3rem",
                // fontFamily: "Lucida Handwritting, Roboto, Helvetica, Arial, sans-serif",
                marginTop: "1vh",
                textAlign: "center",
                textShadow: "2px 2px 2px #a7a59e",
              }}
            >
              Create Card
            </Typography>
          </Grid>
          {Auth.loggedIn() && (
            <>
              <Grid item xs={12} lg={9}> {/* Take full width on small screens, and 9 columns on larger screens */}
                <TextField
                  margin="normal"
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

                <FormControl fullWidth variant="outlined" size="small">
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

                <TextField
                  margin="normal"
                  fullWidth
                  id="cardText"
                  placeholder="Add your card..."
                  label="Card Text"
                  value={cardText}
                  onChange={handleChange}
                  name="cardText"
                  multiline
                  rows={6}
                  variant="outlined"
                ></TextField>

                {/* <TextField
                  type="date"
                  name="expirationDate"
                  value={expirationDate}
                  className="form-input w-100"
                  onChange={handleChange}
                /> */}

                {/* <input
                  type="file"
                  name="image"
                  accept="image/*"
                  className="form-input w-100"
                  onChange={handleChange}
                /> */}
              </Grid>

              <Grid item xs={12} sm={6} md={4}> {/* Take full width on small screens */}
                <Link onClick={handleFormSubmit}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    sx={{
                      mt: 3,
                      mb: 2,
                      alignSelf: "center",
                      width: "24vh",
                    }}
                    // style={{ marginTop: '1rem' }}
                    // onClick={handleFormSubmit}
                  >
                    Add Card
                  </Button>
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
                ></form>
              </Grid>
            </>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default CardForm;