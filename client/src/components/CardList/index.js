// import React from 'react';
// import { useQuery } from '@apollo/client';
// import { QUERY_CARD } from '../../utils/queries';
// import { Card, CardContent, Typography, Box } from "@mui/material";

// const CardList = () => {
//   const { loading, error, data } = useQuery(QUERY_CARD);

//   if (loading) return <p>Loading...</p>;
//   if (error) return <p>Error fetching data Error: {error.message}</p>;

//   const { cards } = data;

//   return (
//     <div>
//       {cards.length > 0 ? (
//         <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2 }}>
//         {cards.slice(0, 5).map((card) => (
//           <Card key={card._id} variant="outlined" sx={{ cursor: 'pointer', borderRadius: 12 }}>
//             <CardContent>
//               <Typography variant="h5" gutterBottom>
//                 {card.title}
//               </Typography>
//               <Typography variant="body1">{card.details}</Typography>
//               {/* Add more card content as needed */}
//             </CardContent>
//           </Card>
//         ))}
//       </Box>
//       ) : (
//         <p>No cards found.</p>
//       )}
//     </div>
//   );
// };

// export default CardList;


import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CARD } from '../../utils/queries';
import { Card, CardContent, Typography, Box } from "@mui/material";

const CardList = () => {
  const { loading, error, data } = useQuery(QUERY_CARD);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data Error: {error.message}</p>;

  const { cards } = data;

  // Reverse the 'cards' array to display from newest to oldest
  const reversedCards = cards.slice().reverse();

  const handleCardClick = (card) => {
    console.log('CLICK DATA', card);
  };

  return (
    <div>
      {reversedCards.length > 0 ? (
        <div>
          {reversedCards.slice(0, 5).map((card) => (
          <div key={card._id} style={{ marginBottom: '1px' }}>
          <Card variant="outlined" sx={{ cursor: 'pointer', borderRadius: 6, margin: '1px', padding: '1px' }} onClick={() => handleCardClick(card)}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {card.title}
              </Typography>
              <Typography variant="body1">{card.details}</Typography>
              {/* Add more card content as needed */}
            </CardContent>
          </Card>
        </div>
          ))}
        </div>
      ) : (
        <p>No cards found.</p>
      )}
    </div>
  );
};

export default CardList;

