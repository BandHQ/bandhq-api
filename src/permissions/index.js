const { rule, and, shield } = require("graphql-shield");
const { getUserId } = require("../utils");

const rules = {
  isAuthenticatedUser: rule()((parent, args, context) => {
    const userId = getUserId(context);
    return Boolean(userId);
  }),
  isProjectOwner: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context);
    const author = await context.prisma
      .project({
        id
      })
      .author();
    return userId === author.id;
  }),
  isCurrentUser: rule()(async (parent, { id }, context) => {
    const userId = getUserId(context);
    return userId === id;
  })
};

const permissions = shield({
  Query: {
    user: rules.isAuthenticatedUser
  },
  Mutation: {
    createProject: rules.isAuthenticatedUser,
    updateUser: rules.isCurrentUser,
    deleteProject: rules.isProjectOwner,
    updateProject: rules.isProjectOwner
  }
});

module.exports = {
  permissions
};
