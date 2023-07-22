import React from 'react';
import createRoot from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'; // Import ApolloProvider, ApolloClient, and InMemoryCache
import './css/index.css';
import './css/App.css';
import './css/style.css';
import './css/MyCard.css';
import auth from './utils/auth';
import { createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import App from './App';

// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql', // Replace with your GraphQL endpoint URL
//   cache: new InMemoryCache(),
//   headers: {
//     authorization: `Bearer ${auth.getToken()}`
//   }
// });


// Updated the code above to include the token in the header for auth purpose. specific for logged in user activity**
const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = auth.getToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client instance
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

createRoot.render(
  <ApolloProvider client={client}> {/* Wrap App component with ApolloProvider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
