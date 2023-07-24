import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_ME } from '../../utils/queries'; // Import the GET_ME query
import { Card, CardContent, Typography, Box } from "@mui/material";
import CardDisplay from '../singleCard';

const MyCardList = () => {
  const { loading, error, data } = useQuery(GET_ME); // Use the GET_ME query here

  const [selectedCardId, setSelectedCardId] = useState(null); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>GET_ME Error: {error.message}</p>; // Update the error message to reflect the GET_ME query

  const { me } = data; // Get the 'me' object from the data

  const reversedCards = me.cards.slice().reverse(); // Use 'me.cards' instead of 'data.cards'

  const handleCardClick = (card) => {
    console.log('CLICK DATA', card);
    setSelectedCardId(card._id); 
  };

  return (
    <div>
      {reversedCards.length > 0 ? (
        <div>
          {reversedCards.slice(0, 5).map((card) => (
            <div key={card._id} style={{ marginBottom: '1px' }}>
              <Card variant="outlined" sx={{ cursor: 'pointer', borderRadius: 6, margin: '1px', padding: '1px' }} onClick={() => handleCardClick(card)}>
                <CardContent>
                  <Typography variant="h5" gutterBottom>
                    {card.title}
                  </Typography>
                  <Typography variant="body1">{card.details}</Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <p>No cards found.</p>
      )}
 
      {selectedCardId && <CardDisplay cardId={selectedCardId} />}
    </div>
  );
};

export default MyCardList;
