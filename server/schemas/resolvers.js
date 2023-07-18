// resolvers is for the query
const { AuthenticationError } = require("apollo-server-express");

const { User, Card } = require("../models/index");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async () => {
      return User.find();
    },

    user: async (parent, { userId }) => {
      return User.findOne({ _id: userId });
    },

    card: async () => {
      return Card.find();
    },

    card: async (parent, { cardId }) => {
      return Card.findOne({ _id: cardId });
    },
  },
  Mutation: {
    login: async (root, { email, password }) => {
      console.log("LOGIN");
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("No user with this email found!");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect password!");
      }

      const token = signToken(user);
      return { token, user };
    },

    addUser: async (root, { username, email, password }) => {
      console.log("ADDUSER");
      const user = await User.create({ username, email, password });
      const token = signToken(user);

      return { token, user };
    },
    addCard: async (root, cardData, context) => {
      console.log("ADDCARD");

      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { cards: cardData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Must be Logged In for such thing");
    },
    removeCard: async (root, { cardId }, context) => {
      console.log("DELETE");
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { cards: { cardId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Must be Logged In for such thing");
    },
  },

};

module.exports = resolvers;
