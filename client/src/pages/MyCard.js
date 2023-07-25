import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, QUERY_SINGLE_CARD } from "../utils/queries";
import { REMOVE_CARD } from "../utils/mutations";
import { Typography, Paper, Box, TextField, Button, Card } from "@mui/material";

import UpdateCardButton from "../components/UpdateCardButton";
import RemoveCardButton from "../components/RemoveCardButton";

import UpdateCardForm from "../components/updateCard";

const MyCard = () => {
  const [singleCard, setSingleCard] = useState(null);

  const [cardToUpdate, setCardToUpdate] = useState(null);
  const [selectedCardId, setSelectedCardId] = useState(null);
  const { loading, error, data } = useQuery(GET_ME);
  const [userCards, setUserCards] = useState([]);

  const [removeCard] = useMutation(REMOVE_CARD, {
    refetchQueries: [{ query: GET_ME }],
  });

  useEffect(() => {
    console.log("Data from GET_ME:", data);
    if (data?.me.cards) {
      setUserCards(data.me.cards);
    }
  }, [data]);

  const {
    loading: singleCardLoading,
    error: singleCardError,
    data: singleCardData,
  } = useQuery(QUERY_SINGLE_CARD, {
    variables: { cardId: selectedCardId },
    skip: !selectedCardId,
  });

  useEffect(() => {
    if (singleCardData && singleCardData.singleCard) {
      setSingleCard(singleCardData.singleCard);
    }
  }, [singleCardData]);

  console.log(singleCardData);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  const handleRemoveCard = async (cardId) => {
    console.log(`Attempting to remove card with ID: ${cardId}`);
    const { data } = await removeCard({ variables: { cardId: cardId } });

    console.log(`Mutation response data: `, data);

    if (data?.removeCard) {
      console.log(`Received updated user from server: `, data.removeCard);
      setUserCards(data.removeCard.cards);
      window.alert('Successful Delete')
      window.location.reload();
      console.log(`Updated userCards state: `, data.removeCard.cards);
    } else {
      console.log(`No updated user received from server.`);
    }
  };

  return (
    <Box sx={{   display: "flex",
    flexDirection: "column",
    alignItems: "center",
    mt: 6}}>
      <Typography variant="h4" gutterBottom sx={{mt: 10, textAlign: "center", }} >My Cards</Typography>
    <Paper
      sx={{width: '60%', margin: 'auto'
      }}
    >
      <div className="my-card-container">
        <div className="user-cards">
          <h2 className="section-title">Cards</h2>
          {userCards.length === 0 ? (
            <p className="empty-message">No cards found for this user.</p>
          ) : (
            <ul className="card-list">
              {userCards.map((card) => (
                <Paper>
                  <li key={card._id} className="card-item">
                    <span>{card.title}</span>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{ mt: 2 }}
                      onClick={() => setSelectedCardId(card._id)}
                    >
                      View Details
                    </Button>
                    <UpdateCardButton
                      cardId={card._id}
                      newDetails={card.details}
                      newTitle={card.title}
                      newDate={card.date}
                      newPicture={card.picture}
                      setCardToUpdate={setCardToUpdate}
                    />
                    <RemoveCardButton
                      cardId={card._id}
                      onRemove={handleRemoveCard}
                    />
                  </li>
                </Paper>
              ))}
            </ul>
          )}
        </div>
        <div className="single-card">
          <h2 className="section-title">Selected Card Details</h2>
          {singleCardLoading
            ? "Loading..."
            : singleCardError
            ? `Error! ${singleCardError.message}`
            : singleCard && (
                <Card sx={{ minWidth: 275, border: '10px double #c2dcf7', 
                backgroundColor: '#fbe8d6'}}>
                  <div className="single-card-details">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Title
        </Typography>
                    <h2>{singleCard.title}</h2>

                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Details
        </Typography>
                    <p>{singleCard.details}</p>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary">
          Author:
        </Typography>
                    <p>{singleCard.cardAuthor}</p>
                    <Box sx={{ mt: 8, textAlign: "end", paddingRight: "20%" }}>
                      
                    </Box>
                  </div>
                </Card>
              )}
        </div>

        {cardToUpdate && (
          <UpdateCardForm
            cardId={cardToUpdate.cardId}
            currentDetails={cardToUpdate.currentDetails}
            currentTitle={cardToUpdate.currentTitle}
            currentDate={cardToUpdate.currentDate}
            currentPicture={cardToUpdate.currentPicture}
            setCardToUpdate={setCardToUpdate}
          />
        )}
      </div>
    </Paper>
    </Box>
  );
};

export default MyCard;
