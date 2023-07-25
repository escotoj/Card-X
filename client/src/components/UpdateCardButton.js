import React, { useState } from "react";
import UpdateCardForm from "../components/updateCard";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const UpdateCardButton = ({ cardId, newDetails, newTitle }) => {
  const [showUpdateForm, setShowUpdateForm] = useState(false);

  const navigate = useNavigate();

  const handleClick = () => {
    setShowUpdateForm(true);
  };

  const handleNavigateToMyCard = () => {
    navigate("/my-cards");
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
      <Button onClick={handleClick} variant="contained" color="success">
        Update
      </Button>
    </div>
  );
};

export default UpdateCardButton;
