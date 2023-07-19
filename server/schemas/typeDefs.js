// similar to models where we call gql from apollo
const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String!
    cards: [Card]
  }

  type Card {
    cardId: String
    details: String!
    title: String!
    date: String
    picture: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    users: [User]!
    singleUser(userId: ID!): User
    cards(userId: ID!): [Card]!
    singleCard(userId: ID!): Card
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    createCard(details: String!, title: String!, date: String, picture: String): Card
    removeCard(cardId: ID!): User
  }
`;

module.exports = typeDefs;
