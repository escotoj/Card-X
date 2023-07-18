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

export const CREATE_USER = gql`
mutation Mutation($username: String!, $email: String!, $password: String!) {
  addUser(username: $username, email: $email, password: $password) {
    token
    user {
      email
      username
      _id
    }
  }
}
`

export const CREATE_CARD = gql`
  mutation Mutation($details: String!, $title: String, $date: String, $picture: String) {
    createCard(details: $details, title: $title, date: $date, picture: $picture) {
      _id
      details
      title
      date
      picture
    }
  }
`;


export const REMOVE_CARD = gql`
  mutation Mutation($cardId: ID!) {
    removeCard(cardId: $cardId) {
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
;