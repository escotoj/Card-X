import React, { useState } from 'react';
import UpdateCardButton from '../UpdateCardButton';

const UpdateCardForm = ({ cardId, currentDetails, currentTitle, currentDate, currentPicture }) => {
  const [newDetails, setNewDetails] = useState(currentDetails);
  const [newTitle, setNewTitle] = useState(currentTitle);
  const [newDate, setNewDate] = useState(currentDate);
  const [newPicture, setNewPicture] = useState(currentPicture);

  const handleSaveUpdate = () => {
    return (
      <UpdateCardButton
        cardId={cardId}
        newDetails={newDetails}
        newTitle={newTitle}
        newDate={newDate}
        newPicture={newPicture}
      />
    );
  };

  return (
    <div>
      <h2>Edit Card</h2>
      <form>
        <div>
          <label htmlFor="details">Details:</label>
          <input
            type="text"
            id="details"
            value={newDetails}
            onChange={(e) => setNewDetails(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="picture">Picture:</label>
          <input
            type="text"
            id="picture"
            value={newPicture}
            onChange={(e) => setNewPicture(e.target.value)}
          />
        </div>
      </form>
      <button onClick={handleSaveUpdate}>Save Update</button>
    </div>
  );
};

export default UpdateCardForm;
