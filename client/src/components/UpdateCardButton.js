import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_CARD } from '../utils/mutations';

import UpdateCardForm from "../components/updateCard"; 

const UpdateCardButton = ({ cardId, newDetails, newTitle, newDate, newPicture }) => {
  const [updateCard, { loading: updating, error: updateError }] = useMutation(UPDATE_CARD);
  const [showUpdateForm, setShowUpdateForm] = useState(false); // State variable to control form visibility

  const handleClick = () => {
    setShowUpdateForm(true); // Set showUpdateForm to true when the "Update" button is clicked
  };

  if (showUpdateForm) {
    // Render the update form when showUpdateForm is true
    return (
      <div>
        {/* Pass the necessary props to the UpdateCardForm component */}
        <UpdateCardForm
          cardId={cardId}
          newDetails={newDetails}
          newTitle={newTitle}
          newDate={newDate}
          newPicture={newPicture}
          setShowUpdateForm={setShowUpdateForm} // Pass the setShowUpdateForm function to close the form
        />
      </div>
    );
  }

  return (
    <div>
      <button onClick={handleClick}>Update</button>
      {/* Render a message or loading indicator if updating */}
      {updating && <p>Updating...</p>}
      {/* Render an error message if an error occurred during updating */}
      {updateError && <p>Error updating card!</p>}
    </div>
  );
};

export default UpdateCardButton;
