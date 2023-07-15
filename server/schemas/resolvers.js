// resolvers is for the query
const { AuthenticationError } = require("apollo-server-express");

const { User } = require("../models/index");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (root, args, context) => {
      console.log("context", context);
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .select("-__v -password")
          .populate("savedBooks");

        return userData;
      }
      throw new AuthenticationError("User not logged in");
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
    saveBook: async (root, bookData, context) => {
      console.log("SAVEBOOK");

      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { savedBooks: bookData } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Must be Logged In for such thing");
    },
    removeBook: async (root, { bookId }, context) => {
      console.log("DELETE");
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { savedBooks: { bookId } } },
          { new: true }
        );
        return updatedUser;
      }
      throw new AuthenticationError("Must be Logged In for such thing");
    },
  },

  // User: {
  //   _id: (root) => root._id,
  //   username: (root) => root.username,
  //   email: (root) => root.email,
  //   bookCount: (root) => root.savedBooks.length,
  //   savedBooks: (root) => root.savedBooks

  // },
};

module.exports = resolvers;
