const { Query } = require("./query");
const { Mutation } = require("./mutation");
const { User } = require("./user");
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
