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
      picture
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
      picture
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
      picture
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
      picture
      cardAuthor
    }
  }
`;

export const UPDATE_CARD = gql`
  mutation updateCard($cardId: ID!, $title: String!, $date: String!, $picture: String!) {
    updateCard(cardId: $cardId, title: $title, date: $date, picture: $picture) {
      _id
      title
      date
      picture
    }
  }
`;

export const REMOVE_CARD = gql`
  mutation removeCard($cardId: ID!) {
    removeCard(cardId: $cardId) {
      _id
    }
  }
`;
