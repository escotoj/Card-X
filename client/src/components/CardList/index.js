import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CARD } from '../../utils/queries';
import { Card, CardContent, Typography, Box } from "@mui/material";
import CardDisplay from '../singleCard'; 

const CardList = () => {
  const { loading, error, data } = useQuery(QUERY_CARD);

  const [selectedCardId, setSelectedCardId] = useState(null); 

  if (loading) return <p>Loading...</p>;
  if (error) return <p>QUERY_CARD: {error.message}</p>;

  const { cards } = data;

  const reversedCards = cards.slice().reverse();

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

export default CardList;


