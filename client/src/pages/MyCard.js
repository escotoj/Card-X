import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME, QUERY_SINGLE_CARD } from "../utils/queries";
import { REMOVE_CARD } from "../utils/mutations";
import "./../css/MyCard.css";

import UpdateCardButton from "../components/UpdateCardButton";
import RemoveCardButton from "../components/RemoveCardButton";

import UpdateCardForm from "../components/updateCard"; // Import the UpdateCardForm component

const MyCard = () => {
  const [singleCard, setSingleCard] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
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

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // If a card is selected, display the details of that card
  const handleRemoveCard = async (cardId) => {
    console.log(`Attempting to remove card with ID: ${cardId}`);
    const { data } = await removeCard({ variables: { cardId: cardId } });

    console.log(`Mutation response data: `, data);

    if (data?.removeCard) {
      console.log(`Received updated user from server: `, data.removeCard);
      setUserCards(data.removeCard.cards);
      console.log(`Updated userCards state: `, data.removeCard.cards);
    } else {
      console.log(`No updated user received from server.`);
    }
  };

  return (
    <div className="my-card-container">
      <h1 className="app-title">My Cards</h1>
      <div className="user-cards">
        <h2 className="section-title">Your Cards</h2>
        {userCards.length === 0 ? (
          <p className="empty-message">No cards found for this user.</p>
        ) : (
          <ul className="card-list">
            {userCards.map((card) => (
              <li key={card._id} className="card-item">
                <span>{card.title}</span>
                <button
                  className="view-details-btn"
                  onClick={() => setSelectedCardId(card._id)}
                >
                  View Details
                </button>
                <UpdateCardButton
                  cardId={card._id}
                  newDetails={card.details}
                  newTitle={card.title}
                  newDate={card.date}
                  newPicture={card.picture}
                  setCardToUpdate={setCardToUpdate} // Pass the setCardToUpdate function as a prop
                />
                <RemoveCardButton
                  cardId={card._id}
                  onRemove={handleRemoveCard}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className="single-card">
        <h2 className="section-title">Selected Card Details</h2>
        {singleCardLoading ? (
          "Loading..."
        ) : singleCardError ? (
          `Error! ${singleCardError.message}`
        ) : (
          singleCard && (
            <div className="single-card-details">
              <h2>{singleCard.title}</h2>
              <p>{singleCard.description}</p>
            </div>
          )
        )}
      </div>
      {/* Render the UpdateCardForm component when a card is selected for update */}
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
  );
};

export default MyCard;
