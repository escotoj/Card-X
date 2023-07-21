import React from 'react';
import createRoot from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'; // Import ApolloProvider, ApolloClient, and InMemoryCache
import './css/index.css';
import './css/App.css';
import './css/style.css';
import './css/MyCard.css';


import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL endpoint URL
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
