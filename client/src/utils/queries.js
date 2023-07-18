import { gql } from '@apollo/client';

export const GET_ME = gql`
query me {
  me {
    _id
    username
    email
    cards {
      cardId
      details
      description
      title
      image
      link
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
      cardId
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
      cardId
      details
      title
      date
      picture
    }
  }
`;

export const QUERY_SINGLE_CARD = gql`
  query getSingleCard($cardId: ID!) {
    card(cardId: $cardId) {
      cardId
      details
      title
      date
      picture
    }
  }
`;
