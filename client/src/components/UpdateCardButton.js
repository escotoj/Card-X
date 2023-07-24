import React from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CARD } from '../utils/mutations';

const UpdateCardButton = ({ cardId, newDetails, newTitle, newDate, newPicture }) => {
  const [updateCard, { loading: updating, error: updateError }] = useMutation(UPDATE_CARD);

  const handleClick = async () => {
    try {
      await updateCard({ 
        variables: { 
          cardId: cardId, 
          details: newDetails, 
          title: newTitle, 
          date: newDate, 
          picture: newPicture 
        } 
      });
      console.log("Card updated successfully");
    } catch (error) {
      console.error("Error updating card", error);
    }
  };

  if (updating) return <p>Updating...</p>;
  if (updateError) return <p>Error updating card!</p>;

  return <button onClick={handleClick}>Update</button>;
};

export default UpdateCardButton;
