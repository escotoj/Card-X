import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
  me {
    _id
    username
    email
    cards {
      _id
      details
      title

      cardAuthor
    }
  }
}
`;

export const QUERY_USER = gql`
query user($username: String!) {
  user(username: $username) {
    _id
    username
    email
    cards {
      _id
      details
      title
      date
      cardAuthor
    }
  }
}
`;

export const QUERY_CARD = gql`
  query cards {
    cards {
      _id
      details
      title
      date
      cardAuthor
    }
  }
`;

export const QUERY_SINGLE_CARD = gql`
  query singleCard($cardId: ID!) {
    singleCard(cardId: $cardId) {
      _id
      details
      title
      date
      cardAuthor
    }
  }
`;
