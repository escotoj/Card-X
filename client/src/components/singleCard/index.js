import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_SINGLE_CARD } from '../../utils/queries';

const CardDisplay = ({ cardId }) => {
  const { loading, error, data, refetch } = useQuery(QUERY_SINGLE_CARD, {
    variables: { cardId },
  });
  
  useEffect(() => {
    console.log('CARD TO BE DISPLAYED:', data);
    refetch();
  }, [cardId, data, refetch]);
  console.log('CARD TO BE DISPLAYED:', data);
  if (loading) return <p>Loading...</p>;
  if (error && !loading) return <p>SINGLECARD Error: {error.message}</p>;
  

  const card = data.singleCard;

  return (
    <div>
      {card ? (
        <>
          <h2>{card.title}</h2>
          <p>{card.details}</p>
          <p>{card.cardAuthor}</p>
          {/* Add more card content as needed */}
        </>
      ) : (
        <p>Card not found.</p>
      )}
    </div>
  );
};

export default CardDisplay;