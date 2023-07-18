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
    title: String
    date: String
    picture: String
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveBook(authors: [String]!, description: String!, title: String!, bookId: String!, image: String, link: String): User
    removeBook(bookId: String!): User
  }
`;

module.exports = typeDefs;
