const { Query } = require("./Query");
const { Mutation } = require("./Mutation");
const { User } = require("./User");
const { Project } = require("./project");

const resolvers = {
  Query,
  Mutation,
  User,
  Project
};

module.exports = {
  resolvers
};
