import { gql } from '@apollo/client';
export const LOGIN_USER = gql`
  mutation login($email: String! $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
      email
      }
    }
  }
`
export const ADD_USER = gql`
mutation addUser($email: String! $username: String! $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      username
      email
    }
  }
}
`
export const UPDATE_USER = gql`
  mutation updateUser($email: String, $username: String, $password: String) {
    updateUser(email: $email, username: $username, password: $password) {
      _id
      email
      username
    }
  }
`;
export const CREATE_CARD = gql`
  mutation createCard($details: String!, $title: String!, $date: String, $picture: String) {
    createCard(details: $details, title: $title, date: $date, picture: $picture) {
      _id
      details
      title
      date
      picture
      cardAuthor
    }
  }
`;

// update card requires the card's ID and the new information to be updated
export const UPDATE_CARD = gql`
  mutation updateCard($cardId: ID!, $details: String, $title: String, $date: String, $picture: String) {
    updateCard(cardId: $cardId, details: $details, title: $title, date: $date, picture: $picture) {
      _id
      details
      title
      date
      picture
      cardAuthor
    }
  }
`;

// remove card requires the card's ID
export const REMOVE_CARD = gql`
  mutation removeCard($cardId: ID!) {
    removeCard(cardId: $cardId) {
      _id
      cards {
        _id
      }
    }
  }
`;

