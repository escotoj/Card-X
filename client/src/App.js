import React, { useState } from 'react';

function App() {
  const [cards, setCards] = useState([]);

  // Function to handle card submission
  const handleCardSubmit = (event) => {
    event.preventDefault();
    const { title, message, image } = event.target.elements;

    // Create a new card object with a unique ID
    const newCard = {
      id: Date.now(),
      title: title.value,
      message: message.value,
      image: image.value,
    };

    // Log the new card object
    console.log('New Card:', newCard);

    // Add the new card to the cards array
    setCards((prevCards) => [...prevCards, newCard]);

    // Clear the form fields
    title.value = '';
    message.value = '';
    image.value = '';
  };

  // Function to handle card deletion
  const handleCardDelete = (cardId) => {
    // Remove the card with the specified ID from the cards array
    setCards((prevCards) => prevCards.filter((card) => card.id !== cardId));

    // Log the ID of the deleted card
    console.log('Deleted Card ID:', cardId);
  };

  // Log the current cards array
  console.log('Cards:', cards);

  return (
    <div>
      <h1>Personalized Card Messaging App</h1>

      {/* Card submission form */}
      <form onSubmit={handleCardSubmit}>
        {/* Input fields for card title, message, and image URL */}
        <input type="text" name="title" placeholder="Title" required />
        <input type="text" name="message" placeholder="Message" required />
        <input type="text" name="image" placeholder="Image URL" required />

        {/* Submit button for creating a card */}
        <button type="submit">Create Card</button>
      </form>

      {/* Conditional rendering based on the number of cards */}
      {cards.length === 0 ? (
        // Display a message when no cards have been created
        <p>No cards yet. Create one!</p>
      ) : (
        // Render the card list
        <div className="card-list">
          {/* Iterate over the cards array and render individual cards */}
          {cards.map((card) => (
            <div key={card.id} className="card">
              {/* Display the card image, title, and message */}
              <img src={card.image} alt={card.title} />
              <h2>{card.title}</h2>
              <p>{card.message}</p>

              {/* Button to delete the card */}
              <button onClick={() => handleCardDelete(card.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
