import React, { useState } from 'react';
import UpdateCardForm from "../components/updateCard";
import { useNavigate } from 'react-router-dom';

const UpdateCardButton = ({ cardId, newDetails, newTitle }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowUpdateForm(true);
  };

  const handleNavigateToMyCard = () => {
    navigate('/my-cards');
  };

  if (showUpdateForm) {
    return (
      <div>
        <UpdateCardForm
          cardId={cardId}
          newTitle={newTitle}
          currentTitle={newTitle}
          newDetails={newDetails}
          currentDetails={newDetails}
          handleNavigateToMyCard={handleNavigateToMyCard}
        />
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleClick}>Update</button>
    </div>
  );
};

export default UpdateCardButton;

