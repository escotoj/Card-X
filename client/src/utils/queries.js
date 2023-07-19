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
      image
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
      picture
    }
  }
}
`;

export const QUERY_CARD = gql`
  query getCards {
    cards {
      _id
      details
      title
      date
      picture
    }
  }
`;

export const QUERY_SINGLE_CARD = gql`
  query singleCard($cardId: ID!) {
    card(cardId: $cardId) {
      _id
      details
      title
      date
      picture
    }
  }
`;
