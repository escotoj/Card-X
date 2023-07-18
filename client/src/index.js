// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import App from './App';

// const root = ReactDOM.createRoot(document.getElementById('root'));
// root.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );

// DO NOT, I REPEAT, DO NOT TOUCH THIS FILE, JONATHAN !!!

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'; // Import ApolloProvider, ApolloClient, and InMemoryCache
import './css/index.css';
import './css/App.css';
import './css/style.css';

import App from './App';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql', // Replace with your GraphQL endpoint URL
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <ApolloProvider client={client}> {/* Wrap App component with ApolloProvider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ApolloProvider>,
  document.getElementById('root')
);
