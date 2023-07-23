import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_CARD } from '../../utils/queries';

const SearchCardForm = () => {
  const [cardId, setCardId] = useState('');
  const [showCard, setShowCard] = useState(false);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setShowCard(true);
    console.log('Card ID:', cardId);
  };

  const FinalCard = ({ cardId }) => {
    const { loading, error, data } = useQuery(QUERY_SINGLE_CARD, {
      variables: { cardId },
    });
    console.log('data:', data);
    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error fetching data Error: {error.message}</p>;

    const card = data.singleCard;

    return (
      <div>
        {card ? (
          <>
            <h2>{card.title}</h2>
            <p>{card.details}</p>
            {/* Add more card content as needed */}
          </>
        ) : (
          <p>Card not found.</p>
        )}
      </div>
    );
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="cardIdInput">Enter Card ID:</label>
        <input
          type="text"
          id="cardIdInput"
          value={cardId}
          onChange={(e) => setCardId(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {showCard && <FinalCard cardId={cardId} />}
    </div>
  );
};

export default SearchCardForm;
